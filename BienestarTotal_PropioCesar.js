// ============================================================
//  BienestarTotal — Script propio Cesar
//  Versión: 1.0
//  Convive con el script de Intégramelo sin pisarse.
//  Solo maneja:
//    1. Carrito abandonado → Supabase
//    2. Validación nombre completo en submit
//    3. Detección de pedido doble (48h)
// ============================================================

// ── CONFIGURACIÓN ────────────────────────────────────────────
const BT_WEBHOOK_ABANDONADO = 'https://nhccgonibsbymmydovts.supabase.co/functions/v1/capture-abandoned-cart';
const BT_PEDIDO_KEY         = 'pedidoBienestarTotal';
const BT_INACTIVIDAD_MS     = 5 * 60 * 1000; // 5 minutos
const BT_BLOQUEO_HORAS      = 48;

// ── FLAGS DE CONTROL ─────────────────────────────────────────
let btPedidoConfirmado = false;
let btCarritoEnviado   = false;
let btInactividadTimer = null;

// ============================================================
//  MÓDULO 1: VALIDACIÓN NOMBRE COMPLETO EN SUBMIT
//  Bloquea el formulario si el cliente solo escribe un nombre
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    const btnSubmit = document.querySelector('a[href="#submit-step"]');
    if (!btnSubmit) return;

    btnSubmit.addEventListener('click', function (event) {
        const inputNombre = document.getElementsByName('full_name')[0];
        if (!inputNombre) return;

        if (!btNombreEsCompleto(inputNombre.value)) {
            console.log('[BT] Submit bloqueado — se requiere nombre y apellido');
            inputNombre.style.borderColor = '#e53e3e';
            btMostrarError(inputNombre, 'Por favor ingresa tu nombre y apellido completos');
            event.stopImmediatePropagation();
            return;
        }

        // Nombre válido — limpiar error y marcar pedido confirmado
        inputNombre.style.borderColor = '';
        btQuitarError(inputNombre);
        btPedidoConfirmado = true;
        console.log('[BT] 🔒 Pedido confirmado — carrito abandonado desactivado');
        btRegistrarPedido(inputNombre.value);

    }, true);

    // Limpiar error mientras escribe
    const inputNombre = document.getElementsByName('full_name')[0];
    if (inputNombre) {
        inputNombre.addEventListener('input', function () {
            if (btNombreEsCompleto(this.value)) {
                this.style.borderColor = '';
                btQuitarError(this);
            }
        });
    }
});

function btNombreEsCompleto(nombre) {
    if (!nombre) return false;
    const palabras = nombre.trim().split(/\s+/).filter(p => p.length > 0);
    return palabras.length >= 2;
}

function btMostrarError(input, mensaje) {
    const id = 'bt-error-' + (input.name || 'campo');
    let div = document.getElementById(id);
    if (!div) {
        div = document.createElement('div');
        div.id = id;
        div.style.cssText = 'color:#e53e3e; font-size:13px; margin-top:4px;';
        input.parentNode.insertBefore(div, input.nextSibling);
    }
    div.textContent = mensaje;
    div.style.display = 'block';
}

function btQuitarError(input) {
    const div = document.getElementById('bt-error-' + (input.name || 'campo'));
    if (div) div.style.display = 'none';
}


// ============================================================
//  MÓDULO 2: CARRITO ABANDONADO
//  Dispara cuando:
//    - Cliente cierra o cambia de página (beforeunload)
//    - 5 minutos de inactividad sin comprar
//  Requisito: nombre completo + teléfono válido
// ============================================================

window.addEventListener('load', function () {
    // Disparador 1: cierre o cambio de página
    window.addEventListener('beforeunload', function () {
        if (!btDatosListos()) return;
        const payload = btArmarPayload();
        if (!payload) return;
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(BT_WEBHOOK_ABANDONADO, blob);
        console.log('[BT] Carrito abandonado enviado (beforeunload)');
    });

    // Disparador 2: inactividad 5 minutos
    ['input', 'change', 'click', 'keydown'].forEach(ev => {
        document.body.addEventListener(ev, btReiniciarTimer);
    });

    console.log('[BT] Carrito abandonado activo');
});

function btReiniciarTimer() {
    clearTimeout(btInactividadTimer);
    btInactividadTimer = setTimeout(async () => {
        console.log('[BT] 5 min de inactividad — intentando enviar carrito abandonado');
        await btEnviarAbandonado();
    }, BT_INACTIVIDAD_MS);
}

function btDatosListos() {
    if (btPedidoConfirmado) return false;
    if (btCarritoEnviado)   return false;

    const nombre   = document.getElementsByName('full_name')[0]?.value || '';
    const telefono = document.getElementsByName('phone')[0]?.value || '';
    const digits   = telefono.replace(/\D/g, '');
    const tel      = digits.startsWith('57') ? digits.substring(2) : digits;

    return btNombreEsCompleto(nombre) && /^3\d{9}$/.test(tel);
}

