(function () {

  // ========== CONFIGURACIÓN CARRITO ABANDONADO (GLOBAL) ==========
  // No pisar el objeto si ya existe (evita romper otras cosas si el script se carga 2 veces)
  window.carritoAbandonado = window.carritoAbandonado || {};
  window.carritoAbandonado.webhook = 'https://programacioncwf.app.n8n.cloud/webhook/funnelish-evento-parcial';
  window.carritoAbandonado.nombre = window.carritoAbandonado.nombre || '';
  window.carritoAbandonado.telefono = window.carritoAbandonado.telefono || '';
  window.carritoAbandonado.dioClickComprar = false;
  // producto/price se llenan luego
  // ========== FIN CONFIGURACIÓN ==========

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

  function generarEmail() {
    return 'cliente' + Math.random().toString().slice(2, 10) + Date.now().toString().slice(-4) + '@codcolombia.co';
  }

  function extraerDigitosColombia(tel) {
    var nums = tel.replace(/\D/g, '');
    if (nums.length > 10 && nums.substring(0, 2) === '57') {
      nums = nums.substring(2);
    }
    return nums;
  }

  function validarTelefonoColombia(tel) {
    var digits = extraerDigitosColombia(tel);
    return digits.length === 10 && digits.charAt(0) === '3';
  }

  function normalizarTelefonoColombia(tel) {
    var digits = extraerDigitosColombia(tel);
    if (digits.length === 10 && digits.charAt(0) === '3') {
      return '+57' + digits;
    }
    return null;
  }

  function mostrarErrorTelefono(input, mensaje) {
    var errorId = 'error-telefono-colombia';
    var existente = document.getElementById(errorId);
    if (existente) existente.remove();

    var errorDiv = document.createElement('div');
    errorDiv.id = errorId;
    errorDiv.style.cssText = 'color:#dc3545;font-size:13px;margin-top:5px;padding:8px 12px;background:#fff5f5;border:1px solid #dc3545;border-radius:6px;';
    errorDiv.textContent = mensaje;

    input.style.borderColor = '#dc3545';
    input.parentElement.appendChild(errorDiv);
  }

  function limpiarErrorTelefono(input) {
    var errorId = 'error-telefono-colombia';
    var existente = document.getElementById(errorId);
    if (existente) existente.remove();
    input.style.borderColor = '';
  }

  function validarYMostrarEstadoTelefono(input) {
    var valor = input.value.trim();
    if (!valor) {
      limpiarErrorTelefono(input);
      return false;
    }

    if (validarTelefonoColombia(valor)) {
      limpiarErrorTelefono(input);
      input.style.borderColor = '#28a745';

      // ========== CAPTURAR TELÉFONO PARA CARRITO ABANDONADO ==========
      window.carritoAbandonado.telefono = extraerDigitosColombia(valor);
      // =================================================================

      return true;
    } else {
      mostrarErrorTelefono(input, 'Escribe tu celular de Colombia (10 dígitos). Ej: 3001234567');
      return false;
    }
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
    var box = document.createElement('div');
    box.id = 'sugerencias-ciudad';
    box.style.cssText = 'position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid #ccc;border-radius:0 0 8px 8px;max-height:200px;overflow-y:auto;z-index:99999;display:none;box-shadow:0 4px 12px rgba(0,0,0,0.15);';

    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(box);

    input.addEventListener('input', function () {
      var txt = this.value.toLowerCase().trim();
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
        if (input.value.trim()) seleccionarDepartamento(input.value.trim());
      }, 200);
    });

    document.addEventListener('click', function (e) {
      if (e.target !== input) box.style.display = 'none';
    });
  }

  function init() {
    var email = document.querySelector('input[name="email"]');
    if (email) email.value = generarEmail();
    ocultarCampo('email');

    var pais = document.querySelector('select[name="shipping_country"]');
    if (pais) {
      for (var i = 0; i < pais.options.length; i++) {
        if (pais.options[i].value === 'CO') {
          pais.selectedIndex = i;
          pais.dispatchEvent(new Event('change', { bubbles: true }));
          break;
        }
      }
    }
    ocultarCampo('shipping_country');

    inyectarDepartamentos();
    ocultarCampo('shipping_state');

    var ciudad = document.querySelector('input[name="shipping_city"]');
    if (ciudad) {
      ciudad.placeholder = 'Escribe tu ciudad...';
      ciudad.setAttribute('autocomplete', 'off');
      crearAutocompletado(ciudad);
    }

    // ========== SETUP TELÉFONO ==========
    var tel = document.querySelector('input[name="phone"]');
    if (tel) {
      tel.placeholder = 'Ej: 3001234567';
      tel.setAttribute('autocomplete', 'tel');
      tel.setAttribute('inputmode', 'tel');
      tel.setAttribute('maxlength', '15');

      tel.addEventListener('input', function () {
        validarYMostrarEstadoTelefono(this);
      });

      tel.addEventListener('blur', function () {
        var valor = this.value.trim();
        if (valor) {
          var normalizado = normalizarTelefonoColombia(valor);
          if (normalizado) {
            this.value = normalizado;
            limpiarErrorTelefono(this);
            this.style.borderColor = '#28a745';
          } else {
            validarYMostrarEstadoTelefono(this);
          }
        }
      });
    }

    // ========== SETUP NOMBRE PARA CARRITO ABANDONADO ==========
    var nombre = document.querySelector('input[name="full_name"]');
    if (nombre) {
      nombre.addEventListener('input', function () {
        window.carritoAbandonado.nombre = this.value.trim();
      });
      nombre.addEventListener('blur', function () {
        window.carritoAbandonado.nombre = this.value.trim();
      });
    }

    console.log('✅ Script formulario + carrito abandonado cargado');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 500); });
  } else {
    setTimeout(init, 500);
  }

  // ========== VALIDACIÓN SUBMIT ==========
  document.addEventListener('submit', function (e) {
    var tel = document.querySelector('input[name="phone"]');
    var email = document.querySelector('input[name="email"]');
    var ciudad = document.querySelector('input[name="shipping_city"]');

    if (tel) {
      var valorTel = tel.value.trim();

      if (!valorTel) {
        e.preventDefault();
        e.stopPropagation();
        mostrarErrorTelefono(tel, 'El teléfono es obligatorio. Ej: 3001234567');
        tel.focus();
        return false;
      }

      var normalizado = normalizarTelefonoColombia(valorTel);

      if (!normalizado) {
        e.preventDefault();
        e.stopPropagation();
        mostrarErrorTelefono(tel, 'Escribe tu celular de Colombia (10 dígitos). Ej: 3001234567');
        tel.focus();
        return false;
      }

      tel.value = normalizado;
      limpiarErrorTelefono(tel);
    }

    if (email && !email.value) email.value = generarEmail();
    if (ciudad && ciudad.value) seleccionarDepartamento(ciudad.value.trim());

    // ========== MARCAR QUE DIO CLICK EN COMPRAR ==========
    window.carritoAbandonado.dioClickComprar = true;

  }, true);

  // ========== CAPTURA PRODUCTO/PRECIO (UNA SOLA VEZ, SELECTORES CORRECTOS) ==========
  (function initProductoCarrito() {

    function getSelectedPLItem() {
      var sel = document.querySelector('.pl-item.selected');
      if (sel) return sel;

      var checked = document.querySelector('input.pl-radio[name="product-id"]:checked');
      if (checked && checked.closest) return checked.closest('.pl-item');

      return document.querySelector('.pl-item');
    }

    function saveCurrentSelection() {
      var item = getSelectedPLItem();
      if (!item) return;

      // DOM real:
      var nameEl = item.querySelector('.pl-name .name');
      var name = nameEl ? nameEl.textContent.trim().replace(/\s+/g, ' ').substring(0, 100) : 'Producto';

      var priceEl = item.querySelector('.pl-price .pl-pvalue p:last-of-type strong');
      if (!priceEl) priceEl = item.querySelector('.pl-price .pl-pvalue strong:last-of-type');

      var priceText = priceEl ? priceEl.textContent : '';
      var price = parseInt(String(priceText).replace(/[^\d]/g, ''), 10) || 0;

      window.carritoAbandonado.product_name = name;
      window.carritoAbandonado.product_price = price;
    }

    // Render dinámico Funnelish
    setTimeout(saveCurrentSelection, 300);
    setTimeout(saveCurrentSelection, 1000);
    setTimeout(saveCurrentSelection, 2500);

    document.addEventListener('change', function (e) {
      if (e.target && e.target.matches && e.target.matches('input.pl-radio[name="product-id"]')) {
        setTimeout(saveCurrentSelection, 50);
      }
    }, true);

    document.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.closest && t.closest('.pl-item')) {
        setTimeout(saveCurrentSelection, 50);
      }
    }, true);

    // Debug manual (opcional)
    window.__forceCaptureProduct = function () {
      saveCurrentSelection();
      return window.carritoAbandonado;
    };

  })();

  // ========== CARRITO ABANDONADO - ENVIAR AL CERRAR PÁGINA (UNA SOLA VEZ) ==========
  window.addEventListener('beforeunload', function () {
    var ca = window.carritoAbandonado;

    if (ca && ca.nombre && ca.telefono && ca.telefono.length >= 10 && !ca.dioClickComprar) {

      var ciudad = document.querySelector('input[name="shipping_city"]');
      var direccion = document.querySelector('input[name="shipping_address"]');
      var email = document.querySelector('input[name="email"]');

      var datos = {
        body: {
          event_type: 'abandono_pagina',
          first_name: ca.nombre,
          phone: ca.telefono,
          city: ciudad ? ciudad.value : '',
          address: direccion ? direccion.value : '',
          email: email ? email.value : '',
          product_name: ca.product_name || 'Producto',
          product_price: ca.product_price || 0,
          page_url: window.location.href
        }
      };

      try {
        var blob = new Blob([JSON.stringify(datos)], { type: 'application/json' });
        navigator.sendBeacon(ca.webhook, blob);
      } catch (e) { }

      console.log('📤 Carrito abandonado enviado:', datos);
    }
  });

})();
