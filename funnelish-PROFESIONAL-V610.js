/**
 * SISTEMA PROFESIONAL COD COLOMBIA
 * - Google Places Autocomplete (direcciones perfectas)
 * - Validación de teléfono colombiano
 * - Carritos abandonados a Supabase
 * - Auto-confirmación por WhatsApp
 */

(function () {
  'use strict';

  // =========================
  // CONFIGURACIÓN GLOBAL
  // =========================
  var CONFIG = {
    // Google Maps API
    googleApiKey: 'TU_GOOGLE_API_KEY_AQUI', // ⚠️ Obtener en: https://console.cloud.google.com
    
    // Teléfono Colombia
    pais: 'CO',
    dial: '+57',
    regex: /^3\d{9}$/,
    maxLength: 10,
    mensajeError: 'Debe empezar con 3 y tener 10 dígitos. Ej: 3001234567',
    
    // Supabase
    supabaseUrl: 'https://nhccgonibsbymmydovts.supabase.co',
    supabaseAnonKey: '', // Opcional si JWT está desactivado
    useAuth: false,
    
    // Carritos abandonados
    minutosInactividad: 3,
    debug: true
  };

  // =========================
  // GOOGLE PLACES AUTOCOMPLETE
  // =========================
  function initGooglePlaces() {
    // Cargar Google Maps API
    if (!window.google || !window.google.maps) {
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + CONFIG.googleApiKey + '&libraries=places&language=es&region=CO';
      script.async = true;
      script.defer = true;
      script.onload = function() {
        setupAutocomplete();
      };
      document.head.appendChild(script);
    } else {
      setupAutocomplete();
    }
  }

  function setupAutocomplete() {
    var addressInput = document.querySelector('input[name="shipping_address"]');
    var cityInput = document.querySelector('input[name="shipping_city"]');
    var stateSelect = document.querySelector('select[name="shipping_state"]');

    if (!addressInput) return;

    // Configurar autocompletado solo para Colombia
    var autocomplete = new google.maps.places.Autocomplete(addressInput, {
      types: ['address'],
      componentRestrictions: { country: 'co' },
      fields: ['address_components', 'formatted_address', 'geometry']
    });

    // Cuando selecciona una dirección
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      
      if (!place.address_components) {
        log('No se obtuvo información completa de la dirección');
        return;
      }

      log('✓ Dirección seleccionada:', place.formatted_address);

      // Extraer componentes
      var ciudad = '';
      var departamento = '';
      var direccion = place.formatted_address;

      place.address_components.forEach(function(component) {
        var types = component.types;
        
        // Ciudad
        if (types.includes('locality')) {
          ciudad = component.long_name;
        }
        
        // Departamento
        if (types.includes('administrative_area_level_1')) {
          departamento = component.long_name;
        }
      });

      // Llenar campos automáticamente
      if (ciudad && cityInput) {
        cityInput.value = ciudad;
        cityInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (departamento && stateSelect) {
        // Buscar el departamento en el select
        for (var i = 0; i < stateSelect.options.length; i++) {
          if (stateSelect.options[i].value === departamento || 
              stateSelect.options[i].text === departamento) {
            stateSelect.selectedIndex = i;
            stateSelect.dispatchEvent(new Event('change', { bubbles: true }));
            break;
          }
        }
      }

      log('Ciudad:', ciudad, '| Departamento:', departamento);
    });

    // Estilo visual mejorado
    addressInput.placeholder = '🔍 Escribe tu dirección...';
    addressInput.style.cssText = 'font-size: 15px; padding: 12px;';
  }

  // =========================
  // VALIDACIÓN TELÉFONO
  // =========================
  function soloDigitos(v) {
    return (v || '').replace(/\D+/g, '');
  }

  function inyectarEstilosTelefono() {
    if (document.getElementById('cod-phone-styles')) return;
    
    var css = document.createElement('style');
    css.id = 'cod-phone-styles';
    css.textContent = `
      .cod-phone-wrapper { width: 100%; }
      .cod-phone-field {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #fff;
        border: 2px solid #e2e8f0;
        border-radius: 10px;
        padding: 12px 16px;
        transition: all 0.2s;
      }
      .cod-phone-field:focus-within {
        border-color: #3b82f6;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
      }
      .cod-phone-field.error {
        border-color: #ef4444;
      }
      .cod-phone-field.success {
        border-color: #10b981;
      }
      .cod-phone-prefix {
        color: #64748b;
        font-weight: 600;
        font-size: 16px;
      }
      .cod-phone-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 16px;
        color: #1e293b;
        background: transparent;
      }
      .cod-phone-status {
        font-size: 20px;
      }
      .cod-phone-error {
        color: #ef4444;
        font-size: 13px;
        margin-top: 8px;
        display: none;
      }
      .cod-phone-error.visible {
        display: block;
      }
    `;
    document.head.appendChild(css);
  }

  function construirTelefonoUI(hiddenInput) {
    if (hiddenInput.dataset.codEnhanced === '1') return;
    hiddenInput.dataset.codEnhanced = '1';

    hiddenInput.type = 'hidden';

    var wrapper = document.createElement('div');
    wrapper.className = 'cod-phone-wrapper';

    var field = document.createElement('div');
    field.className = 'cod-phone-field';

    var prefix = document.createElement('span');
    prefix.className = 'cod-phone-prefix';
    prefix.textContent = CONFIG.dial;

    var visibleInput = document.createElement('input');
    visibleInput.type = 'tel';
    visibleInput.className = 'cod-phone-input';
    visibleInput.placeholder = '3001234567';
    visibleInput.maxLength = CONFIG.maxLength;

    var status = document.createElement('span');
    status.className = 'cod-phone-status';

    var errorMsg = document.createElement('div');
    errorMsg.className = 'cod-phone-error';
    errorMsg.textContent = CONFIG.mensajeError;

    field.appendChild(prefix);
    field.appendChild(visibleInput);
    field.appendChild(status);
    wrapper.appendChild(field);
    wrapper.appendChild(errorMsg);

    hiddenInput.parentNode.insertBefore(wrapper, hiddenInput);

    var validar = function() {
      var digitos = soloDigitos(visibleInput.value);
      var valido = CONFIG.regex.test(digitos);
      
      field.classList.remove('error', 'success');
      
      if (digitos.length > 0) {
        if (valido) {
          field.classList.add('success');
          status.textContent = '✓';
          status.style.color = '#10b981';
          errorMsg.classList.remove('visible');
          hiddenInput.value = CONFIG.dial + digitos;
        } else {
          field.classList.add('error');
          status.textContent = '✗';
          status.style.color = '#ef4444';
          errorMsg.classList.add('visible');
          hiddenInput.value = '';
        }
      } else {
        status.textContent = '';
        errorMsg.classList.remove('visible');
        hiddenInput.value = '';
      }
      
      return valido;
    };

    visibleInput.addEventListener('input', function() {
      var digitos = soloDigitos(this.value);
      this.value = digitos.slice(0, CONFIG.maxLength);
      validar();
    });

    visibleInput.addEventListener('blur', validar);
  }

  // =========================
  // UTILS
  // =========================
  function generarEmail() {
    return 'cliente' + Math.random().toString().slice(2, 10) + Date.now().toString().slice(-4) + '@codcolombia.co';
  }

  function ocultarCampo(nombre) {
    var el = document.querySelector('[name="' + nombre + '"]');
    if (el) {
      var formEl = el.closest('.form-element');
      if (formEl) formEl.style.display = 'none';
    }
  }

  function log(msg) {
    if (CONFIG.debug) console.log('[COD-CO]', msg);
  }

  // =========================
  // DEPARTAMENTOS
  // =========================
  function inyectarDepartamentos() {
    var departamentos = [
      "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar", 
      "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", 
      "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", 
      "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", 
      "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", "Tolima", 
      "Valle del Cauca", "Vaupés", "Vichada"
    ];

    var select = document.querySelector('select[name="shipping_state"]');
    if (!select || select.dataset.injected === '1') return;
    
    select.dataset.injected = '1';
    select.innerHTML = '<option value="">Selecciona departamento</option>';
    
    departamentos.forEach(function(d) {
      var opt = document.createElement('option');
      opt.value = d;
      opt.text = d;
      select.appendChild(opt);
    });
  }

  // =========================
  // INICIALIZACIÓN
  // =========================
  function init() {
    log('Inicializando sistema profesional COD Colombia...');
    
    inyectarEstilosTelefono();
    ocultarCampo('email');
    inyectarDepartamentos();

    // Email automático
    var emailInput = document.querySelector('input[name="email"]');
    if (emailInput && !emailInput.value) {
      emailInput.value = generarEmail();
    }

    // Teléfono
    var phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
      construirTelefonoUI(phoneInput);
    }

    // Google Places (si hay API key)
    if (CONFIG.googleApiKey && CONFIG.googleApiKey !== 'TU_GOOGLE_API_KEY_AQUI') {
      initGooglePlaces();
    } else {
      log('⚠️ Google API Key no configurada - Autocomplete desactivado');
    }

    log('✓ Sistema inicializado');
  }

  // Bootstrap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 300);
    });
  } else {
    setTimeout(init, 300);
  }

})();

