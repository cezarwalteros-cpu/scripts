/**
 * SISTEMA PROFESIONAL COD COLOMBIA - V7
 * ======================================
 * Conectado a Supabase Edge Functions (backend seguro)
 * 
 * Funcionalidades:
 * - Google Places Autocomplete (direcciones perfectas)
 * - Validacion de telefono colombiano con UI mejorada
 * - Validacion de nombre (minimo 3 caracteres, 2 palabras)
 * - Carritos abandonados con deduplicacion
 * - Deteccion robusta de orden completada
 * - Sin API keys expuestas en frontend
 * 
 * Endpoints que usa:
 * - POST /functions/v1/webhook-funnelish      → Ordenes completadas
 * - POST /functions/v1/capture-abandoned-cart  → Carritos abandonados
 * 
 * INSTRUCCIONES:
 * 1. Reemplaza googleApiKey con tu API key de Google (restringida por dominio)
 * 2. Reemplaza backendUrl si tu proyecto de Supabase cambia
 * 3. Agrega tus dominios de Funnelish al ALLOWED_ORIGINS en el backend
 * 4. Sube este archivo a tu landing de Funnelish en la seccion de Custom JS
 */

// =============================================================================
// MODULO PRINCIPAL: UI + VALIDACION + ENVIO DE ORDENES
// =============================================================================
(function () {
  'use strict';

  // =========================
  // CONFIGURACION GLOBAL
  // =========================
  var CONFIG = {
    // Google Maps API (restringir por dominio en Google Cloud Console)
    googleApiKey: 'AIzaSyCn9cJltSpmxB9Q9SQklAvEZyEBzrLoa60',
    
    // Backend - Solo la URL base, sin keys expuestas
    backendUrl: 'https://nhccgonibsbymmydovts.supabase.co',
    
    // Telefono Colombia
    pais: 'CO',
    dial: '+57',
    regex: /^3\d{9}$/,
    maxLength: 10,
    mensajeError: 'Debe empezar con 3 y tener 10 digitos. Ej: 3001234567',
    
    // Validacion nombre
    nombreMinLength: 3,
    nombreRegex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,}$/,
    nombreErrorMsg: 'Ingresa tu nombre completo (nombre y apellido)',
    
    // Debug (poner false en produccion)
    debug: true
  };

  // =========================
  // GOOGLE PLACES AUTOCOMPLETE
  // =========================
  var _placesSeleccionado = false; // Flag: usuario selecciono del autocompletado

  function initGooglePlaces() {
    if (!window.google || !window.google.maps) {
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + CONFIG.googleApiKey + '&libraries=places&language=es&region=CO';
      script.async = true;
      script.defer = true;
      script.onload = function() {
        setupAutocomplete();
      };
      script.onerror = function() {
        log('Error cargando Google Maps API');
      };
      document.head.appendChild(script);
    } else {
      setupAutocomplete();
    }
  }

  function setupAutocomplete() {
    var addressInput = document.querySelector('input[name="shipping_address"]');
    var cityInput = document.querySelector('input[name="shipping_city"]');
    var stateInput = document.querySelector('select[name="shipping_state"]') || 
                     document.querySelector('input[name="shipping_state"]');

    if (!addressInput) {
      log('Campo de direccion no encontrado');
      return;
    }

    var autocomplete = new google.maps.places.Autocomplete(addressInput, {
      types: ['address'],
      componentRestrictions: { country: 'co' },
      fields: ['address_components', 'formatted_address', 'geometry']
    });

    // Cuando selecciona una direccion del autocompletado
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      
      if (!place.address_components) {
        log('No se obtuvo informacion completa de la direccion');
        return;
      }

      _placesSeleccionado = true; // Marcar que selecciono del autocompletado
      var ciudad = '';
      var departamento = '';

      place.address_components.forEach(function(component) {
        var types = component.types;
        if (types.includes('locality')) {
          ciudad = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
          departamento = component.long_name;
        }
      });

      // Llenar campos ocultos automaticamente
      if (ciudad && cityInput) {
        cityInput.value = ciudad;
        cityInput.dispatchEvent(new Event('change', { bubbles: true }));
        log('Ciudad: ' + ciudad);
      }

      if (departamento && stateInput) {
        if (stateInput.tagName === 'SELECT') {
          for (var i = 0; i < stateInput.options.length; i++) {
            if (stateInput.options[i].value === departamento || 
                stateInput.options[i].text === departamento) {
              stateInput.selectedIndex = i;
              stateInput.dispatchEvent(new Event('change', { bubbles: true }));
              break;
            }
          }
        } else {
          stateInput.value = departamento;
          stateInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
        log('Departamento: ' + departamento);
      }

      log('Direccion completa: ' + place.formatted_address);
    });

    // Si el usuario edita manualmente despues de seleccionar, resetear flag
    addressInput.addEventListener('input', function() {
      _placesSeleccionado = false;
    });

    addressInput.placeholder = 'Escribe tu direccion completa...';
  }

  // =========================
  // VALIDACION TELEFONO
  // =========================
  function soloDigitos(v) {
    return (v || '').replace(/\D+/g, '');
  }

  function inyectarEstilos() {
    if (document.getElementById('cod-v7-styles')) return;
    
    var css = document.createElement('style');
    css.id = 'cod-v7-styles';
    css.textContent = 
      '.cod-phone-wrapper { width: 100%; }' +
      '.cod-phone-field {' +
      '  display: flex; align-items: center; gap: 8px;' +
      '  background: #fff; border: 2px solid #e2e8f0;' +
      '  border-radius: 10px; padding: 12px 16px; transition: all 0.2s;' +
      '}' +
      '.cod-phone-field:focus-within { border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59,130,246,0.1); }' +
      '.cod-phone-field.error { border-color: #ef4444; }' +
      '.cod-phone-field.success { border-color: #10b981; }' +
      '.cod-phone-prefix { color: #64748b; font-weight: 600; font-size: 16px; }' +
      '.cod-phone-input {' +
      '  flex: 1; border: none; outline: none;' +
      '  font-size: 16px; color: #1e293b; background: transparent;' +
      '}' +
      '.cod-phone-status { font-size: 20px; }' +
      '.cod-field-error {' +
      '  color: #ef4444; font-size: 13px; margin-top: 8px; display: none;' +
      '}' +
      '.cod-field-error.visible { display: block; }' +
      '.cod-nombre-error {' +
      '  color: #ef4444; font-size: 13px; margin-top: 4px; display: none;' +
      '}' +
      '.cod-nombre-error.visible { display: block; }';
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
    errorMsg.className = 'cod-field-error';
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
          status.textContent = '\u2713';
          status.style.color = '#10b981';
          errorMsg.classList.remove('visible');
          hiddenInput.value = CONFIG.dial + digitos;
        } else {
          field.classList.add('error');
          status.textContent = '\u2717';
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
  // VALIDACION NOMBRE
  // =========================
  function configurarValidacionNombre(nombreInput) {
    if (!nombreInput || nombreInput.dataset.codNombreValidado === '1') return;
    nombreInput.dataset.codNombreValidado = '1';

    var errorDiv = document.createElement('div');
    errorDiv.className = 'cod-nombre-error';
    errorDiv.textContent = CONFIG.nombreErrorMsg;
    
    var parent = nombreInput.closest('.form-element') || nombreInput.parentNode;
    parent.appendChild(errorDiv);

    nombreInput.addEventListener('blur', function() {
      var valor = (this.value || '').trim();
      var palabras = valor.split(/\s+/).filter(function(p) { return p.length > 0; });
      var valido = CONFIG.nombreRegex.test(valor) && palabras.length >= 2;
      
      if (valor.length > 0 && !valido) {
        errorDiv.classList.add('visible');
      } else {
        errorDiv.classList.remove('visible');
      }
    });
  }

  // =========================
  // UTILS
  // =========================
  function generarEmail() {
    return 'cliente' + Math.random().toString().slice(2, 10) + Date.now().toString().slice(-4) + '@codcolombia.co';
  }

  function generarOrderId() {
    return 'ORD-FUN-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  }

  function ocultarCampo(nombre) {
    var el = document.querySelector('[name="' + nombre + '"]');
    if (el) {
      var formEl = el.closest('.form-element');
      if (formEl) formEl.style.display = 'none';
    }
  }

  function obtenerValor(nombre) {
    try {
      var el = document.querySelector('input[name="' + nombre + '"]');
      return el && el.value ? el.value.trim() : '';
    } catch(x) { return ''; }
  }

  function log() {
    if (CONFIG.debug) {
      var args = ['[COD-V7]'].concat(Array.prototype.slice.call(arguments));
      console.log.apply(console, args);
    }
  }

  // =========================
  // ENVIO SEGURO AL BACKEND
  // =========================
  function enviarAlBackend(endpoint, payload) {
    var url = CONFIG.backendUrl + '/functions/v1/' + endpoint;
    
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Source': 'funnelish'
      },
      body: JSON.stringify(payload),
      keepalive: true
    })
    .then(function(res) {
      if (res.ok) {
        log('Enviado a ' + endpoint);
        return res.json();
      } else {
        log('Error HTTP ' + res.status + ' en ' + endpoint);
        return res.json().then(function(data) {
          throw new Error(data.error || 'Error ' + res.status);
        });
      }
    })
    .catch(function(err) {
      log('Error enviando a ' + endpoint + ':', err.message);
      throw err;
    });
  }

  // =========================
  // INICIALIZACION
  // =========================
  function init() {
    log('Inicializando sistema COD Colombia V7...');
    
    inyectarEstilos();
    
    // Ocultar campos que no debe ver el cliente
    ocultarCampo('email');
    ocultarCampo('shipping_state');
    ocultarCampo('shipping_city');
    ocultarCampo('country');
    
    // Email automatico (oculto)
    var emailInput = document.querySelector('input[name="email"]');
    if (emailInput && !emailInput.value) {
      emailInput.value = generarEmail();
    }

    // Pais automatico (oculto)
    var countryInput = document.querySelector('input[name="country"]');
    if (countryInput) {
      countryInput.value = 'CO';
    }

    // Telefono con UI mejorada
    var phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
      construirTelefonoUI(phoneInput);
    }

    // Validacion de nombre
    var nombreInput = document.querySelector('input[name="first_name"]') ||
                      document.querySelector('input[name="name"]');
    if (nombreInput) {
      configurarValidacionNombre(nombreInput);
    }

    // Google Places
    if (CONFIG.googleApiKey && CONFIG.googleApiKey !== 'TU_GOOGLE_API_KEY_AQUI') {
      initGooglePlaces();
      log('Google Places activado');
    } else {
      log('Google API Key no configurada - autocompletado desactivado');
    }

    // Exponer funcion de envio para el modulo de abandonos
    window.__codV7 = {
      obtenerValor: obtenerValor,
      enviarAlBackend: enviarAlBackend,
      generarOrderId: generarOrderId,
      placesSeleccionado: function() { return _placesSeleccionado; },
      config: { dial: CONFIG.dial, regex: CONFIG.regex, backendUrl: CONFIG.backendUrl }
    };

    log('Sistema inicializado - Campos visibles: Nombre, Telefono, Direccion');
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


