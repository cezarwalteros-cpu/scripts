// ============================================================
//  BienestarTotal — Custom Code Script
//  Autor: Cesar (propio, sin dependencia de Intégramelo)
//  Versión: 1.1
//  Cambios v1.1:
//    - Flag pedidoConfirmado: evita envío duplicado de carrito
//      abandonado después de que el cliente hace submit
//    - Detección de pedido doble: aviso si el cliente ya hizo
//      un pedido en las últimas 48 horas desde el mismo dispositivo
// ============================================================

// ── CONFIGURACIÓN ────────────────────────────────────────────
const WEBHOOK_ABANDONADO  = 'https://nhccgonibsbymmydovts.supabase.co/functions/v1/capture-abandoned-cart';
const WEBHOOK_COMPLETO    = 'https://nhccgonibsbymmydovts.supabase.co/functions/v1/webhook-funnelish';
const STORE_NAME          = 'BienestarTotal';
const SESSION_KEY         = 'idBienestarTotal';      // sesión activa
const PEDIDO_KEY          = 'pedidoBienestarTotal';  // registro de pedido confirmado
const DEBOUNCE_MS         = 4000;                    // ms debounce carrito abandonado
const BLOQUEO_HORAS       = 48;                      // horas de validez del aviso de pedido doble

// ── DATOS DE COLOMBIA ─────────────────────────────────────────
var countryStateInfo = { "Colombia": { "Seleccione un Departamento": {}, "Amazonas": { "Leticia": [], "Puerto Nario": [] }, "Antioquia": { "Abejorral": [], "Abriaquí": [], "Alejandría": [], "Amagá": [], "Amalfi": [], "Andes": [], "Angelópolis": [], "Angostura": [], "Anorí": [], "Anzá": [], "Apartadó": [], "Arboletes": [], "Argelia": [], "Armenia": [], "Barbosa": [], "Bello": [], "Belmira": [], "Betania": [], "Betulia": [], "Briceño": [], "Buriticá": [], "Cáceres": [], "Caicedo": [], "Caldas": [], "Campamento": [], "Cañasgordas": [], "Caracolí": [], "Caramanta": [], "Carepa": [], "Carolina del Príncipe": [], "Caucasia": [], "Chigorodó": [], "Cisneros": [], "Ciudad Bolívar": [], "Cocorná": [], "Concepción": [], "Concordia": [], "Copacabana": [], "Dabeiba": [], "Donmatías": [], "Ebéjico": [], "El Bagre": [], "El Carmen de Viboral": [], "El Peñol": [], "El Retiro": [], "El Santuario": [], "Entrerríos": [], "Envigado": [], "Fredonia": [], "Frontino": [], "Giraldo": [], "Girardota": [], "Gómez Plata": [], "Granada": [], "Guadalupe": [], "Guarne": [], "Guatapé": [], "Heliconia": [], "Hispania": [], "Itagüí": [], "Ituango": [], "Jardín": [], "Jericó": [], "La Ceja": [], "La Estrella": [], "La Pintada": [], "La Unión": [], "Liborina": [], "Maceo": [], "Marinilla": [], "Medellín": [], "Montebello": [], "Murindó": [], "Mutatá": [], "Nariño": [], "Nechí": [], "Necoclí": [], "Olaya": [], "Peque": [], "Pueblorrico": [], "Puerto Berrío": [], "Puerto Nare": [], "Puerto Triunfo": [], "Remedios": [], "Rionegro": [], "Sabanalarga": [], "Sabaneta": [], "Salgar": [], "San Andrés de Cuerquia": [], "San Carlos": [], "San Francisco": [], "San Jerónimo": [], "San José de la Montaña": [], "San Juan de Urabá": [], "San Luis": [], "San Pedro de Urabá": [], "San Pedro de los Milagros": [], "San Rafael": [], "San Roque": [], "San Vicente": [], "Santa Bárbara": [], "Santa Fe de Antioquia": [], "Santa Rosa de Osos": [], "Santo Domingo": [], "Segovia": [], "Sonsón": [], "Sopetrán": [], "Támesis": [], "Tarazá": [], "Tarso": [], "Titiribí": [], "Toledo": [], "Turbo": [], "Uramita": [], "Urrao": [], "Valdivia": [], "Valparaíso": [], "Vegachí": [], "Venecia": [], "Vigía del Fuerte": [], "Yalí": [], "Yarumal": [], "Yolombó": [], "Yondó": [], "Zaragoza": [] }, "Arauca": { "Arauca": [], "Arauquita": [], "Cravo Norte": [], "Fortul": [], "Puerto Rondón": [], "Saravena": [], "Tame": [] }, "Atlántico": { "Baranoa": [], "Barranquilla": [], "Campo de la Cruz": [], "Candelaria": [], "Galapa": [], "Juan de Acosta": [], "Luruaco": [], "Malambo": [], "Manatí": [], "Palmar de Varela": [], "Piojó": [], "Polonuevo": [], "Ponedera": [], "Puerto Colombia": [], "Repelón": [], "Sabanagrande": [], "Sabanalarga": [], "Santa Lucía": [], "Santo Tomás": [], "Soledad": [], "Suán": [], "Tubará": [], "Usiacurí": [] }, "Bolívar": { "Achí": [], "Altos del Rosario": [], "Arenal": [], "Arjona": [], "Arroyohondo": [], "Barranco de Loba": [], "Calamar": [], "Cantagallo": [], "Cartagena": [], "Cicuco": [], "Clemencia": [], "El Carmen de Bolívar": [], "El Guamo": [], "Magangué": [], "Mahates": [], "Mompós": [], "Morales": [], "Pinillos": [], "San Jacinto": [], "San Juan Nepomuceno": [], "San Pablo": [], "Santa Rosa": [], "Simití": [], "Turbaco": [], "Villanueva": [], "Zambrano": [] }, "Boyacá": { "Duitama": [], "Sogamoso": [], "Tunja": [], "Villa de Leyva": [] }, "Caldas": { "Manizales": [], "La Dorada": [], "Chinchiná": [] }, "Caquetá": { "Florencia": [] }, "Casanare": { "Yopal": [] }, "Cauca": { "Popayán": [], "Santander de Quilichao": [] }, "Cesar": { "Valledupar": [], "Aguachica": [] }, "Chocó": { "Quibdó": [] }, "Cundinamarca": { "Bogotá": [], "Soacha": [], "Facatativá": [], "Girardot": [], "Zipaquirá": [], "Fusagasugá": [], "Chía": [], "Mosquera": [], "Madrid": [], "Funza": [] }, "Córdoba": { "Montería": [], "Sahagún": [], "Lorica": [] }, "Huila": { "Neiva": [], "Pitalito": [], "Garzón": [] }, "La Guajira": { "Riohacha": [], "Maicao": [] }, "Magdalena": { "Santa Marta": [], "Ciénaga": [] }, "Meta": { "Villavicencio": [], "Acacías": [] }, "Nariño": { "Pasto": [], "Tumaco": [], "Ipiales": [] }, "Norte de Santander": { "Cúcuta": [], "Ocaña": [], "Pamplona": [] }, "Putumayo": { "Mocoa": [] }, "Quindío": { "Armenia": [] }, "Risaralda": { "Pereira": [], "Dosquebradas": [] }, "San Andrés y Providencia": { "San Andrés": [] }, "Santander": { "Bucaramanga": [], "Floridablanca": [], "Girón": [], "Barrancabermeja": [], "Piedecuesta": [] }, "Sucre": { "Sincelejo": [] }, "Tolima": { "Ibagué": [], "Espinal": [], "Melgar": [] }, "Valle del Cauca": { "Cali": [], "Buenaventura": [], "Palmira": [], "Tuluá": [], "Buga": [], "Cartago": [], "Jamundí": [] }, "Vaupés": { "Mitú": [] }, "Vichada": { "Puerto Carreño": [] } } };


