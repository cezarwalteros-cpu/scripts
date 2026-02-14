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

  // WEBHOOK para abandonos
  var WEBHOOK_URL = 'TU_WEBHOOK_URL_AQUI';
  var MINUTOS_INACTIVIDAD = 3;
  var _enviado = false;
  var _ordenCompletada = false;

  function log(msg) {
    console.log('[COD-CO] ' + msg);
  }

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

  // AUTOCOMPLETADO DE CIUDADES (TU CÓDIGO ORIGINAL)
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
  // VALIDACIÓN INTELIGENTE DE DIRECCIONES (SIN API)
  // =========================
  function validarDireccion(input) {
    if (!input || input.dataset.addressValidation === '1') return;
    input.dataset.addressValidation = '1';

    var msgId = 'address-validation-msg';
    var msg = document.createElement('div');
    msg.id = msgId;
    msg.style.cssText = 'margin-top:6px;padding:8px 12px;border-radius:6px;font-size:13px;line-height:1.4;display:none;';
    input.parentElement.appendChild(msg);

    // Patrones comunes de direcciones colombianas
    var patrones = {
      vias: /\b(calle|carrera|avenida|diagonal|transversal|circular|autopista|cra|cl|av|dg|tv|cr|kr|ac|vereda|manzana|sector|barrio)\b/i,
      numeros: /\d+/,
      complementos: /\b(casa|apto|apartamento|interior|int|torre|bloque|manzana|lote|local|oficina|piso|#)\b/i,
      referencias: /\b(esquina|frente|junto|cerca|detras|al lado)\b/i
    };

    function mostrarMensaje(texto, tipo) {
      var colores = {
        error: { bg: '#fee2e2', text: '#dc2626', icono: '⚠️' },
        warning: { bg: '#fef3c7', text: '#92400e', icono: '⚡' },
        success: { bg: '#d1fae5', text: '#065f46', icono: '✓' },
        info: { bg: '#dbeafe', text: '#1e40af', icono: 'ℹ️' }
      };

      var config = colores[tipo] || colores.info;
      msg.style.backgroundColor = config.bg;
      msg.style.color = config.text;
      msg.textContent = config.icono + ' ' + texto;
      msg.style.display = 'block';

      if (tipo === 'success') {
        setTimeout(function() { msg.style.display = 'none'; }, 3000);
      }
    }

    function analizarDireccion(valor) {
      var v = valor.trim();
      
      // Muy corta
      if (v.length < 8) {
        return { valida: false, tipo: 'warning', mensaje: 'Dirección muy corta. Ej: Calle 45 # 23-15' };
      }

      // No tiene números
      if (!patrones.numeros.test(v)) {
        return { valida: false, tipo: 'error', mensaje: 'Falta número de dirección. Ej: Cra 7 # 45-12' };
      }

      // No especifica tipo de vía
      if (!patrones.vias.test(v)) {
        return { valida: false, tipo: 'error', mensaje: 'Especifica tipo de vía (Calle, Carrera, Avenida, etc)' };
      }

      // Validación de formato estándar: Tipo + Número + # + Número
      var formatoEstandar = /\b(calle|carrera|cra|cl|kr|cr|av|avenida|diagonal|dg|transversal|tv)\s*\d+.*[#-]\s*\d+/i;
      if (!formatoEstandar.test(v)) {
        return { valida: false, tipo: 'warning', mensaje: 'Formato sugerido: Calle 45 # 23-15 o Cra 7 # 45-12' };
      }

      // Verificar detalles adicionales (buena práctica)
      var tieneComplemento = patrones.complementos.test(v) || v.split(/\s+/).length >= 5;
      if (!tieneComplemento) {
        return { valida: true, tipo: 'info', mensaje: 'Sugerencia: Agrega complemento (Apto, Casa, Interior, etc)' };
      }

      // Dirección completa y bien formateada
      return { valida: true, tipo: 'success', mensaje: 'Dirección verificada correctamente' };
    }

    // Validar mientras escribe (con debounce)
    var timeoutId;
    input.addEventListener('input', function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function() {
        var resultado = analizarDireccion(input.value);
        if (input.value.length > 0) {
          mostrarMensaje(resultado.mensaje, resultado.tipo);
        } else {
          msg.style.display = 'none';
        }
      }, 800);
    });

    // Validación final al salir del campo
    input.addEventListener('blur', function() {
      var v = this.value.trim();
      if (v.length === 0) {
        msg.style.display = 'none';
        return;
      }
      
      var resultado = analizarDireccion(v);
      mostrarMensaje(resultado.mensaje, resultado.tipo);
    });

    log('Validación de dirección activada ✓');
  }

  // Sugerencias de formato mientras escribe
  function agregarPlaceholderDinamico(input) {
    if (!input) return;
    
    var placeholders = [
      'Calle 45 # 23-15, Apto 302',
      'Carrera 7 # 45-12, Casa 5',
      'Avenida 68 # 12-34, Torre B',
      'Diagonal 53 # 28-40, Interior 201',
      'Transversal 23 # 45-67, Local 3'
    ];
    
    var idx = Math.floor(Math.random() * placeholders.length);
    input.placeholder = placeholders[idx];
  }

  // =========================
  // ESTILOS
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
    `;
    document.head.appendChild(css);
  }

  // =========================
  // INIT
  // =========================
  function init() {
    log('Iniciando sistema...');
    
    inyectarEstilos();
    inyectarDepartamentos();
    ocultarCampo('email');

    // TELÉFONO
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
      
      newInput.addEventListener('input', function(e) {
        var v = soloDigitos(this.value);
        
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
        
        if (valido) {
          var emailInput = document.querySelector('input[name="email"]');
          if (emailInput && !emailInput.value) {
            emailInput.value = generarEmail();
          }
        }
      });
    }

    // CIUDAD
    var cityInput = document.querySelector('input[name="shipping_city"]');
    if (cityInput) {
      crearAutocompletado(cityInput);
    }

    // DIRECCIÓN: Validación inteligente
    var addressInput = document.querySelector('input[name="shipping_address"]');
    if (addressInput) {
      validarDireccion(addressInput);
      agregarPlaceholderDinamico(addressInput);
    }

    log('Sistema activo ✓');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  var observer = new MutationObserver(function() {
    setTimeout(init, 100);
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // =========================
  // SISTEMA DE ABANDONOS (TU CÓDIGO ORIGINAL)
  // =========================
  try {
    function param(n) {
      var m = new RegExp('[?&]' + n + '=([^&]*)').exec(location.search);
      return m ? decodeURIComponent(m[1]) : '';
    }

    function val(n) {
      var el = document.querySelector('[name="' + n + '"]');
      return el ? el.value.trim() : '';
    }

    function selVal(n) {
      var s = document.querySelector('select[name="' + n + '"]');
      return s && s.selectedIndex >= 0 ? s.options[s.selectedIndex].text : '';
    }

    function datos() {
      var tel = val('phone');
      var valido = /^\+57[3]\d{9}$/.test(tel);

      try {
        if (!valido && tel.indexOf('+57') === 0) {
          var nums = tel.replace(/\D+/g, '').slice(2);
          valido = CONFIG.regex.test(nums);
          if (valido) tel = '+57' + nums;
        }
      } catch(x) {}

      var nombre = val('first_name') || val('name') || val('full_name') || val('nombre') || val('customer_name') || '';

      if (!nombre) {
        try {
          var inputs = document.querySelectorAll('input[type="text"], input:not([type])');
          for (var i = 0; i < inputs.length; i++) {
            var inp = inputs[i];
            if (inp.type === 'hidden' || inp.name === 'email' || inp.name === 'phone') continue;
            if (inp.name === 'shipping_city' || inp.name === 'shipping_address' || inp.name === 'address') continue;
            if (inp.classList.contains('cod-phone-input')) continue;
            if (inp.value && inp.value.trim().length > 1) {
              var ph = (inp.placeholder || '').toLowerCase();
              var label = (inp.name || '').toLowerCase();
              if (ph.indexOf('nombre') > -1 || ph.indexOf('name') > -1 ||
                  label.indexOf('name') > -1 || label.indexOf('nombre') > -1 ||
                  i === 0) {
                nombre = inp.value.trim();
                log('Nombre encontrado en: ' + (inp.name || inp.placeholder || 'input[' + i + ']'));
                break;
              }
            }
          }
        } catch(x) {}
      }

      log('Datos: nombre="' + nombre + '" tel="' + tel + '" valido=' + valido);

      return {
        nombre: nombre,
        apellido: val('last_name') || val('apellido') || '',
        telefono: tel,
        telefonoValido: valido,
        email: val('email'),
        ciudad: val('shipping_city'),
        departamento: selVal('shipping_state'),
        direccion: val('shipping_address') || val('address'),
        pais: 'CO',
        producto: (function() {
          try { if (window.funnel && window.funnel.product) return window.funnel.product.name || ''; } catch(x) {}
          try { var c = document.querySelector('[data-product-name]'); if (c) return c.getAttribute('data-product-name') || ''; } catch(x) {}
          try { var h = document.querySelector('h1'); if (h) return h.textContent.trim().slice(0,100); } catch(x) {}
          return '';
        })(),
        precio: (function() {
          try { if (window.funnel && window.funnel.product) return window.funnel.product.price || 0; } catch(x) {}
          try { var c = document.querySelector('[data-product-name]'); if (c) return parseFloat(c.getAttribute('data-product-price')) || 0; } catch(x) {}
          try { var ps = document.querySelectorAll('[class*="price"],[class*="total"]');
            for (var i=0;i<ps.length;i++) { var n=parseFloat((ps[i].textContent||'').replace(/[^\d.,]/g,'').replace(/\./g,'').replace(',','.')); if(n>0) return n; }
          } catch(x) {}
          return 0;
        })(),
        paginaUrl: location.href,
        paginaTitulo: document.title || '',
        fuente: param('utm_source'),
        medio: param('utm_medium'),
        campana: param('utm_campaign'),
        fbclid: param('fbclid'),
        gclid: param('gclid'),
        referrer: document.referrer || '',
        timestamp: new Date().toISOString()
      };
    }

    function enviarAbandono(razon) {
      if (_enviado || _ordenCompletada) return;

      var d = datos();

      if (!d.nombre || !d.telefonoValido) {
        log('Sin datos mínimos (nombre + tel válido), no se envía');
        return;
      }

      d.razonAbandono = razon;
      _enviado = true;

      log('⚠️ Enviando abandono → ' + razon);

      var body = JSON.stringify({
        tipo: 'carrito_abandonado',
        datos: d,
        timestamp: new Date().toISOString()
      });

      if (navigator.sendBeacon) {
        try {
          if (navigator.sendBeacon(WEBHOOK_URL, new Blob([body], {type: 'text/plain'}))) {
            log('✓ Enviado via sendBeacon');
            return;
          }
        } catch(x) { log('sendBeacon falló: ' + x.message); }
      }

      try {
        fetch(WEBHOOK_URL, {
          method: 'POST',
          body: body,
          headers: { 'Content-Type': 'text/plain' },
          keepalive: true,
          mode: 'no-cors'
        }).catch(function() {});
        log('✓ Enviado via fetch keepalive');
        return;
      } catch(x) { log('fetch falló: ' + x.message); }

      try {
        var x = new XMLHttpRequest();
        x.open('POST', WEBHOOK_URL, true);
        x.setRequestHeader('Content-Type', 'text/plain');
        x.onload = function() { log(x.status >= 200 && x.status < 300 ? '✓ XHR ok' : '✗ XHR error ' + x.status); };
        x.send(body);
      } catch(e) { log('✗ XHR: ' + e.message); }
    }

    document.addEventListener('click', function(e) {
      try {
        var t = e.target; if (!t) return;
        var btn = t.closest ? t.closest('a[href="#submit-step"]') : null;
        if (!btn) return;
        var tel = val('phone');
        if (/^\+57[3]\d{9}$/.test(tel)) {
          setTimeout(function() { _ordenCompletada = true; log('Orden detectada, abandono bloqueado'); }, 1500);
        }
      } catch(x) {}
    }, false);

    window.addEventListener('beforeunload', function() {
      try { enviarAbandono('cerro_pagina'); } catch(x) {}
    });

    document.addEventListener('visibilitychange', function() {
      try { if (document.visibilityState === 'hidden') enviarAbandono('cambio_pestana'); } catch(x) {}
    });

    window.addEventListener('pagehide', function() {
      try { enviarAbandono('pagehide'); } catch(x) {}
    });

    var _timer = null;
    function resetTimer() {
      if (_timer) clearTimeout(_timer);
      _timer = setTimeout(function() {
        try { enviarAbandono('inactividad_' + MINUTOS_INACTIVIDAD + 'min'); } catch(x) {}
      }, MINUTOS_INACTIVIDAD * 60000);
    }
    ['click', 'keydown', 'scroll', 'touchstart'].forEach(function(ev) {
      document.addEventListener(ev, resetTimer, { passive: true });
    });
    resetTimer();

    log('Módulo abandonos activo ✓ (webhook: ' + WEBHOOK_URL.slice(0, 50) + '...)');

  } catch(err) {
    console.error('[ABANDONO] Error fatal:', err.message);
  }
})();
