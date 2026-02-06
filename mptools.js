// ====================================
// SCRIPT FUNNELISH - CHECKOUT OPTIMIZADO
// Oculta campos innecesarios, auto-completa, valida, dispara webhooks
// ====================================

const CONFIG = {
   WEBHOOK_CONFIRMACION: "https://programacioncwf.app.n8n.cloud/webhook/funnelish-pedido-completo", // Flujo n8n - pedidos confirmados
    WEBHOOK_PRELIMINAR: "https://programacioncwf.app.n8n.cloud/webhook/hemocream-carrito-abandonado", // Flujo CRM - pedidos abandonados
    STORE_NAME: "BienestarTotal"
};

// ====================================
// MAPEO DE CIUDADES → DEPARTAMENTOS
// ====================================
const CIUDADES_COLOMBIA = {
    "bogotá": "Bogotá",
    "bogota": "Bogotá",
    "medellín": "Antioquia",
    "medellin": "Antioquia",
    "cali": "Valle del Cauca",
    "barranquilla": "Atlántico",
    "cartagena": "Bolívar",
    "santa marta": "Magdalena",
    "bucaramanga": "Santander",
    "cúcuta": "Norte de Santander",
    "cucuta": "Norte de Santander",
    "manizales": "Caldas",
    "pereira": "Risaralda",
    "villavicencio": "Meta",
    "ibagué": "Tolima",
    "ibague": "Tolima",
    "armenía": "Quindío",
    "armenia": "Quindío",
    "popayán": "Cauca",
    "popayan": "Cauca",
    "valledupar": "Cesar",
    "montería": "Córdoba",
    "monteria": "Córdoba",
    "sincelejo": "Sucre",
    "riohacha": "La Guajira",
    "santa cruz de lorica": "Córdoba",
    "tuluá": "Valle del Cauca",
    "tulua": "Valle del Cauca",
    "buga": "Valle del Cauca",
    "palmira": "Valle del Cauca",
    "yumbo": "Valle del Cauca",
    "cartago": "Valle del Cauca",
    "dosquebradas": "Risaralda",
    "filandia": "Quindío",
    "circasia": "Quindío",
    "florida": "Valle del Cauca",
    "jamundí": "Valle del Cauca",
    "jamundi": "Valle del Cauca",
};

// ====================================
// ELEMENTOS DEL FORMULARIO
// ====================================
let formElements = {
    nombre: null,
    telefono: null,
    email: null,
    pais: null,
    departamento: null,
    ciudad: null,
    direccion: null,
    botonCompra: null
};

// ====================================
// ESTADO
// ====================================
const FormState = {
    data: {
        nombre: '',
        telefono: '',
        email: '',
        pais: 'Colombia',
        departamento: '',
        ciudad: '',
        direccion: '',
        sessionId: `${CONFIG.STORE_NAME}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: null
    },

    update(field, value) {
        this.data[field] = value;
        this.saveToLocalStorage();
    },

    saveToLocalStorage() {
        try {
            localStorage.setItem(`${CONFIG.STORE_NAME}_form_data`, JSON.stringify(this.data));
        } catch (e) {
            console.warn('⚠️ localStorage no disponible');
        }
    },

    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem(`${CONFIG.STORE_NAME}_form_data`);
            if (saved) {
                this.data = { ...this.data, ...JSON.parse(saved) };
                return true;
            }
        } catch (e) {
            console.warn('⚠️ Error cargando localStorage');
        }
        return false;
    },

    reset() {
        this.data = {
            nombre: '',
            telefono: '',
            email: '',
            pais: 'Colombia',
            departamento: '',
            ciudad: '',
            direccion: '',
            sessionId: `${CONFIG.STORE_NAME}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: null
        };
        localStorage.removeItem(`${CONFIG.STORE_NAME}_form_data`);
    }
};

// ====================================
// VALIDADORES
// ====================================
const Validators = {
    formatPhoneNumber(phone) {
        let cleaned = phone.replace(/\D/g, '');
        if (cleaned.startsWith('57')) {
            cleaned = cleaned.substring(2);
        }
        return cleaned.length === 10 ? cleaned : null;
    },

    validatePhone(phone) {
        return this.formatPhoneNumber(phone) !== null;
    },

    validateName(name) {
        return name.trim().length >= 3;
    },

    validateCity(city) {
        return Object.keys(CIUDADES_COLOMBIA).includes(city.toLowerCase());
    },

    validateAddress(address) {
        return address.trim().length >= 10;
    },

    getDepartamento(city) {
        return CIUDADES_COLOMBIA[city.toLowerCase()] || null;
    }
};

