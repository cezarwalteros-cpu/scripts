
(function () {

  // =========================
  // CONFIGURACIÓN - WEBHOOKS N8N
  // =========================
  var CONFIG = {
    // 🔧 REEMPLAZA ESTAS URLs CON TUS WEBHOOKS DE N8N
    webhookPedidoCompleto: 'https://programacioncwf.app.n8n.cloud/webhook/pedido-completo',
    webhookCarritoAbandonado: 'https://programacioncwf.app.n8n.cloud/webhook/carrito-abandonado',
    
    // Configuración de tiempo para carrito abandonado (en milisegundos)
    tiempoEsperaCarrito: 15000, // 15 segundos (ajusta según necesites)
    
    // Activar logs para debug
    debug: true
  };

  // =========================
  // SISTEMA DE LOGS
  // =========================
  function log(mensaje, tipo) {
    if (!CONFIG.debug) return;
    var prefix = '[COD-CO v2]';
    if (tipo === 'error') console.error(prefix, mensaje);
    else if (tipo === 'warn') console.warn(prefix, mensaje);
    else if (tipo === 'success') console.log(prefix, '✅', mensaje);
    else console.log(prefix, mensaje);
  }

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
  // VALIDACIÓN TELÉFONO CO
  // =========================
  function formatearTelefono(valor) {
    var digits = (valor || '').replace(/\D/g, '');
    if (digits.startsWith('57') && digits.length > 10) digits = digits.slice(2);
    if (digits.length > 10) digits = digits.slice(0, 10);
    if (digits.length === 10 && digits.startsWith('3')) return '+57' + digits;
    return null;
  }

  // =========================
  // VARIABLES GLOBALES
  // =========================
  var avisoEl = null;
  var overlayEl = null;

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

  // =========================
  // OVERLAY BLOQUEADOR
  // Cubre el botón para impedir clicks
  // =========================
  function crearOverlay() {
    if (overlayEl) return overlayEl;
    overlayEl = document.createElement('div');
    overlayEl.id = 'checkout-blocker-overlay';
    overlayEl.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.01);z-index:999999;display:none;cursor:not-allowed;';
    document.body.appendChild(overlayEl);
    log('Overlay creado');
    return overlayEl;
  }

  function activarBloqueo() {
    if (!overlayEl) crearOverlay();
    overlayEl.style.display = 'block';
    log('Overlay activado - formulario bloqueado', 'warn');
  }

  function desactivarBloqueo() {
    if (overlayEl) overlayEl.style.display = 'none';
    log('Overlay desactivado - formulario desbloqueado');
  }

  // =========================
  // INSTALADOR VALIDACIÓN TELÉFONO
  // =========================
  function instalarTelefonoCO() {
    var phone = document.querySelector('input[name="phone"]');
    if (!phone || phone.dataset.phoneValidatorCO === '1') return;
    phone.dataset.phoneValidatorCO = '1';

    phone.placeholder = 'Ej: 3001234567';
    phone.setAttribute('inputmode', 'numeric');

    crearAviso(phone);
    crearOverlay();

    phone.addEventListener('input', function () {
      var val = this.value.replace(/\D/g, '');
      if (val.length > 10) val = val.slice(0, 10);
      this.value = val;

      if (val.length === 10 && val.startsWith('3')) {
        limpiarError(this);
        desactivarBloqueo();
      } else if (val.length >= 10) {
        mostrarError(this);
        activarBloqueo();
      }
    });

    phone.addEventListener('blur', function () {
      var fmt = formatearTelefono(this.value);
      if (fmt) {
        this.value = fmt;
        limpiarError(this);
        desactivarBloqueo();
      } else if (this.value.trim() !== '') {
        mostrarError(this);
        activarBloqueo();
      }
    });

    log('Validación de teléfono instalada');
  }

  // =========================
  // INTERCEPTOR GLOBAL
  // =========================
  function instalarInterceptorGlobal() {
    function verificarYBloquear(e) {
      var target = e.target;
      var btn = target.closest ? target.closest('a[href="#submit-step"]') : null;
      if (!btn) return;

      var phone = document.querySelector('input[name="phone"]');
      if (!phone) return;

      var fmt = formatearTelefono(phone.value);
      if (!fmt) {
        activarBloqueo();
        mostrarError(phone);
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function() { phone.focus(); }, 100);
        
        log('Teléfono inválido, bloqueado', 'warn');
        return false;
      } else {
        phone.value = fmt;
        limpiarError(phone);
      }
    }

    ['mousedown', 'pointerdown', 'touchstart'].forEach(function(evt) {
      document.addEventListener(evt, verificarYBloquear, { capture: true, passive: false });
    });

    document.addEventListener('click', function(e) {
      var target = e.target;
      var btn = target.closest ? target.closest('a[href="#submit-step"]') : null;
      if (!btn) return;
      
      var phone = document.querySelector('input[name="phone"]');
      if (!phone) return;
      
      var fmt = formatearTelefono(phone.value);
      if (!fmt) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        mostrarError(phone);
        phone.focus();
        return false;
      }
    }, { capture: true, passive: false });

    log('Interceptor global instalado');
  }

  // =========================
  // MODIFICAR EL BOTÓN DIRECTAMENTE
  // =========================
  function modificarBoton() {
    var btns = document.querySelectorAll('a[href="#submit-step"]');
    btns.forEach(function(btn) {
      if (btn.dataset.phoneValidatorAttached === '1') return;
      btn.dataset.phoneValidatorAttached = '1';
      
      var wrapper = document.createElement('div');
      wrapper.style.cssText = 'display:contents;';
      wrapper.dataset.phoneWrapper = '1';
      
      btn.parentNode.insertBefore(wrapper, btn);
      wrapper.appendChild(btn);
      
      wrapper.addEventListener('click', function(e) {
        var phone = document.querySelector('input[name="phone"]');
        if (!phone) return;
        
        var fmt = formatearTelefono(phone.value);
        if (!fmt) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          mostrarError(phone);
          phone.focus();
          log('Bloqueado en wrapper', 'warn');
          return false;
        }
        phone.value = fmt;
        limpiarError(phone);
      }, { capture: true, passive: false });
      
      log('Wrapper instalado en botón');
    });
  }

  // =========================
  // HACK: Deshabilitar temporalmente x-on:click
  // =========================
  function deshabilitarAlpineEnBoton() {
    var btns = document.querySelectorAll('a[href="#submit-step"]');
    btns.forEach(function(btn) {
      if (btn.dataset.alpineHacked === '1') return;
      
      var phone = document.querySelector('input[name="phone"]');
      if (!phone) return;
      
      var originalXOnClick = btn.getAttribute('x-on:click');
      if (!originalXOnClick) return;
      
      btn.dataset.alpineHacked = '1';
      btn.dataset.originalXOnClick = originalXOnClick;
      
      var newHandler = "if(!window.__validarTelefonoCO || !window.__validarTelefonoCO()){$event.preventDefault();$event.stopPropagation();return false;}" + originalXOnClick;
      btn.setAttribute('x-on:click', newHandler);
      
      log('x-on:click modificado');
    });
  }

  window.__validarTelefonoCO = function() {
    var phone = document.querySelector('input[name="phone"]');
    if (!phone) return true;
    
    var fmt = formatearTelefono(phone.value);
    if (!fmt) {
      mostrarError(phone);
      phone.focus();
      log('Validación global falló', 'warn');
      return false;
    }
    phone.value = fmt;
    limpiarError(phone);
    return true;
  };

  // =========================
  // 🆕 CAPTURA DE DATOS DEL FORMULARIO
  // =========================
  
  // Variable global para tracking
  window.__carritoEnviado = false;
  window.__pedidoCompleto = false;
  var timerCarrito = null;

  /**
   * Extrae todos los datos del formulario de checkout
   */
  function obtenerDatosFormulario() {
    var datos = {
      // Datos del cliente
      nombre: '',
      telefono: '',
      email: '',
      
      // Dirección
      direccion: '',
      ciudad: '',
      departamento: '',
      pais: 'Colombia',
      
      // Datos del pedido
      productos: [],
      total: 0,
      subtotal: 0,
      envio: 0,
      
      // Metadata
      url_pagina: window.location.href,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      utm_source: obtenerParametroURL('utm_source'),
      utm_medium: obtenerParametroURL('utm_medium'),
      utm_campaign: obtenerParametroURL('utm_campaign')
    };

    // Extraer nombre
    var nombreInput = document.querySelector('input[name="name"]') || 
                      document.querySelector('input[name="shipping_name"]') ||
                      document.querySelector('input[name="billing_name"]');
    if (nombreInput && nombreInput.value) {
      datos.nombre = nombreInput.value.trim();
    }

    // Extraer teléfono
    var telefonoInput = document.querySelector('input[name="phone"]');
    if (telefonoInput && telefonoInput.value) {
      datos.telefono = telefonoInput.value.trim();
    }

    // Extraer email
    var emailInput = document.querySelector('input[name="email"]');
    if (emailInput && emailInput.value) {
      datos.email = emailInput.value.trim();
    }

    // Extraer dirección
    var direccionInput = document.querySelector('input[name="shipping_address"]') ||
                         document.querySelector('input[name="address"]');
    if (direccionInput && direccionInput.value) {
      datos.direccion = direccionInput.value.trim();
    }

    // Extraer ciudad
    var ciudadInput = document.querySelector('input[name="shipping_city"]');
    if (ciudadInput && ciudadInput.value) {
      datos.ciudad = ciudadInput.value.trim();
    }

    // Extraer departamento
    var deptoSelect = document.querySelector('select[name="shipping_state"]');
    if (deptoSelect && deptoSelect.value) {
      datos.departamento = deptoSelect.value;
    }

    // Extraer datos del pedido (productos y precios)
    try {
      // Intentar obtener productos del carrito de Funnelish
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

        // Precios
        datos.subtotal = cart.subtotal || 0;
        datos.envio = cart.shipping || 0;
        datos.total = cart.total || 0;
      }
    } catch (err) {
      log('Error al extraer datos del carrito: ' + err.message, 'error');
    }

    return datos;
  }

  /**
   * Valida que los datos mínimos estén completos
   */
  function validarDatosMinimos(datos) {
    // Campos obligatorios mínimos
    if (!datos.nombre || datos.nombre.length < 2) {
      log('Validación falló: nombre incompleto', 'warn');
      return false;
    }

    if (!datos.telefono || datos.telefono.length < 10) {
      log('Validación falló: teléfono incompleto', 'warn');
      return false;
    }

    // Validar que haya productos o al menos un total
    if ((!datos.productos || datos.productos.length === 0) && datos.total === 0) {
      log('Validación falló: sin productos ni total', 'warn');
      return false;
    }

    log('Datos mínimos validados correctamente', 'success');
    return true;
  }

  /**
   * Envía datos a webhook de n8n
   */
  function enviarWebhook(url, datos, tipo) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos)
    })
    .then(function(response) {
      if (response.ok) {
        log('Webhook ' + tipo + ' enviado exitosamente', 'success');
        return response.json();
      } else {
        throw new Error('Error HTTP: ' + response.status);
      }
    })
    .catch(function(error) {
      log('Error enviando webhook ' + tipo + ': ' + error.message, 'error');
      throw error;
    });
  }

  /**
   * Maneja el envío de pedido completo
   */
  function enviarPedidoCompleto() {
    if (window.__pedidoCompleto) {
      log('Pedido completo ya fue enviado', 'warn');
      return;
    }

    var datos = obtenerDatosFormulario();
    
    if (!validarDatosMinimos(datos)) {
      log('No se puede enviar pedido: datos incompletos', 'warn');
      return;
    }

    // Marcar tipo de evento
    datos.tipo_evento = 'pedido_completo';
    datos.estado_pedido = 'nuevo';

    log('Enviando pedido completo a n8n...', 'success');
    
    enviarWebhook(CONFIG.webhookPedidoCompleto, datos, 'pedido completo')
      .then(function(resultado) {
        window.__pedidoCompleto = true;
        window.__carritoEnviado = true; // También marcar carrito como enviado
        
        // Cancelar timer de carrito abandonado si existe
        if (timerCarrito) {
          clearTimeout(timerCarrito);
          timerCarrito = null;
          log('Timer de carrito abandonado cancelado');
        }
        
        log('Pedido completo procesado exitosamente', 'success');
      })
      .catch(function(error) {
        log('Error procesando pedido completo: ' + error.message, 'error');
      });
  }

  /**
   * Maneja el envío de carrito abandonado
   */
  function enviarCarritoAbandonado() {
    // Verificar que no se haya enviado ya
    if (window.__carritoEnviado) {
      log('Carrito abandonado ya fue enviado', 'warn');
      return;
    }

    // Verificar que no sea un pedido completo
    if (window.__pedidoCompleto) {
      log('Es un pedido completo, no se envía como abandonado', 'warn');
      return;
    }

    var datos = obtenerDatosFormulario();
    
    if (!validarDatosMinimos(datos)) {
      log('No se puede enviar carrito abandonado: datos incompletos', 'warn');
      return;
    }

    // Marcar tipo de evento
    datos.tipo_evento = 'carrito_abandonado';
    datos.estado_pedido = 'abandonado';

    log('Enviando carrito abandonado a n8n...', 'warn');
    
    enviarWebhook(CONFIG.webhookCarritoAbandonado, datos, 'carrito abandonado')
      .then(function(resultado) {
        window.__carritoEnviado = true;
        log('Carrito abandonado procesado exitosamente', 'success');
      })
      .catch(function(error) {
        log('Error procesando carrito abandonado: ' + error.message, 'error');
      });
  }

  /**
   * Inicia el tracking de carrito abandonado
   */
  function iniciarTrackingCarrito() {
    log('Iniciando tracking de carrito abandonado...');

    // Monitorear cambios en campos clave
    var camposClave = ['name', 'phone', 'shipping_city', 'shipping_address'];
    
    camposClave.forEach(function(campo) {
      var input = document.querySelector('input[name="' + campo + '"]') ||
                  document.querySelector('input[name="shipping_' + campo + '"]');
      
      if (input) {
        input.addEventListener('input', function() {
          // Cancelar timer anterior
          if (timerCarrito) {
            clearTimeout(timerCarrito);
          }

          // Iniciar nuevo timer
          timerCarrito = setTimeout(function() {
            enviarCarritoAbandonado();
          }, CONFIG.tiempoEsperaCarrito);
          
          log('Timer de carrito abandonado reiniciado (' + (CONFIG.tiempoEsperaCarrito/1000) + 's)');
        });
      }
    });

    // Detectar cuando el usuario sale de la página
    window.addEventListener('beforeunload', function() {
      // Cancelar timer si existe
      if (timerCarrito) {
        clearTimeout(timerCarrito);
      }

      // Enviar carrito abandonado si tiene datos y no se ha completado
      if (!window.__pedidoCompleto && !window.__carritoEnviado) {
        var datos = obtenerDatosFormulario();
        if (validarDatosMinimos(datos)) {
          // Usar sendBeacon para envío garantizado al salir
          datos.tipo_evento = 'carrito_abandonado';
          datos.estado_pedido = 'abandonado_salida';
          
          navigator.sendBeacon(
            CONFIG.webhookCarritoAbandonado,
            JSON.stringify(datos)
          );
          
          log('Carrito abandonado enviado al salir de la página', 'warn');
        }
      }
    });

    log('Tracking de carrito abandonado instalado', 'success');
  }

  /**
   * Intercepta el submit del formulario
   */
  function interceptarSubmit() {
    // Buscar el botón de submit
    var submitBtns = document.querySelectorAll('a[href="#submit-step"]');
    
    submitBtns.forEach(function(btn) {
      if (btn.dataset.submitIntercepted === '1') return;
      btn.dataset.submitIntercepted = '1';

      btn.addEventListener('click', function(e) {
        // Validar teléfono primero
        if (!window.__validarTelefonoCO || !window.__validarTelefonoCO()) {
          return; // Ya está bloqueado por la validación
        }

        // Si pasa validación, enviar pedido completo
        setTimeout(function() {
          enviarPedidoCompleto();
        }, 100);
      }, { capture: false });

      log('Interceptor de submit instalado');
    });
  }

  /**
   * Obtiene parámetro de URL
   */
  function obtenerParametroURL(nombre) {
    var params = new URLSearchParams(window.location.search);
    return params.get(nombre) || '';
  }

  // =========================
  // INIT
  // =========================
  function initCore() {
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
    instalarInterceptorGlobal();
    modificarBoton();
    deshabilitarAlpineEnBoton();
    
    // 🆕 Nuevas funcionalidades
    iniciarTrackingCarrito();
    interceptarSubmit();

    log('✅ Script inicializado completamente', 'success');
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

  var tries = 0;
  var poll = setInterval(function () {
    tries++;
    boot();
    if (document.querySelector('input[name="phone"]') || tries >= 80) {
      clearInterval(poll);
    }
  }, 250);

  var mo = new MutationObserver(function () { boot(); });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  log('🚀 Script COD Colombia V2 cargado', 'success');
})();
