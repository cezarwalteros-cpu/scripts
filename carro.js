// ====================================
// CHECKOUT COD SCRIPT MEJORADO
// ====================================
// Configuración básica
const CONFIG = {
    WEBHOOK_CONFIRMACION: "https://programacioncwf.app.n8n.cloud/webhook/funnelish-pedido-completo", // Flujo n8n - pedidos confirmados
    WEBHOOK_PRELIMINAR: "https://programacioncwf.app.n8n.cloud/webhook/hemocream-carrito-abandonado", // Flujo CRM - pedidos abandonados
    STORE_NAME: "BienestarTotal",
    DEBOUNCE_DELAY: 500 // Delay para búsqueda de ciudades
};

// ====================================
// 1. DATOS DE CIUDADES Y DEPARTAMENTOS
// ====================================
const CIUDADES_COLOMBIA = {
    // Formato: ciudad: departamento
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
// 2. GESTIÓN DE ESTADO DEL FORMULARIO
// ====================================
const FormState = {
    data: {
        nombre: '',
        telefono: '',
        ciudad: '',
        departamento: '',
        direccion: '',
        timestamp: null,
        sessionId: this.generateSessionId()
    },

    generateSessionId() {
        return `${CONFIG.STORE_NAME}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    update(field, value) {
        this.data[field] = value;
        this.saveToLocalStorage();
    },

    saveToLocalStorage() {
        try {
            localStorage.setItem(`${CONFIG.STORE_NAME}_form_data`, JSON.stringify(this.data));
        } catch (e) {
            console.warn('No se pudo guardar en localStorage:', e);
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
            console.warn('No se pudo cargar del localStorage:', e);
        }
        return false;
    },

    reset() {
        this.data = {
            nombre: '',
            telefono: '',
            ciudad: '',
            departamento: '',
            direccion: '',
            timestamp: null,
            sessionId: this.generateSessionId()
        };
        localStorage.removeItem(`${CONFIG.STORE_NAME}_form_data`);
    },

    isComplete() {
        return this.data.nombre && this.data.telefono && this.data.ciudad && this.data.direccion;
    }
};

// ====================================
// 3. VALIDACIÓN Y FORMATTING
// ====================================
const Validators = {
    // Validar y formatear teléfono colombiano
    formatPhoneNumber(phone) {
        let cleaned = phone.replace(/\D/g, '');
        
        // Si empieza con 57, remover
        if (cleaned.startsWith('57')) {
            cleaned = cleaned.substring(2);
        }
        
        // Si no tiene 10 dígitos, no es válido
        if (cleaned.length !== 10) {
            return null;
        }
        
        return cleaned;
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

    // Obtener departamento desde ciudad
    getDepartamento(city) {
        return CIUDADES_COLOMBIA[city.toLowerCase()] || null;
    }
};

// ====================================
// 4. MANEJO DE BÚSQUEDA DE CIUDADES
// ====================================
let debounceTimer;
const CitySearch = {
    getSuggestions(query) {
        if (!query || query.length < 2) return [];
        
        const normalized = query.toLowerCase();
        return Object.keys(CIUDADES_COLOMBIA)
            .filter(city => city.includes(normalized))
            .slice(0, 8); // Máximo 8 sugerencias
    },

    createSuggestionsList(suggestions) {
        if (!suggestions.length) return null;
        
        const list = document.createElement('ul');
        list.className = 'city-suggestions';
        list.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #e0e0e0;
            border-top: none;
            border-radius: 0 0 4px 4px;
            list-style: none;
            padding: 0;
            margin: 0;
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;

        suggestions.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city.charAt(0).toUpperCase() + city.slice(1);
            li.style.cssText = `
                padding: 10px 12px;
                cursor: pointer;
                border-bottom: 1px solid #f0f0f0;
                transition: background-color 0.2s;
            `;
            
            li.onmouseover = () => {
                li.style.backgroundColor = '#f5f5f5';
            };
            li.onmouseout = () => {
                li.style.backgroundColor = 'transparent';
            };
            
            li.onclick = (e) => {
                e.stopPropagation();
                selectCity(city);
            };
            
            list.appendChild(li);
        });

        return list;
    }
};

// ====================================
// 5. ENVÍO DE WEBHOOKS
// ====================================
const Webhooks = {
    async send(webhook, data) {
        try {
            const response = await fetch(webhook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    url: window.location.href
                })
            });

            if (!response.ok) {
                console.error(`Error en webhook (${response.status}):`, response.statusText);
                return false;
            }

            console.log('✓ Webhook enviado correctamente');
            return true;
        } catch (error) {
            console.error('Error enviando webhook:', error);
            return false;
        }
    },

    // Flujo de pedido completado (n8n)
    async sendOrderCompleted() {
        if (!FormState.isComplete()) {
            console.error('Formulario incompleto');
            return false;
        }

        return this.send(CONFIG.WEBHOOK_CONFIRMACION, {
            storeName: CONFIG.STORE_NAME,
            sessionId: FormState.data.sessionId,
            orden: {
                nombre: FormState.data.nombre,
                telefono: FormState.data.telefono,
                ciudad: FormState.data.ciudad,
                departamento: FormState.data.departamento,
                direccion: FormState.data.direccion
            },
            status: 'completado'
        });
    },

    // Flujo de pedido preliminar (CRM - abandono)
    async sendOrderPreliminary() {
        const hasPartialData = FormState.data.nombre || FormState.data.telefono || FormState.data.ciudad || FormState.data.direccion;
        
        if (!hasPartialData) {
            console.warn('Sin datos para enviar pedido preliminar');
            return false;
        }

        return this.send(CONFIG.WEBHOOK_PRELIMINAR, {
            storeName: CONFIG.STORE_NAME,
            sessionId: FormState.data.sessionId,
            pedidoPreliminar: {
                nombre: FormState.data.nombre,
                telefono: FormState.data.telefono,
                ciudad: FormState.data.ciudad,
                departamento: FormState.data.departamento,
                direccion: FormState.data.direccion
            },
            status: 'abandonado',
            fieldsCompleted: {
                nombre: !!FormState.data.nombre,
                telefono: !!FormState.data.telefono,
                ciudad: !!FormState.data.ciudad,
                departamento: !!FormState.data.departamento,
                direccion: !!FormState.data.direccion
            }
        });
    }
};

// ====================================
// 6. CREACIÓN DEL FORMULARIO
// ====================================
function createCheckoutForm() {
    // Verificar si ya existe
    if (document.querySelector('.checkout-form-container')) {
        return;
    }

    const container = document.createElement('div');
    container.className = 'checkout-form-container';
    container.style.cssText = `
        max-width: 500px;
        margin: 30px auto;
        padding: 20px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    const html = `
        <h2 style="margin-top: 0; margin-bottom: 20px; font-size: 24px; color: #1a1a1a; text-align: center;">
            Completa tu pedido
        </h2>

        <form id="checkoutForm" style="display: flex; flex-direction: column; gap: 16px;">
            
            <!-- NOMBRE -->
            <div style="display: flex; flex-direction: column;">
                <label for="nombre" style="font-weight: 600; margin-bottom: 6px; color: #333; font-size: 14px;">
                    Nombre completo *
                </label>
                <input 
                    type="text" 
                    id="nombre" 
                    name="nombre"
                    placeholder="Ej: Juan Pérez"
                    style="
                        padding: 12px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        font-size: 14px;
                        font-family: inherit;
                        transition: border-color 0.2s;
                    "
                />
                <span class="error-message" style="color: #d32f2f; font-size: 12px; margin-top: 4px; display: none;"></span>
            </div>

            <!-- TELÉFONO -->
            <div style="display: flex; flex-direction: column;">
                <label for="telefono" style="font-weight: 600; margin-bottom: 6px; color: #333; font-size: 14px;">
                    Teléfono *
                </label>
                <input 
                    type="tel" 
                    id="telefono" 
                    name="telefono"
                    placeholder="Ej: 3001234567"
                    style="
                        padding: 12px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        font-size: 14px;
                        font-family: inherit;
                        transition: border-color 0.2s;
                    "
                />
                <span class="error-message" style="color: #d32f2f; font-size: 12px; margin-top: 4px; display: none;"></span>
            </div>

            <!-- CIUDAD CON AUTOCOMPLETE -->
            <div style="display: flex; flex-direction: column; position: relative;">
                <label for="ciudad" style="font-weight: 600; margin-bottom: 6px; color: #333; font-size: 14px;">
                    Ciudad *
                </label>
                <input 
                    type="text" 
                    id="ciudad" 
                    name="ciudad"
                    placeholder="Ej: Medellín"
                    autocomplete="off"
                    style="
                        padding: 12px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        font-size: 14px;
                        font-family: inherit;
                        transition: border-color 0.2s;
                    "
                />
                <div id="departamento-info" style="font-size: 12px; color: #666; margin-top: 4px; display: none;"></div>
                <span class="error-message" style="color: #d32f2f; font-size: 12px; margin-top: 4px; display: none;"></span>
            </div>

            <!-- DIRECCIÓN COMPLETA -->
            <div style="display: flex; flex-direction: column;">
                <label for="direccion" style="font-weight: 600; margin-bottom: 6px; color: #333; font-size: 14px;">
                    Dirección completa *
                </label>
                <textarea 
                    id="direccion" 
                    name="direccion"
                    placeholder="Ej: Calle 10 #20-15, Apto 301, Barrio Centro"
                    style="
                        padding: 12px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        font-size: 14px;
                        font-family: inherit;
                        resize: vertical;
                        min-height: 80px;
                        transition: border-color 0.2s;
                    "
                ></textarea>
                <span class="error-message" style="color: #d32f2f; font-size: 12px; margin-top: 4px; display: none;"></span>
            </div>

            <!-- BOTÓN COMPRAR -->
            <button 
                type="submit" 
                id="submitBtn"
                style="
                    padding: 14px;
                    background: #10b981;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 10px;
                "
                onmouseover="this.style.background='#059669'"
                onmouseout="this.style.background='#10b981'"
            >
                Confirmar pedido
            </button>

            <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
                * Campos requeridos
            </p>
        </form>
    `;

    container.innerHTML = html;
    return container;
}

// ====================================
// 7. EVENT LISTENERS Y LÓGICA
// ====================================
function initializeCheckout() {
    // Cargar datos guardados
    FormState.loadFromLocalStorage();

    // Insertar formulario
    const form = createCheckoutForm();
    const existingForm = document.querySelector('.checkout-form-container');
    
    if (existingForm) {
        existingForm.replaceWith(form);
    } else {
        // Buscar dónde insertar (antes de script o al final del body)
        const target = document.querySelector('[data-checkout-target]') || document.body;
        target.appendChild(form);
    }

    // ===== CAMPOS =====
    const inputNombre = document.getElementById('nombre');
    const inputTelefono = document.getElementById('telefono');
    const inputCiudad = document.getElementById('ciudad');
    const inputDireccion = document.getElementById('direccion');
    const deptInfo = document.getElementById('departamento-info');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('checkoutForm');

    // Restaurar valores si existen
    if (FormState.data.nombre) inputNombre.value = FormState.data.nombre;
    if (FormState.data.telefono) inputTelefono.value = FormState.data.telefono;
    if (FormState.data.ciudad) inputCiudad.value = FormState.data.ciudad;
    if (FormState.data.direccion) inputDireccion.value = FormState.data.direccion;

    // ----- NOMBRE -----
    inputNombre.addEventListener('blur', function() {
        const isValid = Validators.validateName(this.value);
        const errorSpan = this.parentElement.querySelector('.error-message');
        
        if (!this.value) {
            errorSpan.style.display = 'none';
        } else if (!isValid) {
            errorSpan.textContent = 'Ingresa un nombre válido (mínimo 3 caracteres)';
            errorSpan.style.display = 'block';
            this.style.borderColor = '#d32f2f';
        } else {
            errorSpan.style.display = 'none';
            this.style.borderColor = '#ddd';
            FormState.update('nombre', this.value.trim());
        }
    });

    inputNombre.addEventListener('input', function() {
        this.style.borderColor = '#ddd';
        this.parentElement.querySelector('.error-message').style.display = 'none';
    });

    // ----- TELÉFONO -----
    inputTelefono.addEventListener('blur', function() {
        const formatted = Validators.formatPhoneNumber(this.value);
        const errorSpan = this.parentElement.querySelector('.error-message');
        
        if (!this.value) {
            errorSpan.style.display = 'none';
        } else if (!formatted) {
            errorSpan.textContent = 'Teléfono inválido. Debe ser un número colombiano válido (10 dígitos)';
            errorSpan.style.display = 'block';
            this.style.borderColor = '#d32f2f';
        } else {
            errorSpan.style.display = 'none';
            this.style.borderColor = '#ddd';
            this.value = formatted;
            FormState.update('telefono', formatted);
        }
    });

    inputTelefono.addEventListener('input', function() {
        this.style.borderColor = '#ddd';
        this.parentElement.querySelector('.error-message').style.display = 'none';
    });

    // ----- CIUDAD CON AUTOCOMPLETE -----
    inputCiudad.addEventListener('input', function() {
        const value = this.value.trim();
        
        // Limpiar sugerencias anteriores
        const existingList = this.parentElement.querySelector('.city-suggestions');
        if (existingList) existingList.remove();
        
        // Limpiar info de departamento
        deptInfo.style.display = 'none';
        deptInfo.textContent = '';
        
        this.style.borderColor = '#ddd';
        this.parentElement.querySelector('.error-message').style.display = 'none';

        if (!value) return;

        // Debounce búsqueda
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const suggestions = CitySearch.getSuggestions(value);
            if (suggestions.length > 0) {
                const suggestionsList = CitySearch.createSuggestionsList(suggestions);
                if (suggestionsList) {
                    this.parentElement.appendChild(suggestionsList);
                }
            }
        }, CONFIG.DEBOUNCE_DELAY);
    });

    inputCiudad.addEventListener('blur', function() {
        setTimeout(() => {
            const existingList = this.parentElement.querySelector('.city-suggestions');
            if (existingList) existingList.remove();

            if (!this.value) return;

            const isValid = Validators.validateCity(this.value);
            const errorSpan = this.parentElement.querySelector('.error-message');

            if (!isValid) {
                errorSpan.textContent = 'Ciudad no válida. Selecciona de las sugerencias.';
                errorSpan.style.display = 'block';
                this.style.borderColor = '#d32f2f';
                FormState.update('ciudad', '');
                FormState.update('departamento', '');
                deptInfo.style.display = 'none';
            }
        }, 100);
    });

    // ----- DIRECCIÓN -----
    inputDireccion.addEventListener('blur', function() {
        const isValid = Validators.validateAddress(this.value);
        const errorSpan = this.parentElement.querySelector('.error-message');
        
        if (!this.value) {
            errorSpan.style.display = 'none';
        } else if (!isValid) {
            errorSpan.textContent = 'Ingresa una dirección más completa (mínimo 10 caracteres)';
            errorSpan.style.display = 'block';
            this.style.borderColor = '#d32f2f';
        } else {
            errorSpan.style.display = 'none';
            this.style.borderColor = '#ddd';
            FormState.update('direccion', this.value.trim());
        }
    });

    inputDireccion.addEventListener('input', function() {
        this.style.borderColor = '#ddd';
        this.parentElement.querySelector('.error-message').style.display = 'none';
    });

    // ----- SUBMIT FORM -----
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validar todos los campos
        const validations = [
            { field: inputNombre, validator: () => Validators.validateName(inputNombre.value), errorMsg: 'Nombre inválido' },
            { field: inputTelefono, validator: () => Validators.validatePhone(inputTelefono.value), errorMsg: 'Teléfono inválido' },
            { field: inputCiudad, validator: () => Validators.validateCity(inputCiudad.value), errorMsg: 'Ciudad inválida' },
            { field: inputDireccion, validator: () => Validators.validateAddress(inputDireccion.value), errorMsg: 'Dirección inválida' }
        ];

        let isFormValid = true;

        validations.forEach(({ field, validator, errorMsg }) => {
            const errorSpan = field.parentElement.querySelector('.error-message');
            
            if (!validator()) {
                isFormValid = false;
                errorSpan.textContent = errorMsg;
                errorSpan.style.display = 'block';
                field.style.borderColor = '#d32f2f';
            } else {
                errorSpan.style.display = 'none';
                field.style.borderColor = '#ddd';
            }
        });

        if (!isFormValid) {
            return;
        }

        // Actualizar departamento
        const dept = Validators.getDepartamento(inputCiudad.value);
        FormState.update('departamento', dept);

        // Deshabilitar botón
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.textContent = 'Procesando...';

        // Enviar a webhook de confirmación (n8n)
        const success = await Webhooks.sendOrderCompleted();

        if (success) {
            // Limpiar formulario
            form.reset();
            FormState.reset();
            
            submitBtn.textContent = '✓ Pedido confirmado';
            submitBtn.style.background = '#059669';
            
            // Mensaje de éxito
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                background: #d4edda;
                color: #155724;
                padding: 12px;
                border-radius: 4px;
                margin-top: 12px;
                text-align: center;
                font-size: 14px;
            `;
            successMsg.textContent = 'Pedido confirmado exitosamente. Nos contactaremos pronto.';
            form.appendChild(successMsg);

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Confirmar otro pedido';
                submitBtn.style.background = '#10b981';
                submitBtn.style.opacity = '1';
            }, 3000);
        } else {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.textContent = 'Confirmar pedido';
            
            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = `
                background: #f8d7da;
                color: #721c24;
                padding: 12px;
                border-radius: 4px;
                margin-top: 12px;
                text-align: center;
                font-size: 14px;
            `;
            errorMsg.textContent = 'Error procesando pedido. Intenta nuevamente.';
            form.appendChild(errorMsg);

            setTimeout(() => {
                errorMsg.remove();
            }, 4000);
        }
    });

    // ===== DETECTAR ABANDONO =====
    setupAbandonmentDetection();
}

// ====================================
// 8. DETECCIÓN DE ABANDONO
// ====================================
function setupAbandonmentDetection() {
    let inactivityTimer;
    const INACTIVITY_TIME = 3 * 60 * 1000; // 3 minutos sin actividad

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            // Si hay datos parciales, enviar a flujo preliminar
            if (FormState.data.nombre || FormState.data.telefono || FormState.data.ciudad) {
                Webhooks.sendOrderPreliminary();
            }
        }, INACTIVITY_TIME);
    }

    // Eventos que resetean el timer
    const events = ['click', 'keydown', 'scroll', 'mousemove', 'touchstart'];
    events.forEach(event => {
        document.addEventListener(event, resetInactivityTimer);
    });

    // Detectar cierre de pestaña
    window.addEventListener('beforeunload', () => {
        // Si hay datos pero no completó el formulario
        if (!FormState.isComplete() && (FormState.data.nombre || FormState.data.telefono || FormState.data.ciudad)) {
            // Pequeño delay para asegurar que se envíe
            navigator.sendBeacon(CONFIG.WEBHOOK_PRELIMINAR, JSON.stringify({
                storeName: CONFIG.STORE_NAME,
                sessionId: FormState.data.sessionId,
                pedidoPreliminar: {
                    nombre: FormState.data.nombre,
                    telefono: FormState.data.telefono,
                    ciudad: FormState.data.ciudad,
                    departamento: FormState.data.departamento,
                    direccion: FormState.data.direccion
                },
                status: 'abandonado_cierre_tab',
                fieldsCompleted: {
                    nombre: !!FormState.data.nombre,
                    telefono: !!FormState.data.telefono,
                    ciudad: !!FormState.data.ciudad,
                    departamento: !!FormState.data.departamento,
                    direccion: !!FormState.data.direccion
                }
            }));
        }
    });

    resetInactivityTimer();
}

// ====================================
// 9. FUNCIÓN PARA SELECCIONAR CIUDAD
// ====================================
function selectCity(city) {
    const inputCiudad = document.getElementById('ciudad');
    inputCiudad.value = city.charAt(0).toUpperCase() + city.slice(1);
    
    // Obtener y mostrar departamento
    const dept = Validators.getDepartamento(city);
    const deptInfo = document.getElementById('departamento-info');
    
    if (dept) {
        deptInfo.textContent = `Departamento: ${dept}`;
        deptInfo.style.display = 'block';
        FormState.update('ciudad', city);
        FormState.update('departamento', dept);
    }

    // Limpiar sugerencias
    const suggestionsList = inputCiudad.parentElement.querySelector('.city-suggestions');
    if (suggestionsList) {
        suggestionsList.remove();
    }
}

// ====================================
// 10. INICIALIZACIÓN
// ====================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCheckout);
} else {
    initializeCheckout();
}

// También inicializar si el script se carga dinámicamente
if (window.checkoutReady === undefined) {
    window.checkoutReady = true;
    window.CheckoutAPI = {
        // API pública para controlar el formulario desde fuera
        reset: () => FormState.reset(),
        getData: () => FormState.data,
        setData: (field, value) => FormState.update(field, value),
        reinit: () => initializeCheckout()
    };
}
