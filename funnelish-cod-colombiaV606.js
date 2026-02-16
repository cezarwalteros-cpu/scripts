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

  // Supabase Configuration
  var SUPABASE_URL = 'https://nhccgonibsbymmydovts.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oY2Nnb25pYnNieW1teWRvdnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNjYyMjUsImV4cCI6MjA4Njc0MjIyNX0.2wpNsZc-fzQToYSDTYGTB6vCYVPxUIUWVfwW_E-MJTU'; // Reemplazar con tu anon key real

  // =========================
  // DATA COLOMBIA - 1057 MUNICIPIOS
  // =========================
  var ciudadesColombia = {
    "Abejorral": "Antioquia",    "Abriaquí": "Antioquia",    "Alejandría": "Antioquia",    "Amagá": "Antioquia",
    "Amalfi": "Antioquia",    "Andes": "Antioquia",    "Angelópolis": "Antioquia",    "Angostura": "Antioquia",
    "Anorí": "Antioquia",    "Anzá": "Antioquia",    "Apartadó": "Antioquia",    "Arboletes": "Antioquia",
    "Argelia": "Valle del Cauca",    "Armenia": "Quindío",    "Barbosa": "Santander",    "Bello": "Antioquia",
    "Belmira": "Antioquia",    "Betania": "Antioquia",    "Betulia": "Santander",    "Briceño": "Boyacá",
    "Buriticá": "Antioquia",    "Cáceres": "Antioquia",    "Caicedo": "Antioquia",    "Caldas": "Boyacá",
    "Campamento": "Antioquia",    "Cañasgordas": "Antioquia",    "Caracolí": "Antioquia",    "Caramanta": "Antioquia",
    "Carepa": "Antioquia",    "Carolina": "Antioquia",    "Caucasia": "Antioquia",    "Chigorodó": "Antioquia",
    "Cisneros": "Antioquia",    "Ciudad Bolívar": "Antioquia",    "Cocorná": "Antioquia",    "Concepción": "Santander",
    "Concordia": "Magdalena",    "Copacabana": "Antioquia",    "Dabeiba": "Antioquia",    "Donmatías": "Antioquia",
    "Ebéjico": "Antioquia",    "El Bagre": "Antioquia",    "El Carmen de Viboral": "Antioquia",    "El Santuario": "Antioquia",
    "Entrerríos": "Antioquia",    "Envigado": "Antioquia",    "Fredonia": "Antioquia",    "Frontino": "Antioquia",
    "Giraldo": "Antioquia",    "Girardota": "Antioquia",    "Gómez Plata": "Antioquia",    "Granada": "Meta",
    "Guadalupe": "Santander",    "Guarne": "Antioquia",    "Guatapé": "Antioquia",    "Heliconia": "Antioquia",
    "Hispania": "Antioquia",    "Itagüí": "Antioquia",    "Ituango": "Antioquia",    "Jardín": "Antioquia",
    "Jericó": "Boyacá",    "La Ceja": "Antioquia",    "La Estrella": "Antioquia",    "La Pintada": "Antioquia",
    "La Unión": "Valle del Cauca",    "Liborina": "Antioquia",    "Maceo": "Antioquia",    "Marinilla": "Antioquia",
    "Medellín": "Antioquia",    "Montebello": "Antioquia",    "Murindó": "Antioquia",    "Mutatá": "Antioquia",
    "Nariño": "Nariño",    "Nechí": "Antioquia",    "Necoclí": "Antioquia",    "Olaya": "Antioquia",
    "Peñol": "Antioquia",    "Peque": "Antioquia",    "Pueblorrico": "Antioquia",    "Puerto Berrío": "Antioquia",
    "Puerto Nare": "Antioquia",    "Puerto Triunfo": "Antioquia",    "Remedios": "Antioquia",    "Retiro": "Antioquia",
    "Rionegro": "Santander",    "Sabanalarga": "Casanare",    "Sabaneta": "Antioquia",    "Salgar": "Antioquia",
    "San Andrés de Cuerquía": "Antioquia",    "San Carlos": "Córdoba",    "San Francisco": "Putumayo",    "San Jerónimo": "Antioquia",
    "San José de la Montaña": "Antioquia",    "San Juan de Urabá": "Antioquia",    "San Luis": "Tolima",    "San Pedro de los Milagros": "Antioquia",
    "San Pedro de Urabá": "Antioquia",    "San Rafael": "Antioquia",    "San Roque": "Antioquia",    "San Vicente Ferrer": "Antioquia",
    "Santa Bárbara": "Santander",    "Santa Fé de Antioquia": "Antioquia",    "Santa Rosa de Osos": "Antioquia",    "Santo Domingo": "Antioquia",
    "Segovia": "Antioquia",    "Sonsón": "Antioquia",    "Sopetrán": "Antioquia",    "Támesis": "Antioquia",
    "Tarazá": "Antioquia",    "Tarso": "Antioquia",    "Titiribí": "Antioquia",    "Toledo": "Norte de Santander",
    "Turbo": "Antioquia",    "Uramita": "Antioquia",    "Urrao": "Antioquia",    "Valdivia": "Antioquia",
    "Valparaíso": "Caquetá",    "Vegachí": "Antioquia",    "Venecia": "Cundinamarca",    "Vigía del Fuerte": "Antioquia",
    "Yalí": "Antioquia",    "Yarumal": "Antioquia",    "Yolombó": "Antioquia",    "Yondó": "Antioquia",
    "Zaragoza": "Antioquia",    "Arauca": "Arauca",    "Arauquita": "Arauca",    "Cravo Norte": "Arauca",
    "Fortul": "Arauca",    "Puerto Rondón": "Arauca",    "Saravena": "Arauca",    "Tame": "Arauca",
    "Providencia": "Nariño",    "Baranoa": "Atlántico",    "Barranquilla": "Atlántico",    "Campo de la Cruz": "Atlántico",
    "Candelaria": "Valle del Cauca",    "Galapa": "Atlántico",    "Juan de Acosta": "Atlántico",    "Luruaco": "Atlántico",
    "Malambo": "Atlántico",    "Manatí": "Atlántico",    "Palmar de Varela": "Atlántico",    "Piojó": "Atlántico",
    "Polonuevo": "Atlántico",    "Ponedera": "Atlántico",    "Puerto Colombia": "Atlántico",    "Repelón": "Atlántico",
    "Sabanagrande": "Atlántico",    "Santa Lucía": "Atlántico",    "Santo Tomás": "Atlántico",    "Soledad": "Atlántico",
    "Suan": "Atlántico",    "Tubará": "Atlántico",    "Usiacurí": "Atlántico",    "Bogotá, D.C.": "Bogotá, D.C.",
    "Achí": "Bolívar",    "Altos del Rosario": "Bolívar",    "Arenal": "Bolívar",    "Arjona": "Bolívar",
    "Arroyohondo": "Bolívar",    "Barranco de Loba": "Bolívar",    "Calamar": "Bolívar",    "Cantagallo": "Bolívar",
    "Cartagena de Indias": "Bolívar",    "Cicuco": "Bolívar",    "Clemencia": "Bolívar",    "Córdoba": "Quindío",
    "El Carmen de Bolívar": "Bolívar",    "El Guamo": "Bolívar",    "El Peñón": "Santander",    "Hatillo de Loba": "Bolívar",
    "Magangué": "Bolívar",    "Mahates": "Bolívar",    "Margarita": "Bolívar",    "María la Baja": "Bolívar",
    "Montecristo": "Bolívar",    "Morales": "Cauca",    "Norosí": "Bolívar",    "Pinillos": "Bolívar",
    "Regidor": "Bolívar",    "Río Viejo": "Bolívar",    "San Cristóbal": "Bolívar",    "San Estanislao": "Bolívar",
    "San Fernando": "Bolívar",    "San Jacinto": "Bolívar",    "San Jacinto del Cauca": "Bolívar",    "San Juan Nepomuceno": "Bolívar",
    "San Martín de Loba": "Bolívar",    "San Pablo": "Nariño",    "Santa Catalina": "Bolívar",    "Santa Cruz de Mompox": "Bolívar",
    "Santa Rosa": "Cauca",    "Santa Rosa del Sur": "Bolívar",    "Simití": "Bolívar",    "Soplaviento": "Bolívar",
    "Talaigua Nuevo": "Bolívar",    "Tiquisio": "Bolívar",    "Turbaco": "Bolívar",    "Turbana": "Bolívar",
    "Villanueva": "Santander",    "Zambrano": "Bolívar",    "Almeida": "Boyacá",    "Aquitania": "Boyacá",
    "Arcabuco": "Boyacá",    "Belén": "Nariño",    "Berbeo": "Boyacá",    "Betéitiva": "Boyacá",
    "Boavita": "Boyacá",    "Boyacá": "Boyacá",    "Buenavista": "Sucre",    "Busbanzá": "Boyacá",
    "Campohermoso": "Boyacá",    "Cerinza": "Boyacá",    "Chinavita": "Boyacá",    "Chiquinquirá": "Boyacá",
    "Chíquiza": "Boyacá",    "Chiscas": "Boyacá",    "Chita": "Boyacá",    "Chitaraque": "Boyacá",
    "Chivatá": "Boyacá",    "Chivor": "Boyacá",    "Ciénega": "Boyacá",    "Cómbita": "Boyacá",
    "Coper": "Boyacá",    "Corrales": "Boyacá",    "Covarachía": "Boyacá",    "Cubará": "Boyacá",
    "Cucaita": "Boyacá",    "Cuítiva": "Boyacá",    "Duitama": "Boyacá",    "El Cocuy": "Boyacá",
    "El Espino": "Boyacá",    "Firavitoba": "Boyacá",    "Floresta": "Boyacá",    "Gachantivá": "Boyacá",
    "Gámeza": "Boyacá",    "Garagoa": "Boyacá",    "Guacamayas": "Boyacá",    "Guateque": "Boyacá",
    "Guayatá": "Boyacá",    "Güicán de la Sierra": "Boyacá",    "Iza": "Boyacá",    "Jenesano": "Boyacá",
    "La Capilla": "Boyacá",    "La Uvita": "Boyacá",    "La Victoria": "Valle del Cauca",    "Labranzagrande": "Boyacá",
    "Macanal": "Boyacá",    "Maripí": "Boyacá",    "Miraflores": "Boyacá",    "Mongua": "Boyacá",
    "Monguí": "Boyacá",    "Moniquirá": "Boyacá",    "Motavita": "Boyacá",    "Muzo": "Boyacá",
    "Nobsa": "Boyacá",    "Nuevo Colón": "Boyacá",    "Oicatá": "Boyacá",    "Otanche": "Boyacá",
    "Pachavita": "Boyacá",    "Páez": "Cauca",    "Paipa": "Boyacá",    "Pajarito": "Boyacá",
    "Panqueba": "Boyacá",    "Pauna": "Boyacá",    "Paya": "Boyacá",    "Paz de Río": "Boyacá",
    "Pesca": "Boyacá",    "Pisba": "Boyacá",    "Puerto Boyacá": "Boyacá",    "Quípama": "Boyacá",
    "Ramiriquí": "Boyacá",    "Ráquira": "Boyacá",    "Rondón": "Boyacá",    "Saboyá": "Boyacá",
    "Sáchica": "Boyacá",    "Samacá": "Boyacá",    "San Eduardo": "Boyacá",    "San José de Pare": "Boyacá",
    "San Luis de Gaceno": "Boyacá",    "San Mateo": "Boyacá",    "San Miguel de Sema": "Boyacá",    "San Pablo de Borbur": "Boyacá",
    "Santa María": "Huila",    "Santa Rosa de Viterbo": "Boyacá",    "Santa Sofía": "Boyacá",    "Santana": "Boyacá",
    "Sativanorte": "Boyacá",    "Sativasur": "Boyacá",    "Siachoque": "Boyacá",    "Soatá": "Boyacá",
    "Socha": "Boyacá",    "Socotá": "Boyacá",    "Sogamoso": "Boyacá",    "Somondoco": "Boyacá",
    "Sora": "Boyacá",    "Soracá": "Boyacá",    "Sotaquirá": "Boyacá",    "Susacón": "Boyacá",
    "Sutamarchán": "Boyacá",    "Sutatenza": "Boyacá",    "Tasco": "Boyacá",    "Tenza": "Boyacá",
    "Tibaná": "Boyacá",    "Tibasosa": "Boyacá",    "Tinjacá": "Boyacá",    "Tipacoque": "Boyacá",
    "Toca": "Boyacá",    "Togüí": "Boyacá",    "Tópaga": "Boyacá",    "Tota": "Boyacá",
    "Tunja": "Boyacá",    "Tununguá": "Boyacá",    "Turmequé": "Boyacá",    "Tuta": "Boyacá",
    "Tutazá": "Boyacá",    "Úmbita": "Boyacá",    "Ventaquemada": "Boyacá",    "Villa de Leyva": "Boyacá",
    "Viracachá": "Boyacá",    "Zetaquira": "Boyacá",    "Aguadas": "Caldas",    "Anserma": "Caldas",
    "Aranzazu": "Caldas",    "Belalcázar": "Caldas",    "Chinchiná": "Caldas",    "Filadelfia": "Caldas",
    "La Dorada": "Caldas",    "La Merced": "Caldas",    "Manizales": "Caldas",    "Manzanares": "Caldas",
    "Marmato": "Caldas",    "Marquetalia": "Caldas",    "Marulanda": "Caldas",    "Neira": "Caldas",
    "Norcasia": "Caldas",    "Pácora": "Caldas",    "Palestina": "Huila",    "Pensilvania": "Caldas",
    "Riosucio": "Caldas",    "Risaralda": "Caldas",    "Salamina": "Magdalena",    "Samaná": "Caldas",
    "San José": "Caldas",    "Supía": "Caldas",    "Victoria": "Caldas",    "Villamaría": "Caldas",
    "Viterbo": "Caldas",    "Albania": "Santander",    "Belén de los Andaquíes": "Caquetá",    "Cartagena del Chairá": "Caquetá",
    "Curillo": "Caquetá",    "El Doncello": "Caquetá",    "El Paujíl": "Caquetá",    "Florencia": "Cauca",
    "La Montañita": "Caquetá",    "Milán": "Caquetá",    "Morelia": "Caquetá",    "Puerto Rico": "Meta",
    "San José del Fragua": "Caquetá",    "San Vicente del Caguán": "Caquetá",    "Solano": "Caquetá",    "Solita": "Caquetá",
    "Aguazul": "Casanare",    "Chámeza": "Casanare",    "Hato Corozal": "Casanare",    "La Salina": "Casanare",
    "Maní": "Casanare",    "Monterrey": "Casanare",    "Nunchía": "Casanare",    "Orocué": "Casanare",
    "Paz de Ariporo": "Casanare",    "Pore": "Casanare",    "Recetor": "Casanare",    "Sácama": "Casanare",
    "San Luis de Palenque": "Casanare",    "Támara": "Casanare",    "Tauramena": "Casanare",    "Trinidad": "Casanare",
    "Yopal": "Casanare",    "Almaguer": "Cauca",    "Balboa": "Risaralda",    "Bolívar": "Valle del Cauca",
    "Buenos Aires": "Cauca",    "Cajibío": "Cauca",    "Caldono": "Cauca",    "Caloto": "Cauca",
    "Corinto": "Cauca",    "El Tambo": "Nariño",    "Guachené": "Cauca",    "Guapi": "Cauca",
    "Inzá": "Cauca",    "Jambaló": "Cauca",    "La Sierra": "Cauca",    "La Vega": "Cundinamarca",
    "López de Micay": "Cauca",    "Mercaderes": "Cauca",    "Miranda": "Cauca",    "Padilla": "Cauca",
    "Patía": "Cauca",    "Piamonte": "Cauca",    "Piendamó - Tunía": "Cauca",    "Popayán": "Cauca",
    "Puerto Tejada": "Cauca",    "Puracé": "Cauca",    "Rosas": "Cauca",    "San Sebastián": "Cauca",
    "Santander de Quilichao": "Cauca",    "Silvia": "Cauca",    "Sotará Paispamba": "Cauca",    "Suárez": "Tolima",
    "Sucre": "Sucre",    "Timbío": "Cauca",    "Timbiquí": "Cauca",    "Toribío": "Cauca",
    "Totoró": "Cauca",    "Villa Rica": "Cauca",    "Aguachica": "Cesar",    "Agustín Codazzi": "Cesar",
    "Astrea": "Cesar",    "Becerril": "Cesar",    "Bosconia": "Cesar",    "Chimichagua": "Cesar",
    "Chiriguaná": "Cesar",    "Curumaní": "Cesar",    "El Copey": "Cesar",    "El Paso": "Cesar",
    "Gamarra": "Cesar",    "González": "Cesar",    "La Gloria": "Cesar",    "La Jagua de Ibirico": "Cesar",
    "La Paz": "Santander",    "Manaure Balcón del Cesar": "Cesar",    "Pailitas": "Cesar",    "Pelaya": "Cesar",
    "Pueblo Bello": "Cesar",    "Río de Oro": "Cesar",    "San Alberto": "Cesar",    "San Diego": "Cesar",
    "San Martín": "Meta",    "Tamalameque": "Cesar",    "Valledupar": "Cesar",    "Ayapel": "Córdoba",
    "Canalete": "Córdoba",    "Cereté": "Córdoba",    "Chimá": "Córdoba",    "Chinú": "Córdoba",
    "Ciénaga de Oro": "Córdoba",    "Cotorra": "Córdoba",    "La Apartada": "Córdoba",    "Lorica": "Córdoba",
    "Los Córdobas": "Córdoba",    "Momil": "Córdoba",    "Moñitos": "Córdoba",    "Montelíbano": "Córdoba",
    "Montería": "Córdoba",    "Planeta Rica": "Córdoba",    "Pueblo Nuevo": "Córdoba",    "Puerto Escondido": "Córdoba",
    "Puerto Libertador": "Córdoba",    "Purísima de la Concepción": "Córdoba",    "Sahagún": "Córdoba",    "San Andrés de Sotavento": "Córdoba",
    "San Antero": "Córdoba",    "San Bernardo del Viento": "Córdoba",    "San José de Uré": "Córdoba",    "San Pelayo": "Córdoba",
    "Tierralta": "Córdoba",    "Tuchín": "Córdoba",    "Valencia": "Córdoba",    "Agua de Dios": "Cundinamarca",
    "Albán": "Nariño",    "Anapoima": "Cundinamarca",    "Anolaima": "Cundinamarca",    "Apulo": "Cundinamarca",
    "Arbeláez": "Cundinamarca",    "Beltrán": "Cundinamarca",    "Bituima": "Cundinamarca",    "Bojacá": "Cundinamarca",
    "Cabrera": "Santander",    "Cachipay": "Cundinamarca",    "Cajicá": "Cundinamarca",    "Caparrapí": "Cundinamarca",
    "Cáqueza": "Cundinamarca",    "Carmen de Carupa": "Cundinamarca",    "Chaguaní": "Cundinamarca",    "Chía": "Cundinamarca",
    "Chipaque": "Cundinamarca",    "Choachí": "Cundinamarca",    "Chocontá": "Cundinamarca",    "Cogua": "Cundinamarca",
    "Cota": "Cundinamarca",    "Cucunubá": "Cundinamarca",    "El Colegio": "Cundinamarca",    "El Rosal": "Cundinamarca",
    "Facatativá": "Cundinamarca",    "Fómeque": "Cundinamarca",    "Fosca": "Cundinamarca",    "Funza": "Cundinamarca",
    "Fúquene": "Cundinamarca",    "Fusagasugá": "Cundinamarca",    "Gachalá": "Cundinamarca",    "Gachancipá": "Cundinamarca",
    "Gachetá": "Cundinamarca",    "Gama": "Cundinamarca",    "Girardot": "Cundinamarca",    "Guachetá": "Cundinamarca",
    "Guaduas": "Cundinamarca",    "Guasca": "Cundinamarca",    "Guataquí": "Cundinamarca",    "Guatavita": "Cundinamarca",
    "Guayabal de Síquima": "Cundinamarca",    "Guayabetal": "Cundinamarca",    "Gutiérrez": "Cundinamarca",    "Jerusalén": "Cundinamarca",
    "Junín": "Cundinamarca",    "La Calera": "Cundinamarca",    "La Mesa": "Cundinamarca",    "La Palma": "Cundinamarca",
    "La Peña": "Cundinamarca",    "Lenguazaque": "Cundinamarca",    "Machetá": "Cundinamarca",    "Madrid": "Cundinamarca",
    "Manta": "Cundinamarca",    "Medina": "Cundinamarca",    "Mosquera": "Nariño",    "Nemocón": "Cundinamarca",
    "Nilo": "Cundinamarca",    "Nimaima": "Cundinamarca",    "Nocaima": "Cundinamarca",    "Pacho": "Cundinamarca",
    "Paime": "Cundinamarca",    "Pandi": "Cundinamarca",    "Paratebueno": "Cundinamarca",    "Pasca": "Cundinamarca",
    "Puerto Salgar": "Cundinamarca",    "Pulí": "Cundinamarca",    "Quebradanegra": "Cundinamarca",    "Quetame": "Cundinamarca",
    "Quipile": "Cundinamarca",    "Ricaurte": "Nariño",    "San Antonio del Tequendama": "Cundinamarca",    "San Bernardo": "Nariño",
    "San Cayetano": "Norte de Santander",    "San Juan de Rioseco": "Cundinamarca",    "Sasaima": "Cundinamarca",    "Sesquilé": "Cundinamarca",
    "Sibaté": "Cundinamarca",    "Silvania": "Cundinamarca",    "Simijaca": "Cundinamarca",    "Soacha": "Cundinamarca",
    "Sopó": "Cundinamarca",    "Subachoque": "Cundinamarca",    "Suesca": "Cundinamarca",    "Supatá": "Cundinamarca",
    "Susa": "Cundinamarca",    "Sutatausa": "Cundinamarca",    "Tabio": "Cundinamarca",    "Tausa": "Cundinamarca",
    "Tena": "Cundinamarca",    "Tenjo": "Cundinamarca",    "Tibacuy": "Cundinamarca",    "Tibirita": "Cundinamarca",
    "Tocaima": "Cundinamarca",    "Tocancipá": "Cundinamarca",    "Topaipí": "Cundinamarca",    "Ubalá": "Cundinamarca",
    "Ubaque": "Cundinamarca",    "Une": "Cundinamarca",    "Útica": "Cundinamarca",    "Vergara": "Cundinamarca",
    "Vianí": "Cundinamarca",    "Villa de San Diego de Ubaté": "Cundinamarca",    "Villagómez": "Cundinamarca",    "Villapinzón": "Cundinamarca",
    "Villeta": "Cundinamarca",    "Viotá": "Cundinamarca",    "Yacopí": "Cundinamarca",    "Zipacón": "Cundinamarca",
    "Zipaquirá": "Cundinamarca",    "Acevedo": "Huila",    "Agrado": "Huila",    "Aipe": "Huila",
    "Algeciras": "Huila",    "Altamira": "Huila",    "Baraya": "Huila",    "Campoalegre": "Huila",
    "Colombia": "Huila",    "Elías": "Huila",    "Garzón": "Huila",    "Gigante": "Huila",
    "Hobo": "Huila",    "Íquira": "Huila",    "Isnos": "Huila",    "La Argentina": "Huila",
    "La Plata": "Huila",    "Nátaga": "Huila",    "Neiva": "Huila",    "Oporapa": "Huila",
    "Paicol": "Huila",    "Palermo": "Huila",    "Pital": "Huila",    "Pitalito": "Huila",
    "Rivera": "Huila",    "Saladoblanco": "Huila",    "San Agustín": "Huila",    "Suaza": "Huila",
    "Tarqui": "Huila",    "Tello": "Huila",    "Teruel": "Huila",    "Tesalia": "Huila",
    "Timaná": "Huila",    "Villavieja": "Huila",    "Yaguará": "Huila",    "Barrancas": "La Guajira",
    "Dibulla": "La Guajira",    "Distracción": "La Guajira",    "El Molino": "La Guajira",    "Fonseca": "La Guajira",
    "Hatonuevo": "La Guajira",    "La Jagua del Pilar": "La Guajira",    "Maicao": "La Guajira",    "Manaure": "La Guajira",
    "Riohacha": "La Guajira",    "San Juan del Cesar": "La Guajira",    "Uribia": "La Guajira",    "Urumita": "La Guajira",
    "Algarrobo": "Magdalena",    "Aracataca": "Magdalena",    "Ariguaní": "Magdalena",    "Cerro de San Antonio": "Magdalena",
    "Chivolo": "Magdalena",    "Ciénaga": "Magdalena",    "El Banco": "Magdalena",    "El Piñón": "Magdalena",
    "El Retén": "Magdalena",    "Fundación": "Magdalena",    "Guamal": "Meta",    "Nueva Granada": "Magdalena",
    "Pedraza": "Magdalena",    "Pijiño del Carmen": "Magdalena",    "Pivijay": "Magdalena",    "Plato": "Magdalena",
    "Puebloviejo": "Magdalena",    "Remolino": "Magdalena",    "Sabanas de San Ángel": "Magdalena",    "San Sebastián de Buenavista": "Magdalena",
    "San Zenón": "Magdalena",    "Santa Ana": "Magdalena",    "Santa Bárbara de Pinto": "Magdalena",    "Santa Marta": "Magdalena",
    "Sitionuevo": "Magdalena",    "Tenerife": "Magdalena",    "Zapayán": "Magdalena",    "Zona Bananera": "Magdalena",
    "Acacías": "Meta",    "Barranca de Upía": "Meta",    "Cabuyaro": "Meta",    "Castilla la Nueva": "Meta",
    "Cubarral": "Meta",    "Cumaral": "Meta",    "El Calvario": "Meta",    "El Castillo": "Meta",
    "El Dorado": "Meta",    "Fuente de Oro": "Meta",    "La Macarena": "Meta",    "Lejanías": "Meta",
    "Mapiripán": "Meta",    "Mesetas": "Meta",    "Puerto Concordia": "Meta",    "Puerto Gaitán": "Meta",
    "Puerto Lleras": "Meta",    "Puerto López": "Meta",    "Restrepo": "Valle del Cauca",    "San Carlos de Guaroa": "Meta",
    "San Juan de Arama": "Meta",    "San Juanito": "Meta",    "Uribe": "Meta",    "Villavicencio": "Meta",
    "Vistahermosa": "Meta",    "Aldana": "Nariño",    "Ancuya": "Nariño",    "Arboleda": "Nariño",
    "Barbacoas": "Nariño",    "Buesaco": "Nariño",    "Chachagüí": "Nariño",    "Colón": "Putumayo",
    "Consacá": "Nariño",    "Contadero": "Nariño",    "Cuaspud Carlosama": "Nariño",    "Cumbal": "Nariño",
    "Cumbitara": "Nariño",    "El Charco": "Nariño",    "El Peñol": "Nariño",    "El Rosario": "Nariño",
    "El Tablón de Gómez": "Nariño",    "Francisco Pizarro": "Nariño",    "Funes": "Nariño",    "Guachucal": "Nariño",
    "Guaitarilla": "Nariño",    "Gualmatán": "Nariño",    "Iles": "Nariño",    "Imués": "Nariño",
    "Ipiales": "Nariño",    "La Cruz": "Nariño",    "La Florida": "Nariño",    "La Llanada": "Nariño",
    "La Tola": "Nariño",    "Leiva": "Nariño",    "Linares": "Nariño",    "Los Andes": "Nariño",
    "Magüí": "Nariño",    "Mallama": "Nariño",    "Olaya Herrera": "Nariño",    "Ospina": "Nariño",
    "Pasto": "Nariño",    "Policarpa": "Nariño",    "Potosí": "Nariño",    "Puerres": "Nariño",
    "Pupiales": "Nariño",    "Roberto Payán": "Nariño",    "Samaniego": "Nariño",    "San Andrés de Tumaco": "Nariño",
    "San Lorenzo": "Nariño",    "San Pedro de Cartago": "Nariño",    "Sandoná": "Nariño",    "Santacruz": "Nariño",
    "Sapuyes": "Nariño",    "Taminango": "Nariño",    "Tangua": "Nariño",    "Túquerres": "Nariño",
    "Yacuanquer": "Nariño",    "Ábrego": "Norte de Santander",    "Arboledas": "Norte de Santander",    "Bochalema": "Norte de Santander",
    "Bucarasica": "Norte de Santander",    "Cáchira": "Norte de Santander",    "Cácota": "Norte de Santander",    "Chinácota": "Norte de Santander",
    "Chitagá": "Norte de Santander",    "Convención": "Norte de Santander",    "Cucutilla": "Norte de Santander",    "Durania": "Norte de Santander",
    "El Carmen": "Norte de Santander",    "El Tarra": "Norte de Santander",    "El Zulia": "Norte de Santander",    "Gramalote": "Norte de Santander",
    "Hacarí": "Norte de Santander",    "Herrán": "Norte de Santander",    "La Esperanza": "Norte de Santander",    "La Playa": "Norte de Santander",
    "Labateca": "Norte de Santander",    "Los Patios": "Norte de Santander",    "Lourdes": "Norte de Santander",    "Mutiscua": "Norte de Santander",
    "Ocaña": "Norte de Santander",    "Pamplona": "Norte de Santander",    "Pamplonita": "Norte de Santander",    "Puerto Santander": "Norte de Santander",
    "Ragonvalia": "Norte de Santander",    "Salazar": "Norte de Santander",    "San Calixto": "Norte de Santander",    "San José de Cúcuta": "Norte de Santander",
    "Santiago": "Putumayo",    "Sardinata": "Norte de Santander",    "Silos": "Norte de Santander",    "Teorama": "Norte de Santander",
    "Tibú": "Norte de Santander",    "Villa Caro": "Norte de Santander",    "Villa del Rosario": "Norte de Santander",    "Mocoa": "Putumayo",
    "Orito": "Putumayo",    "Puerto Asís": "Putumayo",    "Puerto Caicedo": "Putumayo",    "Puerto Guzmán": "Putumayo",
    "Puerto Leguízamo": "Putumayo",    "San Miguel": "Santander",    "Sibundoy": "Putumayo",    "Valle del Guamuez": "Putumayo",
    "Villagarzón": "Putumayo",    "Calarcá": "Quindío",    "Circasia": "Quindío",    "Filandia": "Quindío",
    "Génova": "Quindío",    "La Tebaida": "Quindío",    "Montenegro": "Quindío",    "Pijao": "Quindío",
    "Quimbaya": "Quindío",    "Salento": "Quindío",    "Apía": "Risaralda",    "Belén de Umbría": "Risaralda",
    "Dosquebradas": "Risaralda",    "Guática": "Risaralda",    "La Celia": "Risaralda",    "La Virginia": "Risaralda",
    "Marsella": "Risaralda",    "Mistrató": "Risaralda",    "Pereira": "Risaralda",    "Pueblo Rico": "Risaralda",
    "Quinchía": "Risaralda",    "Santa Rosa de Cabal": "Risaralda",    "Santuario": "Risaralda",    "Aguada": "Santander",
    "Aratoca": "Santander",    "Barichara": "Santander",    "Barrancabermeja": "Santander",    "Bucaramanga": "Santander",
    "California": "Santander",    "Capitanejo": "Santander",    "Carcasí": "Santander",    "Cepitá": "Santander",
    "Cerrito": "Santander",    "Charalá": "Santander",    "Charta": "Santander",    "Chima": "Santander",
    "Chipatá": "Santander",    "Cimitarra": "Santander",    "Confines": "Santander",    "Contratación": "Santander",
    "Coromoro": "Santander",    "Curití": "Santander",    "El Carmen de Chucurí": "Santander",    "El Guacamayo": "Santander",
    "El Playón": "Santander",    "Encino": "Santander",    "Enciso": "Santander",    "Florián": "Santander",
    "Floridablanca": "Santander",    "Galán": "Santander",    "Gámbita": "Santander",    "Girón": "Santander",
    "Guaca": "Santander",    "Guapotá": "Santander",    "Guavatá": "Santander",    "Güepsa": "Santander",
    "Hato": "Santander",    "Jesús María": "Santander",    "Jordán": "Santander",    "La Belleza": "Santander",
    "Landázuri": "Santander",    "Lebrija": "Santander",    "Los Santos": "Santander",    "Macaravita": "Santander",
    "Málaga": "Santander",    "Matanza": "Santander",    "Mogotes": "Santander",    "Molagavita": "Santander",
    "Ocamonte": "Santander",    "Oiba": "Santander",    "Onzaga": "Santander",    "Palmar": "Santander",
    "Palmas del Socorro": "Santander",    "Páramo": "Santander",    "Piedecuesta": "Santander",    "Pinchote": "Santander",
    "Puente Nacional": "Santander",    "Puerto Parra": "Santander",    "Puerto Wilches": "Santander",    "Sabana de Torres": "Santander",
    "San Andrés": "Santander",    "San Benito": "Santander",    "San Gil": "Santander",    "San Joaquín": "Santander",
    "San José de Miranda": "Santander",    "San Vicente de Chucurí": "Santander",    "Santa Helena del Opón": "Santander",    "Simacota": "Santander",
    "Socorro": "Santander",    "Suaita": "Santander",    "Suratá": "Santander",    "Tona": "Santander",
    "Valle de San José": "Santander",    "Vélez": "Santander",    "Vetas": "Santander",    "Zapatoca": "Santander",
    "Caimito": "Sucre",    "Chalán": "Sucre",    "Colosó": "Sucre",    "Corozal": "Sucre",
    "Coveñas": "Sucre",    "El Roble": "Sucre",    "Galeras": "Sucre",    "Guaranda": "Sucre",
    "Los Palmitos": "Sucre",    "Majagual": "Sucre",    "Morroa": "Sucre",    "Ovejas": "Sucre",
    "Palmito": "Sucre",    "Sampués": "Sucre",    "San Benito Abad": "Sucre",    "San José de Toluviejo": "Sucre",
    "San Juan de Betulia": "Sucre",    "San Luis de Sincé": "Sucre",    "San Marcos": "Sucre",    "San Onofre": "Sucre",
    "San Pedro": "Valle del Cauca",    "Santiago de Tolú": "Sucre",    "Sincelejo": "Sucre",    "Alpujarra": "Tolima",
    "Alvarado": "Tolima",    "Ambalema": "Tolima",    "Anzoátegui": "Tolima",    "Armero": "Tolima",
    "Ataco": "Tolima",    "Cajamarca": "Tolima",    "Carmen de Apicalá": "Tolima",    "Casabianca": "Tolima",
    "Chaparral": "Tolima",    "Coello": "Tolima",    "Coyaima": "Tolima",    "Cunday": "Tolima",
    "Dolores": "Tolima",    "Espinal": "Tolima",    "Falan": "Tolima",    "Flandes": "Tolima",
    "Fresno": "Tolima",    "Guamo": "Tolima",    "Herveo": "Tolima",    "Honda": "Tolima",
    "Ibagué": "Tolima",    "Icononzo": "Tolima",    "Lérida": "Tolima",    "Líbano": "Tolima",
    "Melgar": "Tolima",    "Murillo": "Tolima",    "Natagaima": "Tolima",    "Ortega": "Tolima",
    "Palocabildo": "Tolima",    "Piedras": "Tolima",    "Planadas": "Tolima",    "Prado": "Tolima",
    "Purificación": "Tolima",    "Rioblanco": "Tolima",    "Roncesvalles": "Tolima",    "Rovira": "Tolima",
    "Saldaña": "Tolima",    "San Antonio": "Tolima",    "San Sebastián de Mariquita": "Tolima",    "Santa Isabel": "Tolima",
    "Valle de San Juan": "Tolima",    "Venadillo": "Tolima",    "Villahermosa": "Tolima",    "Villarrica": "Tolima",
    "Alcalá": "Valle del Cauca",    "Andalucía": "Valle del Cauca",    "Ansermanuevo": "Valle del Cauca",    "Buenaventura": "Valle del Cauca",
    "Bugalagrande": "Valle del Cauca",    "Caicedonia": "Valle del Cauca",    "Calima": "Valle del Cauca",    "Cartago": "Valle del Cauca",
    "Dagua": "Valle del Cauca",    "El Águila": "Valle del Cauca",    "El Cairo": "Valle del Cauca",    "El Cerrito": "Valle del Cauca",
    "El Dovio": "Valle del Cauca",    "Florida": "Valle del Cauca",    "Ginebra": "Valle del Cauca",    "Guacarí": "Valle del Cauca",
    "Guadalajara de Buga": "Valle del Cauca",    "Jamundí": "Valle del Cauca",    "La Cumbre": "Valle del Cauca",    "Obando": "Valle del Cauca",
    "Palmira": "Valle del Cauca",    "Pradera": "Valle del Cauca",    "Riofrío": "Valle del Cauca",    "Roldanillo": "Valle del Cauca",
    "Santiago de Cali": "Valle del Cauca",    "Sevilla": "Valle del Cauca",    "Toro": "Valle del Cauca",    "Trujillo": "Valle del Cauca",
    "Tuluá": "Valle del Cauca",    "Ulloa": "Valle del Cauca",    "Versalles": "Valle del Cauca",    "Vijes": "Valle del Cauca",
    "Yotoco": "Valle del Cauca",    "Yumbo": "Valle del Cauca",    "Zarzal": "Valle del Cauca"
  };

  var departamentosColombia = [
    "Antioquia", "Arauca", "Atlántico", "Bogotá, D.C.", "Bolívar", "Boyacá", "Caldas",
    "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca",
    "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander",
    "Putumayo", "Quindío", "Risaralda", "Santander", "Sucre", "Tolima", "Valle del Cauca"
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

  function crearAutocompletado(input) {
    if (!input || input.dataset.cityAutocomplete === '1') return;
    input.dataset.cityAutocomplete = '1';

    // Detectar si es móvil
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    var box = document.createElement('div');
    box.className = 'city-autocomplete-box';
    
    // Estilos mejorados para móvil
    if (isMobile) {
      // En móvil: posición fija arriba del teclado
      box.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:2px solid #2563eb;max-height:40vh;overflow-y:auto;z-index:999999;display:none;box-shadow:0 -4px 20px rgba(0,0,0,0.25);';
    } else {
      // En desktop: dropdown normal
      box.style.cssText = 'position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid #ccc;border-radius:0 0 8px 8px;max-height:300px;overflow-y:auto;z-index:99999;display:none;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
    }

    if (!isMobile) {
      input.parentElement.style.position = 'relative';
      input.parentElement.appendChild(box);
    } else {
      document.body.appendChild(box);
    }

    // Header del dropdown en móvil
    var headerMobile = null;
    if (isMobile) {
      headerMobile = document.createElement('div');
      headerMobile.innerHTML = '📍 Selecciona tu ciudad';
      headerMobile.style.cssText = 'padding:14px 16px;background:#2563eb;color:#fff;font-weight:600;font-size:15px;position:sticky;top:0;z-index:1;';
      box.appendChild(headerMobile);
    }

    var listContainer = document.createElement('div');
    box.appendChild(listContainer);

    input.addEventListener('input', function () {
      var txt = (this.value || '').toLowerCase().trim();
      listContainer.innerHTML = '';
      
      if (txt.length < 1) { 
        box.style.display = 'none'; 
        return; 
      }
      
      var res = listaCiudades.filter(function (c) { 
        return c.toLowerCase().indexOf(txt) > -1; 
      }).slice(0, isMobile ? 12 : 8);
      
      if (res.length === 0) { 
        box.style.display = 'none'; 
        return; 
      }
      
      res.forEach(function (ciudad) {
        var item = document.createElement('div');
        var depto = ciudadesColombia[ciudad];
        
        if (isMobile) {
          // Estilo móvil: más grande y táctil
          item.innerHTML = '<div style="font-size:16px;font-weight:600;color:#1f2937;margin-bottom:4px;">' + ciudad + '</div>' +
                          '<div style="font-size:13px;color:#6b7280;">' + depto + '</div>';
          item.style.cssText = 'padding:16px 16px;cursor:pointer;border-bottom:1px solid #e5e7eb;background:#fff;touch-action:manipulation;';
        } else {
          // Estilo desktop: compacto
          item.innerHTML = '<strong>' + ciudad + '</strong> <span style="color:#888;font-size:12px;">- ' + depto + '</span>';
          item.style.cssText = 'padding:10px 12px;cursor:pointer;border-bottom:1px solid #eee;';
        }
        
        item.ontouchstart = function() { this.style.background = '#eff6ff'; };
        item.ontouchend = function() { this.style.background = '#fff'; };
        item.onmouseenter = function () { this.style.background = '#eff6ff'; };
        item.onmouseleave = function () { this.style.background = '#fff'; };
        
        item.onclick = function (e) {
          e.preventDefault();
          e.stopPropagation();
          input.value = ciudad;
          box.style.display = 'none';
          seleccionarDepartamento(ciudad);
          
          // Cerrar teclado en móvil
          if (isMobile) {
            input.blur();
          }
        };
        
        listContainer.appendChild(item);
      });
      
      box.style.display = 'block';
      
      // Scroll suave al inicio en móvil
      if (isMobile) {
        setTimeout(function() {
          listContainer.scrollTop = 0;
        }, 10);
      }
    });

    input.addEventListener('focus', function() {
      // Si ya tiene texto, mostrar sugerencias
      if (this.value && this.value.trim().length > 0) {
        var evt = new Event('input', { bubbles: true });
        this.dispatchEvent(evt);
      }
    });

    input.addEventListener('blur', function () {
      setTimeout(function () {
        box.style.display = 'none';
        if (input.value && input.value.trim()) seleccionarDepartamento(input.value.trim());
      }, 300);
    });

    document.addEventListener('click', function (e) {
      if (e.target !== input && !box.contains(e.target)) {
        box.style.display = 'none';
      }
    });
    
    // Cerrar al hacer scroll (opcional, para móvil)
    if (isMobile) {
      var scrollTimer = null;
      window.addEventListener('scroll', function() {
        if (box.style.display === 'block') {
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(function() {
            box.style.display = 'none';
          }, 150);
        }
      }, { passive: true });
    }
  }

  // =========================
  // ESTILOS TELÉFONO
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
        box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
      }
      .cod-phone-field.invalid {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239,68,68,0.15);
      }
      .cod-phone-prefix {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 50px;
        padding: 6px 10px;
        font-size: 14px;
        font-weight: 500;
        color: #475569;
        background: #f1f5f9;
        border-radius: 6px;
        user-select: none;
      }
      .cod-phone-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 15px;
        padding: 6px 4px;
        min-width: 0;
        background: transparent;
      }
      .cod-phone-input::placeholder {
        color: #94a3b8;
      }
      .cod-phone-warning {
        color: #ef4444;
        font-size: 13px;
        margin-top: 6px;
        display: none;
        font-weight: 500;
      }
    `;
    document.head.appendChild(css);
  }

  // =========================
  // UI TELÉFONO (INPUT HIDDEN + VISIBLE)
  // =========================
  function construirTelefonoUI(hiddenInput) {
    if (hiddenInput.dataset.codPhoneEnhanced === '1') return;
    hiddenInput.dataset.codPhoneEnhanced = '1';

    // Convertir el input original a hidden
    try {
      hiddenInput.type = 'hidden';
    } catch (e) {
      hiddenInput.style.display = 'none';
    }

    // Crear wrapper
    var wrapper = document.createElement('div');
    wrapper.className = 'cod-phone-wrapper';

    // Campo visual
    var field = document.createElement('div');
    field.className = 'cod-phone-field';

    // Prefijo (+57)
    var prefix = document.createElement('span');
    prefix.className = 'cod-phone-prefix';
    prefix.textContent = CONFIG.dial;

    // Input visible
    var visibleInput = document.createElement('input');
    visibleInput.type = 'text';
    visibleInput.className = 'cod-phone-input';
    visibleInput.placeholder = 'Ej: 3001234567';
    visibleInput.setAttribute('inputmode', 'numeric');
    visibleInput.setAttribute('autocomplete', 'tel-national');

    field.appendChild(prefix);
    field.appendChild(visibleInput);
    wrapper.appendChild(field);

    // Mensaje de advertencia
    var warning = document.createElement('div');
    warning.className = 'cod-phone-warning';
    warning.textContent = '⚠️ ' + CONFIG.mensaje;
    wrapper.appendChild(warning);

    // Insertar después del input original
    var parent = hiddenInput.parentElement;
    if (parent) {
      parent.insertBefore(wrapper, hiddenInput.nextSibling);
    }

    // =========================
    // LÓGICA DE SINCRONIZACIÓN
    // =========================
    function actualizarHidden() {
      var num = soloDigitos(visibleInput.value);
      
      // Solo actualizar el hidden si el número es VÁLIDO
      if (CONFIG.regex.test(num)) {
        hiddenInput.value = CONFIG.dial + num;
        field.classList.remove('invalid');
        warning.style.display = 'none';
      } else {
        // Si no es válido, el hidden queda VACÍO
        // Así Funnelish no puede avanzar
        hiddenInput.value = '';
        
        if (num.length > 0) {
          field.classList.add('invalid');
          warning.style.display = 'block';
        } else {
          field.classList.remove('invalid');
          warning.style.display = 'none';
        }
      }
    }

    // Validación en tiempo real
    visibleInput.addEventListener('input', function (e) {
      var val = soloDigitos(e.target.value);

      // Solo permitir que empiece con 3
      if (val.length === 1 && val !== '3') {
        val = '';
      }

      // Limitar longitud
      if (val.length > CONFIG.maxLength) {
        val = val.slice(0, CONFIG.maxLength);
      }

      // Actualizar valor visible si cambió
      if (val !== soloDigitos(e.target.value)) {
        e.target.value = val;
      }

      actualizarHidden();
    });

    // También validar en blur
    visibleInput.addEventListener('blur', actualizarHidden);

    // Estado inicial
    actualizarHidden();
  }

  // =========================
  // INIT GENERAL
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

    // Teléfono con UI mejorada
    var phone = document.querySelector('input[name="phone"]');
    if (phone && phone.dataset.codPhoneEnhanced !== '1') {
      inyectarEstilos();
      construirTelefonoUI(phone);
    }
  }

  // =========================
  // BOOTSTRAP
  // =========================
  function boot() {
    initCore();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(boot, 300);
    });
  } else {
    setTimeout(boot, 300);
  }

  // Polling para forms que cargan tarde
  var tries = 0;
  var poll = setInterval(function () {
    tries++;
    boot();
    var phone = document.querySelector('input[name="phone"]');
    if ((phone && phone.dataset.codPhoneEnhanced === '1') || tries >= 80) {
      clearInterval(poll);
    }
  }, 250);

  // Observer para re-renderizados
  var mo = new MutationObserver(function () {
    var phone = document.querySelector('input[name="phone"]');
    if (phone && phone.dataset.codPhoneEnhanced !== '1') {
      boot();
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });

})();


// ╔═══════════════════════════════════════════════════════════╗
// ║  DETECCIÓN DE CARRITO ABANDONADO (solo abandono)          ║
// ║  Las órdenes completas se manejan por Funnelish nativo    ║
// ║  IIFE aislado - si falla, el checkout sigue igual         ║
// ╚═══════════════════════════════════════════════════════════╝
;(function() {
  'use strict';
  try {

  // ── URL del webhook de n8n para carritos abandonados ──
  var WEBHOOK_URL = SUPABASE_URL + '/functions/v1/capture-abandoned-cart';
  var MINUTOS_INACTIVIDAD = 3;
  var DEBUG = true;

  // ── Estado ──
  var _enviado = false;
  var _ordenCompletada = false;

  function log(m) { if (DEBUG) console.log('[ABANDONO] ' + m); }

  // ── Leer campos del formulario ──
  function val(n) {
    try { var e = document.querySelector('input[name="'+n+'"]'); return e && e.value ? e.value.trim() : ''; }
    catch(x) { return ''; }
  }
  function selVal(n) {
    try { var e = document.querySelector('select[name="'+n+'"]'); return e && e.value ? e.value : ''; }
    catch(x) { return ''; }
  }
  function param(p) {
    try { return new URL(location.href).searchParams.get(p) || ''; } catch(x) { return ''; }
  }

  // ── Capturar datos ──
  function datos() {
    // El input hidden de phone solo tiene valor si es válido (+57XXXXXXXXXX)
    var tel = val('phone');
    var valido = /^\+57[3]\d{9}$/.test(tel);

    // Leer el input visible de teléfono también (por si el hidden está vacío)
    if (!valido) {
      try {
        var visiblePhone = document.querySelector('.cod-phone-input');
        if (visiblePhone && visiblePhone.value) {
          var digits = visiblePhone.value.replace(/\D/g, '');
          if (/^3\d{9}$/.test(digits)) {
            tel = '+57' + digits;
            valido = true;
          }
        }
      } catch(x) {}
    }

    // Nombre: intentar múltiples campos posibles
    var nombre = val('first_name') || val('name') || val('full_name') || val('nombre') || val('customer_name') || '';

    // Si no encontramos por name, buscar por placeholder o label
    if (!nombre) {
      try {
        // Buscar inputs de texto visibles con valor
        var inputs = document.querySelectorAll('input[type="text"], input:not([type])');
        for (var i = 0; i < inputs.length; i++) {
          var inp = inputs[i];
          // Saltar hidden, email, phone y campos ya identificados
          if (inp.type === 'hidden' || inp.name === 'email' || inp.name === 'phone') continue;
          if (inp.name === 'shipping_city' || inp.name === 'shipping_address' || inp.name === 'address') continue;
          if (inp.classList.contains('cod-phone-input')) continue;
          // Si tiene valor y parece ser el primer campo visible con texto
          if (inp.value && inp.value.trim().length > 1) {
            var ph = (inp.placeholder || '').toLowerCase();
            var label = (inp.name || '').toLowerCase();
            if (ph.indexOf('nombre') > -1 || ph.indexOf('name') > -1 ||
                label.indexOf('name') > -1 || label.indexOf('nombre') > -1 ||
                i === 0) { // El primer input de texto suele ser el nombre
              nombre = inp.value.trim();
              log('Nombre encontrado en: ' + (inp.name || inp.placeholder || 'input[' + i + ']'));
              break;
            }
          }
        }
      } catch(x) {}
    }

    // Debug: mostrar qué encontramos
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

  // ── Enviar abandono ──
  function enviarAbandono(razon) {
    if (_enviado || _ordenCompletada) return;

    var d = datos();

    // Solo enviar si tiene nombre Y teléfono válido
    if (!d.nombre || !d.telefonoValido) {
      log('Sin datos mínimos (nombre + tel válido), no se envía');
      return;
    }

    d.razonAbandono = razon;
    _enviado = true;

    log('⚠️ Enviando abandono → ' + razon);

    // Obtener información del paquete seleccionado
    var paqueteInfo = {
      id: 1,
      label: "1 Frasco",
      price: d.precio || 0
    };

    // Intentar obtener el paquete desde el funnel si existe
    try {
      if (window.funnel && window.funnel.product) {
        var product = window.funnel.product;
        if (product.variant_id) paqueteInfo.id = product.variant_id;
        if (product.variant_name) paqueteInfo.label = product.variant_name;
        if (product.price) paqueteInfo.price = product.price;
      }
    } catch(x) {}

    var body = JSON.stringify({
      nombre: d.nombre,
      telefono: d.telefono, // Mantener el formato +573001234567
      paquete: paqueteInfo
    });

    // Headers de autenticación para Supabase
    var authHeaders = {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
    };

    // MÉTODO 1: fetch con keepalive (preferido para Supabase)
    try {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        body: body,
        headers: authHeaders,
        keepalive: true,
        mode: 'cors'
      }).then(function(response) {
        if (response.ok) {
          log('✓ Enviado via fetch - Status: ' + response.status);
        } else {
          log('✗ Fetch error - Status: ' + response.status);
        }
      }).catch(function(err) {
        log('✗ Fetch catch: ' + err.message);
      });
      return;
    } catch(x) { log('fetch falló: ' + x.message); }

    // MÉTODO 2: XHR como fallback
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', WEBHOOK_URL, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('apikey', SUPABASE_ANON_KEY);
      xhr.setRequestHeader('Authorization', 'Bearer ' + SUPABASE_ANON_KEY);
      xhr.onload = function() { 
        log(xhr.status >= 200 && xhr.status < 300 ? '✓ XHR ok - Status: ' + xhr.status : '✗ XHR error - Status: ' + xhr.status); 
      };
      xhr.onerror = function() {
        log('✗ XHR network error');
      };
      xhr.send(body);
    } catch(e) { log('✗ XHR: ' + e.message); }
  }

  // ── Detectar si completó la orden (para NO enviar abandono) ──
  // Escucha el click en submit: si el teléfono es válido, marca como orden
  document.addEventListener('click', function(e) {
    try {
      var t = e.target; if (!t) return;
      var btn = t.closest ? t.closest('a[href="#submit-step"]') : null;
      if (!btn) return;
      var tel = val('phone');
      if (/^\+57[3]\d{9}$/.test(tel)) {
        // Probablemente completó la orden → bloquear abandono
        setTimeout(function() { _ordenCompletada = true; log('Orden detectada, abandono bloqueado'); }, 1500);
      }
    } catch(x) {}
  }, false);

  // ── Listeners de abandono ──

  // 1. Cierra pestaña / navega fuera
  window.addEventListener('beforeunload', function() {
    try { enviarAbandono('cerro_pagina'); } catch(x) {}
  });

  // 2. Cambia de pestaña / minimiza
  document.addEventListener('visibilitychange', function() {
    try { if (document.visibilityState === 'hidden') enviarAbandono('cambio_pestana'); } catch(x) {}
  });

  // 3. iOS / Safari
  window.addEventListener('pagehide', function() {
    try { enviarAbandono('pagehide'); } catch(x) {}
  });

  // 4. Inactividad prolongada
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

  log('Módulo activo ✓ (webhook: ' + WEBHOOK_URL.slice(0, 50) + '...)');

  } catch(err) {
    console.error('[ABANDONO] Error fatal (checkout OK):', err.message);
  }
})();
