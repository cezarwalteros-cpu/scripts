(function () {
  "use strict";

  const CONFIG = {
    STORE_NAME: "BienestarTotal",
    WEBHOOK_ABANDONADO:
      "https://nhccgonibsbymmydovts.supabase.co/functions/v1/capture-abandoned-cart",
    SESSION_KEY: "client_runtime_v3",
    INACTIVITY_TIME: 180000,
    MIN_TIME_ON_PAGE: 15000,
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

  function normalizeText(str) {
    return (str || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function makeId(len = 10) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let out = "";
    for (let i = 0; i < len; i++) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
  }

  function getSessionId() {
    try {
      const stored = JSON.parse(localStorage.getItem(CONFIG.SESSION_KEY));
      if (stored && stored.id) return stored.id;
    } catch (e) {}

    const obj = {
      id: makeId(12),
      date: new Date().toISOString()
    };

    try {
      localStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(obj));
    } catch (e) {}

    return obj.id;
  }

  function getField(name) {
    return document.querySelector(`[name="${name}"]`);
  }

  function getValue(name) {
    return getField(name)?.value?.trim() || "";
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
    return /^3\d{9}$/.test(normalizePhone(phone));
  }

  function formatPhone(phone) {
    const digits = normalizePhone(phone);
    return /^3\d{9}$/.test(digits) ? `+57${digits}` : phone;
  }

  function getProducts() {
    try {
      const names = [...document.querySelectorAll(".os-name")].map((el) =>
        el.textContent.trim()
      );

      if (typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS)) {
        return PRODUCTS.filter((p) => names.includes(p.name)).map((p) => ({
          nombre: p.name,
          precio: Number(p.price) || null
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

      const calc = (products || []).reduce(
        (acc, p) => acc + (Number(p.precio) || 0),
        0
      );

      if (calc > 0) return calc;

      const parsed = parseMoneyValue(html);
      return parsed || html || null;
    } catch (e) {
      return null;
    }
  }

  function collectData() {
    const products = getProducts();
    const total = getTotal(products);

    return {
      storeName: CONFIG.STORE_NAME,
      sessionId,
      eventType: "abandoned_checkout",
      fechaHora: new Date().toISOString(),
      pageUrl: location.href,
      cliente: {
        nombreCompleto: getValue("full_name"),
        telefono: formatPhone(getValue("phone"))
      },
      productos: products,
      precioTotal: total
    };
  }

  function hasMinimumData(data) {
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

  function findFieldWrapper(field) {
    if (!field) return null;

    let current = field;
    let best = null;

    for (let i = 0; i < 8 && current; i++) {
      const controls = current.querySelectorAll(
        'input, select, textarea'
      ).length;
      const text = normalizeText(current.textContent || "");

      if (
        controls >= 1 &&
        controls <= 3 &&
        text.length <= 120
      ) {
        best = current;
      }

      current = current.parentElement;
    }

    return best || field.parentElement || null;
  }

  function hideField(name) {
    const field = getField(name);
    if (!field) return false;

    const wrapper = findFieldWrapper(field);
    if (wrapper) wrapper.style.display = "none";
    return true;
  }

  function initEmailField() {
    const email = getField("email");
    if (!email) return false;

    if (!email.value) {
      email.value = `${makeId(8).toLowerCase()}@gmail.com`;
      email.dispatchEvent(new Event("input", { bubbles: true }));
      email.dispatchEvent(new Event("change", { bubbles: true }));
    }

    hideField("email");
    return true;
  }

  function initCountryField() {
    const country = getField("shipping_country");
    if (!country) return false;

    if (country.tagName === "SELECT") {
      const hasColombia = Array.from(country.options).some(
        (opt) =>
          normalizeText(opt.value) === "colombia" ||
          normalizeText(opt.text) === "colombia"
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

    hideField("shipping_country");
    return true;
  }

  function getBlockedCitiesForCurrentState() {
    const state = getValue("shipping_state");
    return CONFIG.BLOCKED_LOCATIONS_BY_STATE[state] || [];
  }

  function removeBlockedCityOptions() {
    const citySelect = getField("shipping_city");
    if (!citySelect || citySelect.tagName !== "SELECT") return;

    const blocked = getBlockedCitiesForCurrentState();
    if (!blocked.length) return;

    const currentValue = citySelect.value;

    Array.from(citySelect.options).forEach((opt) => {
      const optionText = normalizeText(opt.text);
      const optionValue = normalizeText(opt.value);

      const mustRemove = blocked.some((city) => {
        const c = normalizeText(city);
        return optionText === c || optionValue === c;
      });

      if (mustRemove) {
        opt.remove();
      }
    });

    const validOptions = Array.from(citySelect.options).filter(
      (opt) => opt.value && normalizeText(opt.value) !== "ciudad"
    );

    if (
      currentValue &&
      !Array.from(citySelect.options).some((opt) => opt.value === currentValue)
    ) {
      citySelect.value = "";
      citySelect.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (validOptions.length === 0) {
      citySelect.value = "";
    }
  }

  function bindCityFiltering() {
    const stateSelect = getField("shipping_state");
    const citySelect = getField("shipping_city");

    if (!stateSelect || !citySelect) return false;
    if (stateSelect.dataset.btBound === "1") return true;

    stateSelect.dataset.btBound = "1";

    const runFilterSequence = () => {
      setTimeout(removeBlockedCityOptions, 50);
      setTimeout(removeBlockedCityOptions, 250);
      setTimeout(removeBlockedCityOptions, 800);
    };

    stateSelect.addEventListener("change", runFilterSequence);
    citySelect.addEventListener("focus", runFilterSequence);
    citySelect.addEventListener("click", runFilterSequence);
    citySelect.addEventListener("mousedown", runFilterSequence);

    const observer = new MutationObserver(() => {
      removeBlockedCityOptions();
    });

    observer.observe(citySelect, {
      childList: true,
      subtree: true
    });

    runFilterSequence();
    return true;
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

    const customs = getCustomFields();
    const address = [
      getValue("shipping_address"),
      customs[0]?.value || "",
      customs[1]?.value || ""
    ]
      .map(normalizeText)
      .join(" ");

    return CONFIG.BLOCKED_ADDRESS_TERMS.some((term) =>
      address.includes(normalizeText(term))
    );
  }

  function initPhoneField() {
    const phone = getField("phone");
    if (!phone) return false;
    if (phone.dataset.btPhoneBound === "1") return true;

    phone.dataset.btPhoneBound = "1";
    phone.setAttribute("inputmode", "numeric");
    phone.setAttribute("maxlength", "10");

    phone.addEventListener("input", function () {
      this.value = normalizePhone(this.value);
    });

    return true;
  }

  function sendAbandonment(reason) {
    if (hasSubmittedOrder) return;
    if (hasSentAbandonment) return;
    if (Date.now() - startedAt < CONFIG.MIN_TIME_ON_PAGE) return;

    const data = collectData();
    data.abandonmentReason = reason;

    if (!hasMinimumData(data)) return;
    if (coverageBlocked()) return;

    try {
      const ok = navigator.sendBeacon(
        CONFIG.WEBHOOK_ABANDONADO,
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );

      if (ok) {
        hasSentAbandonment = true;
        log("abandonment sent", reason);
      }
    } catch (e) {
      log("sendBeacon error", e);
    }
  }

  function markActivity() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      sendAbandonment("inactivity");
    }, CONFIG.INACTIVITY_TIME);
  }

  function initActivityTracking() {
    if (document.body.dataset.btActivityBound === "1") return true;
    document.body.dataset.btActivityBound = "1";

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

    return true;
  }

  function interceptSubmit() {
    const buttons = document.querySelectorAll('a[href="#submit-step"]');
    if (!buttons.length) return false;

    buttons.forEach((btn) => {
      if (btn.dataset.btSubmitBound === "1") return;
      btn.dataset.btSubmitBound = "1";

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

    return true;
  }

  function coreReady() {
    return Boolean(
      getField("full_name") &&
      getField("phone") &&
      getField("email") &&
      getField("shipping_country") &&
      getField("shipping_state") &&
      getField("shipping_city")
    );
  }

  function initOnceReady() {
    if (!coreReady()) return false;

    if (!sessionId) sessionId = getSessionId();

    initEmailField();
    initCountryField();
    initPhoneField();
    bindCityFiltering();
    initActivityTracking();
    interceptSubmit();

    log("client runtime initialized");
    return true;
  }

  function boot() {
    let tries = 0;
    const maxTries = 30;

    const interval = setInterval(() => {
      tries += 1;
      initOnceReady();

      if (tries >= maxTries) {
        clearInterval(interval);
      }
    }, 500);
  }

  window.addEventListener("load", boot);
})();
