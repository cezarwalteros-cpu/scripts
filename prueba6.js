<script>
(() => {
  "use strict";

  const CONFIG = {
    storeName: "BienestarTotal",
    preliminarEndpoint: "https://TU-DOMINIO.com/webhook/preliminar",
    confirmadoEndpoint: "https://TU-DOMINIO.com/webhook/confirmado",
    debug: true,

    debounceMs: 3500,
    abandonedDelayMs: 12000,
    countryName: "Colombia",
    dialCode: "+57",
    preventDoubleSubmitMs: 8000,

    hideFields: {
      email: true,
      country: true,
      shippingStateIfCustomUI: false
    },

    blockCities: [
      "Leticia"
    ],

    departamentoCiudad: {
      "Amazonas": ["Leticia"],
      "Antioquia": ["Medellín","Bello","Itagüí","Envigado","Sabaneta","Rionegro","Apartadó","Turbo","Caucasia","La Ceja","Copacabana","Girardota"],
      "Atlántico": ["Barranquilla","Soledad","Malambo","Puerto Colombia","Sabanalarga","Baranoa","Galapa"],
      "Bogotá D.C.": ["Bogotá"],
      "Bolívar": ["Cartagena","Magangué","Turbaco","Arjona","El Carmen de Bolívar"],
      "Boyacá": ["Tunja","Duitama","Sogamoso","Chiquinquirá","Paipa"],
      "Caldas": ["Manizales","La Dorada","Chinchiná","Villamaría"],
      "Caquetá": ["Florencia"],
      "Casanare": ["Yopal","Aguazul","Villanueva"],
      "Cauca": ["Popayán","Santander de Quilichao"],
      "Cesar": ["Valledupar","Aguachica"],
      "Chocó": ["Quibdó"],
      "Córdoba": ["Montería","Lorica","Sahagún","Cereté"],
      "Cundinamarca": ["Soacha","Facatativá","Girardot","Zipaquirá","Chía","Mosquera","Madrid","Funza","Fusagasugá"],
      "Huila": ["Neiva","Pitalito","Garzón"],
      "La Guajira": ["Riohacha","Maicao","Uribia"],
      "Magdalena": ["Santa Marta","Ciénaga","Fundación"],
      "Meta": ["Villavicencio","Acacías","Granada"],
      "Nariño": ["Pasto","Ipiales","Tumaco"],
      "Norte de Santander": ["Cúcuta","Ocaña","Pamplona","Villa del Rosario"],
      "Quindío": ["Armenia","Calarcá","La Tebaida"],
      "Risaralda": ["Pereira","Dosquebradas","Santa Rosa de Cabal"],
      "Santander": ["Bucaramanga","Floridablanca","Girón","Piedecuesta","Barrancabermeja"],
      "Sucre": ["Sincelejo","Corozal"],
      "Tolima": ["Ibagué","Espinal","Melgar"],
      "Valle del Cauca": ["Cali","Palmira","Buenaventura","Tuluá","Cartago","Buga","Jamundí","Yumbo"]
    }
  };

  const STATE = {
    leadId: null,
    preliminarSent: false,
    confirmadoSent: false,
    submitLockedUntil: 0,
    debounceTimer: null,
    abandonTimer: null,
    lastFingerprint: "",
    initialized: false
  };

  function log(...args) {
    if (CONFIG.debug) console.log("[FUNNELISH-PRO]", ...args);
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

  function onlyDigits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function now() {
    return Date.now();
  }

  function makeId(length = 14) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let out = "";
    for (let i = 0; i < length; i++) {
      out += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return out;
  }

  function getOrCreateLeadId() {
    const key = "bt_funnelish_lead_id";
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const id = makeId();
    localStorage.setItem(key, id);
    return id;
  }

  function randomEmail() {
    return `cliente${Date.now()}${Math.floor(Math.random() * 100000)}@codcolombia.co`;
  }

  function hideElementDeep(el) {
    if (!el) return;
    [el, el.parentElement, el.parentElement?.parentElement].forEach(node => {
      if (node && node.style) node.style.display = "none";
    });
  }

  function injectStyles() {
    if (document.getElementById("bt-funnelish-styles")) return;

    const style = document.createElement("style");
    style.id = "bt-funnelish-styles";
    style.textContent = `
      .bt-hidden { display:none !important; }
      .bt-invalid {
        border: 2px solid #d93025 !important;
        box-shadow: 0 0 0 3px rgba(217,48,37,.12) !important;
      }
      .bt-warning {
        display:none;
        margin-top:8px;
        color:#d93025;
        font-size:13px;
        font-weight:600;
        line-height:1.35;
      }
      .bt-overlay-block {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.35);
        z-index: 999999;
        display: none;
      }
      .bt-overlay-card {
        position: absolute;
        left: 50%;
        top: 20%;
        transform: translateX(-50%);
        width: min(92vw, 420px);
        background: #fff;
        border-radius: 14px;
        padding: 18px 16px;
        box-shadow: 0 16px 48px rgba(0,0,0,.24);
        font-family: Arial, sans-serif;
        text-align: center;
      }
      .bt-overlay-card h4 {
        margin: 0 0 8px;
        font-size: 18px;
        color: #111;
      }
      .bt-overlay-card p {
        margin: 0;
        font-size: 14px;
        color: #333;
      }
    `;
    document.head.appendChild(style);
  }

  function createOverlay() {
    if (document.getElementById("bt-overlay-block")) return;

    const overlay = document.createElement("div");
    overlay.id = "bt-overlay-block";
    overlay.className = "bt-overlay-block";
    overlay.innerHTML = `
      <div class="bt-overlay-card">
        <h4>Revisa tu número</h4>
        <p>Ingresa un celular colombiano válido de 10 dígitos que empiece por 3.</p>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  function showOverlay(ms = 1800) {
    const overlay = document.getElementById("bt-overlay-block");
    if (!overlay) return;
    overlay.style.display = "block";
    setTimeout(() => {
      overlay.style.display = "none";
    }, ms);
  }

  function setCountryFixed() {
    const field = byName("shipping_country");
    if (!field) return;

    if (field.tagName === "SELECT") {
      field.innerHTML = "";
      field.add(new Option(CONFIG.countryName, CONFIG.countryName));
      field.value = CONFIG.countryName;
    } else {
      field.value = CONFIG.countryName;
      field.setAttribute("readonly", "true");
    }

    if (CONFIG.hideFields.country) hideElementDeep(field);
  }

  function setEmailHidden() {
    const email = byName("email");
    if (!email) return;

    if (!email.value) email.value = randomEmail();
    email.setAttribute("autocomplete", "off");

    if (CONFIG.hideFields.email) hideElementDeep(email);
  }

  function normalizePhoneRaw(raw) {
    let digits = onlyDigits(raw);
    if (digits.startsWith("57")) digits = digits.slice(2);
    if (digits.length > 10) digits = digits.slice(0, 10);
    return digits;
  }

  function normalizePhoneField() {
    const input = byName("phone");
    if (!input) return "";

    let digits = normalizePhoneRaw(input.value);

    if (!digits) {
      input.value = CONFIG.dialCode;
      return input.value;
    }

    if (!digits.startsWith("3")) {
      input.value = CONFIG.dialCode + digits;
      return input.value;
    }

    input.value = CONFIG.dialCode + digits;
    return input.value;
  }

  function isValidPhoneValue(value) {
    return /^\+573\d{9}$/.test(String(value || "").trim());
  }

  function isValidPhoneField() {
    const input = byName("phone");
    if (!input) return false;
    return isValidPhoneValue(input.value);
  }

  function mountPhoneWarning() {
    const input = byName("phone");
    if (!input) return null;

    let warning = document.getElementById("bt-phone-warning");
    if (!warning) {
      warning = document.createElement("div");
      warning.id = "bt-phone-warning";
      warning.className = "bt-warning";
      warning.textContent = "Escribe un número colombiano válido. Ejemplo: +573001234567";
      input.insertAdjacentElement("afterend", warning);
    }
    return warning;
  }

  function validatePhoneUI() {
    const input = byName("phone");
    if (!input) return true;

    const warning = mountPhoneWarning();
    normalizePhoneField();

    const raw = String(input.value || "").trim();
    const hasSomething = raw && raw !== CONFIG.dialCode;
    const valid = isValidPhoneField();

    if (hasSomething && !valid) {
      input.classList.add("bt-invalid");
      if (warning) warning.style.display = "block";
      return false;
    }

    input.classList.remove("bt-invalid");
    if (warning) warning.style.display = "none";
    return valid || !hasSomething;
  }

  function setupPhoneMasking() {
    const input = byName("phone");
    if (!input) return;

    if (!String(input.value || "").trim()) {
      input.value = CONFIG.dialCode;
    }

    const handler = () => validatePhoneUI();
    input.addEventListener("input", handler);
    input.addEventListener("change", handler);
    input.addEventListener("blur", handler);
    handler();
  }

  function ensureStateSelect() {
    let stateField = byName("shipping_state");
    if (!stateField) return null;

    if (stateField.tagName === "SELECT") return stateField;

    const select = document.createElement("select");
    select.name = stateField.name;
    select.id = stateField.id || "shipping_state";
    select.className = stateField.className || "";
    select.setAttribute("data-bt-generated", "true");

    stateField.parentNode.insertBefore(select, stateField);
    stateField.classList.add("bt-hidden");

    if (CONFIG.hideFields.shippingStateIfCustomUI) {
      hideElementDeep(stateField);
    }

    return select;
  }

  function ensureCitySelect() {
    let cityField = byName("shipping_city");
    if (!cityField) return null;

    if (cityField.tagName === "SELECT") return cityField;

    const select = document.createElement("select");
    select.name = cityField.name;
    select.id = cityField.id || "shipping_city";
    select.className = cityField.className || "";
    select.setAttribute("data-bt-generated", "true");

    cityField.parentNode.insertBefore(select, cityField);
    cityField.classList.add("bt-hidden");

    return select;
  }

  function fillSelect(select, items, placeholder) {
    if (!select) return;
    select.innerHTML = "";

    const first = new Option(placeholder, "");
    select.add(first);

    items.forEach(item => {
      if (!item) return;
      if (CONFIG.blockCities.includes(item)) return;
      select.add(new Option(item, item));
    });
  }

  function setupDepartmentCity() {
    const stateSel = ensureStateSelect();
    const citySel = ensureCitySelect();

    if (!stateSel || !citySel) return;

    const departamentos = Object.keys(CONFIG.departamentoCiudad).sort((a, b) => a.localeCompare(b));
    fillSelect(stateSel, departamentos, "Selecciona tu departamento");

    const updateCities = () => {
      const state = stateSel.value;
      const cities = CONFIG.departamentoCiudad[state] || [];
      fillSelect(citySel, cities, "Selecciona tu ciudad");
    };

    stateSel.addEventListener("change", updateCities);
    updateCities();
  }

  function cleanupDireccionField() {
    const direccion = qs('[data-name="Direccion"], [name="Direccion"]');
    if (!direccion || !direccion.value) return;
    direccion.value = direccion.value.replace(/{.*}/g, "").trim();
  }

  function setupAddressComposer() {
    const shippingAddress = byName("shipping_address");
    if (!shippingAddress) return;

    const customs = document.getElementsByName("custom");
    if (!customs || customs.length < 3) return;

    const direccion = customs[0];
    const barrio = customs[1];
    const referencia = customs[2];

    shippingAddress.setAttribute("readonly", "true");

    const update = () => {
      const value = [
        direccion?.value || "",
        barrio?.value || "",
        referencia?.value || ""
      ]
        .map(v => String(v).trim())
        .filter(Boolean)
        .join(" , ");

      shippingAddress.value = value;
    };

    [direccion, barrio, referencia].forEach(field => {
      if (!field) return;
      field.addEventListener("input", update);
      field.addEventListener("change", update);
    });

    update();
  }

  function getText(selectorList) {
    for (const selector of selectorList) {
      const el = qs(selector);
      const text = el?.textContent?.trim();
      if (text) return text;
    }
    return "";
  }

  function parsePrice(text) {
    if (!text) return null;
    const digits = onlyDigits(text);
    return digits ? Number(digits) : null;
  }

  function getProducts() {
    const items = [];

    qsa(".pl-item, .product-item, .offer-stack .item, .os-item").forEach(item => {
      const name = getText([
        ".pl-item .product-name",
        ".product-name",
        ".product-title",
        ".os-name",
        "[data-product-name]"
      ].map(s => `${s}`)) || item.getAttribute("data-product-name") || "";

      const priceText =
        item.querySelector(".pl-item-price")?.textContent?.trim() ||
        item.querySelector(".price")?.textContent?.trim() ||
        item.querySelector(".product-price")?.textContent?.trim() ||
        item.querySelector(".os-price")?.textContent?.trim() ||
        "";

      if (name) {
        items.push({
          name,
          price: parsePrice(priceText)
        });
      }
    });

    if (items.length) return items;

    if (Array.isArray(window.PRODUCTS)) {
      return window.PRODUCTS.map(p => ({
        name: p?.name || "",
        price: Number(p?.price || 0) || null
      })).filter(p => p.name);
    }

    const singleName = getText([
      ".product-name",
      ".product-title",
      "[data-product-name]",
      ".os-name"
    ]);
    const singlePriceText = getText([
      ".price",
      ".product-price",
      ".os-price",
      ".total-price"
    ]);

    if (singleName) {
      return [{
        name: singleName,
        price: parsePrice(singlePriceText)
      }];
    }

    return [];
  }

  function getTotalPrice(products) {
    const candidates = [
      ".os-total .os-price",
      ".total-price",
      ".order-total",
      ".checkout-total",
      "[data-total-price]"
    ];

    for (const selector of candidates) {
      const el = qs(selector);
      if (!el) continue;
      const text = el.getAttribute("data-total-price") || el.textContent || "";
      const parsed = parsePrice(text);
      if (parsed) return parsed;
    }

    const calc = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
    return calc || null;
  }

  function collectFormData() {
    const products = getProducts();

    return {
      storeName: CONFIG.storeName,
      idLead: STATE.leadId,
      urlOrigin: `${location.origin}${location.pathname}${location.search}`,
      dateTime: new Date().toISOString(),
      leadType: "",
      notes: byName("notes")?.value?.trim() || "",
      client: {
        fullName: byName("full_name")?.value?.trim() || "",
        email: byName("email")?.value?.trim() || "",
        phone: byName("phone")?.value?.trim() || ""
      },
      dataAddress: {
        address: byName("shipping_address")?.value?.trim() || "",
        city: byName("shipping_city")?.value?.trim() || "",
        state: byName("shipping_state")?.value?.trim() || "",
        country: byName("shipping_country")?.value?.trim() || CONFIG.countryName,
        zipCode: byName("zip_code")?.value?.trim() || "",
        coordinates: {
          latitude: null,
          longitude: null
        }
      },
      products,
      totalPrice: getTotalPrice(products)
    };
  }

  function makeFingerprint(data) {
    return JSON.stringify({
      n: data.client.fullName,
      p: data.client.phone,
      a: data.dataAddress.address,
      c: data.dataAddress.city,
      s: data.dataAddress.state,
      t: data.totalPrice
    });
  }

  async function sendJson(endpoint, payload, eventType) {
    if (!endpoint || endpoint.includes("TU-DOMINIO.com")) {
      log(`Endpoint ${eventType} no configurado`);
      return false;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lead-Type": eventType
        },
        body: JSON.stringify(payload),
        keepalive: true,
        credentials: "omit"
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      log(`Lead ${eventType} enviado OK`);
      return true;
    } catch (err) {
      console.error(`[FUNNELISH-PRO] Error enviando ${eventType}:`, err);
      return false;
    }
  }

  function sendBeaconJson(endpoint, payload, eventType) {
    try {
      if (!navigator.sendBeacon || !endpoint || endpoint.includes("TU-DOMINIO.com")) {
        return false;
      }
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      const ok = navigator.sendBeacon(endpoint, blob);
      log(`Beacon ${eventType}:`, ok);
      return ok;
    } catch (err) {
      console.error(`[FUNNELISH-PRO] Beacon error ${eventType}:`, err);
      return false;
    }
  }

  async function pushPreliminar(force = false) {
    if (STATE.preliminarSent && !force) return false;
    if (!isValidPhoneField()) {
      log("Preliminar cancelado: teléfono inválido");
      return false;
    }

    const data = collectFormData();
    data.leadType = "preliminar";

    const fingerprint = makeFingerprint(data);
    if (!force && fingerprint === STATE.lastFingerprint) {
      log("Preliminar omitido: sin cambios");
      return false;
    }

    STATE.lastFingerprint = fingerprint;
    const ok = await sendJson(CONFIG.preliminarEndpoint, data, "preliminar");
    if (ok) STATE.preliminarSent = true;
    return ok;
  }

  async function pushConfirmado() {
    if (STATE.confirmadoSent) return true;
    const data = collectFormData();
    data.leadType = "confirmado";

    const ok = await sendJson(CONFIG.confirmadoEndpoint, data, "confirmado");
    if (ok) STATE.confirmadoSent = true;
    return ok;
  }

  function schedulePreliminar() {
    clearTimeout(STATE.debounceTimer);
    STATE.debounceTimer = setTimeout(() => {
      pushPreliminar(false);
    }, CONFIG.debounceMs);
  }

  function setupFormTracking() {
    const handler = () => {
      validatePhoneUI();
      schedulePreliminar();
    };

    document.body.addEventListener("input", handler, true);
    document.body.addEventListener("change", handler, true);
  }

  function setupAbandonCapture() {
    clearTimeout(STATE.abandonTimer);

    STATE.abandonTimer = setTimeout(() => {
      const data = collectFormData();
      data.leadType = "abandono_pagina";

      if (!isValidPhoneValue(data.client.phone)) return;
      if (STATE.confirmadoSent) return;

      sendBeaconJson(CONFIG.preliminarEndpoint, data, "abandono_pagina");
    }, CONFIG.abandonedDelayMs);

    const fireAbandon = () => {
      const data = collectFormData();
      data.leadType = "abandono_pagina";

      if (!isValidPhoneValue(data.client.phone)) return;
      if (STATE.confirmadoSent) return;

      sendBeaconJson(CONFIG.preliminarEndpoint, data, "abandono_pagina");
    };

    window.addEventListener("beforeunload", fireAbandon);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") fireAbandon();
    });
    pagehide && window.addEventListener("pagehide", fireAbandon);
  }

  function getSubmitButtons() {
    return qsa('a[href="#submit-step"], button[type="submit"], .elBTN, .submitBtn').filter(Boolean);
  }

  function shouldLockSubmit() {
    return now() < STATE.submitLockedUntil;
  }

  function lockSubmit() {
    STATE.submitLockedUntil = now() + CONFIG.preventDoubleSubmitMs;
  }

  function setupSubmitProtection() {
    const attach = (button) => {
      if (!button || button.dataset.btBound === "1") return;
      button.dataset.btBound = "1";

      ["mousedown", "pointerdown", "touchstart", "click"].forEach(eventName => {
        button.addEventListener(eventName, async (event) => {
          normalizePhoneField();

          if (!validatePhoneUI() || !isValidPhoneField()) {
            event.preventDefault();
            event.stopImmediatePropagation();
            showOverlay();
            const phone = byName("phone");
            if (phone) phone.focus();
            log("Submit bloqueado: teléfono inválido");
            return;
          }

          if (shouldLockSubmit()) {
            event.preventDefault();
            event.stopImmediatePropagation();
            log("Submit bloqueado: doble clic");
            return;
          }

          lockSubmit();

          try {
            await pushConfirmado();
          } catch (err) {
            console.error("[FUNNELISH-PRO] Error en submit:", err);
          }
        }, true);
      });
    };

    getSubmitButtons().forEach(attach);

    const observer = new MutationObserver(() => {
      getSubmitButtons().forEach(attach);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function setupHiddenTrackingField() {
    const field =
      qs('input[data-name="idIntegramelo"]') ||
      qs('input[name="idIntegramelo"]') ||
      qs('input[data-name="custom_id"]');

    if (!field) return;

    field.value = JSON.stringify({
      idLead: STATE.leadId,
      urlOrigin: `${window.location.hostname}${window.location.pathname}`
    });

    hideElementDeep(field);
  }

  function init() {
    if (STATE.initialized) return;
    STATE.initialized = true;

    STATE.leadId = getOrCreateLeadId();

    injectStyles();
    createOverlay();

    setCountryFixed();
    setEmailHidden();
    setupDepartmentCity();
    cleanupDireccionField();
    setupAddressComposer();
    setupPhoneMasking();
    setupHiddenTrackingField();
    setupFormTracking();
    setupSubmitProtection();
    setupAbandonCapture();

    log("Script Funnelish Pro inicializado");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
</script>