// ── MÓDULO 1: SESSION ID ──────────────────────────────────────

function getSessionId() {
    try {
        const stored = localStorage.getItem(SESSION_KEY);
        if (stored) {
            const obj = JSON.parse(stored);
            if (obj.id && (new Date() - new Date(obj.date)) < 20 * 60 * 1000) {
                return obj.id;
            }
        }
        const newObj = {
            id: makeId(10),
            date: new Date().toISOString(),
            url: `${window.location.hostname}${window.location.pathname}`
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(newObj));
        return newObj.id;
    } catch (e) {
        return makeId(10);
    }
}

function makeId(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

const SESSION_ID = getSessionId();
console.log(`[BienestarTotal] Session ID: ${SESSION_ID}`);


// ── MÓDULO 2: DETECCIÓN DE PEDIDO DOBLE ──────────────────────
// Guarda registro en localStorage al confirmar un pedido.
// Al cargar la página, si hay pedido reciente (< 48h) muestra aviso.

const PEDIDO_BANNER_ID = 'bt-pedido-doble-banner';

function registrarPedidoConfirmado(datos) {
    try {
        const registro = {
            fecha:     new Date().toISOString(),
            sessionId: SESSION_ID,
            nombre:    datos.cliente.nombreCompleto,
            url:       `${window.location.hostname}${window.location.pathname}`
        };
        localStorage.setItem(PEDIDO_KEY, JSON.stringify(registro));
        console.log('[BienestarTotal] Pedido registrado en localStorage');
    } catch (e) {
        console.warn('[BienestarTotal] No se pudo guardar el pedido:', e);
    }
}

function verificarPedidoDoble() {
    try {
        const stored = localStorage.getItem(PEDIDO_KEY);
        if (!stored) return false;

        const registro = JSON.parse(stored);
        const horasTranscurridas = (new Date() - new Date(registro.fecha)) / (1000 * 60 * 60);
        const mismaUrl = registro.url === `${window.location.hostname}${window.location.pathname}`;

        if (mismaUrl && horasTranscurridas < BLOQUEO_HORAS) {
            console.log(`[BienestarTotal] Pedido doble detectado. Hace ${horasTranscurridas.toFixed(1)}h`);
            return registro;
        }

        // Expiró — limpiar
        localStorage.removeItem(PEDIDO_KEY);
        return false;
    } catch (e) {
        return false;
    }
}

function mostrarAvisoPedidoDoble(registro) {
    if (document.getElementById(PEDIDO_BANNER_ID)) return;

    const banner = document.createElement('div');
    banner.id = PEDIDO_BANNER_ID;
    banner.style.cssText = `
        background: #fffbeb;
        border: 2px solid #f59e0b;
        border-radius: 10px;
        padding: 16px 20px;
        margin: 0 0 20px 0;
        font-family: inherit;
        font-size: 14px;
        color: #92400e;
        line-height: 1.5;
        box-shadow: 0 2px 8px rgba(245,158,11,0.15);
    `;

    const nombre = registro.nombre ? `, ${registro.nombre.split(' ')[0]}` : '';

    banner.innerHTML = `
        <div style="display:flex; align-items:flex-start; gap:12px;">
            <span style="font-size:22px; flex-shrink:0;">⚠️</span>
            <div>
                <strong style="display:block; margin-bottom:4px; font-size:15px; color:#78350f;">
                    Ya tienes un pedido registrado${nombre}
                </strong>
                <span>
                    Encontramos un pedido reciente desde este dispositivo.
                    Si deseas hacer correcciones o tienes alguna duda,
                    comunícate con nuestro equipo de confirmaciones.
                </span>
                <div style="margin-top:10px; font-size:12px; color:#a16207;">
                    ¿Eres otra persona? Puedes continuar y completar tu pedido normalmente.
                </div>
            </div>
        </div>
    `;

    // Insertar al inicio del formulario o del body
    const contenedor =
        document.querySelector('form') ||
        document.querySelector('.funnelish-form') ||
        document.querySelector('.checkout-form') ||
        document.body;
    contenedor.insertBefore(banner, contenedor.firstChild);

    console.log('[BienestarTotal] Aviso de pedido doble mostrado');
}

window.addEventListener('load', function () {
    const pedidoPrevio = verificarPedidoDoble();
    if (pedidoPrevio) mostrarAvisoPedidoDoble(pedidoPrevio);
});


// ── MÓDULO 3: FLAG ANTI-DUPLICADO ────────────────────────────
// Una vez que el cliente confirma el pedido, este flag bloquea
// cualquier envío posterior al webhook de carrito abandonado.

let pedidoConfirmado = false;


// ── MÓDULO 4: SELECTS DEPARTAMENTO / CIUDAD ───────────────────

window.addEventListener('load', inicializarSelects);

function inicializarSelects() {
    const paisData    = countryStateInfo['Colombia'];
    const campoPais   = document.getElementsByName('shipping_country')[0];
    const campoDpto   = document.getElementsByName('shipping_state')[0];
    const campoCiudad = document.getElementsByName('shipping_city')[0];

    if (!campoDpto || !campoCiudad) {
        console.warn('[BienestarTotal] No se encontraron los selects de departamento/ciudad');
        return;
    }

    if (campoPais) {
        campoPais.parentElement.style.display = 'none';
        if (campoPais.tagName === 'INPUT') {
            campoPais.value = 'Colombia';
        } else if (campoPais.tagName === 'SELECT') {
            const opt = new Option('Colombia', 'Colombia');
            campoPais.add(opt, 1);
            campoPais.selectedIndex = 1;
            campoPais.parentElement.parentElement.style.display = 'none';
        }
    }

    campoDpto.innerHTML = '';
    Object.keys(paisData).forEach(dpto => {
        campoDpto.options.add(new Option(dpto, dpto));
    });

    campoDpto.onchange = function () {
        campoCiudad.innerHTML = '';
        const ciudades = paisData[this.value] || {};
        campoCiudad.options.add(new Option('Selecciona una ciudad', ''));
        Object.keys(ciudades).forEach(ciudad => {
            campoCiudad.options.add(new Option(ciudad, ciudad));
        });
    };

    console.log('[BienestarTotal] Selects de ubicación inicializados');
}


// ── MÓDULO 5: OCULTAR EMAIL ───────────────────────────────────

window.addEventListener('load', ocultarEmail);

function ocultarEmail() {
    const inputEmail = document.getElementsByName('email')[0];
    if (inputEmail) {
        inputEmail.value = generarEmailAleatorio();
        inputEmail.style.display = 'none';
        if (inputEmail.previousElementSibling) inputEmail.previousElementSibling.style.display = 'none';
        if (inputEmail.parentElement)          inputEmail.parentElement.style.display = 'none';
        console.log('[BienestarTotal] Email oculto y generado');
    }
}

function generarEmailAleatorio() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let local = '';
    for (let i = 0; i < 10; i++) local += chars.charAt(Math.floor(Math.random() * chars.length));
    return local + '@gmail.com';
}