// ====================================
// DETECTAR Y OBTENER ELEMENTOS
// ====================================
function findFormElements() {
    console.log('🔍 Buscando elementos del formulario...');

    // Estrategia 1: Por label + input siguiente
    const labels = document.querySelectorAll('label');
    
    labels.forEach(label => {
        const text = label.textContent.toLowerCase();
        const input = label.nextElementSibling || label.parentElement?.querySelector('input, textarea, select');

        if (text.includes('nombre') && text.includes('completo')) {
            formElements.nombre = input;
            console.log('✅ Nombre encontrado');
        }
        if (text.includes('celular') || text.includes('whatsapp')) {
            formElements.telefono = input;
            console.log('✅ Teléfono encontrado');
        }
        if (text.includes('correo') || text.includes('email')) {
            formElements.email = input;
            console.log('✅ Email encontrado');
        }
        if (text.includes('país')) {
            formElements.pais = input;
            console.log('✅ País encontrado');
        }
        if (text.includes('departamento')) {
            formElements.departamento = input;
            console.log('✅ Departamento encontrado');
        }
        if (text.includes('ciudad')) {
            formElements.ciudad = input;
            console.log('✅ Ciudad encontrado');
        }
        if (text.includes('dirección') || text.includes('direccion')) {
            formElements.direccion = input;
            console.log('✅ Dirección encontrado');
        }
    });

    // Estrategia 2: Por placeholder
    document.querySelectorAll('input, textarea, select').forEach(el => {
        const placeholder = el.placeholder?.toLowerCase() || '';
        const name = el.name?.toLowerCase() || '';
        const id = el.id?.toLowerCase() || '';

        if ((placeholder.includes('nombre') || name.includes('nombre') || id.includes('nombre')) && !formElements.nombre) {
            formElements.nombre = el;
        }
        if ((placeholder.includes('teléfono') || placeholder.includes('celular') || name.includes('phone') || name.includes('telefono')) && !formElements.telefono) {
            formElements.telefono = el;
        }
        if ((placeholder.includes('correo') || placeholder.includes('email') || name.includes('email')) && !formElements.email) {
            formElements.email = el;
        }
        if ((placeholder.includes('país') || name.includes('pais') || name.includes('country')) && !formElements.pais) {
            formElements.pais = el;
        }
        if ((placeholder.includes('departamento') || name.includes('departamento') || name.includes('state')) && !formElements.departamento) {
            formElements.departamento = el;
        }
        if ((placeholder.includes('ciudad') || name.includes('ciudad') || name.includes('city')) && !formElements.ciudad) {
            formElements.ciudad = el;
        }
        if ((placeholder.includes('dirección') || placeholder.includes('direccion') || name.includes('address') || name.includes('direccion')) && !formElements.direccion) {
            formElements.direccion = el;
        }
    });

    // Log de lo encontrado
    console.log('📋 Elementos detectados:', {
        nombre: !!formElements.nombre,
        telefono: !!formElements.telefono,
        email: !!formElements.email,
        pais: !!formElements.pais,
        departamento: !!formElements.departamento,
        ciudad: !!formElements.ciudad,
        direccion: !!formElements.direccion
    });

    return !!formElements.nombre && !!formElements.telefono && !!formElements.ciudad && !!formElements.direccion;
}

// ====================================
// OCULTAR CAMPOS NO NECESARIOS
// ====================================
function hideUnnecessaryFields() {
    console.log('👁️ Ocultando campos innecesarios...');

    // Ocultar elementos
    const fieldsToHide = [formElements.email, formElements.pais];
    
    fieldsToHide.forEach(field => {
        if (field) {
            // Ocultar el input
            field.style.display = 'none';
            
            // Ocultar el label asociado
            const label = field.parentElement?.querySelector('label') || 
                         document.querySelector(`label[for="${field.id}"]`);
            if (label) label.style.display = 'none';
            
            // Ocultar contenedor padre si es necesario
            let parent = field.parentElement;
            if (parent && parent.classList.contains('form-group')) {
                parent.style.display = 'none';
            }
        }
    });

    console.log('✅ Campos ocultados');
}