// =============================================================================
// MODULO: CARRITOS ABANDONADOS (con deduplicacion)
// =============================================================================
;(function() {
  'use strict';

  var DEBUG = true;
  var MINUTOS_INACTIVIDAD = 3;
  var _enviado = false;
  var _ordenCompletada = false;
  var _sessionKey = 'cod_abandono_enviado';

  function log() {
    if (DEBUG) {
      var args = ['[ABANDONO-V7]'].concat(Array.prototype.slice.call(arguments));
      console.log.apply(console, args);
    }
  }

  // Esperar a que el modulo principal este listo
  function esperarModuloPrincipal(callback) {
    var intentos = 0;
    var check = setInterval(function() {
      intentos++;
      if (window.__codV7) {
        clearInterval(check);
        callback();
      } else if (intentos > 50) {
        clearInterval(check);
        log('Modulo principal no encontrado');
      }
    }, 100);
  }

  function iniciarModuloAbandonos() {
    var cod = window.__codV7;

    // Verificar si ya se envio abandono en esta sesion
    function yaEnviadoEnSesion(telefono) {
      try {
        var data = sessionStorage.getItem(_sessionKey);
        if (!data) return false;
        var parsed = JSON.parse(data);
        return parsed.telefono === telefono && (Date.now() - parsed.timestamp) < 1800000; // 30 min
      } catch(e) { return false; }
    }

    function marcarEnviadoEnSesion(telefono) {
      try {
        sessionStorage.setItem(_sessionKey, JSON.stringify({
          telefono: telefono,
          timestamp: Date.now()
        }));
      } catch(e) {}
    }

    function obtenerDatos() {
      var nombre = cod.obtenerValor('first_name') || cod.obtenerValor('name') || '';
      var telefono = cod.obtenerValor('phone');
      var ciudad = cod.obtenerValor('shipping_city');
      var direccion = cod.obtenerValor('shipping_address');

      return {
        nombre: nombre,
        telefono: telefono,
        ciudad: ciudad,
        direccion: direccion,
        valido: cod.config.regex.test(telefono.replace(cod.config.dial, '')) && nombre.length >= 3
      };
    }

    function enviarAbandono(razon) {
      if (_enviado || _ordenCompletada) return;

      var datos = obtenerDatos();
      if (!datos.valido) {
        log('Datos incompletos, no se envia');
        return;
      }

      // Deduplicacion: verificar si ya se envio para este telefono en esta sesion
      if (yaEnviadoEnSesion(datos.telefono)) {
        log('Ya se envio abandono para este telefono en esta sesion');
        return;
      }

      _enviado = true;
      log('Enviando abandono: ' + razon);

      // Intentar obtener info del producto de Funnelish
      var paquete = { id: 1, label: 'Producto COD', price: 0 };
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
        source: 'funnelish',
        page_url: window.location.href,
        timestamp: new Date().toISOString()
      };

      cod.enviarAlBackend('capture-abandoned-cart', payload)
        .then(function() {
          marcarEnviadoEnSesion(datos.telefono);
          log('Abandono registrado');
        })
        .catch(function(err) {
          _enviado = false; // Permitir reintento si fallo
          log('Error registrando abandono:', err.message);
        });
    }

    // ==============================
    // DETECCION DE ORDEN COMPLETADA
    // ==============================

    // Metodo 1: Click en boton de submit de Funnelish
    document.addEventListener('click', function(e) {
      var btn = e.target.closest('a[href="#submit-step"]') || 
                e.target.closest('button[type="submit"]') ||
                e.target.closest('.funnelish-submit');
      
      if (btn) {
        var datos = obtenerDatos();
        if (datos.valido) {
          _ordenCompletada = true;
          log('Orden completada detectada (click submit)');
        }
      }
    });

    // Metodo 2: Detectar redireccion a thank you page
    var urlActual = window.location.href;
    setInterval(function() {
      if (window.location.href !== urlActual) {
        var nuevaUrl = window.location.href.toLowerCase();
        if (nuevaUrl.includes('thank') || nuevaUrl.includes('gracias') || 
            nuevaUrl.includes('confirmacion') || nuevaUrl.includes('success')) {
          _ordenCompletada = true;
          log('Orden completada detectada (redireccion thank you)');
        }
        urlActual = window.location.href;
      }
    }, 500);

    // Metodo 3: Escuchar eventos personalizados de Funnelish
    window.addEventListener('message', function(e) {
      try {
        if (e.data && (e.data.type === 'order_complete' || e.data.event === 'purchase')) {
          _ordenCompletada = true;
          log('Orden completada detectada (mensaje post)');
        }
      } catch(x) {}
    });

    // ==============================
    // TRIGGERS DE ABANDONO
    // ==============================

    // Trigger 1: Cierre de pagina
    window.addEventListener('beforeunload', function() {
      enviarAbandono('cerro_pagina');
    });

    // Trigger 2: Cambio de pestana (solo si lleva mas de 10 segundos oculta)
    var tiempoOculto = 0;
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
        tiempoOculto = Date.now();
      } else if (tiempoOculto > 0 && (Date.now() - tiempoOculto) > 10000) {
        // Solo cuenta como abandono si estuvo oculta mas de 10 segundos
        // Pero no enviamos aqui - solo si realmente se va
      }
    });

    // Trigger 3: Inactividad (sin contar scroll para evitar falsos positivos en movil)
    var timerInactividad;
    function resetTimerInactividad() {
      clearTimeout(timerInactividad);
      timerInactividad = setTimeout(function() {
        enviarAbandono('inactividad_' + MINUTOS_INACTIVIDAD + 'min');
      }, MINUTOS_INACTIVIDAD * 60000);
    }

    // Solo click y keydown resetean el timer, NO scroll (evita falsos positivos en movil)
    ['click', 'keydown', 'touchstart'].forEach(function(ev) {
      document.addEventListener(ev, resetTimerInactividad, { passive: true });
    });
    resetTimerInactividad();

    log('Modulo de abandonos V7 activo');
  }

  // Iniciar cuando el modulo principal este listo
  esperarModuloPrincipal(iniciarModuloAbandonos);

})();
