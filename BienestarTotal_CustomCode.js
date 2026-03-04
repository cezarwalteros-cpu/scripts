// ============================================================
//  BienestarTotal — Custom Code Script
//  Autor: Cesar (propio, sin dependencia de Intégramelo)
//  Versión: 1.0
// ============================================================

// ── CONFIGURACIÓN ────────────────────────────────────────────
const WEBHOOK_ABANDONADO  = 'https://nhccgonibsbymmydovts.supabase.co/functions/v1/capture-abandoned-cart';
const WEBHOOK_COMPLETO    = 'https://nhccgonibsbymmydovts.supabase.co/functions/v1/webhook-funnelish';
const STORE_NAME          = 'BienestarTotal';
const SESSION_KEY         = 'idBienestarTotal';   // key en localStorage
const DEBOUNCE_MS         = 4000;                 // ms de espera antes de enviar carrito

// ── DATOS DE COLOMBIA ─────────────────────────────────────────
var countryStateInfo = { "Colombia": { "Seleccione un Departamento": {}, "Amazonas": { "Leticia": [], "Puerto Nario": [] }, "Antioquia": { "Abejorral": [], "Abriaquí": [], "Alejandría": [], "Amagá": [], "Amalfi": [], "Andes": [], "Angelópolis": [], "Angostura": [], "Anorí": [], "Anzá": [], "Apartadó": [], "Arboletes": [], "Argelia": [], "Armenia": [], "Barbosa": [], "Bello": [], "Belmira": [], "Betania": [], "Betulia": [], "Briceño": [], "Buriticá": [], "Cáceres": [], "Caicedo": [], "Caldas": [], "Campamento": [], "Cañasgordas": [], "Caracolí": [], "Caramanta": [], "Carepa": [], "Carolina del Príncipe": [], "Caucasia": [], "Chigorodó": [], "Cisneros": [], "Ciudad Bolívar": [], "Cocorná": [], "Concepción": [], "Concordia": [], "Copacabana": [], "Dabeiba": [], "Donmatías": [], "Ebéjico": [], "El Bagre": [], "El Carmen de Viboral": [], "El Peñol": [], "El Retiro": [], "El Santuario": [], "Entrerríos": [], "Envigado": [], "Fredonia": [], "Frontino": [], "Giraldo": [], "Girardota": [], "Gómez Plata": [], "Granada": [], "Guadalupe": [], "Guarne": [], "Guatapé": [], "Heliconia": [], "Hispania": [], "Itagüí": [], "Ituango": [], "Jardín": [], "Jericó": [], "La Ceja": [], "La Estrella": [], "La Pintada": [], "La Unión": [], "Liborina": [], "Maceo": [], "Marinilla": [], "Medellín": [], "Montebello": [], "Murindó": [], "Mutatá": [], "Nariño": [], "Nechí": [], "Necoclí": [], "Olaya": [], "Peque": [], "Pueblorrico": [], "Puerto Berrío": [], "Puerto Nare": [], "Puerto Triunfo": [], "Remedios": [], "Rionegro": [], "Sabanalarga": [], "Sabaneta": [], "Salgar": [], "San Andrés de Cuerquia": [], "San Carlos": [], "San Francisco": [], "San Jerónimo": [], "San José de la Montaña": [], "San Juan de Urabá": [], "San Luis": [], "San Pedro de Urabá": [], "San Pedro de los Milagros": [], "San Rafael": [], "San Roque": [], "San Vicente": [], "Santa Bárbara": [], "Santa Fe de Antioquia": [], "Santa Rosa de Osos": [], "Santo Domingo": [], "Segovia": [], "Sonsón": [], "Sopetrán": [], "Támesis": [], "Tarazá": [], "Tarso": [], "Titiribí": [], "Toledo": [], "Turbo": [], "Uramita": [], "Urrao": [], "Valdivia": [], "Valparaíso": [], "Vegachí": [], "Venecia": [], "Vigía del Fuerte": [], "Yalí": [], "Yarumal": [], "Yolombó": [], "Yondó": [], "Zaragoza": [] }, "Arauca": { "Arauca": [], "Arauquita": [], "Cravo Norte": [], "Fortul": [], "Puerto Rondón": [], "Saravena": [], "Tame": [] }, "Atlántico": { "Baranoa": [], "Barranquilla": [], "Campo de la Cruz": [], "Candelaria": [], "Galapa": [], "Juan de Acosta": [], "Luruaco": [], "Malambo": [], "Manatí": [], "Palmar de Varela": [], "Piojó": [], "Polonuevo": [], "Ponedera": [], "Puerto Colombia": [], "Repelón": [], "Sabanagrande": [], "Sabanalarga": [], "Santa Lucía": [], "Santo Tomás": [], "Soledad": [], "Suán": [], "Tubará": [], "Usiacurí": [] }, "Bolívar": { "Achí": [], "Altos del Rosario": [], "Arenal": [], "Arjona": [], "Arroyohondo": [], "Barranco de Loba": [], "Calamar": [], "Cantagallo": [], "Cartagena": [], "Cicuco": [], "Clemencia": [], "El Carmen de Bolívar": [], "El Guamo": [], "Magangué": [], "Mahates": [], "Mompós": [], "Morales": [], "Pinillos": [], "San Jacinto": [], "San Juan Nepomuceno": [], "San Pablo": [], "Santa Rosa": [], "Simití": [], "Turbaco": [], "Villanueva": [], "Zambrano": [] }, "Boyacá": { "Duitama": [], "Sogamoso": [], "Tunja": [], "Villa de Leyva": [] }, "Caldas": { "Manizales": [], "La Dorada": [], "Chinchiná": [] }, "Caquetá": { "Florencia": [] }, "Casanare": { "Yopal": [] }, "Cauca": { "Popayán": [], "Santander de Quilichao": [] }, "Cesar": { "Valledupar": [], "Aguachica": [] }, "Chocó": { "Quibdó": [] }, "Cundinamarca": { "Bogotá": [], "Soacha": [], "Facatativá": [], "Girardot": [], "Zipaquirá": [], "Fusagasugá": [], "Chía": [], "Mosquera": [], "Madrid": [], "Funza": [] }, "Córdoba": { "Montería": [], "Sahagún": [], "Lorica": [] }, "Huila": { "Neiva": [], "Pitalito": [], "Garzón": [] }, "La Guajira": { "Riohacha": [], "Maicao": [] }, "Magdalena": { "Santa Marta": [], "Ciénaga": [] }, "Meta": { "Villavicencio": [], "Acacías": [] }, "Nariño": { "Pasto": [], "Tumaco": [], "Ipiales": [] }, "Norte de Santander": { "Cúcuta": [], "Ocaña": [], "Pamplona": [] }, "Putumayo": { "Mocoa": [] }, "Quindío": { "Armenia": [] }, "Risaralda": { "Pereira": [], "Dosquebradas": [] }, "San Andrés y Providencia": { "San Andrés": [] }, "Santander": { "Bucaramanga": [], "Floridablanca": [], "Girón": [], "Barrancabermeja": [], "Piedecuesta": [] }, "Sucre": { "Sincelejo": [] }, "Tolima": { "Ibagué": [], "Espinal": [], "Melgar": [] }, "Valle del Cauca": { "Cali": [], "Buenaventura": [], "Palmira": [], "Tuluá": [], "Buga": [], "Cartago": [], "Jamundí": [] }, "Vaupés": { "Mitú": [] }, "Vichada": { "Puerto Carreño": [] } } };


