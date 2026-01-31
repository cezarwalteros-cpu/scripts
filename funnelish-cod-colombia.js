(function(){ 
    
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
        return 'cliente' + Math.random().toString().slice(2,10) + Date.now().toString().slice(-4) + '@codcolombia.co';
    }

    // =========================
    // TELÉFONO CO (COMPATIBLE FUNNELISH)
    // =========================
    function normalizarTelefonoCO(valor) {
        var nums = (valor || '').replace(/\D/g, '');
        // si escriben +57..., quita el 57
        if (nums.startsWith('57')) nums = nums.slice(2);
        // debe quedar 10 y empezar por 3
        if (!/^3\d{9}$/.test(nums)) return null;
        return '+57' + nums;
    }

    function attachTelefonoCO() {
        var tel = document.querySelector('input[name="phone"]');
        if (!tel) return;

        // Evitar re-enganchar
        if (tel.dataset.telco === '1') return;
        tel.dataset.telco = '1';

        tel.setAttribute('inputmode', 'numeric');
        tel.setAttribute('autocomplete', 'tel');

        // UX: arrancar con +57 (sin mover el DOM)
        if (!tel.value || tel.value.trim() === '') tel.value = '+57';

        // Limites razonables: +57 + 10 dígitos = 13
        tel.setAttribute('maxlength', '13');
        tel.placeholder = '+57 3XXXXXXXXX';

        function moverCursorDespuesPrefijo() {
            try { tel.setSelectionRange(3, 3); } catch (e) {}
        }

        // Si hacen focus/click antes del +57, lo corrige
        tel.addEventListener('focus', function() {
            if ((tel.value || '').startsWith('+57')) {
                setTimeout(function(){
                    var pos = tel.selectionStart || 0;
                    if (pos < 3) moverCursorDespuesPrefijo();
                }, 0);
            }
        });

        tel.addEventListener('click', function() {
            var pos = tel.selectionStart || 0;
            if (pos < 3) moverCursorDespuesPrefijo();
        });

        // No permitir borrar el prefijo
        tel.addEventListener('keydown', function(e) {
            var pos = tel.selectionStart || 0;
            var s1 = tel.selectionStart || 0;
            var s2 = tel.selectionEnd || 0;

            if ((e.key === 'Backspace' && pos <= 3) || (e.key === 'Delete' && pos < 3) || (s1 < 3 && (e.key === 'Backspace' || e.key === 'Delete'))) {
                e.preventDefault();
                moverCursorDespuesPrefijo();
            }
        });

        // Limpieza constante
        tel.addEventListener('input', function() {
            var raw = tel.value || '';

            // fuerza prefijo
            if (!raw.startsWith('+57')) {
                raw = '+57' + raw.replace(/\D/g, '').replace(/^57/, '');
            }

            // solo + y digitos
            raw = raw.replace(/[^\d+]/g, '');

            // recorta a 13
            if (raw.length > 13) raw = raw.slice(0, 13);

            tel.value = raw;

            // Validación suave (sin bloquear mientras escribe)
            tel.setCustomValidity('');
        });

        // Validación al salir
        tel.addEventListener('blur', function() {
            var ok = /^\+573\d{9}$/.test((tel.value || '').replace(/\s/g, ''));
            if (!ok) {
                tel.setCustomValidity('Ingresa un móvil válido: +57 3XXXXXXXXX (10 dígitos)');
            } else {
                tel.setCustomValidity('');
            }
        });
    }
    // =========================
    
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
        departamentosColombia.forEach(function(d) {
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
                select.dispatchEvent(new Event('change', {bubbles: true}));
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
        
        input.addEventListener('input', function() {
            var txt = this.value.toLowerCase().trim();
            box.innerHTML = '';
            
            if (txt.length < 1) { box.style.display = 'none'; return; }
            
            var res = listaCiudades.filter(function(c) { return c.toLowerCase().indexOf(txt) > -1; }).slice(0, 8);
            
            if (res.length === 0) { box.style.display = 'none'; return; }
            
            res.forEach(function(ciudad) {
                var item = document.createElement('div');
                item.innerHTML = '<strong>' + ciudad + '</strong> <span style="color:#888;font-size:12px;">- ' + ciudadesColombia[ciudad] + '</span>';
                item.style.cssText = 'padding:10px 12px;cursor:pointer;border-bottom:1px solid #eee;';
                item.onmouseenter = function() { this.style.background = '#f0f7ff'; };
                item.onmouseleave = function() { this.style.background = '#fff'; };
                item.onclick = function() {
                    input.value = ciudad;
                    box.style.display = 'none';
                    seleccionarDepartamento(ciudad);
                };
                box.appendChild(item);
            });
            
            box.style.display = 'block';
        });
        
        input.addEventListener('blur', function() {
            setTimeout(function() {
                box.style.display = 'none';
                if (input.value.trim()) seleccionarDepartamento(input.value.trim());
            }, 200);
        });
        
        document.addEventListener('click', function(e) {
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
                    pais.dispatchEvent(new Event('change', {bubbles: true}));
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

        // Teléfono CO (enganche robusto)
        attachTelefonoCO();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 500); });
    } else {
        setTimeout(init, 500);
    }

    // Si Funnelish re-renderiza inputs, re-engancha teléfono
    var obs = new MutationObserver(function() {
        attachTelefonoCO();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    
    document.addEventListener('submit', function(event) {
        var tel = document.querySelector('input[name="phone"]');
        var email = document.querySelector('input[name="email"]');
        var ciudad = document.querySelector('input[name="shipping_city"]');

        // Validación final + bloqueo real
        if (tel) {
            var normal = normalizarTelefonoCO(tel.value);
            if (!normal) {
                event.preventDefault();
                event.stopPropagation();
                tel.setCustomValidity('Ingresa un móvil válido: +57 3XXXXXXXXX (10 dígitos)');
                if (typeof tel.reportValidity === 'function') tel.reportValidity();
                tel.focus();
                return false;
            }
            tel.setCustomValidity('');
            tel.value = normal; // Funnelish recibe +57XXXXXXXXXX
        }
        
        if (email && !email.value) email.value = generarEmail();
        if (ciudad && ciudad.value) seleccionarDepartamento(ciudad.value.trim());
    }, true);
    
})();
(function () {
  const PHONE_NAME = "phone";
  const SUBMIT_SELECTOR = 'a[href="#submit-step"], button[type="submit"], [data-action="submit"]';

  function onlyDigits(v) { return (v || "").replace(/\D+/g, ""); }
  function isValidCO10(num) { return /^3\d{9}$/.test(num); }

  function ensureUI() {
    const real = document.getElementsByName(PHONE_NAME)[0];
    if (!real) return;

    // Evitar duplicar
    if (real.dataset.coPhoneEnhanced === "1") return;
    real.dataset.coPhoneEnhanced = "1";

    // Ocultar input real SIN romper Funnelish
    try { real.type = "hidden"; } catch (e) { real.style.display = "none"; }

    // Wrapper UI
    const wrap = document.createElement("div");
    wrap.style.cssText = "width:100%; margin-top:6px;";

    const warning = document.createElement("div");
    warning.style.cssText = "display:none;color:#e74c3c;font-size:13px;margin:6px 0 0;";
    warning.textContent = "Debe ser un móvil de Colombia de 10 dígitos. Ej: 3001234567";

    const field = document.createElement("div");
    field.style.cssText =
      "display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px;width:100%;box-sizing:border-box;";

    const prefix = document.createElement("span");
    prefix.textContent = "+57";
    prefix.style.cssText =
      "display:flex;align-items:center;justify-content:center;min-width:56px;height:38px;padding:0 12px;background:#f2f4f7;border:1px solid #e2e8f0;border-radius:8px;color:#475569;font-weight:700;user-select:none;";

    const visible = document.createElement("input");
    visible.type = "text";
    visible.inputMode = "numeric";
    visible.autocomplete = "tel-national";
    visible.placeholder = "3001234567";
    visible.maxLength = 10;
    visible.style.cssText =
      "border:none;outline:none;flex:1;font-size:14px;padding:8px 6px;min-width:120px;";

    // Insertar UI justo después del real
    field.appendChild(prefix);
    field.appendChild(visible);
    wrap.appendChild(field);
    wrap.appendChild(warning);
    real.parentElement.insertBefore(wrap, real.nextSibling);

    // Si ya había valor en real, lo reflejamos (ej: +573001234567)
    const existing = onlyDigits(real.value);
    if (existing.startsWith("57") && existing.length === 12) {
      const local = existing.slice(2);
      if (local.length === 10) visible.value = local;
    }

    function syncAndValidate(showMsg) {
      let num = onlyDigits(visible.value);

      // Regla CO: si el primer dígito no es 3, vaciamos (evita fijos)
      if (num.length === 1 && num !== "3") num = "";
      // limitar a 10
      if (num.length > 10) num = num.slice(0, 10);

      if (num !== visible.value) visible.value = num;

      // set value real
      real.value = num ? ("+57" + num) : "";

      const ok = isValidCO10(num);

      // feedback visual
      if (!num) {
        field.style.border = "1px solid #e2e8f0";
        warning.style.display = "none";
        return false;
      }

      if (!ok) {
        field.style.border = "2px solid #e74c3c";
        warning.style.display = showMsg ? "block" : "none";
        return false;
      }

      field.style.border = "1px solid #22c55e";
      warning.style.display = "none";
      return true;
    }

    visible.addEventListener("input", () => syncAndValidate(false));
    visible.addEventListener("blur", () => syncAndValidate(true));

    // BLOQUEO FUERTE (click + submit)
    function hardBlock(e) {
      const ok = syncAndValidate(true);
      if (!ok) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        visible.focus();
        return false;
      }
      return true;
    }

    // Captura submit real
    document.addEventListener("submit", hardBlock, true);

    // Captura clicks de botones/links de Funnelish
    document.querySelectorAll(SUBMIT_SELECTOR).forEach(btn => {
      btn.addEventListener("click", hardBlock, true);
    });
  }

  // Inicial + re-render
  function boot() { ensureUI(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(boot, 300));
  } else {
    setTimeout(boot, 300);
  }

  new MutationObserver(() => boot()).observe(document.documentElement, { childList: true, subtree: true });

})();
