(function () {

  // =========================
  // DATA
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
    if (!select) return;

    if (select.dataset.deptosInjected === '1') return;
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
    box.id = 'sugerencias-ciudad';
    box.style.cssText =
      'position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid #ccc;border-radius:0 0 8px 8px;max-height:200px;overflow-y:auto;z-index:99999;display:none;box-shadow:0 4px 12px rgba(0,0,0,0.15);';

    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(box);

    input.addEventListener('input', function () {
      var txt = (this.value || '').toLowerCase().trim();
      box.innerHTML = '';

      if (txt.length < 1) { box.style.display = 'none'; return; }

      var res = listaCiudades
        .filter(function (c) { return c.toLowerCase().indexOf(txt) > -1; })
        .slice(0, 8);

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
  // VALIDACIÓN TELÉFONO CO
  // =========================
  function esTelefonoValido(valor) {
    var digits = (valor || '').replace(/\D/g, '');
    // Quitar 57 si lo escribieron
    if (digits.startsWith('57') && digits.length > 10) {
      digits = digits.slice(2);
    }
    // Debe empezar por 3 y tener exactamente 10 dígitos
    return digits.length === 10 && digits.startsWith('3');
  }

  function formatearTelefono(valor) {
    var digits = (valor || '').replace(/\D/g, '');
    if (digits.startsWith('57') && digits.length > 10) {
      digits = digits.slice(2);
    }
    if (digits.length > 10) digits = digits.slice(0, 10);
    if (digits.length === 10 && digits.startsWith('3')) {
      return '+57' + digits;
    }
    return null; // inválido
  }

  // =========================
  // BLOQUEO TOTAL DE FUNNELISH
  // =========================
  var bloqueando = false;

  function instalarTelefonoCO() {
    var phone = document.querySelector('input[name="phone"]');
    if (!phone) return;

    if (phone.dataset.telcoFinal === '1') return;
    phone.dataset.telcoFinal = '1';

    phone.setAttribute('inputmode', 'numeric');
    phone.setAttribute('autocomplete', 'tel');
    phone.placeholder = 'Ej: 3001234567';

    // Aviso visual
    var aviso = document.getElementById('phone-warning');
    if (!aviso) {
      aviso = document.createElement('div');
      aviso.id = 'phone-warning';
      aviso.style.cssText = 'color:#dc2626;font-size:13px;margin-top:6px;display:none;font-weight:500;';
      aviso.textContent = '⚠️ Ingresa un celular válido de Colombia (10 dígitos, empieza por 3). Ej: 3001234567';
      phone.parentNode.appendChild(aviso);
    }

    function mostrarError() {
      aviso.style.display = 'block';
      phone.style.borderColor = '#dc2626';
      phone.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.2)';
    }

    function limpiarError() {
      aviso.style.display = 'none';
      phone.style.borderColor = '';
      phone.style.boxShadow = '';
    }

    // Al escribir: solo limpiar error visual
    phone.addEventListener('input', limpiarError);

    // Al salir del campo: formatear si es válido, sino mostrar error
    phone.addEventListener('blur', function () {
      var formatted = formatearTelefono(phone.value);
      if (formatted) {
        phone.value = formatted;
        limpiarError();
      } else if (phone.value.trim()) {
        mostrarError();
      }
    });

    // ============================================
    // INTERCEPTOR GLOBAL DE TODOS LOS CLICKS
    // Captura ANTES que cualquier otro listener
    // ============================================
    function validarYBloquear(e) {
      var target = e.target;
      if (!target) return;

      // Detectar si es un elemento que podría avanzar el form
      var esBotonAvance = false;
      var el = target;
      
      // Recorrer hacia arriba buscando elementos de submit
      while (el && el !== document.body) {
        // Detectar por href="#submit-step"
        if (el.tagName === 'A' && el.getAttribute('href') === '#submit-step') {
          esBotonAvance = true;
          break;
        }
        // Detectar por clase común de Funnelish
        if (el.classList && (
          el.classList.contains('submit-step') ||
          el.classList.contains('next-step') ||
          el.classList.contains('btn-submit') ||
          el.classList.contains('funnelish-submit')
        )) {
          esBotonAvance = true;
          break;
        }
        // Detectar buttons tipo submit
        if (el.tagName === 'BUTTON' && (el.type === 'submit' || !el.type)) {
          esBotonAvance = true;
          break;
        }
        // Detectar inputs tipo submit
        if (el.tagName === 'INPUT' && el.type === 'submit') {
          esBotonAvance = true;
          break;
        }
        el = el.parentElement;
      }

      if (!esBotonAvance) return;

      // Validar teléfono
      var phoneInput = document.querySelector('input[name="phone"]');
      if (!phoneInput) return;

      var formatted = formatearTelefono(phoneInput.value);
      
      if (!formatted) {
        // BLOQUEAR TODO
        bloqueando = true;
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        mostrarError();
        phoneInput.focus();
        
        // Asegurar que el valor no sea aceptable por Funnelish
        // Funnelish valida el value, si está mal formateado lo rechaza
        // Pero por si acaso, lo vaciamos temporalmente
        var valorOriginal = phoneInput.value;
        phoneInput.value = '';
        
        // Restaurar después de un tick para que el usuario vea qué escribió
        setTimeout(function() {
          phoneInput.value = valorOriginal;
          bloqueando = false;
        }, 50);
        
        return false;
      } else {
        // Asegurar formato correcto antes de enviar
        phoneInput.value = formatted;
        limpiarError();
      }
    }

    // Instalar en CAPTURA con la máxima prioridad
    if (!document.body.dataset.phoneBlockerInstalled) {
      document.body.dataset.phoneBlockerInstalled = '1';
      
      ['pointerdown', 'mousedown', 'touchstart', 'click'].forEach(function(evt) {
        document.addEventListener(evt, validarYBloquear, true);
      });
      
      // También en submit del form
      document.addEventListener('submit', function(e) {
        var phoneInput = document.querySelector('input[name="phone"]');
        if (phoneInput && !esTelefonoValido(phoneInput.value)) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          mostrarError();
          phoneInput.focus();
          return false;
        }
      }, true);
    }

    // ============================================
    // OBSERVADOR DE VALOR DEL INPUT
    // Si Funnelish intenta leer/enviar un valor malo,
    // lo interceptamos con un getter/setter
    // ============================================
    var valorInterno = phone.value || '';
    
    // Solo si no está ya interceptado
    if (!phone.dataset.valueIntercepted) {
      phone.dataset.valueIntercepted = '1';
      
      Object.defineProperty(phone, 'value', {
        get: function() {
          // Si estamos bloqueando, devolver vacío para que Funnelish falle validación
          if (bloqueando) return '';
          return valorInterno;
        },
        set: function(v) {
          valorInterno = v;
          // Actualizar el atributo para mantener sincronía visual
          phone.setAttribute('value', v);
        },
        configurable: true
      });
    }

    // ============================================
    // BLOQUEO DE TECLA ENTER
    // ============================================
    phone.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var formatted = formatearTelefono(phone.value);
        if (!formatted) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          mostrarError();
          return false;
        }
      }
    }, true);
  }

  // =========================
  // INIT
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

    // Teléfono con bloqueo total
    instalarTelefonoCO();
  }

  // =========================
  // BOOTSTRAP
  // =========================
  function boot() { initCore(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 300); });
  } else {
    setTimeout(boot, 300);
  }

  // Polling para forms embebidos que cargan tarde
  var tries = 0;
  var poll = setInterval(function () {
    tries++;
    boot();
    if (document.querySelector('input[name="phone"]') || tries >= 80) {
      clearInterval(poll);
    }
  }, 250);

  // Observer para re-renderizados de Funnelish
  var mo = new MutationObserver(function () { boot(); });
  mo.observe(document.documentElement, { childList: true, subtree: true });

})();