// ── MÓDULO 1: SESSION ID ──────────────────────────────────────
// Genera o recupera un ID único de sesión desde localStorage.
// No requiere ningún campo oculto en Funnelish.

function getSessionId() {
    try {
        const stored = localStorage.getItem(SESSION_KEY);
        if (stored) {
            const obj = JSON.parse(stored);
            // Válido por 20 minutos
            if (obj.id && (new Date() - new Date(obj.date)) < 20 * 60 * 1000) {
                return obj.id;
            }
        }
        // Crear nuevo ID
        const newObj = {
            id: makeId(10),
            date: new Date().toISOString(),
            url: `${window.location.hostname}${window.location.pathname}`
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(newObj));
        return newObj.id;
    } catch (e) {
        return makeId(10); // fallback si localStorage no está disponible
    }
}

function makeId(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

// Inicializar session ID al cargar
const SESSION_ID = getSessionId();
console.log(`[BienestarTotal] Session ID: ${SESSION_ID}`);


// ── MÓDULO 2: SELECTS DEPARTAMENTO / CIUDAD ───────────────────

window.addEventListener('load', inicializarSelects);

function inicializarSelects() {
    const paisData = countryStateInfo['Colombia'];

    const campoPais    = document.getElementsByName('shipping_country')[0];
    const campoDpto    = document.getElementsByName('shipping_state')[0];
    const campoCiudad  = document.getElementsByName('shipping_city')[0];

    if (!campoDpto || !campoCiudad) {
        console.warn('[BienestarTotal] No se encontraron los selects de departamento/ciudad');
        return;
    }

    // Ocultar campo país y fijar valor Colombia
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

    // Cargar departamentos
    campoDpto.innerHTML = '';
    Object.keys(paisData).forEach(dpto => {
        campoDpto.options.add(new Option(dpto, dpto));
    });

    // Al cambiar departamento → cargar ciudades
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


// ── MÓDULO 3: OCULTAR EMAIL (poner valor aleatorio) ───────────

window.addEventListener('load', ocultarEmail);

function ocultarEmail() {
    const inputEmail = document.getElementsByName('email')[0];
    if (inputEmail) {
        inputEmail.value = generarEmailAleatorio();
        inputEmail.style.display = 'none';
        if (inputEmail.previousElementSibling) {
            inputEmail.previousElementSibling.style.display = 'none';
        }
        if (inputEmail.parentElement) {
            inputEmail.parentElement.style.display = 'none';
        }
        console.log('[BienestarTotal] Email oculto y generado');
    }
}

function generarEmailAleatorio() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let local = '';
    for (let i = 0; i < 10; i++) {
        local += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return local + '@gmail.com';
}


// ── MÓDULO 4: TELÉFONO COLOMBIA ───────────────────────────────
// Input simple. Solo Colombia. Acepta 10 dígitos empezando con 3.
// Agrega +57 automáticamente al valor real del campo.

window.addEventListener('load', inicializarTelefono);

function inicializarTelefono() {
    const inputTel = document.getElementsByName('phone')[0];
    if (!inputTel) {
        console.warn('[BienestarTotal] No se encontró el campo phone');
        return;
    }

    // Crear mensaje de error
    const divError = document.createElement('div');
    divError.id = 'phone-error-msg';
    divError.style.cssText = 'color:#e53e3e; font-size:13px; margin-top:4px; display:none;';
    divError.textContent = 'Ingresa un número válido colombiano (10 dígitos, empieza con 3). Ej: 3001234567';
    inputTel.parentNode.insertBefore(divError, inputTel.nextSibling);

    inputTel.setAttribute('placeholder', 'Ej: 3001234567');
    inputTel.setAttribute('inputmode', 'numeric');
    inputTel.setAttribute('maxlength', '10');

    inputTel.addEventListener('input', function () {
        // Solo dígitos
        let val = this.value.replace(/\D/g, '');

        // Si empieza con 57, quitarlo
        if (val.startsWith('57')) val = val.substring(2);

        // Solo puede empezar con 3
        if (val.length > 0 && !val.startsWith('3')) val = '';

        // Máximo 10 dígitos
        if (val.length > 10) val = val.slice(0, 10);

        this.value = val;

        // Sincronizar valor real con +57
        const esValido = val.length === 10;
        divError.style.display = (val.length > 0 && !esValido) ? 'block' : 'none';
        this.style.borderColor = (val.length > 0 && !esValido) ? '#e53e3e' : '';
    });

    console.log('[BienestarTotal] Validación de teléfono inicializada');
}

// Bloquear submit si el teléfono no es válido
document.addEventListener('DOMContentLoaded', function () {
    const btnSubmit = document.querySelector('a[href="#submit-step"]');
    if (!btnSubmit) return;

    btnSubmit.addEventListener('click', function (event) {
        const inputTel = document.getElementsByName('phone')[0];
        if (!inputTel) return;

        const digits = inputTel.value.replace(/\D/g, '');
        const esValido = /^3\d{9}$/.test(digits);

        if (!esValido) {
            console.log('[BienestarTotal] Submit bloqueado — teléfono inválido:', inputTel.value);
            inputTel.style.borderColor = '#e53e3e';
            event.stopImmediatePropagation();
            return;
        }

        // Agregar +57 antes de enviar
        inputTel.value = '+57' + digits;
        console.log('[BienestarTotal] Teléfono válido:', inputTel.value);
    }, true);
});


// ── MÓDULO 5: DIRECCIÓN (shipping_address + 1 campo custom) ──
// shipping_address = campo nativo Funnelish (dirección principal)
// custom[0]        = barrio / referencia (campo custom)
// Se envían por separado en el payload — sin concatenación forzada

window.addEventListener('load', inicializarDireccion);

function inicializarDireccion() {
    const camposCustom = document.getElementsByName('custom');
    const campoDireccion = document.getElementsByName('shipping_address')[0];

    if (!camposCustom[0]) {
        console.warn('[BienestarTotal] No se encontró el campo custom para barrio/referencia');
        return;
    }

    camposCustom[0].setAttribute('placeholder', 'Barrio, referencia o punto de entrega');
    console.log('[BienestarTotal] Campo de barrio/referencia listo');
}


// ── MÓDULO 6: RECOLECCIÓN DE DATOS ───────────────────────────

function recolectarDatos() {
    const get = (name) => document.querySelector(`[name="${name}"]`)?.value?.trim() || '';
    const camposCustom = document.getElementsByName('custom');

    const datos = {
        storeName:   STORE_NAME,
        sessionId:   SESSION_ID,
        urlOrigen:   `${location.hostname}${location.pathname}`,
        fechaHora:   new Date().toISOString(),
        cliente: {
            nombreCompleto: get('full_name'),
            email:          get('email'),
            telefono:       get('phone'),
        },
        direccion: {
            direccion:         get('shipping_address'),
            barrioReferencia:  camposCustom[0]?.value?.trim() || '',
            ciudad:            get('shipping_city'),
            departamento:      get('shipping_state'),
            pais:              'Colombia',
        },
        productos:    obtenerProductos(),
        precioTotal:  null,
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

        if (calculado > 0 && precioHTML.includes(calculado.toString())) {
            return calculado;
        }
        return precioHTML || calculado;
    } catch (e) {
        return null;
    }
}


// ── MÓDULO 7: ENVÍO AL WEBHOOK ────────────────────────────────

async function enviarWebhook(datos, url) {
    try {
        const response = await fetch(url, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(datos),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        }

        const respData = await response.json().catch(() => ({}));
        console.log(`[BienestarTotal] Enviado a ${url}`, respData);
        return true;
    } catch (error) {
        console.error(`[BienestarTotal] Error enviando a ${url}:`, error);
        return false;
    }
}


// ── MÓDULO 8: CARRITO ABANDONADO (debounce) ───────────────────

let debounceTimer = null;
let contadorEnvios = 0;

window.addEventListener('load', inicializarCapturaDatos);

function inicializarCapturaDatos() {
    document.body.addEventListener('input',  manejarCambioFormulario);
    document.body.addEventListener('change', manejarCambioFormulario);
    console.log('[BienestarTotal] Captura de carrito abandonado activa');
}

function manejarCambioFormulario() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
        await intentarEnviarAbandonado();
    }, DEBOUNCE_MS);
}

