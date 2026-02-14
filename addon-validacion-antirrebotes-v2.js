// ╔═══════════════════════════════════════════════════════════╗
// ║  ADDON: VALIDACIÓN DE DIRECCIÓN + ANTI-REBOTES           ║
// ║  Bloquea SOLO si el cliente se devuelve inmediatamente   ║
// ║  NO bloquea clientes que vuelven días después            ║
// ╚═══════════════════════════════════════════════════════════╝

(function() {
  'use strict';

  // =========================
  // CONFIGURACIÓN
  // =========================
  var CONFIG = {
    // ⚡ BLOQUEO SOLO PARA REBOTES INMEDIATOS
    // Si el cliente hace click en submit pero se devuelve y vuelve a intentar
    bloqueoMinutos: 5,  // 👈 SOLO 5 minutos (rebote inmediato)
    
    // Mostrar alertas visuales
    mostrarAlertas: true,
    
    // Debug en consola
    debug: true
  };

  function log(msg) {
    if (CONFIG.debug) console.log('[ADDON] ' + msg);
  }

  // =========================
  // ESTILOS PARA VALIDACIÓN
  // =========================
  function inyectarEstilos() {
    if (document.getElementById('addon-styles')) return;
    
    var css = document.createElement('style');
    css.id = 'addon-styles';
    css.textContent = `
      .addon-direccion-msg {
        margin-top: 6px;
        padding: 10px 14px;
        border-radius: 8px;
        font-size: 13px;
        line-height: 1.4;
        font-weight: 500;
        display: none;
        animation: fadeIn 0.3s ease;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .addon-direccion-msg.error {
        background: #fee2e2;
        color: #dc2626;
        border-left: 4px solid #dc2626;
      }
      .addon-direccion-msg.warning {
        background: #fef3c7;
        color: #92400e;
        border-left: 4px solid #f59e0b;
      }
      .addon-direccion-msg.success {
        background: #d1fae5;
        color: #065f46;
        border-left: 4px solid #10b981;
      }
    `;
    document.head.appendChild(css);
    log('Estilos inyectados ✓');
  }

  // =========================
  // ANTI-REBOTES: LocalStorage
  // =========================
  function obtenerIntentosRecientes() {
    try {
      var data = localStorage.getItem('cod_intentos_submit');
      return data ? JSON.parse(data) : [];
    } catch(e) {
      log('Error leyendo localStorage: ' + e.message);
      return [];
    }
  }

  function guardarIntentoSubmit(telefono) {
    try {
      var intentos = obtenerIntentosRecientes();
      var ahora = new Date().getTime();
      
      // Limpiar intentos viejos (más de X minutos)
      var limite = ahora - (CONFIG.bloqueoMinutos * 60 * 1000);
      intentos = intentos.filter(function(i) {
        return i.timestamp > limite;
      });

      // Agregar nuevo intento
      intentos.push({
        telefono: telefono,
        timestamp: ahora
      });

      localStorage.setItem('cod_intentos_submit', JSON.stringify(intentos));
      log('Intento de submit guardado: ' + telefono + ' a las ' + new Date(ahora).toLocaleTimeString());
    } catch(e) {
      log('Error guardando intento: ' + e.message);
    }
  }

  function verificarReboteInmediato(telefono) {
    try {
      var intentos = obtenerIntentosRecientes();
      var ahora = new Date().getTime();
      var limite = ahora - (CONFIG.bloqueoMinutos * 60 * 1000);

      // Buscar si hay intento reciente (últimos X minutos) con este teléfono
      var rebote = intentos.find(function(i) {
        return i.telefono === telefono && i.timestamp > limite;
      });

      if (rebote) {
        var segundosDesdeIntento = Math.floor((ahora - rebote.timestamp) / 1000);
        var minutosRestantes = Math.ceil((rebote.timestamp + (CONFIG.bloqueoMinutos * 60 * 1000) - ahora) / 60000);
        
        log('⚠️ REBOTE INMEDIATO detectado');
        log('   Último intento hace: ' + segundosDesdeIntento + ' segundos');
        log('   Tiempo de espera: ' + minutosRestantes + ' minutos');
        
        return {
          esRebote: true,
          minutosRestantes: minutosRestantes,
          segundosDesdeIntento: segundosDesdeIntento
        };
      }

      return { esRebote: false };
    } catch(e) {
      log('Error verificando rebote: ' + e.message);
      return { esRebote: false };
    }
  }

  // =========================
  // VALIDACIÓN DE DIRECCIÓN
  // =========================
  function validarDireccion(input) {
    if (!input || input.dataset.addonValidacion === '1') return;
    input.dataset.addonValidacion = '1';

    log('✓ Validación de dirección activada en: ' + input.name);

    // Crear contenedor para mensaje si no existe
    var msgDiv = input.parentElement.querySelector('.addon-direccion-msg');
    if (!msgDiv) {
      msgDiv = document.createElement('div');
      msgDiv.className = 'addon-direccion-msg';
      input.parentElement.appendChild(msgDiv);
    }

    // Patrones de validación para Colombia
    var patrones = {
      // Tipos de vías comunes en Colombia
      vias: /\b(calle|carrera|avenida|diagonal|transversal|circular|autopista|cra|cl|av|dg|tv|cr|kr|ac|vereda|manzana|sector|barrio|via|camino)\b/i,
      
      // Debe tener al menos un número
      numeros: /\d+/,
      
      // Formato estándar: Tipo + Número + # + Número
      formatoEstandar: /\b(calle|carrera|cra|cl|kr|cr|av|avenida|diagonal|dg|transversal|tv)\s*\d+.*[#\-]\s*\d+/i,
      
      // Complementos comunes
      complementos: /\b(casa|apto|apartamento|interior|int|torre|bloque|manzana|lote|local|oficina|piso|#|barrio|conjunto)\b/i
    };

    function mostrarMensaje(texto, tipo) {
      msgDiv.className = 'addon-direccion-msg ' + tipo;
      msgDiv.textContent = texto;
      msgDiv.style.display = 'block';
      
      log('Validación dirección: ' + tipo + ' - ' + texto);

      // Auto-ocultar mensajes de éxito
      if (tipo === 'success') {
        setTimeout(function() { 
          msgDiv.style.display = 'none'; 
        }, 3000);
      }
    }

    function ocultarMensaje() {
      msgDiv.style.display = 'none';
    }

    function validar(valor) {
      var v = valor.trim();
      
      // Campo vacío = ocultar mensaje
      if (v.length === 0) {
        ocultarMensaje();
        return;
      }

      // 1. Muy corta
      if (v.length < 10) {
        mostrarMensaje('⚠️ Dirección muy corta. Ejemplo: Calle 45 # 23-15', 'warning');
        return;
      }

      // 2. Sin números
      if (!patrones.numeros.test(v)) {
        mostrarMensaje('❌ Debe incluir números. Ejemplo: Cra 7 # 45-12', 'error');
        return;
      }

      // 3. Sin tipo de vía
      if (!patrones.vias.test(v)) {
        mostrarMensaje('❌ Especifica el tipo de vía (Calle, Carrera, Avenida, etc)', 'error');
        return;
      }

      // 4. Formato incorrecto (sin # o -)
      if (!patrones.formatoEstandar.test(v)) {
        mostrarMensaje('⚡ Usa el formato: Calle 45 # 23-15 o Cra 7 # 45-12', 'warning');
        return;
      }

      // 5. Todo bien - verificar si tiene complemento
      if (!patrones.complementos.test(v) && v.split(/\s+/).length < 5) {
        mostrarMensaje('💡 Sugerencia: Agrega complemento (Apto, Casa, Interior, Barrio)', 'warning');
        return;
      }

      // ✅ DIRECCIÓN VÁLIDA
      mostrarMensaje('✓ Dirección válida', 'success');
    }

    // Validar mientras escribe (con delay para no saturar)
    var timeoutId;
    input.addEventListener('input', function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function() {
        validar(input.value);
      }, 600); // 600ms de delay
    });

    // Validar al salir del campo
    input.addEventListener('blur', function() {
      validar(input.value);
    });

    // Validar al cargar si ya tiene valor
    if (input.value && input.value.trim()) {
      setTimeout(function() {
        validar(input.value);
      }, 300);
    }

    log('Validación configurada. Escriba en el campo para ver mensajes.');
  }

  // =========================
  // BLOQUEO DE SUBMIT SI HAY REBOTE
  // =========================
  function bloquearRebotes() {
    log('✓ Sistema anti-rebotes activado');

    // Interceptar clicks en botón de submit
    document.addEventListener('click', function(e) {
      try {
        var target = e.target;
        if (!target) return;

        // Buscar si es el botón de submit de Funnelish
        var submitBtn = target.closest ? target.closest('a[href="#submit-step"]') : null;
        if (!submitBtn) return;

        log('Click en submit detectado');

        // Obtener teléfono del campo hidden (ya validado por el código original)
        var phoneInput = document.querySelector('input[name="phone"]');
        if (!phoneInput || !phoneInput.value) {
          log('No hay teléfono, permitiendo continuar');
          return;
        }

        var telefono = phoneInput.value.trim();
        
        // Solo validar si tiene formato correcto +57XXXXXXXXXX
        if (!/^\+57[3]\d{9}$/.test(telefono)) {
          log('Teléfono no válido (' + telefono + '), permitiendo continuar');
          return;
        }

        log('Teléfono válido: ' + telefono);

        // Verificar si es un rebote inmediato
        var resultado = verificarReboteInmediato(telefono);
        
        if (resultado.esRebote) {
          // ⛔ BLOQUEAR SUBMIT
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          log('⛔ SUBMIT BLOQUEADO - Rebote inmediato detectado');

          if (CONFIG.mostrarAlertas) {
            mostrarAlertaRebote(resultado.minutosRestantes, resultado.segundosDesdeIntento);
          }

          return false;
        }

        // ✅ No es rebote, permitir submit y guardar intento
        log('✓ No es rebote, permitiendo submit');
        guardarIntentoSubmit(telefono);

      } catch(x) {
        log('Error en bloqueo: ' + x.message);
      }
    }, true); // useCapture = true para interceptar primero
  }

  // =========================
  // ALERTA VISUAL DE REBOTE
  // =========================
  function mostrarAlertaRebote(minutos, segundos) {
    // Remover alerta anterior si existe
    var alertaVieja = document.getElementById('addon-alerta-rebote');
    if (alertaVieja) alertaVieja.remove();

    var alerta = document.createElement('div');
    alerta.id = 'addon-alerta-rebote';
    alerta.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border: 3px solid #f59e0b;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      z-index: 999999;
      max-width: 420px;
      text-align: center;
      animation: bounceIn 0.5s ease;
    `;

    // Añadir animación
    var style = document.createElement('style');
    style.textContent = `
      @keyframes bounceIn {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
        70% { transform: translate(-50%, -50%) scale(0.9); }
        100% { transform: translate(-50%, -50%) scale(1); }
      }
      #addon-cerrar-alerta:hover {
        background: #f59e0b;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
      }
    `;
    document.head.appendChild(style);

    alerta.innerHTML = `
      <div style="font-size: 56px; margin-bottom: 16px;">⚡</div>
      <h3 style="margin: 0 0 12px 0; color: #92400e; font-size: 22px; font-weight: 700;">
        ¡Espera un momento!
      </h3>
      <p style="margin: 0 0 20px 0; color: #64748b; font-size: 15px; line-height: 1.6;">
        Acabas de hacer click en el botón hace <strong style="color: #f59e0b;">${segundos} segundos</strong>.
        <br><br>
        Por favor espera <strong style="color: #f59e0b;">${minutos} minutos</strong> antes de volver a intentarlo.
        <br><br>
        <span style="font-size: 13px; color: #94a3b8;">
          Esto evita pedidos duplicados accidentales.
        </span>
      </p>
      <button id="addon-cerrar-alerta" style="
        background: #fbbf24;
        color: #78350f;
        border: none;
        padding: 14px 28px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        width: 100%;
      ">Entendido</button>
    `;

    document.body.appendChild(alerta);

    // Cerrar al hacer click
    document.getElementById('addon-cerrar-alerta').addEventListener('click', function() {
      alerta.remove();
    });

    // Auto-cerrar en 10 segundos
    setTimeout(function() {
      if (alerta && alerta.parentNode) alerta.remove();
    }, 10000);

    log('Alerta de rebote mostrada');
  }

  // =========================
  // INICIALIZACIÓN
  // =========================
  function init() {
    log('');
    log('═══════════════════════════════════════');
    log('  ADDON INICIANDO...');
    log('═══════════════════════════════════════');
    
    inyectarEstilos();

    // 1. Validación de dirección
    var addressInput = document.querySelector('input[name="shipping_address"]') || 
                       document.querySelector('input[name="address"]');
    
    if (addressInput) {
      log('✓ Campo de dirección encontrado: ' + addressInput.name);
      validarDireccion(addressInput);
    } else {
      log('⚠️ No se encontró campo de dirección');
      log('   Buscando: input[name="shipping_address"] o input[name="address"]');
      // Intentar de nuevo en 2 segundos
      setTimeout(function() {
        var retry = document.querySelector('input[name="shipping_address"]') || 
                    document.querySelector('input[name="address"]');
        if (retry) {
          log('✓ Campo encontrado en segundo intento');
          validarDireccion(retry);
        }
      }, 2000);
    }

    // 2. Bloqueo de rebotes
    bloquearRebotes();

    log('═══════════════════════════════════════');
    log('  ADDON ACTIVO ✓');
    log('  - Validación: ' + (addressInput ? 'ON' : 'ESPERANDO'));
    log('  - Anti-rebotes: ON');
    log('  - Bloqueo: ' + CONFIG.bloqueoMinutos + ' minutos');
    log('═══════════════════════════════════════');
    log('');
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 800); // Esperar 800ms para que Funnelish cargue
    });
  } else {
    setTimeout(init, 800);
  }

  // Re-inicializar si el DOM cambia (Funnelish puede recargar el form)
  var reintentos = 0;
  var observer = new MutationObserver(function() {
    var addressInput = document.querySelector('input[name="shipping_address"]') || 
                       document.querySelector('input[name="address"]');
    
    if (addressInput && !addressInput.dataset.addonValidacion && reintentos < 5) {
      reintentos++;
      log('DOM cambió, re-inicializando... (intento ' + reintentos + ')');
      setTimeout(init, 500);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  log('Script addon cargado en memoria ✓');

})();
