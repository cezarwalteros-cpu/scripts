// ╔═══════════════════════════════════════════════════════════╗
// ║  ADDON: VALIDACIÓN DE DIRECCIÓN + ANTI-DUPLICADOS        ║
// ║  Se ejecuta DESPUÉS del código principal                 ║
// ║  NO toca nada del código original                        ║
// ╚═══════════════════════════════════════════════════════════╝

(function() {
  'use strict';

  // =========================
  // CONFIGURACIÓN
  // =========================
  var CONFIG = {
    // Tiempo en minutos para bloquear pedidos duplicados
    bloqueoMinutos: 30,
    
    // Mostrar alertas visuales
    mostrarAlertas: true,
    
    // Debug en consola
    debug: true
  };

  function log(msg) {
    if (CONFIG.debug) console.log('[ADDON] ' + msg);
  }

  // =========================
  // ANTI-DUPLICADOS: LocalStorage
  // =========================
  function obtenerPedidosRecientes() {
    try {
      var data = localStorage.getItem('cod_pedidos_recientes');
      return data ? JSON.parse(data) : [];
    } catch(e) {
      return [];
    }
  }

  function guardarPedido(telefono) {
    try {
      var pedidos = obtenerPedidosRecientes();
      var ahora = new Date().getTime();
      
      // Limpiar pedidos viejos (más de X minutos)
      var limite = ahora - (CONFIG.bloqueoMinutos * 60 * 1000);
      pedidos = pedidos.filter(function(p) {
        return p.timestamp > limite;
      });

      // Agregar nuevo pedido
      pedidos.push({
        telefono: telefono,
        timestamp: ahora
      });

      localStorage.setItem('cod_pedidos_recientes', JSON.stringify(pedidos));
      log('Pedido guardado: ' + telefono);
    } catch(e) {
      log('Error guardando pedido: ' + e.message);
    }
  }

  function verificarDuplicado(telefono) {
    try {
      var pedidos = obtenerPedidosRecientes();
      var ahora = new Date().getTime();
      var limite = ahora - (CONFIG.bloqueoMinutos * 60 * 1000);

      // Buscar si existe pedido reciente con este teléfono
      var duplicado = pedidos.find(function(p) {
        return p.telefono === telefono && p.timestamp > limite;
      });

      if (duplicado) {
        var minutosRestantes = Math.ceil((duplicado.timestamp + (CONFIG.bloqueoMinutos * 60 * 1000) - ahora) / 60000);
        log('⚠️ DUPLICADO detectado. Espera ' + minutosRestantes + ' minutos');
        return minutosRestantes;
      }

      return 0;
    } catch(e) {
      log('Error verificando duplicado: ' + e.message);
      return 0;
    }
  }

  // =========================
  // VALIDACIÓN DE DIRECCIÓN
  // =========================
  function validarDireccion(input) {
    if (!input || input.dataset.addonValidacion === '1') return;
    input.dataset.addonValidacion = '1';

    log('Activando validación de dirección');

    // Crear mensaje de validación
    var msgDiv = document.createElement('div');
    msgDiv.id = 'addon-direccion-msg';
    msgDiv.style.cssText = 'margin-top:6px;padding:8px 12px;border-radius:6px;font-size:13px;display:none;';
    input.parentElement.appendChild(msgDiv);

    // Patrones de validación para Colombia
    var patrones = {
      vias: /\b(calle|carrera|avenida|diagonal|transversal|circular|autopista|cra|cl|av|dg|tv|cr|kr|ac|vereda|manzana|sector|barrio)\b/i,
      numeros: /\d+/,
      formato: /\b(calle|carrera|cra|cl|kr|cr|av|avenida|diagonal|dg|transversal|tv)\s*\d+.*[#-]\s*\d+/i
    };

    function mostrarMensaje(texto, tipo) {
      var colores = {
        error: { bg: '#fee2e2', text: '#dc2626' },
        warning: { bg: '#fef3c7', text: '#92400e' },
        success: { bg: '#d1fae5', text: '#065f46' },
        info: { bg: '#dbeafe', text: '#1e40af' }
      };

      var config = colores[tipo] || colores.info;
      msgDiv.style.backgroundColor = config.bg;
      msgDiv.style.color = config.text;
      msgDiv.textContent = texto;
      msgDiv.style.display = 'block';

      if (tipo === 'success') {
        setTimeout(function() { msgDiv.style.display = 'none'; }, 3000);
      }
    }

    function validar(valor) {
      var v = valor.trim();
      
      if (v.length === 0) {
        msgDiv.style.display = 'none';
        return;
      }

      // Muy corta
      if (v.length < 10) {
        mostrarMensaje('⚠️ Dirección muy corta. Ej: Calle 45 # 23-15', 'warning');
        return;
      }

      // Sin números
      if (!patrones.numeros.test(v)) {
        mostrarMensaje('❌ Falta número. Ej: Cra 7 # 45-12', 'error');
        return;
      }

      // Sin tipo de vía
      if (!patrones.vias.test(v)) {
        mostrarMensaje('❌ Falta tipo de vía (Calle, Carrera, Avenida)', 'error');
        return;
      }

      // Formato incorrecto
      if (!patrones.formato.test(v)) {
        mostrarMensaje('⚡ Formato sugerido: Calle 45 # 23-15', 'warning');
        return;
      }

      // Todo bien
      mostrarMensaje('✓ Dirección válida', 'success');
    }

    // Validar mientras escribe (con delay)
    var timeoutId;
    input.addEventListener('input', function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function() {
        validar(input.value);
      }, 800);
    });

    // Validar al salir del campo
    input.addEventListener('blur', function() {
      validar(input.value);
    });
  }

  // =========================
  // BLOQUEO DE SUBMIT SI HAY DUPLICADO
  // =========================
  function bloquearSubmitDuplicado() {
    log('Activando bloqueo anti-duplicados');

    // Interceptar clicks en botón de submit
    document.addEventListener('click', function(e) {
      try {
        var target = e.target;
        if (!target) return;

        // Buscar si es el botón de submit de Funnelish
        var submitBtn = target.closest ? target.closest('a[href="#submit-step"]') : null;
        if (!submitBtn) return;

        // Obtener teléfono del campo hidden (ya validado por el código original)
        var phoneInput = document.querySelector('input[name="phone"]');
        if (!phoneInput || !phoneInput.value) return;

        var telefono = phoneInput.value.trim();
        
        // Solo validar si tiene formato correcto +57XXXXXXXXXX
        if (!/^\+57[3]\d{9}$/.test(telefono)) {
          log('Teléfono no válido, permitiendo continuar (validación principal)');
          return;
        }

        // Verificar duplicado
        var minutosEspera = verificarDuplicado(telefono);
        
        if (minutosEspera > 0) {
          // BLOQUEAR SUBMIT
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          if (CONFIG.mostrarAlertas) {
            mostrarAlertaDuplicado(minutosEspera);
          }

          log('⛔ Submit bloqueado - pedido duplicado');
          return false;
        }

        // No es duplicado, permitir submit y guardar pedido
        log('✓ No duplicado, permitiendo submit');
        guardarPedido(telefono);

      } catch(x) {
        log('Error en bloqueo: ' + x.message);
      }
    }, true); // useCapture = true para interceptar antes que otros handlers
  }

  // =========================
  // ALERTA VISUAL DE DUPLICADO
  // =========================
  function mostrarAlertaDuplicado(minutos) {
    // Remover alerta anterior si existe
    var alertaVieja = document.getElementById('addon-alerta-duplicado');
    if (alertaVieja) alertaVieja.remove();

    var alerta = document.createElement('div');
    alerta.id = 'addon-alerta-duplicado';
    alerta.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      border: 2px solid #ef4444;
      border-radius: 12px;
      padding: 24px 32px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      z-index: 999999;
      max-width: 400px;
      text-align: center;
      animation: slideIn 0.3s ease;
    `;

    alerta.innerHTML = `
      <div style="font-size: 48px; margin-bottom: 12px;">⚠️</div>
      <h3 style="margin: 0 0 12px 0; color: #dc2626; font-size: 20px;">Pedido Duplicado</h3>
      <p style="margin: 0 0 16px 0; color: #64748b; font-size: 15px; line-height: 1.5;">
        Ya realizaste un pedido hace poco con este número.
        <br><br>
        Por favor espera <strong style="color: #dc2626;">${minutos} minutos</strong> antes de hacer otro pedido.
      </p>
      <button id="addon-cerrar-alerta" style="
        background: #ef4444;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      ">Entendido</button>
    `;

    // Agregar animación
    var style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translate(-50%, -45%);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
      }
      #addon-cerrar-alerta:hover {
        background: #dc2626;
        transform: scale(1.05);
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(alerta);

    // Cerrar al hacer click
    document.getElementById('addon-cerrar-alerta').addEventListener('click', function() {
      alerta.remove();
    });

    // Auto-cerrar en 8 segundos
    setTimeout(function() {
      if (alerta && alerta.parentNode) alerta.remove();
    }, 8000);
  }

  // =========================
  // INICIALIZACIÓN
  // =========================
  function init() {
    log('Inicializando addon...');

    // 1. Validación de dirección
    var addressInput = document.querySelector('input[name="shipping_address"]');
    if (addressInput) {
      validarDireccion(addressInput);
    }

    // 2. Bloqueo de duplicados
    bloquearSubmitDuplicado();

    log('Addon activo ✓');
  }

  // Ejecutar después de que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 500);
    });
  } else {
    setTimeout(init, 500);
  }

  // Re-inicializar si el DOM cambia (por si Funnelish recarga el form)
  var observer = new MutationObserver(function() {
    var addressInput = document.querySelector('input[name="shipping_address"]');
    if (addressInput && !addressInput.dataset.addonValidacion) {
      init();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  log('Script cargado ✓');

})();
