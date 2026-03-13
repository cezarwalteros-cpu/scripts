(function () {
  "use strict";

  const CONFIG = {
    STORE_NAME: "BienestarTotal",
    WEBHOOK_ABANDONADO:
      "https://nhccgonibsbymmydovts.supabase.co/functions/v1/capture-abandoned-cart",
    SESSION_KEY: "client_runtime_v2",
    INACTIVITY_TIME: 180000,
    DEBUG: false,

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
    ]
  };

  let sessionId = null;
  let hasSubmittedOrder = false;
  let hasSentAbandonment = false;
  let inactivityTimer = null;
  let startedAt = Date.now();

  function log() {
    if (!CONFIG.DEBUG) return;
    console.log("[runtime]", ...arguments);
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

  function findFieldWrapper(field) {
    if (!field) return null;

    return (
      field.closest(".elInputWrapper") ||
      field.closest(".elFormItemWrapper") ||
      field.closest(".elFormItem") ||
      field.closest(".fields-container__item") ||
      field.closest(".form-group") ||
      field.parentElement?.parentElement ||
      field.parentElement ||
      null
    );
  }

  function hideWrapper(wrapper) {
    if (!wrapper) return;
    wrapper.style.display = "none";
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

    const wrapper = findFieldWrapper(afterEl) || afterEl?.parentNode;
    if (wrapper && wrapper.parentNode) {
      wrapper.parentNode.appendChild(el);
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

  function hideFieldByName(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return false;
    hideWrapper(findFieldWrapper(field));
    return true;
  }

  function initEmailField() {
    const email = document.querySelector('[name="email"]');
    if (!email) return;

    if (!email.value) {
      email.value = makeId(8).toLowerCase() + "@gmail.com";
      email.dispatchEvent(new Event("input", { bubbles: true }));
      email.dispatchEvent(new Event("change", { bubbles: true }));
    }

    hideFieldByName("email");
  }

  function initCountryField() {
    const country = document.querySelector('[name="shipping_country"]');
    if (!country) return;

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

    hideFieldByName("shipping_country");
  }

  function filterBlockedCities() {
    const stateSelect = document.querySelector('[name="shipping_state"]');
    const citySelect = document.querySelector('[name="shipping_city"]');

    if (!stateSelect || !citySelect) return;

    const selectedState = stateSelect.value;
    const blockedCities = CONFIG.BLOCKED_LOCATIONS_BY_STATE[selectedState] || [];

    const currentValue = citySelect.value;
    const options = Array.from(citySelect.options);

    options.forEach((opt) => {
      if (!opt.value) return;
      if (blockedCities.includes(opt.value)) {
        opt.remove();
      }
    });

    const validOptions = Array.from(citySelect.options).filter((opt) => opt.value);

    if (validOptions.length === 0 && selectedState) {
      showMessage(
        "bt-no-coverage-dept",
        citySelect,
        "Por el momento no tenemos cobertura en este departamento."
      );
      citySelect.value = "";
    } else {
      hideMessage("bt-no-coverage-dept");

      const stillExists = Array.from(citySelect.options).some(
        (opt) => opt.value === currentValue
      );

      if (!stillExists) {
        citySelect.value = "";
      }
    }
  }

  function bindLocationFiltering() {
    const stateSelect = document.querySelector('[name="shipping_state"]');
    const citySelect = document.querySelector('[name="shipping_city"]');

    if (!stateSelect || !citySelect) return;
    if (stateSelect.dataset.runtimeBound === "1") return;

    stateSelect.dataset.runtimeBound = "1";
    stateSelect.addEventListener("change", function () {
      setTimeout(filterBlockedCities, 50);
    });

    setTimeout(filterBlockedCities, 300);
    setTimeout(filterBlockedCities, 1000);
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

    const citySelect = document.querySelector('[name="shipping_city"]');
    if (state && citySelect) {
      const validOptions = Array.from(citySelect.options).filter((opt) => opt.value);
      if (validOptions.length === 0) return true;
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

    if (!minimumData(data)) return;
    if (coverageBlocked()) return;

    try {
      const ok = navigator.sendBeacon(
        CONFIG.WEBHOOK_ABANDONADO,
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );

      if (ok) {
        hasSentAbandonment = true;
      }
    } catch (e) {}
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

  function initPhoneFormatting() {
    const phoneInput = document.querySelector('[name="phone"]');
    if (!phoneInput || phoneInput.dataset.runtimePhoneBound === "1") return;

    phoneInput.dataset.runtimePhoneBound = "1";
    phoneInput.setAttribute("inputmode", "numeric");
    phoneInput.setAttribute("maxlength", "10");

    phoneInput.addEventListener("input", function () {
      this.value = normalizePhone(this.value);
    });
  }

  function interceptSubmit() {
    document.querySelectorAll('a[href="#submit-step"]').forEach((btn) => {
      if (btn.dataset.runtimeSubmitBound === "1") return;
      btn.dataset.runtimeSubmitBound = "1";

      btn.addEventListener(
        "click",
        function (e) {
          const phone = getValue("phone");
          const state = getValue("shipping_state");
          const city = getValue("shipping_city");

          if (!isValidPhone(phone)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            alert("Ingresa un celular colombiano válido.");
            return;
          }

          if (!state || !city || coverageBlocked()) {
            e.preventDefault();
            e.stopImmediatePropagation();
            alert("Por el momento no tenemos cobertura para esta población.");
            return;
          }

          hasSubmittedOrder = true;
        },
        true
      );
    });
  }

  function initCore() {
    sessionId = getSessionId();
    initEmailField();
    initCountryField();
    initPhoneFormatting();
    bindLocationFiltering();
    initActivityTracking();
    interceptSubmit();
    log("client runtime initialized");
  }

  function boot() {
    setTimeout(initCore, 800);
    setTimeout(() => {
      initEmailField();
      initCountryField();
      bindLocationFiltering();
      interceptSubmit();
    }, 2000);
  }

  window.addEventListener("load", boot);
})();