// ── MÓDULO 6: TELÉFONO COLOMBIA ───────────────────────────────

window.addEventListener('load', inicializarTelefono);

function inicializarTelefono() {
    const inputTel = document.getElementsByName('phone')[0];
    if (!inputTel) {
        console.warn('[BienestarTotal] No se encontró el campo phone');
        return;
    }

    const divError = document.createElement('div');
    divError.id = 'phone-error-msg';
    divError.style.cssText = 'color:#e53e3e; font-size:13px; margin-top:4px; display:none;';
    divError.textContent = 'Ingresa un número válido colombiano (10 dígitos, empieza con 3). Ej: 3001234567';
    inputTel.parentNode.insertBefore(divError, inputTel.nextSibling);

    inputTel.setAttribute('placeholder', 'Ej: 3001234567');
    inputTel.setAttribute('inputmode', 'numeric');
    inputTel.setAttribute('maxlength', '10');

    inputTel.addEventListener('input', function () {
        let val = this.value.replace(/\D/g, '');
        if (val.startsWith('57')) val = val.substring(2);
        if (val.length > 0 && !val.startsWith('3')) val = '';
        if (val.length > 10) val = val.slice(0, 10);
        this.value = val;

        const esValido = val.length === 10;
        divError.style.display = (val.length > 0 && !esValido) ? 'block' : 'none';
        this.style.borderColor = (val.length > 0 && !esValido) ? '#e53e3e' : '';
    });

    console.log('[BienestarTotal] Validación de teléfono inicializada');
}