function btArmarPayload() {
    const nombre   = document.getElementsByName('full_name')[0]?.value?.trim() || '';
    const telefono = document.getElementsByName('phone')[0]?.value || '';
    const digits   = telefono.replace(/\D/g, '');
    const tel      = digits.startsWith('57') ? digits.substring(2) : digits;

    const payload = { nombre, telefono: tel };

    // Leer oferta seleccionada
    const oferta = btObtenerOferta();
    if (oferta) payload.paquete = oferta;

    return payload;
}

function btObtenerOferta() {
    try {
        const item = document.querySelector('.pl-item.selected');
        if (!item) return null;

        const pid         = item.getAttribute('data-pid') || null;
        const label       = item.querySelector('span[name]')?.textContent?.trim() || 'Producto';
        const precioTexto = item.querySelector('.pl-pvalue strong:last-child')?.textContent?.trim() || '';
        const price       = parseInt(precioTexto.replace(/[^0-9]/g, ''), 10) || 0;

        return { id: pid, label, price };
    } catch (e) {
        return null;
    }
}

async function btEnviarAbandonado() {
    if (!btDatosListos()) return;

    const payload = btArmarPayload();
    if (!payload) return;

    btCarritoEnviado = true;
    console.log('[BT] Enviando carrito abandonado (inactividad):', payload);

    try {
        const res = await fetch(BT_WEBHOOK_ABANDONADO, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload),
        });
        if (res.ok) {
            console.log('[BT] ✅ Carrito abandonado enviado');
        } else {
            console.error('[BT] ❌ Error:', res.status, res.statusText);
            btCarritoEnviado = false; // permitir reintento
        }
    } catch (e) {
        console.error('[BT] ❌ Error de red:', e);
        btCarritoEnviado = false;
    }
}


// ============================================================
//  MÓDULO 3: DETECCIÓN DE PEDIDO DOBLE (48h)
//  Si el cliente ya compró desde este dispositivo en las
//  últimas 48h, muestra un aviso al cargar la página.
// ============================================================

window.addEventListener('load', function () {
    const pedidoPrevio = btVerificarPedidoDoble();
    if (pedidoPrevio) btMostrarAvisoPedidoDoble(pedidoPrevio);
});

function btRegistrarPedido(nombreCompleto) {
    try {
        localStorage.setItem(BT_PEDIDO_KEY, JSON.stringify({
            fecha:  new Date().toISOString(),
            nombre: nombreCompleto,
            url:    `${location.hostname}${location.pathname}`
        }));
    } catch (e) {}
}

function btVerificarPedidoDoble() {
    try {
        const stored = localStorage.getItem(BT_PEDIDO_KEY);
        if (!stored) return false;

        const reg   = JSON.parse(stored);
        const horas = (new Date() - new Date(reg.fecha)) / (1000 * 60 * 60);
        const mismaUrl = reg.url === `${location.hostname}${location.pathname}`;

        if (mismaUrl && horas < BT_BLOQUEO_HORAS) return reg;

        localStorage.removeItem(BT_PEDIDO_KEY);
        return false;
    } catch (e) {
        return false;
    }
}

function btMostrarAvisoPedidoDoble(reg) {
    if (document.getElementById('bt-pedido-doble')) return;

    const nombre = reg.nombre ? `, ${reg.nombre.split(' ')[0]}` : '';

    const banner = document.createElement('div');
    banner.id = 'bt-pedido-doble';
    banner.style.cssText = `
        background:#fffbeb; border:2px solid #f59e0b; border-radius:10px;
        padding:16px 20px; margin:0 0 20px 0; font-size:14px;
        color:#92400e; line-height:1.5;
        box-shadow:0 2px 8px rgba(245,158,11,0.15);
    `;
    banner.innerHTML = `
        <div style="display:flex;align-items:flex-start;gap:12px;">
            <span style="font-size:22px;flex-shrink:0;">⚠️</span>
            <div>
                <strong style="display:block;margin-bottom:4px;font-size:15px;color:#78350f;">
                    Ya tienes un pedido registrado${nombre}
                </strong>
                Encontramos un pedido reciente desde este dispositivo.
                Si necesitas hacer alguna corrección comunícate con nuestro equipo de confirmaciones.
                <div style="margin-top:8px;font-size:12px;color:#a16207;">
                    ¿Eres otra persona? Puedes continuar normalmente.
                </div>
            </div>
        </div>
    `;

    const contenedor =
        document.querySelector('form') ||
        document.querySelector('.funnelish-form') ||
        document.body;
    contenedor.insertBefore(banner, contenedor.firstChild);
}

// ── FIN DEL SCRIPT ────────────────────────────────────────────
console.log('[BT] Script propio Cesar v1.0 cargado ✅');
