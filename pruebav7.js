(() => {
  "use strict";

  const CONFIG = {
    storeName: "BienestarTotal",
    preliminarEndpoint: "https://tudominio.com/api/leads/preliminar",
    confirmadoEndpoint: "https://tudominio.com/api/leads/confirmado",
    debounceMs: 3500,
    defaultCountryName: "Colombia",
    defaultDialCode: "+57",
    debug: true,
    preventDoubleSubmitMs: 8000,
    abandonedDelayMs: 12000,

    hiddenFields: [
      "email",
      "shipping_country",
      "zip_code",
      "notes"
    ],

    blockedCities: ["Leticia"],

    departamentoCiudad: {
      "Amazonas": ["Leticia"],
      "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Sabaneta", "Rionegro", "Apartadó", "Turbo", "Caucasia", "La Ceja", "Copacabana", "Girardota"],
      "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia", "Sabanalarga", "Baranoa", "Galapa"],
      "Bogotá D.C.": ["Bogotá"],
      "Bolívar": ["Cartagena", "Magangué", "Turbaco", "Arjona", "El Carmen de Bolívar"],
      "Boyacá": ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa"],
      "Caldas": ["Manizales", "La Dorada", "Chinchiná", "Villamaría"],
      "Caquetá": ["Florencia"],
      "Casanare": ["Yopal", "Aguazul", "Villanueva"],
      "Cauca": ["Popayán", "Santander de Quilichao"],
      "Cesar": ["Valledupar", "Aguachica"],
      "Chocó": ["Quibdó"],
      "Córdoba": ["Montería", "Lorica", "Sahagún", "Cereté"],
      "Cundinamarca": ["Soacha", "Facatativá", "Girardot", "Zipaquirá", "Chía", "Mosquera", "Madrid", "Funza", "Fusagasugá"],
      "Huila": ["Neiva", "Pitalito", "Garzón"],
      "La Guajira": ["Riohacha", "Maicao", "Uribia"],
      "Magdalena": ["Santa Marta", "Ciénaga", "Fundación"],
      "Meta": ["Villavicencio", "Acacías", "Granada"],
      "Nariño": ["Pasto", "Ipiales", "Tumaco"],
      "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona", "Villa del Rosario"],
      "Quindío": ["Armenia", "Calarcá", "La Tebaida"],
      "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"],
      "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja"],
      "Sucre": ["Sincelejo", "Corozal"],
      "Tolima": ["Ibagué", "Espinal", "Melgar"],
      "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago", "Buga", "Jamundí", "Yumbo"]
    }
  };

  const STATE = {
    leadId: null,
    initialized: false,
    debounceTimer: null,
    lastFingerprint: "",
    confirmadoSent: false,
    preliminarSent: false,
    submitLockedUntil: 0,
    observerStarted: false
  };

  function log(...args) {
    if (CONFIG.debug) console.log("[CUSTOM-BT]", ...args);
  }

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function byName(name) {
    return document.querySelector(`[name="${name}"]`);
  }

  function valueOf(name) {
    return byName(name)?.value?.trim() || "";
  }

  function onlyDigits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function randomEmail() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let out = "";
    for (let i = 0; i < 10; i++) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    return `cliente${Date.now()}${out}@codcolombia.co`;
  }

  function makeId(length = 12) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let out = "";
    for (let i = 0; i < length; i++) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
  }

  function getLeadId() {
    const key = "bt_custom_lead_id";
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const id = makeId(12);
    localStorage.setItem(key, id);
    return id;
  }

  function injectStyles() {
    if (document.getElementById("bt-custom-styles")) return;

    const style = document.createElement("style");
    style.id = "bt-custom-styles";
    style.textContent = `
      .bt-force-hidden {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        min-height: 0 !important;
        max-height: 0 !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        pointer-events: none !important;
      }

      .bt-phone-invalid {
        border: 2px solid #d93025 !important;
        box-shadow: 0 0 0 3px rgba(217,48,37,.12) !important;
      }

      #inputPhoneInvalid {
        display: none;
        color: #d93025;
        font-size: 13px;
        font-weight: 600;
        line-height: 1.35;
        margin-top: 8px;
      }

      #btPhoneOverlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.35);
        display: none;
        z-index: 999999;
      }

      #btPhoneOverlay .bt-card {
        width: min(92vw, 420px);
        background: #fff;
        border-radius: 14px;
        padding: 18px 16px;
        box-shadow: 0 18px 48px rgba(0,0,0,.24);
        position: absolute;
        top: 18%;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        font-family: Arial, sans-serif;
      }

      #btPhoneOverlay .bt-card h4 {
        margin: 0 0 8px;
        color: #111;
        font-size: 18px;
      }

      #btPhoneOverlay .bt-card p {
        margin: 0;
        color: #333;
        font-size: 14px;
      }
    `;
    document.head.appendChild(style);
  }

  function createOverlay() {
    if (document.getElementById("btPhoneOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "btPhoneOverlay";
    overlay.innerHTML = `
      <div class="bt-card">
        <h4>Revisa tu número</h4>
        <p>Ingresa un celular colombiano válido de 10 dígitos que empiece por 3.</p>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  function showOverlay(ms = 1600) {
    const el = document.getElementById("btPhoneOverlay");
    if (!el) return;
    el.style.display = "block";
    setTimeout(() => {
      el.style.display = "none";
    }, ms);
  }

  function hideNode(node) {
    if (!node || node.dataset.btHiddenApplied === "1") return;
    node.dataset.btHiddenApplied = "1";
    node.classList.add("bt-force-hidden");
    node.style.setProperty("display", "none", "important");
    node.style.setProperty("visibility", "hidden", "important");
    node.style.setProperty("opacity", "0", "important");
    node.style.setProperty("height", "0", "important");
    node.style.setProperty("max-height", "0", "important");
    node.style.setProperty("min-height", "0", "important");
    node.style.setProperty("margin", "0", "important");
    node.style.setProperty("padding", "0", "important");
    node.style.setProperty("border", "0", "important");
    node.style.setProperty("overflow", "hidden", "important");
    node.style.setProperty("pointer-events", "none", "important");
  }

  function hideFieldCompletely(fieldName) {
    const el = byName(fieldName);
    if (!el) return false;

    const candidates = [
      el,
      el.previousElementSibling,
      el.nextElementSibling,
      el.closest("label"),
      el.closest(".form-group"),
      el.closest(".elFormItem"),
      el.closest(".elInputWrapper"),
      el.closest(".elInput"),
      el.closest(".fields-container"),
      el.closest(".field-container"),
      el.closest(".field"),
      el.closest(".row"),
      el.closest(".col"),
      el.closest(".col-md-12"),
      el.closest(".col-md-6"),
      el.closest("[data-field-wrapper]"),
      el.closest("[data-name-wrapper]"),
      el.parentElement,
      el.parentElement?.parentElement,
      el.parentElement?.parentElement?.parentElement,
      el.parentElement?.parentElement?.parentElement?.parentElement
    ].filter(Boolean);

    candidates.forEach(hideNode);
    return true;
  }

  function hideOptionalFields() {
    CONFIG.hiddenFields.forEach((name) => {
      hideFieldCompletely(name);
    });
  }

  function setupCountry() {
    const countryField = byName("shipping_country");
    if (!countryField) return;

    const countryName = CONFIG.defaultCountryName;

    if (countryField.tagName === "INPUT") {
      countryField.value = countryName;
      countryField.setAttribute("readonly", "true");
    } else if (countryField.tagName === "SELECT") {
      countryField.innerHTML = "";
      countryField.add(new Option(countryName, countryName));
      countryField.selectedIndex = 0;
    }

    hideFieldCompletely("shipping_country");
  }

  function ensureSelectForField(name, placeholder) {
    const original = byName(name);
    if (!original) return null;

    if (original.tagName === "SELECT") return original;

    const select = document.createElement("select");
    select.name = original.name;
    if (original.id) select.id = original.id;
    select.className = original.className || "";
    select.setAttribute("data-bt-generated", "1");

    original.parentNode.insertBefore(select, original);
    hideNode(original);

    select.innerHTML = "";
    select.add(new Option(placeholder, ""));
    return select;
  }

  function fillSelect(select, items, placeholder) {
    if (!select) return;
    select.innerHTML = "";
    select.add(new Option(placeholder, ""));
    items.forEach((item) => {
      if (!item) return;
      if (CONFIG.blockedCities.includes(item)) return;
      select.add(new Option(item, item));
    });
  }

  function setupStateCity() {
    const stateSel = ensureSelectForField("shipping_state", "Selecciona tu departamento");
    const citySel = ensureSelectForField("shipping_city", "Selecciona tu ciudad");

    if (!stateSel || !citySel) return;

    const departamentos = Object.keys(CONFIG.departamentoCiudad).sort((a, b) => a.localeCompare(b));
    fillSelect(stateSel, departamentos, "Selecciona tu departamento");

    function renderCities() {
      const selectedState = stateSel.value;
      const cities = CONFIG.departamentoCiudad[selectedState] || [];
      fillSelect(citySel, cities, "Selecciona tu ciudad");
    }

    if (!stateSel.dataset.btBound) {
      stateSel.dataset.btBound = "1";
      stateSel.addEventListener("change", renderCities);
    }

    renderCities();
  }

  function setupEmail() {
    const email = byName("email");
    if (!email) return;

    if (!email.value) {
      email.value = randomEmail();
    }

    email.setAttribute("autocomplete", "off");
    hideFieldCompletely("email");
  }

  function setupHiddenIdField() {
    const field =
      qs('input[data-name="idIntegramelo"]') ||
      qs('input[name="idIntegramelo"]') ||
      qs('input[data-name="custom_id"]');

    if (!field) return;

    field.value = JSON.stringify({
      idLead: STATE.leadId,
      urlOrigin: `${window.location.hostname}${window.location.pathname}`
    });

    hideNode(field);
    hideNode(field.parentElement);
    hideNode(field.parentElement?.parentElement);
  }

  function cleanupDireccionAutofill() {
    const direccionInput =
      qs('[data-name="Direccion"]') ||
      qs('[name="Direccion"]');

    if (!direccionInput || !direccionInput.value) return;
    direccionInput.value = direccionInput.value.replace(/{.*}/, "").trim();
  }

  function setupAddressConcat() {
    const customs = document.getElementsByName("custom");
    const shippingAddress = byName("shipping_address");
    if (!customs || customs.length < 3 || !shippingAddress) return;

    const direccionParcial = customs[0];
    const barrio = customs[1];
    const referencia = customs[2];

    shippingAddress.setAttribute("readonly", "true");

    function updateAddress() {
      shippingAddress.value = [
        direccionParcial?.value || "",
        barrio?.value || "",
        referencia?.value || ""
      ]
        .map((v) => String(v).trim())
        .filter(Boolean)
        .join(" , ");
    }

    [direccionParcial, barrio, referencia].forEach((field) => {
      if (!field || field.dataset.btAddressBound === "1") return;
      field.dataset.btAddressBound = "1";
      field.addEventListener("input", updateAddress);
      field.addEventListener("change", updateAddress);
    });

    updateAddress();
  }

  function normalizePhoneInput() {
    const input = byName("phone");
    if (!input) return;

    let digits = onlyDigits(input.value);

    if (digits.startsWith("57")) digits = digits.slice(2);
    if (digits.length > 10) digits = digits.slice(0, 10);

    if (!digits) {
      input.value = CONFIG.defaultDialCode;
      return;
    }

    if (!digits.startsWith("3")) {
      input.value = CONFIG.defaultDialCode + digits;
      return;
    }

    input.value = CONFIG.defaultDialCode + digits;
  }

  function validPhone() {
    const phone = valueOf("phone");
    return /^\+573\d{9}$/.test(phone);
  }

  function ensurePhoneWarning() {
    let warning = document.getElementById("inputPhoneInvalid");
    const input = byName("phone");
    if (!input) return null;

    if (!warning) {
      warning = document.createElement("div");
      warning.id = "inputPhoneInvalid";
      warning.textContent = "Escribe un número colombiano válido. Ejemplo: +573001234567";
      input.insertAdjacentElement("afterend", warning);
    }

    return warning;
  }

  function setupPhoneValidation() {
    const input = byName("phone");
    if (!input) return;

    const warning = ensurePhoneWarning();

    if (!input.dataset.btPhoneBound) {
      input.dataset.btPhoneBound = "1";

      const validate = () => {
        normalizePhoneInput();
        const raw = valueOf("phone");
        const hasSomething = raw && raw !== "+57";

        if (hasSomething && !validPhone()) {
          warning && (warning.style.display = "block");
          input.classList.add("bt-phone-invalid");
        } else {
          warning && (warning.style.display = "none");
          input.classList.remove("bt-phone-invalid");
        }
      };

      input.addEventListener("input", validate);
      input.addEventListener("change", validate);
      input.addEventListener("blur", validate);

      validate();
    }
  }

  function getProducts() {
    const namesFromDom = [
      ...qsa(".os-name"),
      ...qsa(".product-name"),
      ...qsa(".product-title"),
      ...qsa("[data-product-name]")
    ]
      .map((el) => (el.getAttribute("data-product-name") || el.textContent || "").trim())
      .filter(Boolean);

    const uniqueNames = [...new Set(namesFromDom)];

    if (Array.isArray(window.PRODUCTS) && window.PRODUCTS.length) {
      const matched = window.PRODUCTS
        .filter((product) => uniqueNames.includes(product.name))
        .map((product) => ({
          name: product.name,
          price: product.price ?? null
        }));

      if (matched.length) return matched;
    }

    return uniqueNames.map((name) => ({
      name,
      price: null
    }));
  }

  function getTotalPrice(products) {
    const totalText =
      qs(".os-total .os-price")?.textContent?.trim() ||
      qs(".total-price")?.textContent?.trim() ||
      "";

    const calculated = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
    const digits = onlyDigits(totalText);

    if (digits) return Number(digits);
    return calculated || 0;
  }

  function recoverData() {
    const products = getProducts();

    return {
      storeName: CONFIG.storeName,
      idLead: STATE.leadId,
      urlOrigin: `${location.origin}${location.pathname}${location.search}`,
      dateTime: new Date().toISOString(),
      leadType: "",
      ipOrigin: "",
      notes: valueOf("notes"),
      client: {
        name: "",
        lastName: "",
        fullName: valueOf("full_name"),
        email: valueOf("email"),
        phone: valueOf("phone")
      },
      dataAddress: {
        address: valueOf("shipping_address"),
        city: valueOf("shipping_city"),
        state: valueOf("shipping_state"),
        country: valueOf("shipping_country") || CONFIG.defaultCountryName,
        zipCode: valueOf("zip_code"),
        notes: valueOf("notes"),
        coordinates: {
          latitude: null,
          longitude: null
        }
      },
      products,
      totalPrice: getTotalPrice(products)
    };
  }

  async function sendLead(payload, type = "preliminar") {
    const endpoint = type === "confirmado"
      ? CONFIG.confirmadoEndpoint
      : CONFIG.preliminarEndpoint;

    if (!endpoint) return false;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lead-Type": type
        },
        body: JSON.stringify(payload),
        keepalive: true,
        credentials: "omit"
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      log(`Lead ${type} enviado`);
      return true;
    } catch (err) {
      console.error("Error enviando lead", type, err);
      return false;
    }
  }

  function sendBeaconLead(payload, type = "preliminar") {
    const endpoint = type === "confirmado"
      ? CONFIG.confirmadoEndpoint
      : CONFIG.preliminarEndpoint;

    if (!endpoint || !navigator.sendBeacon) return false;

    try {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      return navigator.sendBeacon(endpoint, blob);
    } catch (err) {
      console.error("Error beacon", type, err);
      return false;
    }
  }

  function makeFingerprint(data) {
    return JSON.stringify({
      fullName: data.client.fullName,
      phone: data.client.phone,
      city: data.dataAddress.city,
      state: data.dataAddress.state,
      address: data.dataAddress.address,
      totalPrice: data.totalPrice
    });
  }

  async function pushPreliminar() {
    const data = recoverData();
    data.leadType = "preliminar";

    if (!validPhone()) {
      log("No se envía preliminar: teléfono inválido");
      return false;
    }

    const fingerprint = makeFingerprint(data);
    if (fingerprint === STATE.lastFingerprint) return false;

    STATE.lastFingerprint = fingerprint;
    const ok = await sendLead(data, "preliminar");
    if (ok) STATE.preliminarSent = true;
    return ok;
  }

  function schedulePreliminar() {
    clearTimeout(STATE.debounceTimer);
    STATE.debounceTimer = setTimeout(() => {
      pushPreliminar();
    }, CONFIG.debounceMs);
  }

  async function pushConfirmado() {
    if (STATE.confirmadoSent) return true;

    const data = recoverData();
    data.leadType = "confirmado";

    const ok = await sendLead(data, "confirmado");
    if (ok) STATE.confirmadoSent = true;
    return ok;
  }

  function setupFormTracking() {
    if (!document.body.dataset.btTrackingBound) {
      document.body.dataset.btTrackingBound = "1";
      document.body.addEventListener("input", schedulePreliminar, true);
      document.body.addEventListener("change", schedulePreliminar, true);
    }
  }

  function isSubmitLocked() {
    return Date.now() < STATE.submitLockedUntil;
  }

  function lockSubmit() {
    STATE.submitLockedUntil = Date.now() + CONFIG.preventDoubleSubmitMs;
  }

  function getSubmitButtons() {
    return qsa('a[href="#submit-step"], button[type="submit"], .elBTN, .submitBtn');
  }

  function bindSubmitButton(button) {
    if (!button || button.dataset.btSubmitBound === "1") return;
    button.dataset.btSubmitBound = "1";

    ["mousedown", "pointerdown", "touchstart", "click"].forEach((eventName) => {
      button.addEventListener(eventName, async (event) => {
        normalizePhoneInput();

        if (!validPhone()) {
          const phone = byName("phone");
          if (phone) {
            phone.classList.add("bt-phone-invalid");
            phone.focus();
          }
          event.preventDefault();
          event.stopImmediatePropagation();
          showOverlay();
          log("Submit bloqueado: teléfono inválido");
          return;
        }

        if (isSubmitLocked()) {
          event.preventDefault();
          event.stopImmediatePropagation();
          log("Submit bloqueado: doble clic");
          return;
        }

        lockSubmit();

        try {
          await pushConfirmado();
        } catch (e) {
          console.error(e);
        }
      }, true);
    });
  }

  function setupSubmitProtection() {
    getSubmitButtons().forEach(bindSubmitButton);
  }

  function setupAbandonCapture() {
    if (window.__btAbandonBound) return;
    window.__btAbandonBound = true;

    function fireAbandon() {
      if (STATE.confirmadoSent) return;
      if (!validPhone()) return;

      const data = recoverData();
      data.leadType = "abandono_pagina";
      sendBeaconLead(data, "preliminar");
    }

    setTimeout(fireAbandon, CONFIG.abandonedDelayMs);
    window.addEventListener("beforeunload", fireAbandon);
    window.addEventListener("pagehide", fireAbandon);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") fireAbandon();
    });
  }

  function reapplyCriticalLogic() {
    setupCountry();
    setupStateCity();
    setupEmail();
    setupHiddenIdField();
    cleanupDireccionAutofill();
    setupAddressConcat();
    setupPhoneValidation();
    hideOptionalFields();
    setupSubmitProtection();
  }

  function setupDomWatcher() {
    if (STATE.observerStarted) return;
    STATE.observerStarted = true;

    const observer = new MutationObserver(() => {
      reapplyCriticalLogic();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    setTimeout(reapplyCriticalLogic, 400);
    setTimeout(reapplyCriticalLogic, 1200);
    setTimeout(reapplyCriticalLogic, 2500);
  }

  function init() {
    if (STATE.initialized) return;
    STATE.initialized = true;
    STATE.leadId = getLeadId();

    injectStyles();
    createOverlay();

    reapplyCriticalLogic();
    setupFormTracking();
    setupAbandonCapture();
    setupDomWatcher();

    log("Inicializado correctamente");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