// Bloquear submit si el teléfono no es válido + agregar +57
document.addEventListener('DOMContentLoaded', function () {
    const btnSubmit = document.querySelector('a[href="#submit-step"]');
    if (!btnSubmit) return;

    btnSubmit.addEventListener('click', function (event) {
        const inputTel = document.getElementsByName('phone')[0];
        if (!inputTel) return;

        const digits = inputTel.value.replace(/\D/g, '');
        const esValido = /^3\d{9}$/.test(digits);

        if (!esValido) {
            console.log('[BienestarTotal] Submit bloqueado — teléfono inválido');
            inputTel.style.borderColor = '#e53e3e';
            event.stopImmediatePropagation();
            return;
        }

        inputTel.value = '+57' + digits;
        console.log('[BienestarTotal] Teléfono listo:', inputTel.value);
    }, true);
});


// ── MÓDULO 7: DIRECCIÓN ───────────────────────────────────────

window.addEventListener('load', inicializarDireccion);

function inicializarDireccion() {
    const camposCustom = document.getElementsByName('custom');
    if (!camposCustom[0]) {
        console.warn('[BienestarTotal] No se encontró el campo custom para barrio/referencia');
        return;
    }
    camposCustom[0].setAttribute('placeholder', 'Barrio, referencia o punto de entrega');
    console.log('[BienestarTotal] Campo barrio/referencia listo');
}


