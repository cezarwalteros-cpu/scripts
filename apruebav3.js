(() => {
  "use strict";

  const CONFIG = {
    storeName: "BienestarTotal",
    preliminarEndpoint: "https://tudominio.com/api/leads/preliminar",
    confirmadoEndpoint: "https://tudominio.com/api/leads/confirmado",
    debounceMs: 4000,
    defaultCountryName: "Colombia",
    defaultDialCode: "+57",
    debug: true,
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
    return (value || "").replace(/\D/g, "");
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

  const leadId = getLeadId();

  function injectForceHideCSS() {
    if (document.getElementById("bt-force-hide-style")) return;

    const style = document.createElement("style");
    style.id = "bt-force-hide-style";
    style.innerHTML = `
      input[name="email"],
      input[data-name="email"],
      input[type="email"],
      select[name="shipping_country"],
      input[name="shipping_country"],
      select[data-name="shipping_country"],
      input[data-name="shipping_country"],
      input[name="idIntegramelo"],
      input[data-name="idIntegramelo"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        width: 0 !important;
        height: 0 !important;
        min-width: 0 !important;
        min-height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        border: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        z-index: -1 !important;
      }
    `;
    document.head.appendChild(style);
  }

  function findFieldWrapper(el) {
    if (!el) return null;

    const selectors = [
      ".element-wrapper",
      ".form-group",
      ".field",
      ".input-wrapper",
      ".form-field",
      ".el-input",
      ".fb-form-item"
    ];

    for (const selector of selectors) {
      const wrapper = el.closest(selector);
      if (wrapper) return wrapper;
    }

    let node = el;
    for (let i = 0; i < 6 && node; i++) {
      if (
        node.tagName === "DIV" &&
        node.querySelector("label, input, select, textarea")
      ) {
        return node;
      }
      node = node.parentElement;
    }

    return el.parentElement || null;
  }

  function hideFieldCompletely(el) {
    if (!el) return false;

    const wrapper = findFieldWrapper(el);

    el.style.setProperty("display", "none", "important");
    el.style.setProperty("visibility", "hidden", "important");
    el.style.setProperty("opacity", "0", "important");
    el.style.setProperty("height", "0", "important");
    el.style.setProperty("width", "0", "important");
    el.style.setProperty("padding", "0", "important");
    el.style.setProperty("margin", "0", "important");
    el.style.setProperty("border", "0", "important");
    el.style.setProperty("position", "absolute", "important");
    el.style.setProperty("pointer-events", "none", "important");
    el.setAttribute("hidden", "hidden");

    if (wrapper) {
      wrapper.style.setProperty("display", "none", "important");
      wrapper.style.setProperty("visibility", "hidden", "important");
      wrapper.style.setProperty("opacity", "0", "important");
      wrapper.style.setProperty("height", "0", "important");
      wrapper.style.setProperty("min-height", "0", "important");
      wrapper.style.setProperty("margin", "0", "important");
      wrapper.style.setProperty("padding", "0", "important");
      wrapper.style.setProperty("overflow", "hidden", "important");
      wrapper.setAttribute("hidden", "hidden");
      return true;
    }

    return false;
  }

  function setupCountry() {
    const countryField =
      byName("shipping_country") ||
      qs('select[name="country"]') ||
      qs('[data-name="shipping_country"]');

    if (!countryField) {
      log("No se encontró el campo shipping_country");
      return;
    }

    let countryName = CONFIG.defaultCountryName;
    if (typeof window.countryStateInfo !== "undefined") {
      countryName = Object.keys(window.countryStateInfo)[0] || CONFIG.defaultCountryName;
    }

    if (countryField.tagName === "INPUT") {
      countryField.value = countryName;
    } else if (countryField.tagName === "SELECT") {
      const exists = Array.from(countryField.options).some(opt => opt.value === countryName);
      if (!exists) {
        countryField.add(new Option(countryName, countryName));
      }
      countryField.value = countryName;
    }

    hideFieldCompletely(countryField);
  }

  function setupStateCity() {
    if (typeof window.countryStateInfo === "undefined") {
      log("countryStateInfo no existe");
      return;
    }

    const countryName = Object.keys(window.countryStateInfo)[0];
    const statesMap = window.countryStateInfo[countryName];
    const stateSel = byName("shipping_state");
    const citySel = byName("shipping_city");

    if (!stateSel || !citySel || !statesMap) {
      log("No se encontró shipping_state o shipping_city");
      return;
    }

    stateSel.innerHTML = "";
    citySel.innerHTML = "";

    Object.keys(statesMap).forEach((state) => {
      stateSel.add(new Option(state, state));
    });

    function renderCities() {
      citySel.innerHTML = "";
      citySel.add(new Option("Selecciona una opción", ""));

      const selectedState = stateSel.value;
      const cities = statesMap[selectedState] || {};

      Object.keys(cities).forEach((city) => {
        citySel.add(new Option(city, city));
      });
    }

    stateSel.addEventListener("change", renderCities);
    renderCities();
  }

  function setupEmail() {
    const email =
      byName("email") ||
      qs('input[type="email"]') ||
      qs('[data-name="email"]');

    if (!email) {
      log("No se encontró el campo email");
      return;
    }

    if (!email.value) {
      email.value = randomEmail();
    }

    hideFieldCompletely(email);
  }

  function setupHiddenIdField() {
    const field =
      qs('input[data-name="idIntegramelo"]') ||
      qs('input[name="idIntegramelo"]');

    if (!field) return;

    field.value = JSON.stringify({
      idLead: leadId,
      urlOrigin: `${window.location.hostname}${window.location.pathname}`,
    });

    hideFieldCompletely(field);
  }

  function cleanupDireccionAutofill() {
    const direccionInput = qs('[data-name="Direccion"]');
    if (!direccionInput || !direccionInput.value) return;
    direccionInput.value = direccionInput.value.replace(/{.*}/, "").trim();
  }

  function setupAddressConcat() {
    const customs = document.getElementsByName("custom");
    const shippingAddress = byName("shipping_address");

    if (!customs || customs.length < 3 || !shippingAddress) {
      log("No se pudo configurar concatenación de dirección");
      return;
    }

    const direccionParcial = customs[0];
    const barrio = customs[1];
    const referencia = customs[2];

    shippingAddress.setAttribute("readonly", "true");

    function updateAddress() {
      shippingAddress.value = [
        direccionParcial?.value || "",
        barrio?.value || "",
        referencia?.value || "",
      ]
        .map((v) => v.trim())
        .filter(Boolean)
        .join(" , ");
    }

    [direccionParcial, barrio, referencia].forEach((field) => {
      field?.addEventListener("input", updateAddress);
      field?.addEventListener("change", updateAddress);
    });

    updateAddress();
  }

  function normalizePhoneInput() {
    const input = byName("phone");
    if (!input) return;

    let digits = onlyDigits(input.value);

    if (digits.startsWith("57")) digits = digits.slice(2);
    if (!digits.startsWith("3")) digits = "";
    if (digits.length > 10) digits = digits.slice(0, 10);

    input.value = CONFIG.defaultDialCode + digits;
  }

  function validPhone() {
    const phone = valueOf("phone");
    return /^\+573\d{9}$/.test(phone);
  }

  function setupPhoneValidation() {
    const input = byName("phone");
    if (!input) {
      log("No se encontró el campo phone");
      return;
    }

    let warning = document.getElementById("inputPhoneInvalid");
    if (!warning) {
      const container = document.createElement("div");
      container.innerHTML = `
        <p></p>
        <input
          id="inputPhoneInvalid"
          class="invalid"
          placeholder="Exactamente 10 números. Ej: 3054859895"
          style="border:2px solid #f89708 !important; display:none; font-size:14px; text-align:left; font-weight:normal; font-style:normal;"
          readonly="true"
        >
      `;
      input.parentNode.insertBefore(container, input.nextSibling);
      warning = document.getElementById("inputPhoneInvalid");
    }

    function validate() {
      normalizePhoneInput();

      const raw = valueOf("phone");
      const hasSomething = raw && raw !== "+57";

      if (hasSomething && !validPhone()) {
        warning.style.display = "block";
        input.classList.add("invalid");
      } else {
        warning.style.display = "none";
        input.classList.remove("invalid");
      }
    }

    input.addEventListener("input", validate);
    input.addEventListener("change", validate);
    validate();
  }

  function getProducts() {
    const productNames = qsa(".os-name").map((el) => el.textContent.trim());

    if (!Array.isArray(window.PRODUCTS)) {
      return productNames.map((name) => ({ name, price: null }));
    }

    return window.PRODUCTS
      .filter((product) => productNames.includes(product.name))
      .map((product) => ({
        name: product.name,
        price: product.price ?? null,
      }));
  }

  function getTotalPrice(products) {
    const totalText = qs(".os-total .os-price")?.textContent?.trim() || "";
    const calculated = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0);

    if (totalText && calculated && totalText.includes(String(calculated))) {
      return calculated;
    }

    return totalText || calculated || 0;
  }

  function recoverData() {
    const products = getProducts();

    return {
      storeName: CONFIG.storeName,
      idLead: leadId,
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
        phone: valueOf("phone"),
      },
      dataAddress: {
        address: valueOf("shipping_address"),
        city: valueOf("shipping_city"),
        state: valueOf("shipping_state"),
        country: valueOf("shipping_country"),
        zipCode: valueOf("zip_code"),
        notes: valueOf("notes"),
        coordinates: {
          latitude: null,
          longitude: null,
        },
      },
      products,
      totalPrice: getTotalPrice(products),
    };
  }

  async function sendLead(payload, type = "preliminar") {
    const endpoint =
      type === "confirmado"
        ? CONFIG.confirmadoEndpoint
        : CONFIG.preliminarEndpoint;

    if (!endpoint) return false;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lead-Type": type,
        },
        body: JSON.stringify(payload),
        keepalive: true,
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

  let debounceTimer = null;
  let lastFingerprint = "";

  function makeFingerprint(data) {
    return JSON.stringify({
      fullName: data.client.fullName,
      phone: data.client.phone,
      city: data.dataAddress.city,
      state: data.dataAddress.state,
      address: data.dataAddress.address,
    });
  }

  async function pushPreliminar() {
    const data = recoverData();

    if (!validPhone()) {
      log("No se envía preliminar: teléfono inválido");
      return;
    }

    const fingerprint = makeFingerprint(data);
    if (fingerprint === lastFingerprint) return;

    lastFingerprint = fingerprint;
    await sendLead(data, "preliminar");
  }

  function schedulePreliminar() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      pushPreliminar();
    }, CONFIG.debounceMs);
  }

  async function pushConfirmado() {
    const data = recoverData();
    data.leadType = "confirmado";
    return sendLead(data, "confirmado");
  }

  function setupFormTracking() {
    document.body.addEventListener("input", schedulePreliminar);
    document.body.addEventListener("change", schedulePreliminar);
  }

  function setupSubmitProtection() {
    const buttons = document.querySelectorAll('a[href="#submit-step"]');

    buttons.forEach((button) => {
      ["mousedown", "pointerdown", "touchstart", "click"].forEach((eventName) => {
        button.addEventListener(
          eventName,
          async (event) => {
            normalizePhoneInput();

            if (!validPhone()) {
              const phone = byName("phone");
              if (phone) phone.classList.add("invalid");
              event.preventDefault();
              event.stopImmediatePropagation();
              log("Submit bloqueado: teléfono inválido");
              return;
            }

            try {
              await pushConfirmado();
            } catch (e) {
              console.error(e);
            }
          },
          true
        );
      });
    });
  }

  function rerunHidePass() {
    setupCountry();
    setupEmail();
    setupHiddenIdField();
  }

  function init() {
    injectForceHideCSS();

    setupCountry();
    setupStateCity();
    setupEmail();
    setupHiddenIdField();
    cleanupDireccionAutofill();
    setupAddressConcat();
    setupPhoneValidation();
    setupFormTracking();
    setupSubmitProtection();

    setTimeout(rerunHidePass, 300);
    setTimeout(rerunHidePass, 800);
    setTimeout(rerunHidePass, 1500);
    setTimeout(rerunHidePass, 2500);

    log("Inicializado correctamente");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