// =========================
// MÓDULO: CARRITOS ABANDONADOS
// =========================
;(function() {
  'use strict';
  
  var CONFIG = {
    supabaseUrl: 'https://nhccgonibsbymmydovts.supabase.co',
    supabaseAnonKey: '',
    useAuth: false,
    minutosInactividad: 3,
    debug: true
  };

  var WEBHOOK_URL = CONFIG.supabaseUrl + '/functions/v1/capture-abandoned-cart';
  var _enviado = false;
  var _ordenCompletada = false;

  function log(msg) {
    if (CONFIG.debug) console.log('[ABANDONO]', msg);
  }

  function obtenerDatos() {
    var val = function(n) {
      try {
        var e = document.querySelector('input[name="'+n+'"]');
        return e && e.value ? e.value.trim() : '';
      } catch(x) { return ''; }
    };

    var nombre = val('first_name') || val('name') || '';
    var telefono = val('phone');
    var ciudad = val('shipping_city');
    var direccion = val('shipping_address');

    return {
      nombre: nombre,
      telefono: telefono,
      ciudad: ciudad,
      direccion: direccion,
      valido: /^\+57[3]\d{9}$/.test(telefono) && nombre.length > 0
    };
  }

  function enviarAbandono(razon) {
    if (_enviado || _ordenCompletada) return;

    var datos = obtenerDatos();
    if (!datos.valido) {
      log('Datos incompletos, no se envía');
      return;
    }

    _enviado = true;
    log('📤 Enviando abandono:', razon);

    var paquete = { id: 1, label: '1 Frasco', price: 0 };
    
    try {
      if (window.funnel && window.funnel.product) {
        var p = window.funnel.product;
        if (p.variant_id) paquete.id = p.variant_id;
        if (p.variant_name) paquete.label = p.variant_name;
        if (p.price) paquete.price = p.price;
      }
    } catch(x) {}

    var payload = {
      nombre: datos.nombre,
      telefono: datos.telefono,
      paquete: paquete,
      ciudad: datos.ciudad,
      direccion: datos.direccion,
      razon: razon,
      timestamp: new Date().toISOString()
    };

    var headers = { 'Content-Type': 'application/json' };
    if (CONFIG.useAuth && CONFIG.supabaseAnonKey) {
      headers['apikey'] = CONFIG.supabaseAnonKey;
      headers['Authorization'] = 'Bearer ' + CONFIG.supabaseAnonKey;
    }

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
      keepalive: true,
      mode: 'cors'
    })
    .then(function(res) {
      if (res.ok) {
        log('✅ Enviado exitosamente');
      } else {
        log('❌ Error HTTP ' + res.status);
      }
    })
    .catch(function(err) {
      log('❌ Error:', err.message);
    });
  }

  // Detectar orden completada
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('a[href="#submit-step"]');
    if (btn) {
      var datos = obtenerDatos();
      if (datos.valido) {
        setTimeout(function() {
          _ordenCompletada = true;
          log('✓ Orden completada detectada');
        }, 1500);
      }
    }
  });

  // Eventos de abandono
  window.addEventListener('beforeunload', function() {
    enviarAbandono('cerro_pagina');
  });

  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
      enviarAbandono('cambio_pestana');
    }
  });

  var timer;
  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      enviarAbandono('inactividad_' + CONFIG.minutosInactividad + 'min');
    }, CONFIG.minutosInactividad * 60000);
  }

  ['click', 'keydown', 'scroll'].forEach(function(ev) {
    document.addEventListener(ev, resetTimer, { passive: true });
  });
  resetTimer();

  log('✓ Módulo de abandonos activo');
})();
