
(function () {

  // =========================
  // CONFIGURACIÓN - TUS WEBHOOKS REALES
  // =========================
  var CONFIG = {
    webhookPedidoCompleto: 'https://programacioncwf.app.n8n.cloud/webhook/pedido-completo',
    webhookCarritoAbandonado: 'https://programacioncwf.app.n8n.cloud/webhook/carrito-abandonado',
    tiempoEsperaCarrito: 15000,
    debug: true
  };

  function log(mensaje, tipo) {
    if (!CONFIG.debug) return;
    var prefix = '[COD-CO FINAL]';
    if (tipo === 'error') console.error(prefix, '❌', mensaje);
    else if (tipo === 'warn') console.warn(prefix, '⚠️', mensaje);
    else if (tipo === 'success') console.log(prefix, '✅', mensaje);
    else console.log(prefix, mensaje);
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
  function generarEmail() {
    return 'cliente' + Math.random().toString().slice(2, 10) + Date.now().toString().slice(-4) + '@codcolombia.co';
  }

  // 🔧 FIX: Ocultar campo MÁS AGRESIVO
  function ocultarCampo(nombre) {
    var el = document.querySelector('[name="' + nombre + '"]');
    if (el) {
      var formEl = el.closest('.form-element');
      if (formEl) {
        // Ocultar de TODAS las formas posibles
        formEl.style.setProperty('display', 'none', 'important');
        formEl.style.setProperty('visibility', 'hidden', 'important');
        formEl.style.setProperty('height', '0', 'important');
        formEl.style.setProperty('margin', '0', 'important');
        formEl.style.setProperty('padding', '0', 'important');
        formEl.style.setProperty('overflow', 'hidden', 'important');
        formEl.style.setProperty('opacity', '0', 'important');
        formEl.style.setProperty('position', 'absolute', 'important');
        formEl.style.setProperty('left', '-9999px', 'important');
        formEl.setAttribute('hidden', 'true');
        formEl.setAttribute('aria-hidden', 'true');
        log('Campo ' + nombre + ' OCULTO completamente');
      }
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
    log('Departamentos inyectados');
  }

  // 🔧 FIX: Seleccionar departamento MÁS ROBUSTO
  function seleccionarDepartamento(ciudad) {
    var depto = ciudadesColombia[ciudad];
    if (!depto) {
      log('No se encontró departamento para: ' + ciudad, 'warn');
      return;
    }
    
    var select = document.querySelector('select[name="shipping_state"]');
    if (!select) {
      log('Select de departamento no encontrado', 'error');
      return;
    }
    
    // Intentar seleccionar por value
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === depto) {
        select.selectedIndex = i;
        select.value = depto;
        
        // Disparar TODOS los eventos posibles
        select.dispatchEvent(new Event('change', { bubbles: true }));
        select.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Si usa Alpine/Vue
        if (select._x_model) {
          select._x_model.set(depto);
        }
        
        log('Departamento seleccionado: ' + depto, 'success');
        return;
      }
    }
    
    log('No se pudo seleccionar departamento: ' + depto, 'error');
  }

  function crearAutocompletado(input) {
    if (!input || input.dataset.cityAutocomplete === '1') return;
    input.dataset.cityAutocomplete = '1';

    var parent = input.parentElement;
    var computedPosition = window.getComputedStyle(parent).position;
    if (computedPosition === 'static' || !computedPosition) {
      parent.style.position = 'relative';
    }

    var box = document.createElement('div');
    box.id = 'sugerencias-ciudad';
    box.style.cssText = [
      'position: absolute !important',
      'top: 100% !important',
      'left: 0 !important',
      'right: 0 !important',
      'width: 100% !important',
      'background: #fff !important',
      'border: 1px solid #ccc !important',
      'border-top: none !important',
      'border-radius: 0 0 8px 8px !important',
      'max-height: 200px !important',
      'overflow-y: auto !important',
      'z-index: 99999 !important',
      'display: none !important',
      'box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important',
      'margin: 0 !important',
      'padding: 0 !important'
    ].join(';');

    parent.appendChild(box);

    // 🔧 FIX: Seleccionar departamento al escribir también
    input.addEventListener('input', function () {
      var txt = (this.value || '').trim();
      
      // Intentar seleccionar departamento mientras escribe
      if (txt.length >= 3) {
        var ciudadExacta = listaCiudades.find(function(c) {
          return c.toLowerCase() === txt.toLowerCase();
        });
        if (ciudadExacta) {
          seleccionarDepartamento(ciudadExacta);
        }
      }
      
      var txtLower = txt.toLowerCase();
      box.innerHTML = '';
      
      if (txt.length < 1) { 
        box.style.display = 'none !important'; 
        return; 
      }
      
      var res = listaCiudades.filter(function (c) { 
        return c.toLowerCase().indexOf(txtLower) > -1; 
      }).slice(0, 8);
      
      if (res.length === 0) { 
        box.style.display = 'none !important'; 
        return; 
      }
      
      res.forEach(function (ciudad) {
        var item = document.createElement('div');
        item.innerHTML = '<strong>' + ciudad + '</strong> <span style="color:#888;font-size:12px;">- ' + ciudadesColombia[ciudad] + '</span>';
        item.style.cssText = 'padding:10px 12px;cursor:pointer;border-bottom:1px solid #eee;background:#fff;';
        
        item.onmouseenter = function () { this.style.background = '#f0f7ff'; };
        item.onmouseleave = function () { this.style.background = '#fff'; };
        
        item.onclick = function () {
          input.value = ciudad;
          box.style.display = 'none !important';
          seleccionarDepartamento(ciudad);
          log('Ciudad seleccionada del dropdown: ' + ciudad, 'success');
        };
        
        box.appendChild(item);
      });
      
      box.style.display = 'block !important';
    });

    // 🔧 FIX: Seleccionar al perder foco
    input.addEventListener('blur', function () {
      setTimeout(function () {
        box.style.display = 'none !important';
        var ciudad = input.value.trim();
        if (ciudad) {
          seleccionarDepartamento(ciudad);
        }
      }, 200);
    });

    // 🔧 FIX: Seleccionar al presionar Enter
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && this.value) {
        seleccionarDepartamento(this.value.trim());
      }
    });

    document.addEventListener('click', function (e) {
      if (e.target !== input && !box.contains(e.target)) {
        box.style.display = 'none !important';
      }
    });

    log('Autocompletado instalado');
  }

  // =========================
  // VALIDACIÓN TELÉFONO
  // =========================
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
    avisoEl.id = 'phone-warning-v3';
    avisoEl.style.cssText = 'color:#dc2626;font-size:13px;margin-top:6px;display:none;font-weight:600;';
    avisoEl.textContent = '⚠️ Celular inválido. Debe tener 10 dígitos y empezar por 3. Ej: 3001234567';
    phone.parentNode.appendChild(avisoEl);
    return avisoEl;
  }

  function mostrarError(phone) {
    if (!avisoEl) crearAviso(phone);
    avisoEl.style.display = 'block';
    phone.style.borderColor = '#dc2626';
    phone.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.3)';
  }

  function limpiarError(phone) {
    if (avisoEl) avisoEl.style.display = 'none';
    phone.style.borderColor = '';
    phone.style.boxShadow = '';
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

      if (val.length === 10 && val.startsWith('3')) {
        limpiarError(this);
      } else if (val.length >= 10) {
        mostrarError(this);
      }
    });

    phone.addEventListener('blur', function () {
      var fmt = formatearTelefono(this.value);
      if (fmt) {
        this.value = fmt;
        limpiarError(this);
      } else if (this.value.trim() !== '') {
        mostrarError(this);
      }
    });

    log('Validación de teléfono instalada');
  }

  // =========================
  // VALIDACIÓN EN CLICK
  // =========================
  function validarTelefonoEnClick() {
    document.addEventListener('click', function(e) {
      var btn = e.target.closest('a[href="#submit-step"]');
      if (!btn) return;
      
      var phone = document.querySelector('input[name="phone"]');
      if (!phone) return;
      
      var fmt = formatearTelefono(phone.value);
      if (!fmt) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        mostrarError(phone);
        phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        phone.focus();
        log('Teléfono inválido, submit bloqueado', 'warn');
        return false;
      } else {
        phone.value = fmt;
        limpiarError(phone);
        
        // 🔧 FIX: Asegurar departamento antes de enviar
        var ciudad = document.querySelector('input[name="shipping_city"]');
        if (ciudad && ciudad.value) {
          seleccionarDepartamento(ciudad.value.trim());
        }
        
        // Enviar pedido
        setTimeout(function() {
          enviarPedidoCompleto();
        }, 100);
      }
    }, true);
    
    log('Validación en click instalada');
  }

  // =========================
  // CAPTURA DE DATOS
  // =========================
  
  window.__carritoEnviado = false;
  window.__pedidoCompleto = false;
  var timerCarrito = null;

  function obtenerDatosFormulario() {
    var datos = {
      nombre: '',
      telefono: '',
      email: '',
      direccion: '',
      ciudad: '',
      departamento: '',
      pais: 'Colombia',
      productos: [],
      total: 0,
      subtotal: 0,
      envio: 0,
      url_pagina: window.location.href,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      utm_source: obtenerParametroURL('utm_source'),
      utm_medium: obtenerParametroURL('utm_medium'),
      utm_campaign: obtenerParametroURL('utm_campaign')
    };

    var nombreInput = document.querySelector('input[name="name"]') || 
                      document.querySelector('input[name="shipping_name"]');
    if (nombreInput && nombreInput.value) datos.nombre = nombreInput.value.trim();

    var telefonoInput = document.querySelector('input[name="phone"]');
    if (telefonoInput && telefonoInput.value) datos.telefono = telefonoInput.value.trim();

    var emailInput = document.querySelector('input[name="email"]');
    if (emailInput && emailInput.value) datos.email = emailInput.value.trim();

    var direccionInput = document.querySelector('input[name="shipping_address"]');
    if (direccionInput && direccionInput.value) datos.direccion = direccionInput.value.trim();

    var ciudadInput = document.querySelector('input[name="shipping_city"]');
    if (ciudadInput && ciudadInput.value) {
      datos.ciudad = ciudadInput.value.trim();
      // 🔧 FIX: Obtener departamento desde ciudades
      var depto = ciudadesColombia[datos.ciudad];
      if (depto) {
        datos.departamento = depto;
      }
    }

    var deptoSelect = document.querySelector('select[name="shipping_state"]');
    if (deptoSelect && deptoSelect.value) {
      datos.departamento = deptoSelect.value;
    }

    try {
      if (window.FunnelishApp && window.FunnelishApp.cart) {
        var cart = window.FunnelishApp.cart;
        if (cart.items && Array.isArray(cart.items)) {
          datos.productos = cart.items.map(function(item) {
            return {
              nombre: item.title || item.name || 'Producto',
              cantidad: item.quantity || 1,
              precio: item.price || 0,
              variante: item.variant_title || '',
              sku: item.sku || ''
            };
          });
        }
        datos.subtotal = cart.subtotal || 0;
        datos.envio = cart.shipping || 0;
        datos.total = cart.total || 0;
      }
    } catch (err) {
      log('Error al extraer carrito: ' + err.message, 'error');
    }

    log('Datos capturados:', 'success');
    console.log(datos);
    return datos;
  }

  function validarDatosMinimos(datos) {
    if (!datos.nombre || datos.nombre.length < 2) {
      log('Validación falló: nombre incompleto', 'warn');
      return false;
    }
    if (!datos.telefono || datos.telefono.length < 10) {
      log('Validación falló: teléfono incompleto', 'warn');
      return false;
    }
    log('Datos mínimos validados', 'success');
    return true;
  }

  // 🔧 FIX: Envío de webhook con logs detallados
  function enviarWebhook(url, datos, tipo) {
    log('Enviando webhook ' + tipo + ' a: ' + url, 'success');
    console.log('Payload:', datos);
    
    return fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then(function(response) {
      log('Respuesta del servidor: ' + response.status, response.ok ? 'success' : 'error');
      return response.text();
    })
    .then(function(text) {
      log('Respuesta del webhook ' + tipo + ': ' + text, 'success');
      return text;
    })
    .catch(function(error) {
      log('ERROR en webhook ' + tipo + ': ' + error.message, 'error');
      console.error('Error completo:', error);
    });
  }

  function enviarPedidoCompleto() {
    if (window.__pedidoCompleto) {
      log('Pedido ya enviado', 'warn');
      return;
    }

    var datos = obtenerDatosFormulario();
    if (!validarDatosMinimos(datos)) {
      log('Datos incompletos, no se envía', 'warn');
      return;
    }

    datos.tipo_evento = 'pedido_completo';
    datos.estado_pedido = 'nuevo';

    log('📦 ENVIANDO PEDIDO COMPLETO...', 'success');
    
    enviarWebhook(CONFIG.webhookPedidoCompleto, datos, 'pedido completo')
      .then(function() {
        window.__pedidoCompleto = true;
        window.__carritoEnviado = true;
        if (timerCarrito) {
          clearTimeout(timerCarrito);
          timerCarrito = null;
        }
        log('Pedido completo enviado exitosamente', 'success');
      });
  }

  function enviarCarritoAbandonado() {
    if (window.__carritoEnviado || window.__pedidoCompleto) return;

    var datos = obtenerDatosFormulario();
    if (!validarDatosMinimos(datos)) return;

    datos.tipo_evento = 'carrito_abandonado';
    datos.estado_pedido = 'abandonado';

    log('🛒 ENVIANDO CARRITO ABANDONADO...', 'warn');

    enviarWebhook(CONFIG.webhookCarritoAbandonado, datos, 'carrito abandonado')
      .then(function() {
        window.__carritoEnviado = true;
        log('Carrito abandonado enviado', 'success');
      });
  }

  function iniciarTrackingCarrito() {
    var camposClave = ['name', 'phone', 'shipping_city', 'shipping_address'];
    
    camposClave.forEach(function(campo) {
      var input = document.querySelector('input[name="' + campo + '"]');
      if (input) {
        input.addEventListener('input', function() {
          if (timerCarrito) clearTimeout(timerCarrito);
          timerCarrito = setTimeout(enviarCarritoAbandonado, CONFIG.tiempoEsperaCarrito);
          log('Timer de carrito reiniciado (15s)');
        });
      }
    });

    window.addEventListener('beforeunload', function() {
      if (!window.__pedidoCompleto && !window.__carritoEnviado) {
        var datos = obtenerDatosFormulario();
        if (validarDatosMinimos(datos)) {
          datos.tipo_evento = 'carrito_abandonado';
          datos.estado_pedido = 'abandonado_salida';
          navigator.sendBeacon(CONFIG.webhookCarritoAbandonado, JSON.stringify(datos));
          log('Carrito enviado al cerrar', 'warn');
        }
      }
    });

    log('Tracking de carrito instalado');
  }

  function obtenerParametroURL(nombre) {
    var params = new URLSearchParams(window.location.search);
    return params.get(nombre) || '';
  }

  // =========================
  // INIT
  // =========================
  function initCore() {
    log('🚀 Iniciando script...', 'success');
    
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
    validarTelefonoEnClick();
    iniciarTrackingCarrito();

    log('✅ Script inicializado completamente', 'success');
  }

  function boot() { 
    initCore(); 
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 300); });
  } else {
    setTimeout(boot, 300);
  }

  var tries = 0;
  var poll = setInterval(function () {
    tries++;
    boot();
    if (document.querySelector('input[name="phone"]') || tries >= 80) {
      clearInterval(poll);
    }
  }, 250);

  var mo = new MutationObserver(boot);
  mo.observe(document.documentElement, { childList: true, subtree: true });

})();
