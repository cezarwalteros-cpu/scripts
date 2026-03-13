(function () {
  "use strict";

  const CONFIG = {
    STORE_NAME: "BienestarTotal",
    WEBHOOK_ABANDONADO:
      "https://nhccgonibsbymmydovts.supabase.co/functions/v1/capture-abandoned-cart",
    SESSION_KEY: "bt_session_v2",
    INACTIVITY_TIME: 180000,
    DEBUG: true,

    BLOCKED_LOCATIONS_BY_STATE: {
      Amazonas: ["Leticia"]
    },

    BLOCKED_ADDRESS_TERMS: [
      "vereda",
      "corregimiento",
      "zona rural",
      "finca",
      "parcelacion",
      "parcelación",
      "caserio",
      "caserío"
    ],

    MESSAGES: {
      INVALID_PHONE: "Ingresa un celular colombiano válido.",
      NO_COVERAGE_DEPARTMENT:
        "Por el momento no tenemos cobertura en este departamento.",
      NO_COVERAGE_LOCATION:
        "Por el momento no tenemos cobertura para esta población."
    }
  };

  // =========================
  // BASE COLOMBIA
  // =========================
  // Puedes ampliar este objeto con tu lista completa.
  const countryStateInfo = {
    Colombia: {
      Amazonas: {
        Leticia: []
      },
      Antioquia: {
        Medellín: [],
        Envigado: [],
        Bello: [],
        Itagüí: [],
        Sabaneta: [],
        Rionegro: [],
        La_Ceja: []
      },
      Atlántico: {
        Barranquilla: [],
        Soledad: []
      },
      "Bogotá D.C.": {
        Bogotá: []
      },
      Bolívar: {
        Cartagena: []
      },
      Caldas: {
        Manizales: []
      },
      Cauca: {
        Popayán: []
      },
      Cesar: {
        Valledupar: []
      },
      Chocó: {
        Quibdó: []
      },
      Córdoba: {
        Montería: []
      },
      Cundinamarca: {
        Soacha: [],
        Chía: [],
        Mosquera: [],
        Funza: [],
        Madrid: [],
        Facatativá: [],
        Fusagasugá: []
      },
      Huila: {
        Neiva: []
      },
      Magdalena: {
        Santa_Marta: []
      },
      Meta: {
        Villavicencio: []
      },
      Nariño: {
        Pasto: [],
        Ipiales: [],
        Tumaco: []
      },
      Norte_de_Santander: {
        Cúcuta: []
      },
      Quindío: {
        Armenia: []
      },
      Risaralda: {
        Pereira: [],
        Dosquebradas: []
      },
      Santander: {
        Bucaramanga: [],
        Floridablanca: [],
        Girón: [],
        Piedecuesta: []
      },
      Tolima: {
        Ibagué: []
      },
      "Valle_del_Cauca": {
        Cali: [],
        Palmira: [],
        Tuluá: [],
        Buga: [],
        Cartago: [],
        Jamundí: []
      }
    }
  };

  let sessionId = null;
  let hasSubmittedOrder = false;
  let hasSentAbandonment = false;
  let inactivityTimer = null;
  let startedAt = Date.now();

  function log() {
    if (!CONFIG.DEBUG) return;
    console.log("[BT V2]", ...arguments);
  }

  function makeId(len = 10) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < len; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  }

  function getSessionId() {
    try {
      const stored = JSON.parse(localStorage.getItem(CONFIG.SESSION_KEY));
      if (stored && stored.id) return stored.id;
    } catch (e) {}

    const obj = {
      id: makeId(),
      date: new Date().toISOString()
    };

    localStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(obj));
    return obj.id;
  }

  function normalizeText(str) {
    return (str || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function displayName(str) {
    return (str || "").replace(/_/g, " ");
  }

  function getValue(name) {
    return document.querySelector(`[name="${name}"]`)?.value?.trim() || "";
  }

  function getCustomFields() {
    return Array.from(document.getElementsByName("custom") || []);
  }

  function normalizePhone(phone) {
    let digits = (phone || "").replace(/\D/g, "");
    if (digits.startsWith("57")) digits = digits.slice(2);
    if (digits.length > 10) digits = digits.slice(0, 10);
    return digits;
  }

  function isValidPhone(phone) {
    const digits = normalizePhone(phone);
    return /^3\d{9}$/.test(digits);
  }

  function formatPhone(phone) {
    const digits = normalizePhone(phone);
    if (/^3\d{9}$/.test(digits)) {
      return "+57" + digits;
    }
    return phone;
  }

  function getProducts() {
    try {
      const names = [...document.querySelectorAll(".os-name")].map((el) =>
        el.textContent.trim()
      );

      if (typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS)) {
        return PRODUCTS.filter((p) => names.includes(p.name)).map((p) => ({
          nombre: p.name,
          precio: p.price
        }));
      }

      return names.map((n) => ({ nombre: n, precio: null }));
    } catch (e) {
      return [];
    }
  }

  function parseMoneyValue(raw) {
    if (raw == null) return null;
    const cleaned = String(raw).replace(/[^\d]/g, "");
    if (!cleaned) return null;
    const num = Number(cleaned);
    return Number.isFinite(num) ? num : null;
  }

  function getTotal(products) {
    try {
      const html =
        document.querySelector(".os-total .os-price")?.textContent?.trim() || "";

      const calc = products.reduce((a, p) => a + (Number(p.precio) || 0), 0);

      if (calc > 0) return calc;

      const parsed = parseMoneyValue(html);
      return parsed || html || null;
    } catch (e) {
      return null;
    }
  }

  function hideElementCompletely(el) {
    if (!el) return;
    el.style.display = "none";
    el.style.visibility = "hidden";
    el.style.height = "0";
    el.style.minHeight = "0";
    el.style.maxHeight = "0";
    el.style.overflow = "hidden";
    el.style.margin = "0";
    el.style.padding = "0";
    el.style.border = "0";
    el.setAttribute("aria-hidden", "true");
  }

  function hideFieldByName(fieldName, labelHints = []) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return false;

    hideElementCompletely(field);

    const candidates = new Set();
    let node = field;

    for (let i = 0; i < 6 && node; i++) {
      candidates.add(node);
      node = node.parentElement;
    }

    const hints = labelHints.map((h) => normalizeText(h));

    candidates.forEach((el) => {
      if (!el) return;
      const text = normalizeText(el.textContent || "");
      const shouldHideByHint = hints.some((hint) => hint && text.includes(hint));

      if (shouldHideByHint || el === field || el.contains(field)) {
        hideElementCompletely(el);
      }
    });

    return true;
  }

  function ensureMessageElement(id, afterEl) {
    let el = document.getElementById(id);
    if (el) return el;

    el = document.createElement("div");
    el.id = id;
    el.style.color = "#ffb3b3";
    el.style.fontSize = "13px";
    el.style.lineHeight = "1.3";
    el.style.marginTop = "6px";
    el.style.display = "none";

    if (afterEl && afterEl.parentNode) {
      afterEl.parentNode.appendChild(el);
    }

    return el;
  }

  function showMessage(id, afterEl, text) {
    const el = ensureMessageElement(id, afterEl);
    el.textContent = text;
    el.style.display = "block";
  }

  function hideMessage(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  }

  function initEmailHack() {
    const email = document.querySelector('[name="email"]');
    if (!email) {
      log("No se encontró email");
      return;
    }

    if (!email.value) {
      email.value = makeId(8).toLowerCase() + "@gmail.com";
      email.dispatchEvent(new Event("input", { bubbles: true }));
      email.dispatchEvent(new Event("change", { bubbles: true }));
    }

    hideFieldByName("email", [
      "correo electrónico",
      "correo electronico",
      "email"
    ]);

    log("Email ocultado");
  }

  function initCountryField() {
    const country = document.querySelector('[name="shipping_country"]');
    if (!country) {
      log("No se encontró shipping_country");
      return;
    }

    if (country.tagName === "SELECT") {
      const hasColombia = Array.from(country.options).some(
        (opt) => opt.value === "Colombia" || opt.text === "Colombia"
      );

      if (!hasColombia) {
        country.options.add(new Option("Colombia", "Colombia"));
      }

      country.value = "Colombia";
    } else {
      country.value = "Colombia";
    }

    country.dispatchEvent(new Event("input", { bubbles: true }));
    country.dispatchEvent(new Event("change", { bubbles: true }));

    hideFieldByName("shipping_country", ["pais", "país", "country"]);
    log("País fijado y ocultado");
  }

  function getAllowedCities(stateKey) {
    const allCities = countryStateInfo.Colombia[stateKey] || {};
    const blockedCities = CONFIG.BLOCKED_LOCATIONS_BY_STATE[displayName(stateKey)] || [];

    return Object.keys(allCities).filter((cityKey) => {
      const cityName = displayName(cityKey);
      return !blockedCities.includes(cityName);
    });
  }

  function initLocationSelects() {
    const stateSelect = document.querySelector('[name="shipping_state"]');
    const citySelect = document.querySelector('[name="shipping_city"]');

    if (!stateSelect || !citySelect) {
      log("No se encontraron shipping_state o shipping_city");
      return;
    }

    stateSelect.innerHTML = "";
    stateSelect.options.add(new Option("Departamento", ""));

    Object.keys(countryStateInfo.Colombia).forEach((stateKey) => {
      stateSelect.options.add(new Option(displayName(stateKey), displayName(stateKey)));
    });

    function renderCities(stateName) {
      citySelect.innerHTML = "";
      citySelect.options.add(new Option("Ciudad", ""));

      if (!stateName) {
        hideMessage("bt-no-coverage-dept");
        return;
      }

      const stateKey = Object.keys(countryStateInfo.Colombia).find(
        (k) => displayName(k) === stateName
      );

      if (!stateKey) {
        hideMessage("bt-no-coverage-dept");
        return;
      }

      const allowedCities = getAllowedCities(stateKey);

      if (!allowedCities.length) {
        showMessage(
          "bt-no-coverage-dept",
          citySelect,
          CONFIG.MESSAGES.NO_COVERAGE_DEPARTMENT
        );
        return;
      }

      hideMessage("bt-no-coverage-dept");

      allowedCities.forEach((cityKey) => {
        citySelect.options.add(
          new Option(displayName(cityKey), displayName(cityKey))
        );
      });
    }

    stateSelect.addEventListener("change", function () {
      renderCities(this.value);
    });

    renderCities(stateSelect.value);
    log("Selects de ubicación inicializados");
  }

  function coverageBlocked() {
    const state = getValue("shipping_state");
    const city = getValue("shipping_city");

    if (
      state &&
      city &&
      CONFIG.BLOCKED_LOCATIONS_BY_STATE[state] &&
      CONFIG.BLOCKED_LOCATIONS_BY_STATE[state].includes(city)
    ) {
      return true;
    }

    const stateKey = Object.keys(countryStateInfo.Colombia).find(
      (k) => displayName(k) === state
    );

    if (state && stateKey) {
      const allowedCities = getAllowedCities(stateKey).map(displayName);
      if (allowedCities.length === 0) return true;
    }

    const customs = getCustomFields();
    const address = [
      getValue("shipping_address"),
      customs[0]?.value || "",
      customs[1]?.value || ""
    ]
      .map(normalizeText)
      .join(" ");

    for (const term of CONFIG.BLOCKED_ADDRESS_TERMS) {
      if (address.includes(normalizeText(term))) return true;
    }

    return false;
  }

  function collectData() {
    const phone = formatPhone(getValue("phone"));
    const products = getProducts();
    const total = getTotal(products);

    return {
      storeName: CONFIG.STORE_NAME,
      sessionId: sessionId,
      eventType: "abandoned_checkout",
      fechaHora: new Date().toISOString(),
      pageUrl: location.href,
      cliente: {
        nombreCompleto: getValue("full_name"),
        telefono: phone
      },
      productos: products,
      precioTotal: total
    };
  }

  function minimumData(data) {
    const name = data?.cliente?.nombreCompleto || "";
    const phone = data?.cliente?.telefono || "";
    const products = Array.isArray(data?.productos) ? data.productos : [];
    const total = data?.precioTotal;

    return Boolean(
      name &&
        isValidPhone(phone) &&
        products.length > 0 &&
        total !== null &&
        total !== "" &&
        Number(total) !== 0
    );
  }

  function sendAbandonment(reason) {
    if (hasSubmittedOrder) return;
    if (hasSentAbandonment) return;
    if (Date.now() - startedAt < 15000) return;

    const data = collectData();
    data.abandonmentReason = reason;

    if (!minimumData(data)) {
      log("No se envía abandono: faltan datos mínimos");
      return;
    }

    if (coverageBlocked()) {
      log("No se envía abandono: cobertura bloqueada");
      return;
    }

    try {
      const ok = navigator.sendBeacon(
        CONFIG.WEBHOOK_ABANDONADO,
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );

      if (ok) {
        hasSentAbandonment = true;
        log("Abandono enviado:", reason, data);
      }
    } catch (e) {
      log("Error sendBeacon:", e);
    }
  }

  function markActivity() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      sendAbandonment("inactivity");
    }, CONFIG.INACTIVITY_TIME);
  }

  function initActivityTracking() {
    ["input", "change", "click", "keyup"].forEach((evt) => {
      document.body.addEventListener(evt, markActivity, true);
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        sendAbandonment("visibilityhidden");
      }
    });

    window.addEventListener("pagehide", () => {
      sendAbandonment("pagehide");
    });

    window.addEventListener("beforeunload", () => {
      sendAbandonment("beforeunload");
    });
  }

  function interceptSubmit() {
    document.querySelectorAll('a[href="#submit-step"]').forEach((btn) => {
      if (btn.dataset.btBound === "1") return;
      btn.dataset.btBound = "1";

      btn.addEventListener(
        "click",
        function (e) {
          const phone = getValue("phone");
          const state = getValue("shipping_state");
          const city = getValue("shipping_city");

          if (!isValidPhone(phone)) {
            alert(CONFIG.MESSAGES.INVALID_PHONE);
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
          }

          if (!state || !city || coverageBlocked()) {
            alert(CONFIG.MESSAGES.NO_COVERAGE_LOCATION);
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
          }

          hasSubmittedOrder = true;
        },
        true
      );
    });
  }

  function initPhoneFormatting() {
    const phoneInput = document.querySelector('[name="phone"]');
    if (!phoneInput) return;

    phoneInput.setAttribute("inputmode", "numeric");
    phoneInput.setAttribute("maxlength", "10");
    phoneInput.setAttribute("placeholder", "WhatsApp");

    phoneInput.addEventListener("input", function () {
      const digits = normalizePhone(this.value);
      this.value = digits;
    });
  }

  function initAddressHints() {
    const customs = getCustomFields();
    if (customs[0]) {
      customs[0].setAttribute(
        "placeholder",
        "Algún punto de referencia que ayude a guiar al domiciliario"
      );
    }
  }

  function initCore() {
    sessionId = getSessionId();
    initEmailHack();
    initCountryField();
    initLocationSelects();
    initPhoneFormatting();
    initAddressHints();
    initActivityTracking();
    interceptSubmit();

    log("BienestarTotal Script V2 iniciado");
  }

  function boot() {
    setTimeout(initCore, 800);
    setTimeout(() => {
      initEmailHack();
      initCountryField();
      initLocationSelects();
      interceptSubmit();
    }, 2000);
    setTimeout(() => {
      initEmailHack();
      initCountryField();
      initLocationSelects();
      interceptSubmit();
    }, 4000);
  }

  window.addEventListener("load", boot);
})();