async function intentarEnviarAbandonado() {
    const datos = recolectarDatos();

    // Solo enviar si hay teléfono válido
    const tel = datos.cliente.telefono.replace(/\D/g, '');
    if (!tel || !/^(\+?57)?3\d{9}$/.test(datos.cliente.telefono.replace(/\s/g, '')) && tel.length < 10) {
        console.log('[BienestarTotal] Carrito abandonado no enviado — teléfono insuficiente');
        return;
    }

    contadorEnvios++;
    console.log(`[BienestarTotal] Enviando carrito abandonado #${contadorEnvios}`);
    await enviarWebhook(datos, WEBHOOK_ABANDONADO);
}


// ── MÓDULO 9: PEDIDO COMPLETO ─────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
    const btnSubmit = document.querySelector('a[href="#submit-step"]');
    if (!btnSubmit) return;

    btnSubmit.addEventListener('click', async function (event) {
        // Validar teléfono (el bloqueo ya está en Módulo 4)
        // Aquí solo enviamos si el teléfono ya tiene +57
        const inputTel = document.getElementsByName('phone')[0];
        const telValido = inputTel && /^\+573\d{9}$/.test(inputTel.value);

        if (!telValido) return; // el otro listener ya bloqueó el submit

        const datos = recolectarDatos();
        console.log('[BienestarTotal] Enviando pedido completo:', JSON.stringify(datos));
        await enviarWebhook(datos, WEBHOOK_COMPLETO);
    }, false);
});


// ── FIN DEL SCRIPT ────────────────────────────────────────────
console.log(`[BienestarTotal] Script v1.0 cargado. Session: ${SESSION_ID}`);
