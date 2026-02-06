(function () {

  // TUS WEBHOOKS
  var WEBHOOKS = {
    pedidoCompleto: 'https://programacioncwf.app.n8n.cloud/webhook/pedido-completo',
    carritoAbandonado: 'https://programacioncwf.app.n8n.cloud/webhook/carrito-abandonado'
  };

  // TODO TU CÓDIGO ORIGINAL SIN TOCAR
  var ciudadesColombia = {"Leticia": "Amazonas", "Puerto Nariño": "Amazonas","Medellín": "Antioquia", "Bello": "Antioquia", "Itagüí": "Antioquia", "Envigado": "Antioquia","Apartadó": "Antioquia", "Turbo": "Antioquia", "Rionegro": "Antioquia", "Caucasia": "Antioquia","Copacabana": "Antioquia", "La Estrella": "Antioquia", "Sabaneta": "Antioquia", "Caldas": "Antioquia","Girardota": "Antioquia", "Barbosa": "Antioquia", "Marinilla": "Antioquia", "La Ceja": "Antioquia","El Retiro": "Antioquia", "Guatapé": "Antioquia", "Santa Fe de Antioquia": "Antioquia","Barranquilla": "Atlántico", "Soledad": "Atlántico", "Malambo": "Atlántico", "Sabanalarga": "Atlántico","Galapa": "Atlántico", "Puerto Colombia": "Atlántico", "Baranoa": "Atlántico","Bogotá": "Bogotá D.C.", "Bogotá D.C.": "Bogotá D.C.","Cartagena": "Bolívar", "Magangué": "Bolívar", "Turbaco": "Bolívar", "Arjona": "Bolívar","Tunja": "Boyacá", "Duitama": "Boyacá", "Sogamoso": "Boyacá","Manizales": "Caldas", "La Dorada": "Caldas","Florencia": "Caquetá","Yopal": "Casanare","Popayán": "Cauca","Valledupar": "Cesar","Quibdó": "Chocó","Montería": "Córdoba", "Cereté": "Córdoba","Soacha": "Cundinamarca", "Facatativá": "Cundinamarca", "Zipaquirá": "Cundinamarca", "Chía": "Cundinamarca","Fusagasugá": "Cundinamarca", "Mosquera": "Cundinamarca", "Madrid": "Cundinamarca", "Funza": "Cundinamarca","Cajicá": "Cundinamarca", "Girardot": "Cundinamarca","Neiva": "Huila", "Pitalito": "Huila","Riohacha": "La Guajira","Santa Marta": "Magdalena","Villavicencio": "Meta","Pasto": "Nariño", "Tumaco": "Nariño","Cúcuta": "Norte de Santander", "Ocaña": "Norte de Santander","Mocoa": "Putumayo","Armenia": "Quindío", "Calarcá": "Quindío","Pereira": "Risaralda", "Dosquebradas": "Risaralda","San Andrés": "San Andrés y Providencia","Bucaramanga": "Santander", "Floridablanca": "Santander", "Girón": "Santander","Sincelejo": "Sucre","Ibagué": "Tolima", "Espinal": "Tolima","Cali": "Valle del Cauca", "Palmira": "Valle del Cauca", "Tuluá": "Valle del Cauca","Buenaventura": "Valle del Cauca", "Cartago": "Valle del Cauca", "Buga": "Valle del Cauca"};
  
  var departamentosColombia = ["Amazonas", "Antioquia", "Atlántico", "Bogotá D.C.", "Bolívar", "Boyacá", "Caldas","Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca","Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander","Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre","Tolima", "Valle del Cauca"];
  
  var listaCiudades = Object.keys(ciudadesColombia).sort();

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
        item.onclick = function () { input.value = ciudad; box.style.display = 'none'; seleccionarDepartamento(ciudad); };
        box.appendChild(item);
      });
      box.style.display = 'block';
    });
    input.addEventListener('blur', function () {
      setTimeout(function () { box.style.display = 'none'; if (input.value && input.value.trim()) seleccionarDepartamento(input.value.trim()); }, 200);
    });
  }

  function formatearTelefono(valor) {
    var digits = (valor || '').replace(/\D/g, '');
    if (digits.startsWith('57') && digits.length > 10) digits = digits.slice(2);
    if (digits.length > 10) digits = digits.slice(0, 10);
    if (digits.length === 10 && digits.startsWith('3')) return '+57' + digits;
    return null;
  }

  var avisoEl = null;
  function crearAviso(phone) {
    if (avisoEl) return avisoEl;
    avisoEl = document.createElement('div');
    avisoEl.style.cssText = 'color:#dc2626;font-size:13px;margin-top:6px;display:none;font-weight:600;';
    avisoEl.textContent = '⚠️ Celular inválido. Debe tener 10 dígitos y empezar por 3. Ej: 3001234567';
    phone.parentNode.appendChild(avisoEl);
    return avisoEl;
  }

  function mostrarError(phone) {
    if (!avisoEl) crearAviso(phone);
    avisoEl.style.display = 'block';
    phone.style.borderColor = '#dc2626';
  }

  function limpiarError(phone) {
    if (avisoEl) avisoEl.style.display = 'none';
    phone.style.borderColor = '';
  }

  function instalarTelefonoCO() {
    var phone = document.querySelector('input[name="phone"]');
    if (!phone || phone.dataset.phoneValidatorCO === '1') return;
    phone.dataset.phoneValidatorCO = '1';
    phone.placeholder = 'Ej: 3001234567';
    phone.setAttribute('inputmode', 'numeric');
    crearAviso(phone);
    
    phone.addEventListener('input', function () {
      var val = this.value.replace(/\D/g, '');
      if (val.length > 10) val = val.slice(0, 10);
      this.value = val;
      if (val.length === 10 && val.startsWith('3')) limpiarError(this);
      else if (val.length >= 10) mostrarError(this);
    });
    
    phone.addEventListener('blur', function () {
      var fmt = formatearTelefono(this.value);
      if (fmt) { this.value = fmt; limpiarError(this); }
      else if (this.value.trim() !== '') mostrarError(this);
    });
  }

  // NUEVO: Captura y envío DESPUÉS de que Funnelish procese
  function capturarDatos() {
    var datos = {nombre: '', telefono: '', email: '', direccion: '', ciudad: '', departamento: '', pais: 'Colombia'};
    var n = document.querySelector('input[name="name"]') || document.querySelector('input[name="shipping_name"]');
    if (n && n.value) datos.nombre = n.value.trim();
    var t = document.querySelector('input[name="phone"]');
    if (t && t.value) datos.telefono = t.value.trim();
    var e = document.querySelector('input[name="email"]');
    if (e && e.value) datos.email = e.value.trim();
    var d = document.querySelector('input[name="shipping_address"]');
    if (d && d.value) datos.direccion = d.value.trim();
    var c = document.querySelector('input[name="shipping_city"]');
    if (c && c.value) datos.ciudad = c.value.trim();
    var s = document.querySelector('select[name="shipping_state"]');
    if (s && s.value) datos.departamento = s.value;
    return datos;
  }

  // Escuchar evento de Funnelish cuando se completa el pedido
  window.addEventListener('FunnelishOrderCompleted', function() {
    var datos = capturarDatos();
    console.log('[COD-CO] 📦 Pedido completado, enviando a n8n...');
    fetch(WEBHOOKS.pedidoCompleto, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    }).then(function(r) { return r.text(); })
    .then(function(t) { console.log('[COD-CO] ✅ Enviado:', t); })
    .catch(function(e) { console.error('[COD-CO] ❌ Error:', e); });
  });

  // Carrito abandonado
  var carritoEnviado = false;
  var timerCarrito = null;
  
  function enviarCarritoAbandonado() {
    if (carritoEnviado) return;
    var datos = capturarDatos();
    if (!datos.nombre || !datos.telefono || datos.telefono.length < 10) return;
    console.log('[COD-CO] 🛒 Carrito abandonado, enviando...');
    fetch(WEBHOOKS.carritoAbandonado, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    }).then(function(r) { return r.text(); })
    .then(function(t) { carritoEnviado = true; console.log('[COD-CO] ✅ Carrito enviado:', t); })
    .catch(function(e) { console.error('[COD-CO] ❌ Error:', e); });
  }

  function iniciarTrackingCarrito() {
    ['name', 'phone', 'shipping_city', 'shipping_address'].forEach(function(campo) {
      var input = document.querySelector('input[name="' + campo + '"]');
      if (!input) return;
      input.addEventListener('input', function() {
        if (timerCarrito) clearTimeout(timerCarrito);
        timerCarrito = setTimeout(enviarCarritoAbandonado, 15000);
      });
    });
    
    window.addEventListener('beforeunload', function() {
      if (!carritoEnviado) {
        var datos = capturarDatos();
        if (datos.nombre && datos.telefono && datos.telefono.length >= 10) {
          navigator.sendBeacon(WEBHOOKS.carritoAbandonado, JSON.stringify(datos));
        }
      }
    });
  }

  function init() {
    var email = document.querySelector('input[name="email"]');
    if (email && !email.value) email.value = generarEmail();
    ocultarCampo('email');
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
    inyectarDepartamentos();
    ocultarCampo('shipping_state');
    var ciudad = document.querySelector('input[name="shipping_city"]');
    if (ciudad) {
      ciudad.placeholder = 'Escribe tu ciudad...';
      ciudad.setAttribute('autocomplete', 'off');
      crearAutocompletado(ciudad);
    }
    instalarTelefonoCO();
    iniciarTrackingCarrito();
    console.log('[COD-CO] ✅ Inicializado');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 300); });
  } else {
    setTimeout(init, 300);
  }

  var tries = 0;
  var poll = setInterval(function () {
    tries++;
    init();
    if (document.querySelector('input[name="phone"]') || tries >= 80) clearInterval(poll);
  }, 250);

  var mo = new MutationObserver(init);
  mo.observe(document.documentElement, { childList: true, subtree: true });

})();