// ====================================
// AUTO-LLENAR CAMPOS OCULTOS
// ====================================
function autoFillHiddenFields() {
    console.log('🔄 Auto-llenando campos ocultos...');

    // País siempre Colombia
    if (formElements.pais) {
        formElements.pais.value = 'Colombia';
        formElements.pais.dispatchEvent(new Event('change', { bubbles: true }));
        formElements.pais.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // Email: generar uno dummy si no existe o dejarlo vacío
    if (formElements.email) {
        if (!formElements.email.value) {
            // Opción 1: Usar el teléfono para generar email
            // formElements.email.value = `${FormState.data.telefono}@no-email.com`;
            
            // Opción 2: Dejar vacío (más seguro)
            formElements.email.value = '';
        }
        formElements.email.dispatchEvent(new Event('change', { bubbles: true }));
    }

    console.log('✅ Campos ocultos auto-llenados');
}

// ====================================
// CONFIGURAR EVENTO DE CIUDAD
// ====================================
function setupCityAutocomplete() {
    if (!formElements.ciudad) return;

    formElements.ciudad.addEventListener('blur', function() {
        const cityValue = this.value.trim().toLowerCase();
        
        if (cityValue && Validators.validateCity(cityValue)) {
            const dept = Validators.getDepartamento(cityValue);
            
            if (formElements.departamento && dept) {
                formElements.departamento.value = dept;
                formElements.departamento.dispatchEvent(new Event('change', { bubbles: true }));
                formElements.departamento.dispatchEvent(new Event('input', { bubbles: true }));
                console.log(`✅ Ciudad: ${cityValue} → Departamento: ${dept}`);
            }
            
            FormState.update('ciudad', cityValue);
            FormState.update('departamento', dept || '');
        }
    });

    // Guardar cambios en tiempo real
    formElements.ciudad.addEventListener('input', function() {
        FormState.update('ciudad', this.value);
    });
}

// ====================================
// VALIDAR TELÉFONO
// ====================================
function setupPhoneValidation() {
    if (!formElements.telefono) return;

    formElements.telefono.addEventListener('blur', function() {
        const formatted = Validators.formatPhoneNumber(this.value);
        
        if (this.value && formatted) {
            this.value = formatted;
            FormState.update('telefono', formatted);
            console.log(`✅ Teléfono formateado: ${formatted}`);
        } else if (this.value) {
            console.warn('⚠️ Teléfono inválido');
        }
    });

    formElements.telefono.addEventListener('input', function() {
        FormState.update('telefono', this.value);
    });
}

// ====================================
// INTERCEPTAR BOTÓN DE COMPRA
// ====================================
function setupCheckoutInterception() {
    console.log('🎯 Configurando interceptor de checkout...');

    // Buscar el botón de compra
    const buttons = document.querySelectorAll('button');
    let submitButton = null;

    buttons.forEach(btn => {
        const text = btn.textContent.toLowerCase();
        if (text.includes('comprar') || text.includes('confirmar') || text.includes('pagar')) {
            submitButton = btn;
        }
    });

    if (!submitButton) {
        console.warn('⚠️ Botón de compra no encontrado');
        return;
    }

    console.log('✅ Botón de compra encontrado');

    // Interceptar el submit del formulario
    const form = submitButton.closest('form');
    
    if (form) {
        const originalSubmit = form.onsubmit;
        
        form.onsubmit = async function(e) {
            e.preventDefault();
            
            console.log('📤 Intentando enviar pedido...');

            // Recolectar datos de los campos visibles
            FormState.update('nombre', formElements.nombre?.value || '');
            FormState.update('telefono', formElements.telefono?.value || '');
            FormState.update('ciudad', formElements.ciudad?.value || '');
            FormState.update('direccion', formElements.direccion?.value || '');
            FormState.update('email', formElements.email?.value || '');

            // Validaciones
            const validations = [
                { field: 'nombre', valid: Validators.validateName(FormState.data.nombre) },
                { field: 'telefono', valid: Validators.validatePhone(FormState.data.telefono) },
                { field: 'ciudad', valid: Validators.validateCity(FormState.data.ciudad) },
                { field: 'direccion', valid: Validators.validateAddress(FormState.data.direccion) }
            ];

            const allValid = validations.every(v => v.valid);

            if (!allValid) {
                console.error('❌ Validación fallida:', validations.filter(v => !v.valid));
                
                // Si hay errores, mostrar mensaje
                const firstInvalidField = validations.find(v => !v.valid);
                if (firstInvalidField && formElements[firstInvalidField.field]) {
                    formElements[firstInvalidField.field].style.borderColor = '#d32f2f';
                }
                return;
            }

            // Obtener departamento final
            const dept = Validators.getDepartamento(FormState.data.ciudad);
            FormState.update('departamento', dept || '');

            console.log('✅ Validación exitosa. Datos:', FormState.data);

            // 1. Enviar a n8n (confirmación de pedido)
            await sendWebhook(CONFIG.WEBHOOK_CONFIRMACION, {
                storeName: CONFIG.STORE_NAME,
                sessionId: FormState.data.sessionId,
                orden: {
                    nombre: FormState.data.nombre,
                    telefono: FormState.data.telefono,
                    email: FormState.data.email,
                    pais: FormState.data.pais,
                    ciudad: FormState.data.ciudad,
                    departamento: FormState.data.departamento,
                    direccion: FormState.data.direccion
                },
                status: 'completado'
            });

            // 2. Dejar que Funnelish continúe con su flujo normal
            if (originalSubmit) {
                originalSubmit.call(form, e);
            } else {
                form.submit();
            }

            // Limpiar state
            FormState.reset();
        };
    } else {
        console.warn('⚠️ Formulario no encontrado');
    }
}

// ====================================
// ENVIAR WEBHOOK
// ====================================
async function sendWebhook(webhook, data) {
    try {
        const response = await fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            })
        });

        if (!response.ok) {
            console.error(`❌ Error webhook (${response.status}):`, response.statusText);
            return false;
        }

        console.log('✅ Webhook enviado:', webhook);
        return true;
    } catch (error) {
        console.error('❌ Error enviando webhook:', error);
        return false;
    }
}

