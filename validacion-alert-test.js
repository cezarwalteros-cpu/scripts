// ╔═══════════════════════════════════════════════════════════╗
// ║  VALIDACIÓN CON ALERT - PRUEBA                           ║
// ║  Usa alert() nativo para confirmar que funciona          ║
// ╚═══════════════════════════════════════════════════════════╝

(function() {
  'use strict';

  console.log('🔍 VALIDACIÓN CON ALERT - Cargando...');

  function buscarCampo() {
    var nombres = ['shipping_address', 'address', 'shipping_address_1', 'direccion'];
    
    for (var i = 0; i < nombres.length; i++) {
      var campo = document.querySelector('input[name="' + nombres[i] + '"]');
      if (campo) {
        console.log('✓ Campo encontrado: ' + nombres[i]);
        return campo;
      }
    }
    return null;
  }

  function activarValidacion(input) {
    if (input.dataset.alertValidacion === '1') return;
    input.dataset.alertValidacion = '1';

    console.log('✓ Validación activada con ALERT');

    var patrones = {
      vias: /\b(calle|carrera|avenida|diagonal|transversal|cra|cl|av|dg|tv|cr|kr)\b/i,
      numeros: /\d+/,
      formato: /\b(calle|carrera|cra|cl|kr|cr|av|avenida|diagonal|dg|transversal|tv)\s*\d+.*[#\-]\s*\d+/i
    };

    function validar(valor) {
      var v = valor.trim();
      
      if (v.length === 0) return;

      console.log('🔍 Validando: "' + v + '"');

      var mensaje = '';
      var tipo = '';

      if (v.length < 10) {
        mensaje = '⚠️ Dirección muy corta\n\nEjemplo: Calle 45 # 23-15';
        tipo = 'warning';
      } else if (!patrones.numeros.test(v)) {
        mensaje = '❌ Debe incluir números\n\nEjemplo: Cra 7 # 45-12';
        tipo = 'error';
      } else if (!patrones.vias.test(v)) {
        mensaje = '❌ Especifica el tipo de vía\n\n(Calle, Carrera, Avenida, etc)';
        tipo = 'error';
      } else if (!patrones.formato.test(v)) {
        mensaje = '⚡ Usa el formato correcto\n\nEjemplo: Calle 45 # 23-15';
        tipo = 'warning';
      } else {
        mensaje = '✓ Dirección válida';
        tipo = 'success';
      }

      console.log('💬 ' + tipo.toUpperCase() + ': ' + mensaje.split('\n')[0]);
      
      // MOSTRAR ALERT
      alert(mensaje);
    }

    // Validar solo cuando sale del campo (blur)
    input.addEventListener('blur', function() {
      validar(input.value);
    });

    console.log('✓ Listener en blur (se activa al salir del campo)');
  }

  function init() {
    var campo = buscarCampo();
    
    if (!campo) {
      console.log('❌ Campo no encontrado');
      return;
    }

    activarValidacion(campo);
    
    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('✅ VALIDACIÓN CON ALERT ACTIVA');
    console.log('═══════════════════════════════════════════');
    console.log('');
    console.log('📝 INSTRUCCIONES:');
    console.log('1. Escribe algo en el campo de dirección');
    console.log('2. Presiona TAB o haz click fuera');
    console.log('3. Verás un ALERT con el mensaje');
    console.log('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 1000);
    });
  } else {
    setTimeout(init, 1000);
  }

  var reintentos = 0;
  var intervalo = setInterval(function() {
    reintentos++;
    if (reintentos > 3) {
      clearInterval(intervalo);
      return;
    }

    var campo = buscarCampo();
    if (campo && campo.dataset.alertValidacion !== '1') {
      clearInterval(intervalo);
      activarValidacion(campo);
    }
  }, 2000);

})();
