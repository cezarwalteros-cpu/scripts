// ╔═══════════════════════════════════════════════════════════╗
// ║  VALIDACIÓN DE DIRECCIÓN - VERSIÓN FINAL                 ║
// ║  Funciona con campos custom de Funnelish                 ║
// ╚═══════════════════════════════════════════════════════════╝

(function() {
  'use strict';

  console.log('🔍 VALIDACIÓN DE DIRECCIÓN - Cargando...');

  // =========================
  // ESTILOS
  // =========================
  var css = document.createElement('style');
  css.textContent = `
    .validacion-dir-msg {
      margin-top: 8px !important;
      padding: 12px 16px !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      line-height: 1.5 !important;
      display: block !important;
      clear: both !important;
    }
    .validacion-dir-msg.oculto {
      display: none !important;
    }
    .validacion-dir-msg.error {
      background: #fee2e2 !important;
      color: #dc2626 !important;
      border-left: 4px solid #dc2626 !important;
    }
    .validacion-dir-msg.warning {
      background: #fef3c7 !important;
      color: #92400e !important;
      border-left: 4px solid #f59e0b !important;
    }
    .validacion-dir-msg.success {
      background: #d1fae5 !important;
      color: #065f46 !important;
      border-left: 4px solid #10b981 !important;
    }
  `;
  document.head.appendChild(css);
  console.log('✓ Estilos inyectados');

  // =========================
  // BUSCAR CAMPO DE DIRECCIÓN
  // =========================
  function buscarCampo() {
    console.log('🔎 Buscando campo de dirección...');

    // Estrategia 1: Por data-name="Dirección"
    var campo = document.querySelector('input[data-name="Dirección"]');
    if (campo) {
      console.log('✓ Encontrado por data-name="Dirección"');
      return campo;
    }

    // Estrategia 2: Por name="custom" + placeholder con "direcci"
    var customs = document.querySelectorAll('input[name="custom"]');
    for (var i = 0; i < customs.length; i++) {
      var ph = (customs[i].placeholder || '').toLowerCase();
      if (ph.indexOf('direcci') > -1 || ph.indexOf('address') > -1) {
        console.log('✓ Encontrado por name="custom" + placeholder');
        return customs[i];
      }
    }

    // Estrategia 3: Buscar por placeholder
    var inputs = document.querySelectorAll('input[type="text"], input:not([type])');
    for (var j = 0; j < inputs.length; j++) {
      var placeholder = (inputs[j].placeholder || '').toLowerCase();
      if (placeholder.indexOf('direcci') > -1 || 
          placeholder.indexOf('address') > -1 ||
          placeholder.indexOf('calle') > -1 ||
          placeholder.indexOf('carrera') > -1) {
        console.log('✓ Encontrado por placeholder: "' + inputs[j].placeholder + '"');
        return inputs[j];
      }
    }

    console.log('❌ No encontrado');
    return null;
  }

  // =========================
  // ACTIVAR VALIDACIÓN
  // =========================
  function activar(input) {
    if (input.dataset.validDireccion === '1') return;
    input.dataset.validDireccion = '1';

    console.log('✅ Activando validación en:', input.name);

    // Crear mensaje
    var msg = document.createElement('div');
    msg.className = 'validacion-dir-msg oculto';
    msg.id = 'msg-dir-validacion';

    // Insertar DESPUÉS del input, dentro del mismo parent
    var parent = input.parentElement;
    parent.appendChild(msg);

    console.log('✓ Mensaje insertado en:', parent.className);

    // Patrones
    var patrones = {
      vias: /\b(calle|carrera|avenida|diagonal|transversal|circular|cra|cl|av|dg|tv|cr|kr|vereda|manzana|barrio)\b/i,
      numeros: /\d+/,
      formato: /\b(calle|carrera|cra|cl|kr|cr|av|avenida|diagonal|dg|transversal|tv)\s*\d+.*[#\-]\s*\d+/i
    };

    function mostrar(texto, tipo) {
      console.log('💬 ' + tipo.toUpperCase() + ':', texto);
      msg.className = 'validacion-dir-msg ' + tipo;
      msg.textContent = texto;
    }

    function ocultar() {
      msg.className = 'validacion-dir-msg oculto';
    }

    function validar(valor) {
      var v = valor.trim();
      
      if (v.length === 0) {
        ocultar();
        return;
      }

      if (v.length < 10) {
        mostrar('⚠️ Dirección muy corta. Ejemplo: Calle 45 # 23-15', 'warning');
        return;
      }

      if (!patrones.numeros.test(v)) {
        mostrar('❌ Debe incluir números. Ejemplo: Cra 7 # 45-12', 'error');
        return;
      }

      if (!patrones.vias.test(v)) {
        mostrar('❌ Especifica el tipo de vía (Calle, Carrera, Avenida, etc)', 'error');
        return;
      }

      if (!patrones.formato.test(v)) {
        mostrar('⚡ Usa el formato: Calle 45 # 23-15 o Cra 7 # 45-12', 'warning');
        return;
      }

      mostrar('✓ Dirección válida', 'success');
      setTimeout(ocultar, 3000);
    }

    // Listeners
    var timer;
    input.addEventListener('input', function() {
      clearTimeout(timer);
      timer = setTimeout(function() {
        validar(input.value);
      }, 600);
    });

    input.addEventListener('blur', function() {
      validar(input.value);
    });

    console.log('✓ Listeners activos');
  }

  // =========================
  // INIT
  // =========================
  function init() {
    var campo = buscarCampo();
    
    if (!campo) {
      console.log('⚠️ Reintentando en 2 segundos...');
      return false;
    }

    activar(campo);
    
    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('✅ VALIDACIÓN ACTIVA');
    console.log('═══════════════════════════════════════════');
    console.log('Escribe en el campo de dirección');
    console.log('');
    
    return true;
  }

  // Ejecutar
  setTimeout(function() {
    if (!init()) {
      // Reintentar cada 2 seg, máximo 5 veces
      var intentos = 0;
      var intervalo = setInterval(function() {
        intentos++;
        if (init() || intentos >= 5) {
          clearInterval(intervalo);
        }
      }, 2000);
    }
  }, 1000);

})();
