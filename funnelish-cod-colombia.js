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
  // TELÉFONO CO (DEFINITIVO)
  // Regla: SI ES INVÁLIDO → INPUT QUEDA VACÍO
  // Así Funnelish NO puede avanzar.
  // =========================
  function normalizarTelefonoCO(input) {
    var raw = (input.value || '').toString();
    var digits = raw.replace(/\D/g, '');

    // quitar 57 si lo escriben
    if (digits.startsWith('57')) digits = digits.slice(2);

    // si empieza mal o está vacío -> inválido
    if (!digits || !digits.startsWith('3')) {
      input.value = '';
      return false;
    }

    // limitar a 10
    if (digits.length > 10) digits = digits.slice(0, 10);

    // incompleto -> inválido
    if (digits.length !== 10) {
      input.value = '';
      return false;
    }

    input.value = '+57' + digits;
    return true;
  }

  function instalarTelefonoCO() {
    var phone = document.querySelector('input[name="phone"]');
    if (!phone) return;

    if (phone.dataset.telcoInstalled === '1') return;
    phone.dataset.telcoInstalled = '1';

    phone.setAttribute('inputmode', 'numeric');
    phone.setAttribute('autocomplete', 'tel');
    phone.placeholder = 'Ej: 3001234567';

    // aviso visual
    var aviso = document.getElementById('phone-warning');
    if (!aviso) {
      aviso = document.createElement('div');
      aviso.id = 'phone-warning';
      aviso.style.cssText = 'color:#f87171;font-size:13px;margin-top:6px;display:none;';
      aviso.textContent = 'Ingresa un celular válido de Colombia (10 dígitos, empieza por 3). Ej: 3001234567';
      phone.parentNode.appendChild(aviso);
    }

    function mostrarError() {
      aviso.style.display = 'block';
      phone.classList.add('invalid');
    }

    function limpiarError() {
      aviso.style.display = 'none';
      phone.classList.remove('invalid');
    }

    // mientras escribe: no borramos, solo limpiamos estado
    phone.addEventListener('input', function () {
      limpiarError();
    });

    // al salir: si inválido -> vacío
    phone.addEventListener('blur', function () {
      var ok = normalizarTelefonoCO(phone);
      if (!ok) mostrarError();
      else limpiarError();
    });

    function isSubmitAction(e) {
      var t = e.target;
      if (!t || !t.closest) return false;
      return !!t.closest('a[href="#submit-step"]');
    }

    function bloquear(e) {
      var ok = normalizarTelefonoCO(phone);
      if (!ok) {
        mostrarError();
        phone.focus();
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
      limpiarError();
      return true;
    }

    // Bloqueo en DOCUMENTO en CAPTURA (antes que Funnelish)
    document.addEventListener('pointerdown', function (e) {
      if (isSubmitAction(e)) bloquear(e);
    }, true);

    document.addEventListener('touchstart', function (e) {
      if (isSubmitAction(e)) bloquear(e);
    }, true);

    document.addEventListener('click', function (e) {
      if (isSubmitAction(e)) bloquear(e);
    }, true);

    // Enter
    phone.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        bloquear(e);
      }
    }, true);

    // submit real si existe
    document.addEventListener('submit', function (e) {
      bloquear(e);
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

    // Teléfono definitivo
    instalarTelefonoCO();
  }

  // =========================
  // BOOTSTRAP ANTI-RENDER
  // =========================
  function boot() { initCore(); }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 500); });
  } else {
    setTimeout(boot, 500);
  }

  // Polling por si el form embebido aparece tarde
  var tries = 0;
  var maxTries = 80; // ~20s
  var poll = setInterval(function () {
    tries++;
    boot();
    if (document.querySelector('input[name="phone"]') || tries >= maxTries) {
      clearInterval(poll);
    }
  }, 250);

  // Observer por si Funnelish re-renderiza
  var mo = new MutationObserver(function () { boot(); });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  // Último guardián en submit (si ocurre)
  document.addEventListener('submit', function (e) {
    var tel = document.querySelector('input[name="phone"]');
    var email = document.querySelector('input[name="email"]');
    var ciudad = document.querySelector('input[name="shipping_city"]');

    if (tel) {
      var ok = normalizarTelefonoCO(tel);
      if (!ok) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        tel.focus();
        return false;
      }
    }
    if (email && !email.value) email.value = generarEmail();
    if (ciudad && ciudad.value) seleccionarDepartamento(ciudad.value.trim());
  }, true);

})();
