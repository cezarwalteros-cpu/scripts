
(function () {
  // =========================
  // CONFIGURACIÓN
  // =========================
  var CONFIG = {
    pais: 'CO',
    dial: '+57',
    regex: /^3\d{9}$/,
    maxLength: 10,
    mensaje: 'Debe empezar con 3 y tener 10 dígitos. Ej: 3001234567'
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
        box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
      }
      .cod-phone-field.invalid {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239,68,68,0.15);
      }
      .cod-phone-prefix {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 50px;
        padding: 6px 10px;
        font-size: 14px;
        font-weight: 500;
        color: #475569;
        background: #f1f5f9;
        border-radius: 6px;
        user-select: none;
      }
      .cod-phone-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 15px;
        padding: 6px 4px;
        min-width: 0;
        background: transparent;
      }
      .cod-phone-input::placeholder {
        color: #94a3b8;
      }
      .cod-phone-warning {
        color: #ef4444;
        font-size: 13px;
        margin-top: 6px;
        display: none;
        font-weight: 500;
      }
    `;
    document.head.appendChild(css);
  }

  // =========================
  // UI TELÉFONO (INPUT HIDDEN + VISIBLE)
  // =========================
  function construirTelefonoUI(hiddenInput) {
    if (hiddenInput.dataset.codPhoneEnhanced === '1') return;
    hiddenInput.dataset.codPhoneEnhanced = '1';

    // Convertir el input original a hidden
    try {
      hiddenInput.type = 'hidden';
    } catch (e) {
      hiddenInput.style.display = 'none';
    }

    // Crear wrapper
    var wrapper = document.createElement('div');
    wrapper.className = 'cod-phone-wrapper';

    // Campo visual
    var field = document.createElement('div');
    field.className = 'cod-phone-field';

    // Prefijo (+57)
    var prefix = document.createElement('span');
    prefix.className = 'cod-phone-prefix';
    prefix.textContent = CONFIG.dial;

    // Input visible
    var visibleInput = document.createElement('input');
    visibleInput.type = 'text';
    visibleInput.className = 'cod-phone-input';
    visibleInput.placeholder = 'Ej: 3001234567';
    visibleInput.setAttribute('inputmode', 'numeric');
    visibleInput.setAttribute('autocomplete', 'tel-national');

    field.appendChild(prefix);
    field.appendChild(visibleInput);
    wrapper.appendChild(field);

    // Mensaje de advertencia
    var warning = document.createElement('div');
    warning.className = 'cod-phone-warning';
    warning.textContent = '⚠️ ' + CONFIG.mensaje;
    wrapper.appendChild(warning);

    // Insertar después del input original
    var parent = hiddenInput.parentElement;
    if (parent) {
      parent.insertBefore(wrapper, hiddenInput.nextSibling);
    }

    // =========================
    // LÓGICA DE SINCRONIZACIÓN
    // =========================
    function actualizarHidden() {
      var num = soloDigitos(visibleInput.value);
      
      // Solo actualizar el hidden si el número es VÁLIDO
      if (CONFIG.regex.test(num)) {
        hiddenInput.value = CONFIG.dial + num;
        field.classList.remove('invalid');
        warning.style.display = 'none';
      } else {
        // Si no es válido, el hidden queda VACÍO
        // Así Funnelish no puede avanzar
        hiddenInput.value = '';
        
        if (num.length > 0) {
          field.classList.add('invalid');
          warning.style.display = 'block';
        } else {
          field.classList.remove('invalid');
          warning.style.display = 'none';
        }
      }
    }

    // Validación en tiempo real
    visibleInput.addEventListener('input', function (e) {
      var val = soloDigitos(e.target.value);

      // Solo permitir que empiece con 3
      if (val.length === 1 && val !== '3') {
        val = '';
      }

      // Limitar longitud
      if (val.length > CONFIG.maxLength) {
        val = val.slice(0, CONFIG.maxLength);
      }

      // Actualizar valor visible si cambió
      if (val !== soloDigitos(e.target.value)) {
        e.target.value = val;
      }

      actualizarHidden();
    });

    // También validar en blur
    visibleInput.addEventListener('blur', actualizarHidden);

    // Estado inicial
    actualizarHidden();
  }

  // =========================
  // INIT GENERAL
  // =========================
  function initCore() {
    // Email aleatorio y oculto
    var email = document.querySelector('input[name="email"]');
    if (email && !email.value) email.value = generarEmail();
    ocultarCampo('email');

    // País CO y oculto
    var pais = document.querySelector('select[name="shipping_country"]');
    if (pais && pais.dataset.countryLocked !== '1') {
      pais.dataset.countryLocked = '1';
      for (var i = 0; i < pais.options.length; i++) {
        if (pais.options[i].value === 'CO') {
          pais.selectedIndex = i;
          pais.dispatchEvent(new Event('change', { bubbles: true }));
          break;
        }
      }
    }
    ocultarCampo('shipping_country');

    // Departamentos y oculto
    inyectarDepartamentos();
    ocultarCampo('shipping_state');

    // Ciudad autocompletado
    var ciudad = document.querySelector('input[name="shipping_city"]');
    if (ciudad) {
      ciudad.placeholder = 'Escribe tu ciudad...';
      ciudad.setAttribute('autocomplete', 'off');
      crearAutocompletado(ciudad);
    }

    // Teléfono con UI mejorada
    var phone = document.querySelector('input[name="phone"]');
    if (phone && phone.dataset.codPhoneEnhanced !== '1') {
      inyectarEstilos();
      construirTelefonoUI(phone);
    }
  }

  // =========================
  // BOOTSTRAP
  // =========================
  function boot() {
    initCore();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(boot, 300);
    });
  } else {
    setTimeout(boot, 300);
  }

  // Polling para forms que cargan tarde
  var tries = 0;
  var poll = setInterval(function () {
    tries++;
    boot();
    var phone = document.querySelector('input[name="phone"]');
    if ((phone && phone.dataset.codPhoneEnhanced === '1') || tries >= 80) {
      clearInterval(poll);
    }
  }, 250);

  // Observer para re-renderizados
  var mo = new MutationObserver(function () {
    var phone = document.querySelector('input[name="phone"]');
    if (phone && phone.dataset.codPhoneEnhanced !== '1') {
      boot();
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });

})();
