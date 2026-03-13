(function () {

const CONFIG = {

STORE_NAME: "BienestarTotal",

WEBHOOK_ABANDONADO:
"https://nhccgonibsbymmydovts.supabase.co/functions/v1/capture-abandoned-cart",

SESSION_KEY: "bt_session_v2",

INACTIVITY_TIME: 180000,

BLOCKED_LOCATIONS_BY_STATE: {
Amazonas: ["Leticia"]
},

BLOCKED_ADDRESS_TERMS: [
"vereda",
"corregimiento",
"zona rural",
"finca",
"parcelacion",
"parcelación"
]

};

let sessionId = null;
let hasSubmittedOrder = false;
let hasSentAbandonment = false;
let inactivityTimer = null;
let startedAt = Date.now();
let lastActivity = Date.now();

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

if (stored && stored.id) {
return stored.id;
}

} catch {}

const obj = {
id: makeId(),
date: new Date().toISOString()
};

localStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(obj));

return obj.id;

}

function normalizeText(str) {

return (str || "")
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

function isValidPhone(phone) {

let digits = phone.replace(/\D/g, "");

if (digits.startsWith("57")) digits = digits.slice(2);

return /^3\d{9}$/.test(digits);

}

function formatPhone(phone) {

let digits = phone.replace(/\D/g, "");

if (digits.startsWith("57")) digits = digits.slice(2);

if (/^3\d{9}$/.test(digits)) {
return "+57" + digits;
}

return phone;

}

function getProducts() {

try {

const names = [...document.querySelectorAll(".os-name")].map(el =>
el.textContent.trim()
);

if (typeof PRODUCTS !== "undefined") {

return PRODUCTS.filter(p =>
names.includes(p.name)
).map(p => ({
nombre: p.name,
precio: p.price
}));

}

return names.map(n => ({ nombre: n, precio: null }));

} catch {

return [];

}

}

function getTotal(products) {

try {

const html = document.querySelector(".os-total .os-price")?.textContent || "";

const calc = products.reduce(
(a, p) => a + (p.precio || 0),
0
);

if (calc > 0) return calc;

return html;

} catch {

return null;

}

}

function coverageBlocked() {

const state = getValue("shipping_state");
const city = getValue("shipping_city");

const s = normalizeText(state);
const c = normalizeText(city);

const blocked = CONFIG.BLOCKED_LOCATIONS_BY_STATE;

if (blocked[state] && blocked[state].includes(city)) {

return true;

}

const customs = getCustomFields();

const address =
normalizeText(getValue("shipping_address")) +
normalizeText(customs[0]?.value || "") +
normalizeText(customs[1]?.value || "");

for (let term of CONFIG.BLOCKED_ADDRESS_TERMS) {

if (address.includes(term)) return true;

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

const name = data.cliente.nombreCompleto;

const phone = data.cliente.telefono;

const products = data.productos;

const total = data.precioTotal;

return (
name &&
isValidPhone(phone) &&
products.length > 0 &&
total
);

}

async function sendAbandonment(reason) {

if (hasSubmittedOrder) return;

if (hasSentAbandonment) return;

if (Date.now() - startedAt < 15000) return;

const data = collectData();

data.abandonmentReason = reason;

if (!minimumData(data)) return;

if (coverageBlocked()) return;

try {

navigator.sendBeacon(
CONFIG.WEBHOOK_ABANDONADO,
new Blob([JSON.stringify(data)], { type: "application/json" })
);

hasSentAbandonment = true;

console.log("Abandonment sent", reason);

} catch {}

}

function markActivity() {

lastActivity = Date.now();

clearTimeout(inactivityTimer);

inactivityTimer = setTimeout(() => {

sendAbandonment("inactivity");

}, CONFIG.INACTIVITY_TIME);

}

function initActivityTracking() {

["input", "change", "click"].forEach(evt => {

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

document.querySelectorAll('a[href="#submit-step"]').forEach(btn => {

btn.addEventListener(
"click",
function (e) {

const phone = getValue("phone");

if (!isValidPhone(phone)) {

alert("Ingresa un celular colombiano válido");

e.preventDefault();

e.stopImmediatePropagation();

return;

}

if (coverageBlocked()) {

alert(
"Por el momento no tenemos cobertura para esta población"
);

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

function init() {

sessionId = getSessionId();

const email = document.querySelector('[name="email"]');

if (email) {

email.value = makeId(8) + "@gmail.com";

email.style.display = "none";

}

initActivityTracking();

interceptSubmit();

console.log("BienestarTotal Script V2 iniciado");

}

window.addEventListener("load", () => {

setTimeout(init, 800);

});

})();