// ── MÓDULO 8: RECOLECCIÓN DE DATOS ───────────────────────────

function recolectarDatos() {
    const get = (name) => document.querySelector(`[name="${name}"]`)?.value?.trim() || '';
    const camposCustom = document.getElementsByName('custom');

    const datos = {
        storeName:  STORE_NAME,
        sessionId:  SESSION_ID,
        urlOrigen:  `${location.hostname}${location.pathname}`,
        fechaHora:  new Date().toISOString(),
        cliente: {
            nombreCompleto: get('full_name'),
            email:          get('email'),
            telefono:       get('phone'),
        },
        direccion: {
            direccion:        get('shipping_address'),
            barrioReferencia: camposCustom[0]?.value?.trim() || '',
            ciudad:           get('shipping_city'),
            departamento:     get('shipping_state'),
            pais:             'Colombia',
        },
        productos:   obtenerProductos(),
        precioTotal: null,
    };

    datos.precioTotal = obtenerPrecioTotal(datos.productos);
    return datos;
}

function obtenerProductos() {
    try {
        const nombres = [...document.querySelectorAll('.os-name')].map(el => el.textContent.trim());
        if (typeof PRODUCTS !== 'undefined') {
            return PRODUCTS
                .filter(p => nombres.includes(p.name))
                .map(p => ({ nombre: p.name, precio: p.price }));
        }
        return nombres.map(n => ({ nombre: n, precio: null }));
    } catch (e) {
        console.warn('[BienestarTotal] No se pudieron obtener productos:', e);
        return [];
    }
}

function obtenerPrecioTotal(productos) {
    try {
        const precioHTML = document.querySelector('.os-total .os-price')?.textContent?.trim() || '';
        const calculado  = productos.reduce((acc, p) => acc + (p.precio || 0), 0);
        if (calculado > 0 && precioHTML.includes(calculado.toString())) return calculado;
        return precioHTML || calculado;
    } catch (e) {
        return null;
    }
}


// ── MÓDULO 9: ENVÍO AL WEBHOOK ────────────────────────────────

async function enviarWebhook(datos, url) {
    try {
        const response = await fetch(url, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(datos),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);

        const respData = await response.json().catch(() => ({}));
        console.log(`[BienestarTotal] ✅ Enviado a ${url}`, respData);
        return true;
    } catch (error) {
        console.error(`[BienestarTotal] ❌ Error enviando a ${url}:`, error);
        return false;
    }
}


// ── MÓDULO 10: CARRITO ABANDONADO ────────────────────────────
// Se dispara en 3 situaciones:
//   1. El cliente cierra la pestaña o navega a otra página (beforeunload)
//   2. El cliente lleva 5 minutos inactivo sin haber comprado
// Requisito mínimo: nombre (≥3 chars) + teléfono colombiano válido

const INACTIVIDAD_MS  = 5 * 60 * 1000; // 5 minutos
let   inactividadTimer = null;
let   carritoEnviado   = false; // evita enviar más de una vez por sesión

window.addEventListener('load', inicializarCarritoAbandonado);

function inicializarCarritoAbandonado() {
    // ── Disparador 1: cierre o cambio de página ──
    window.addEventListener('beforeunload', function () {
        if (datosListosParaAbandonado()) {
            // beforeunload no permite async/await — usamos sendBeacon
            const payload = armarPayloadAbandonado();
            if (payload) {
                const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
                navigator.sendBeacon(WEBHOOK_ABANDONADO, blob);
                console.log('[BienestarTotal] Carrito abandonado enviado via sendBeacon (beforeunload)');
            }
        }
    });

    // ── Disparador 2: inactividad de 5 minutos ──
    // Reiniciar el timer cada vez que el usuario interactúa con el formulario
    ['input', 'change', 'click', 'keydown'].forEach(evento => {
        document.body.addEventListener(evento, reiniciarTimerInactividad);
    });

    console.log('[BienestarTotal] Carrito abandonado activo (beforeunload + inactividad 5min)');
}