// ====================================
// DETECTAR ABANDONO
// ====================================
function setupAbandonmentDetection() {
    let inactivityTimer;
    const INACTIVITY_TIME = 3 * 60 * 1000; // 3 minutos

    function resetTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            const hasData = FormState.data.nombre || FormState.data.telefono || FormState.data.ciudad;
            
            if (hasData) {
                console.log('⏰ Inactividad detectada, enviando a preliminar...');
                sendWebhook(CONFIG.WEBHOOK_PRELIMINAR, {
                    storeName: CONFIG.STORE_NAME,
                    sessionId: FormState.data.sessionId,
                    pedidoPreliminar: {
                        nombre: FormState.data.nombre,
                        telefono: FormState.data.telefono,
                        ciudad: FormState.data.ciudad,
                        departamento: FormState.data.departamento,
                        direccion: FormState.data.direccion,
                        email: FormState.data.email
                    },
                    status: 'abandonado_inactividad'
                });
            }
        }, INACTIVITY_TIME);
    }

    document.addEventListener('click', resetTimer);
    document.addEventListener('keydown', resetTimer);
    document.addEventListener('scroll', resetTimer);

    resetTimer();

    // Detectar cierre de pestaña
    window.addEventListener('beforeunload', () => {
        const hasData = FormState.data.nombre || FormState.data.telefono || FormState.data.ciudad;
        
        if (hasData) {
            navigator.sendBeacon(CONFIG.WEBHOOK_PRELIMINAR, JSON.stringify({
                storeName: CONFIG.STORE_NAME,
                sessionId: FormState.data.sessionId,
                pedidoPreliminar: {
                    nombre: FormState.data.nombre,
                    telefono: FormState.data.telefono,
                    ciudad: FormState.data.ciudad,
                    departamento: FormState.data.departamento,
                    direccion: FormState.data.direccion,
                    email: FormState.data.email
                },
                status: 'abandonado_cierre_tab'
            }));
        }
    });
}

// ====================================
// INICIALIZACIÓN
// ====================================
function init() {
    console.log('🚀 Inicializando script Funnelish...');

    // Cargar datos guardados
    FormState.loadFromLocalStorage();

    // Esperar a que el DOM esté listo
    const waitForElements = setInterval(() => {
        if (findFormElements()) {
            clearInterval(waitForElements);
            
            hideUnnecessaryFields();
            autoFillHiddenFields();
            setupPhoneValidation();
            setupCityAutocomplete();
            setupCheckoutInterception();
            setupAbandonmentDetection();
            
            console.log('✅ Script listo para usar');
            
            // Crear API pública
            window.CheckoutAPI = {
                getData: () => FormState.data,
                setData: (field, value) => FormState.update(field, value),
                reset: () => FormState.reset()
            };
        }
    }, 500);

    // Timeout de seguridad
    setTimeout(() => clearInterval(waitForElements), 15000);
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
