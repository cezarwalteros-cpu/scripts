(function () {
  // =========================
  // CONFIGURACIÓN
  // =========================
  var CONFIG = {
    pais: 'CO',
    dial: '+57',
    regex: /^3\d{9}$/,
    maxLength: 10,
    mensaje: 'Debe empezar con 3 y tener 10 dígitos. Ej: 3001234567',
    // NUEVA CONFIGURACIÓN PARA GOOGLE PLACES
    googlePlacesEnabled: true, // Cambiar a false para desactivar
    googlePlacesAPIKey: 'TU_API_KEY_AQUI' // Reemplazar con tu API key
  };

  // =========================
  // DATA COLOMBIA
  // =========================
  var ciudadesColombia = {
    "Leticia": "Amazonas", "Puerto Nariño": "Amazonas",
    "Medellín": "Antioquia", "Bello": "Antioquia", "Itagüí": "Antioquia", "Envigado": "Antioquia",
    "Apartadó": "Antioquia", "Turbo": "Antioquia", "Rionegro": "Antioquia", "Caucasia": "Antioquia",
    "Copacabana": "Antioquia", "La Estrella": "Antioquia", "Sabaneta": "Antioquia", "Caldas": "Antioquia",
    "Girardota": "Antioquia", "Barbosa": "Antioquia", "Marinilla": "Antioquia", "La Ceja": "Antioquia",
    "El Retiro": "Antioquia", "Guatapé": "Antioquia", "Santa Fe de Antioquia": "Antioquia",
    "Barranquilla": "Atlántico", "Soledad": "Atlántico", "Malambo": "Atlántico", "Sabanalarga": "Atlántico",
    "Galapa": "Atlántico", "Puerto Colombia": "Atlántico", "Baranoa": "Atlántico",
    "Bogotá": "Bogotá D.C.", "Bogotá D.C.": "Bogotá D.C.",
    "Cartagena": "Bolívar", "Magangué": "Bolívar", "Turbaco": "Bolívar", "Arjona": "Bolívar", "Carmen de Bolívar": "Bolívar",
    "Tunja": "Boyacá", "Duitama": "Boyacá", "Sogamoso": "Boyacá", "Chiquinquirá": "Boyacá", "Paipa": "Boyacá", "Puerto Boyacá": "Boyacá", "Villa de Leyva": "Boyacá",
    "Manizales": "Caldas", "La Dorada": "Caldas", "Chinchiná": "Caldas", "Villamaría": "Caldas",
    "Florencia": "Caquetá", "San Vicente del Caguán": "Caquetá",
    "Yopal": "Casanare", "Aguazul": "Casanare", "Villanueva": "Casanare",
    "Popayán": "Cauca", "Santander de Quilichao": "Cauca", "Puerto Tejada": "Cauca",
    "Valledupar": "Cesar", "Aguachica": "Cesar", "Codazzi": "Cesar", "Bosconia": "Cesar",
    "Quibdó": "Chocó", "Istmina": "Chocó",
    "Montería": "Córdoba", "Cereté": "Córdoba", "Lorica": "Córdoba", "Sahagún": "Córdoba", "Montelíbano": "Córdoba", "Planeta Rica": "Córdoba", "Tierralta": "Córdoba",
    "Soacha": "Cundinamarca", "Facatativá": "Cundinamarca", "Zipaquirá": "Cundinamarca", "Chía": "Cundinamarca",
    "Fusagasugá": "Cundinamarca", "Mosquera": "Cundinamarca", "Madrid": "Cundinamarca", "Funza": "Cundinamarca",
    "Cajicá": "Cundinamarca", "Girardot": "Cundinamarca", "Cota": "Cundinamarca", "La Calera": "Cundinamarca",
    "Sopó": "Cundinamarca", "Tocancipá": "Cundinamarca", "Tabio": "Cundinamarca", "Tenjo": "Cundinamarca",
    "Villeta": "Cundinamarca", "La Mesa": "Cundinamarca", "Ubaté": "Cundinamarca",
    "Neiva": "Huila", "Pitalito": "Huila", "Garzón": "Huila", "La Plata": "Huila", "Campoalegre": "Huila",
    "Riohacha": "La Guajira", "Maicao": "La Guajira", "Uribia": "La Guajira", "Fonseca": "La Guajira",
    "Santa Marta": "Magdalena", "Ciénaga": "Magdalena", "Fundación": "Magdalena", "El Banco": "Magdalena", "Plato": "Magdalena",
    "Villavicencio": "Meta", "Acacías": "Meta", "Granada": "Meta", "Puerto López": "Meta",
    "Pasto": "Nariño", "Tumaco": "Nariño", "Ipiales": "Nariño", "Túquerres": "Nariño",
    "Cúcuta": "Norte de Santander", "Ocaña": "Norte de Santander", "Pamplona": "Norte de Santander", "Villa del Rosario": "Norte de Santander", "Los Patios": "Norte de Santander",
    "Mocoa": "Putumayo", "Puerto Asís": "Putumayo",
    "Armenia": "Quindío", "Calarcá": "Quindío", "La Tebaida": "Quindío", "Montenegro": "Quindío", "Quimbaya": "Quindío", "Circasia": "Quindío",
    "Pereira": "Risaralda", "Dosquebradas": "Risaralda", "Santa Rosa de Cabal": "Risaralda", "La Virginia": "Risaralda",
    "San Andrés": "San Andrés y Providencia", "Providencia": "San Andrés y Providencia",
    "Bucaramanga": "Santander", "Floridablanca": "Santander", "Girón": "Santander", "Piedecuesta": "Santander", "Barrancabermeja": "Santander", "San Gil": "Santander",
    "Sincelejo": "Sucre", "Corozal": "Sucre", "San Marcos": "Sucre", "Tolú": "Sucre",
    "Ibagué": "Tolima", "Espinal": "Tolima", "Melgar": "Tolima", "Honda": "Tolima", "Mariquita": "Tolima", "Chaparral": "Tolima", "Líbano": "Tolima",
    "Cali": "Valle del Cauca", "Buenaventura": "Valle del Cauca", "Palmira": "Valle del Cauca", "Tuluá": "Valle del Cauca",
    "Cartago": "Valle del Cauca", "Buga": "Valle del Cauca", "Jamundí": "Valle del Cauca", "Yumbo": "Valle del Cauca",
    "Candelaria": "Valle del Cauca", "Florida": "Valle del Cauca", "Pradera": "Valle del Cauca", "Zarzal": "Valle del Cauca", "Sevilla": "Valle del Cauca",
    "Inírida": "Guainía", "San José del Guaviare": "Guaviare", "Mitú": "Vaupés", "Puerto Carreño": "Vichada"
  };

  var departamentosColombia = [
    "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar", "Boyacá", "Caldas",
    "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía",
    "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander",
    "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre",
    "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
  ];

  var listaCiudades = Object.keys(ciudadesColombia).sort();

  // =========================
  // UTILS
  // =========================
  function soloDigitos(v) {
    return (v || '').replace(/\D+/g, '');
  }

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

  function inyectarDepartamentos() {
    var select = document.querySelector('select[name="shipping_state"]');
    if (!select || select.dataset.deptosInjected === '1') return;
    select.dataset.deptosInjected = '1';
    select.innerHTML = '<option value="">Departamento</option>';
    departamentosColombia.forEach(function (d) {
      var opt = document.createElement('option');
      opt.value = d;
      opt.text = d;
      select.appendChild(opt);
    });
  }

  function seleccionarDepartamento(ciudad) {
    var depto = ciudadesColombia[ciudad];
    if (!depto) return;
    var select = document.querySelector('select[name="shipping_state"]');
    if (!select) return;
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === depto) {
        select.selectedIndex = i;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        break;
      }
    }
  }

  // AUTOCOMPLETADO DE CIUDADES (MANTIENE TU LÓGICA ORIGINAL)
  function crearAutocompletado(input) {
    if (!input || input.dataset.cityAutocomplete === '1') return;
    input.dataset.cityAutocomplete = '1';

    var box = document.createElement('div');
    box.style.cssText = 'position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid #ccc;border-radius:0 0 8px 8px;max-height:200px;overflow-y:auto;z-index:99999;display:none;box-shadow:0 4px 12px rgba(0,0,0,0.15);';

    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(box);

    input.addEventListener('input', function () {
      var txt = (this.value || '').toLowerCase().trim();
      box.innerHTML = '';
      if (txt.length < 1) { box.style.display = 'none'; return; }
      var res = listaCiudades.filter(function (c) { return c.toLowerCase().indexOf(txt) > -1; }).slice(0, 8);
      if (res.length === 0) { box.style.display = 'none'; return; }
      res.forEach(function (ciudad) {
        var item = document.createElement('div');
        item.innerHTML = '<strong>' + ciudad + '</strong> <span style="color:#888;font-size:12px;">- ' + ciudadesColombia[ciudad] + '</span>';
        item.style.cssText = 'padding:10px 12px;cursor:pointer;border-bottom:1px solid #eee;';
        item.onmouseenter = function () { this.style.background = '#f0f7ff'; };
        item.onmouseleave = function () { this.style.background = '#fff'; };
        item.onclick = function () {
          input.value = ciudad;
          box.style.display = 'none';
          seleccionarDepartamento(ciudad);
        };
        box.appendChild(item);
      });
      box.style.display = 'block';
    });

    input.addEventListener('blur', function () {
      setTimeout(function () {
        box.style.display = 'none';
        if (input.value && input.value.trim()) seleccionarDepartamento(input.value.trim());
      }, 200);
    });

    document.addEventListener('click', function (e) {
      if (e.target !== input) box.style.display = 'none';
    });
  }

  // =========================
  // NUEVO: GOOGLE PLACES AUTOCOMPLETE PARA DIRECCIONES
  // =========================
  var _googlePlacesReady = false;
  var _addressInputPendiente = null;

  function cargarGooglePlacesAPI() {
    if (!CONFIG.googlePlacesEnabled) return;
    if (document.getElementById('google-places-script')) return;
    
    console.log('[PLACES] Cargando Google Places API...');
    
    var script = document.createElement('script');
    script.id = 'google-places-script';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + CONFIG.googlePlacesAPIKey + '&libraries=places&callback=initGooglePlaces';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  // Callback global cuando carga la API
  window.initGooglePlaces = function() {
    console.log('[PLACES] Google Places API cargada ✓');
    _googlePlacesReady = true;
    if (_addressInputPendiente) {
      inicializarAutocompletadoDireccion(_addressInputPendiente);
    }
  };

  function inicializarAutocompletadoDireccion(input) {
    if (!input || input.dataset.placesAutocomplete === '1') return;
    
    // Si la API no está lista, guardar para después
    if (!_googlePlacesReady) {
      _addressInputPendiente = input;
      console.log('[PLACES] Esperando API...');
      return;
    }

    input.dataset.placesAutocomplete = '1';
    console.log('[PLACES] Inicializando autocomplete en dirección');

    try {
      var autocomplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: 'co' },
        fields: ['address_components', 'formatted_address', 'geometry'],
        types: ['address'] // Solo direcciones completas
      });

      // Cuando selecciona una dirección
      autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        
        if (!place.address_components) {
          console.log('[PLACES] Sin componentes de dirección');
          return;
        }

        console.log('[PLACES] Dirección seleccionada:', place.formatted_address);

        var ciudad = '';
        var departamento = '';
        var direccionCompleta = '';

        // Extraer componentes
        place.address_components.forEach(function(comp) {
          var tipos = comp.types;
          
          // Ciudad
          if (tipos.indexOf('locality') > -1 || tipos.indexOf('administrative_area_level_2') > -1) {
            ciudad = comp.long_name;
          }
          
          // Departamento
          if (tipos.indexOf('administrative_area_level_1') > -1) {
            departamento = comp.long_name;
          }
        });

        // Usar la dirección formateada de Google (sin ciudad/departamento/país)
        direccionCompleta = place.formatted_address;
        
        // Limpiar la dirección (quitar ciudad, departamento y país)
        if (ciudad) direccionCompleta = direccionCompleta.replace(', ' + ciudad, '');
        if (departamento) direccionCompleta = direccionCompleta.replace(', ' + departamento, '');
        direccionCompleta = direccionCompleta.replace(', Colombia', '').trim();

        // Actualizar campo de dirección
        input.value = direccionCompleta;

        // Auto-rellenar ciudad si existe
        if (ciudad) {
          var cityInput = document.querySelector('input[name="shipping_city"]');
          if (cityInput) {
            cityInput.value = ciudad;
            console.log('[PLACES] Ciudad auto-rellenada:', ciudad);
            
            // Seleccionar departamento automáticamente
            seleccionarDepartamento(ciudad);
          }
        }

        // Mensaje visual de éxito
        mostrarMensajeValidacion(input, '✓ Dirección verificada', 'success');
      });

      console.log('[PLACES] Autocomplete activo en dirección ✓');

    } catch(e) {
      console.error('[PLACES] Error:', e.message);
    }
  }

  // Validación visual para direcciones
  function mostrarMensajeValidacion(input, mensaje, tipo) {
    var msgId = 'address-validation-msg';
    var msg = document.getElementById(msgId);
    
    if (!msg) {
      msg = document.createElement('div');
      msg.id = msgId;
      msg.style.cssText = 'margin-top:4px;font-size:12px;padding:4px 8px;border-radius:4px;';
      input.parentElement.appendChild(msg);
    }

    var colores = {
      success: { bg: '#d1fae5', text: '#065f46' },
      error: { bg: '#fee2e2', text: '#dc2626' },
      warning: { bg: '#fef3c7', text: '#92400e' }
    };

    var color = colores[tipo] || colores.error;
    msg.style.backgroundColor = color.bg;
    msg.style.color = color.text;
    msg.textContent = mensaje;
    msg.style.display = 'block';

    if (tipo === 'success') {
      setTimeout(function() { msg.style.display = 'none'; }, 3000);
    }
  }

  // Validación básica de direcciones (fallback si no usan Google Places)
  function validarFormatoDireccion(input) {
    if (!input) return;

    input.addEventListener('blur', function() {
      var val = this.value.trim();
      if (val.length < 8) {
        mostrarMensajeValidacion(this, '⚠️ Dirección muy corta. Ej: Calle 45 # 23-15', 'warning');
        return;
      }

      var tieneNumero = /\d/.test(val);
      var tieneVia = /calle|carrera|avenida|diagonal|transversal|circular|cra|cl|av|dg|tv|cr|kr|vereda|manzana|torre|apto|int/i.test(val);

      if (!tieneNumero) {
        mostrarMensajeValidacion(this, '⚠️ Falta número. Ej: Cra 7 # 45-12', 'warning');
      } else if (!tieneVia) {
        mostrarMensajeValidacion(this, '⚠️ Especifica tipo de vía (Calle, Carrera, etc)', 'warning');
      } else {
        var msgEl = document.getElementById('address-validation-msg');
        if (msgEl) msgEl.style.display = 'none';
      }
    });
  }

  // =========================
  // ESTILOS TELÉFONO
  // =========================
  function inyectarEstilos() {
    if (document.getElementById('cod-co-phone-styles')) return;
    var css = document.createElement('style');
    css.id = 'cod-co-phone-styles';
    css.textContent = `
      .cod-phone-wrapper {
        width: 100%;
        box-sizing: border-box;
      }
      .cod-phone-field {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 10px 14px;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .cod-phone-field:focus-within {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      .cod-phone-prefix {
        font-weight: 600;
        color: #64748b;
        font-size: 15px;
        white-space: nowrap;
        user-select: none;
      }
      .cod-phone-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 15px;
        color: #1e293b;
        background: transparent;
        min-width: 0;
      }
      .cod-phone-input::placeholder {
        color: #94a3b8;
      }
      .cod-phone-error {
        margin-top: 6px;
        padding: 8px 12px;
        background: #fee2e2;
        color: #dc2626;
        border-radius: 6px;
        font-size: 13px;
        line-height: 1.4;
        display: none;
      }
      .cod-phone-error.show {
        display: block;
      }
      /* Estilos para el autocompletado de Google Places */
      .pac-container {
        z-index: 99999 !important;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        margin-top: 4px;
      }
      .pac-item {
        padding: 10px 12px;
        cursor: pointer;
        border-top: 1px solid #e2e8f0;
      }
      .pac-item:first-child {
        border-top: none;
      }
      .pac-item:hover {
        background-color: #f0f7ff;
      }
      .pac-icon {
        margin-right: 8px;
      }
      .pac-item-query {
        font-weight: 600;
        color: #1e293b;
      }
    `;
    document.head.appendChild(css);
  }

  // =========================
  // INIT
  // =========================
  function init() {
    console.log('[COD-CO] Iniciando sistema...');
    
    inyectarEstilos();
    inyectarDepartamentos();

    // Ocultar campo email (generar automático)
    ocultarCampo('email');

    // TELÉFONO: Transformar a +57 con validación
    var phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput && !phoneInput.dataset.codPhoneInit) {
      phoneInput.dataset.codPhoneInit = '1';
      
      var wrapper = document.createElement('div');
      wrapper.className = 'cod-phone-wrapper';
      
      var field = document.createElement('div');
      field.className = 'cod-phone-field';
      
      var prefix = document.createElement('span');
      prefix.className = 'cod-phone-prefix';
      prefix.textContent = CONFIG.dial;
      
      var newInput = document.createElement('input');
      newInput.type = 'tel';
      newInput.className = 'cod-phone-input';
      newInput.placeholder = '301 234 5678';
      newInput.maxLength = CONFIG.maxLength;
      
      var errorMsg = document.createElement('div');
      errorMsg.className = 'cod-phone-error';
      errorMsg.textContent = CONFIG.mensaje;
      
      field.appendChild(prefix);
      field.appendChild(newInput);
      wrapper.appendChild(field);
      wrapper.appendChild(errorMsg);
      
      phoneInput.parentNode.insertBefore(wrapper, phoneInput);
      phoneInput.style.display = 'none';
      
      // Validación en tiempo real
      newInput.addEventListener('input', function(e) {
        var v = soloDigitos(this.value);
        
        // Formatear visualmente: 301 234 5678
        if (v.length > 6) {
          this.value = v.slice(0,3) + ' ' + v.slice(3,6) + ' ' + v.slice(6,10);
        } else if (v.length > 3) {
          this.value = v.slice(0,3) + ' ' + v.slice(3);
        } else {
          this.value = v;
        }
        
        phoneInput.value = CONFIG.dial + v;
        
        var valido = CONFIG.regex.test(v);
        
        if (v.length === CONFIG.maxLength && !valido) {
          errorMsg.classList.add('show');
          field.style.borderColor = '#dc2626';
        } else {
          errorMsg.classList.remove('show');
          field.style.borderColor = '#e2e8f0';
        }
        
        // Email automático cuando tenga teléfono válido
        if (valido) {
          var emailInput = document.querySelector('input[name="email"]');
          if (emailInput && !emailInput.value) {
            emailInput.value = generarEmail();
          }
        }
      });
    }

    // CIUDAD: Autocompletado con tu lista
    var cityInput = document.querySelector('input[name="shipping_city"]');
    if (cityInput) {
      crearAutocompletado(cityInput);
    }

    // DIRECCIÓN: Google Places Autocomplete
    var addressInput = document.querySelector('input[name="shipping_address"]');
    if (addressInput) {
      if (CONFIG.googlePlacesEnabled) {
        // Cargar API de Google Places
        cargarGooglePlacesAPI();
        
        // Intentar inicializar (se ejecutará cuando la API esté lista)
        setTimeout(function() {
          inicializarAutocompletadoDireccion(addressInput);
        }, 500);
      } else {
        // Fallback: solo validación básica
        validarFormatoDireccion(addressInput);
      }
    }

    console.log('[COD-CO] Sistema activo ✓');
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Observar cambios en el DOM por si Funnelish carga campos dinámicamente
  var observer = new MutationObserver(function() {
    setTimeout(init, 100);
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