function reiniciarTimerInactividad() {
    clearTimeout(inactividadTimer);
    inactividadTimer = setTimeout(async () => {
        console.log('[BienestarTotal] 5 minutos de inactividad — intentando enviar carrito abandonado');
        await intentarEnviarAbandonado();
    }, INACTIVIDAD_MS);
}

function datosListosParaAbandonado() {
    if (pedidoConfirmado) return false;
    if (carritoEnviado)   return false;

    const datos  = recolectarDatos();
    const raw    = datos.cliente.telefono.replace(/\D/g, '');
    const digits = raw.startsWith('57') ? raw.substring(2) : raw;

    const telValido    = /^3\d{9}$/.test(digits);
    const nombreValido = datos.cliente.nombreCompleto && datos.cliente.nombreCompleto.trim().length >= 3;

    return telValido && nombreValido;
}

function obtenerOfertaSeleccionada() {
    try {
        // Leer el pl-item que tenga la clase 'selected'
        const itemSeleccionado = document.querySelector('.pl-item.selected');
        if (!itemSeleccionado) return null;

        const pid   = itemSeleccionado.getAttribute('data-pid') || null;
        const label = itemSeleccionado.querySelector('span[name]')?.textContent?.trim() || 'Producto';

        // Precio: último <strong> dentro de pl-pvalue
        const precioTexto = itemSeleccionado.querySelector('.pl-pvalue strong:last-child')?.textContent?.trim() || '';
        // Limpiar: quitar $, puntos, comas → número entero
        const precio = parseInt(precioTexto.replace(/[^0-9]/g, ''), 10) || 0;

        return { id: pid, label, price: precio };
    } catch (e) {
        console.warn('[BienestarTotal] No se pudo leer la oferta seleccionada:', e);
        return null;
    }
}

function armarPayloadAbandonado() {
    const datos  = recolectarDatos();
    const raw    = datos.cliente.telefono.replace(/\D/g, '');
    const digits = raw.startsWith('57') ? raw.substring(2) : raw;

    const payload = {
        nombre:   datos.cliente.nombreCompleto.trim(),
        telefono: digits,
    };

    // Leer la oferta actualmente seleccionada en la lista de productos
    const oferta = obtenerOfertaSeleccionada();
    if (oferta) {
        payload.paquete = oferta;
        console.log('[BienestarTotal] Oferta seleccionada:', oferta);
    }

    return payload;
}

async function intentarEnviarAbandonado() {
    if (!datosListosParaAbandonado()) {
        console.log('[BienestarTotal] Carrito abandonado no enviado — datos insuficientes o pedido ya confirmado');
        return;
    }

    const payload = armarPayloadAbandonado();
    if (!payload) return;

    carritoEnviado = true; // marcar para no enviar de nuevo en esta sesión
    console.log('[BienestarTotal] Enviando carrito abandonado (inactividad):', payload);
    await enviarWebhook(payload, WEBHOOK_ABANDONADO);
}


// ── MÓDULO 11: PEDIDO COMPLETO ────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
    const btnSubmit = document.querySelector('a[href="#submit-step"]');
    if (!btnSubmit) return;

    btnSubmit.addEventListener('click', async function () {
        const inputTel = document.getElementsByName('phone')[0];
        const telValido = inputTel && /^\+573\d{9}$/.test(inputTel.value);

        // Si el teléfono no es válido, el Módulo 6 ya bloqueó el submit
        if (!telValido) return;

        const datos = recolectarDatos();
        console.log('[BienestarTotal] Enviando pedido completo:', JSON.stringify(datos));

        const enviado = await enviarWebhook(datos, WEBHOOK_COMPLETO);

        if (enviado) {
            // 1. Bloquear carrito abandonado en esta sesión
            pedidoConfirmado = true;
            console.log('[BienestarTotal] 🔒 pedidoConfirmado = true');

            // 2. Guardar en localStorage para detectar pedido doble en visitas futuras
            registrarPedidoConfirmado(datos);
        }
    }, false);
});


// ── FIN DEL SCRIPT ────────────────────────────────────────────
console.log(`[BienestarTotal] Script v1.1 cargado. Session: ${SESSION_ID}`);
