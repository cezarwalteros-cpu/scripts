// ============================================================
// BIENESTAR TOTAL — Script Custom Funnelish
// Versión: 2.0.0 — Sistema propio, sin dependencias externas
// ============================================================
// DATOS GEOGRÁFICOS — Colombia (todos los departamentos y municipios)
// ============================================================
var countryStateInfo = { "Colombia": { "Seleccione un Departamento": {}, "Amazonas": { "Leticia": [], "Puerto Nario": [] }, "Antioquia": { "Abejorral": [], "Abriaquí": [], "Alejandría": [], "Amagá": [], "Amalfi": [], "Andes": [], "Angelópolis": [], "Angostura": [], "Anorí": [], "Anzá": [], "Apartadó": [], "Arboletes": [], "Argelia": [], "Armenia": [], "Barbosa": [], "Bello": [], "Belmira": [], "Betania": [], "Betulia": [], "Briceño": [], "Buriticá": [], "Cáceres": [], "Caicedo": [], "Caldas": [], "Campamento": [], "Cañasgordas": [], "Caracolí": [], "Caramanta": [], "Carepa": [], "Carolina del Príncipe": [], "Caucasia": [], "Chigorodó": [], "Cisneros": [], "Ciudad Bolívar": [], "Cocorná": [], "Concepción": [], "Concordia": [], "Copacabana": [], "Dabeiba": [], "Donmatías": [], "Ebéjico": [], "El Bagre": [], "El Carmen de Viboral": [], "El Peñol": [], "El Retiro": [], "El Santuario": [], "Entrerríos": [], "Envigado": [], "Fredonia": [], "Frontino": [], "Giraldo": [], "Girardota": [], "Gómez Plata": [], "Granada": [], "Guadalupe": [], "Guarne": [], "Guatapé": [], "Heliconia": [], "Hispania": [], "Itagüí": [], "Ituango": [], "Jardín": [], "Jericó": [], "La Ceja": [], "La Estrella": [], "La Pintada": [], "La Unión": [], "Liborina": [], "Maceo": [], "Marinilla": [], "Medellín": [], "Montebello": [], "Murindó": [], "Mutatá": [], "Nariño": [], "Nechí": [], "Necoclí": [], "Olaya": [], "Peque": [], "Pueblorrico": [], "Puerto Berrío": [], "Puerto Nare": [], "Puerto Triunfo": [], "Remedios": [], "Rionegro": [], "Sabanalarga": [], "Sabaneta": [], "Salgar": [], "San Andrés de Cuerquia": [], "San Carlos": [], "San Francisco": [], "San Jerónimo": [], "San José de la Montaña": [], "San Juan de Urabá": [], "San Luis": [], "San Pedro de Urabá": [], "San Pedro de los Milagros": [], "San Rafael": [], "San Roque": [], "San Vicente": [], "Santa Bárbara": [], "Santa Fe de Antioquia": [], "Santa Rosa de Osos": [], "Santo Domingo": [], "Segovia": [], "Sonsón": [], "Sopetrán": [], "Támesis": [], "Tarazá": [], "Tarso": [], "Titiribí": [], "Toledo": [], "Turbo": [], "Uramita": [], "Urrao": [], "Valdivia": [], "Valparaíso": [], "Vegachí": [], "Venecia": [], "Vigía del Fuerte": [], "Yalí": [], "Yarumal": [], "Yolombó": [], "Yondó": [], "Zaragoza": [] }, "Arauca": { "Arauca": [], "Arauquita": [], "Cravo Norte": [], "Fortul": [], "Puerto Rondón": [], "Saravena": [], "Tame": [] }, "Atlántico": { "Baranoa": [], "Barranquilla": [], "Campo de la Cruz": [], "Candelaria": [], "Galapa": [], "Juan de Acosta": [], "Luruaco": [], "Malambo": [], "Manatí": [], "Palmar de Varela": [], "Piojó": [], "Polonuevo": [], "Ponedera": [], "Puerto Colombia": [], "Repelón": [], "Sabanagrande": [], "Sabanalarga": [], "Santa Lucía": [], "Santo Tomás": [], "Soledad": [], "Suán": [], "Tubará": [], "Usiacurí": [] }, "Bolívar": { "Achí": [], "Altos del Rosario": [], "Arenal": [], "Arjona": [], "Arroyohondo": [], "Barranco de Loba": [], "Brazuelo de Papayal": [], "Calamar": [], "Cantagallo": [], "Cartagena": [], "Cicuco": [], "Clemencia": [], "Córdoba": [], "El Carmen de Bolívar": [], "El Guamo": [], "El Peñón": [], "Hatillo de Loba": [], "Magangué": [], "Mahates": [], "Margarita": [], "María la Baja": [], "Mompós": [], "Montecristo": [], "Morales": [], "Norosí": [], "Pinillos": [], "Regidor": [], "Río Viejo": [], "San Cristóbal": [], "San Estanislao": [], "San Fernando": [], "San Jacinto del Cauca": [], "San Jacinto": [], "San Juan Nepomuceno": [], "San Martín de Loba": [], "San Pablo": [], "Santa Catalina": [], "Santa Rosa": [], "Santa Rosa del Sur": [], "Simití": [], "Soplaviento": [], "Talaigua Nuevo": [], "Tiquisio": [], "Turbaco": [], "Turbaná": [], "Villanueva": [], "Zambrano": [] }, "Boyacá": { "Almeida": [], "Aquitania": [], "Arcabuco": [], "Belén": [], "Berbeo": [], "Betéitiva": [], "Boavita": [], "Boyacá": [], "Briceño": [], "Buenavista": [], "Busbanzá": [], "Caldas": [], "Campohermoso": [], "Cerinza": [], "Chinavita": [], "Chiquinquirá": [], "Chíquiza": [], "Chiscas": [], "Chita": [], "Chitaraque": [], "Chivatá": [], "Chivor": [], "Ciénega": [], "Cómbita": [], "Coper": [], "Corrales": [], "Covarachía": [], "Cubará": [], "Cucaita": [], "Cuítiva": [], "Duitama": [], "El Cocuy": [], "El Espino": [], "Firavitoba": [], "Floresta": [], "Gachantivá": [], "Gámeza": [], "Garagoa": [], "Guacamayas": [], "Guateque": [], "Guayatá": [], "Güicán": [], "Iza": [], "Jenesano": [], "Jericó": [], "La Capilla": [], "La Uvita": [], "La Victoria": [], "Labranzagrande": [], "Macanal": [], "Maripí": [], "Miraflores": [], "Mongua": [], "Monguí": [], "Moniquirá": [], "Motavita": [], "Muzo": [], "Nobsa": [], "Nuevo Colón": [], "Oicatá": [], "Otanche": [], "Pachavita": [], "Páez": [], "Paipa": [], "Pajarito": [], "Panqueba": [], "Pauna": [], "Paya": [], "Paz del Río": [], "Pesca": [], "Pisba": [], "Puerto Boyacá": [], "Quípama": [], "Ramiriquí": [], "Ráquira": [], "Rondón": [], "Saboyá": [], "Sáchica": [], "Samacá": [], "San Eduardo": [], "San José de Pare": [], "San Luis de Gaceno": [], "San Mateo": [], "San Miguel de Sema": [], "San Pablo de Borbur": [], "Santa María": [], "Santa Rosa de Viterbo": [], "Santa Sofía": [], "Santana": [], "Sativanorte": [], "Sativasur": [], "Siachoque": [], "Soatá": [], "Socha": [], "Socotá": [], "Sogamoso": [], "Somondoco": [], "Sora": [], "Soracá": [], "Sotaquirá": [], "Susacón": [], "Sutamarchán": [], "Sutatenza": [], "Tasco": [], "Tenza": [], "Tibaná": [], "Tibasosa": [], "Tinjacá": [], "Tipacoque": [], "Toca": [], "Togüí": [], "Tópaga": [], "Tota": [], "Tunja": [], "Tununguá": [], "Turmequé": [], "Tuta": [], "Tutazá": [], "Úmbita": [], "Ventaquemada": [], "Villa de Leyva": [], "Viracachá": [], "Zetaquira": [] }, "Caldas": { "Aguadas": [], "Anserma": [], "Aranzazu": [], "Belalcázar": [], "Chinchiná": [], "Filadelfia": [], "La Dorada": [], "La Merced": [], "Manizales": [], "Manzanares": [], "Marmato": [], "Marquetalia": [], "Marulanda": [], "Neira": [], "Norcasia": [], "Pácora": [], "Palestina": [], "Pensilvania": [], "Riosucio": [], "Risaralda": [], "Salamina": [], "Samaná": [], "San José": [], "Supía": [], "Victoria": [], "Villamaría": [], "Viterbo": [] }, "Caquetá": { "Albania": [], "Belén de los Andaquíes": [], "Cartagena del Chairá": [], "Curillo": [], "El Doncello": [], "El Paujil": [], "Florencia": [], "La Montañita": [], "Milán": [], "Morelia": [], "Puerto Rico": [], "San José del Fragua": [], "San Vicente del Caguán": [], "Solano": [], "Solita": [], "Valparaíso": [] }, "Casanare": { "Aguazul": [], "Chámeza": [], "Hato Corozal": [], "La Salina": [], "Maní": [], "Monterrey": [], "Nunchía": [], "Orocué": [], "Paz de Ariporo": [], "Pore": [], "Recetor": [], "Sabanalarga": [], "Sácama": [], "San Luis de Palenque": [], "Támara": [], "Tauramena": [], "Trinidad": [], "Villanueva": [], "Yopal": [] }, "Cauca": { "Almaguer": [], "Argelia": [], "Balboa": [], "Bolívar": [], "Buenos Aires": [], "Cajibío": [], "Caldono": [], "Caloto": [], "Corinto": [], "El Tambo": [], "Florencia": [], "Guachené": [], "Guapí": [], "Inzá": [], "Jambaló": [], "La Sierra": [], "La Vega": [], "López de Micay": [], "Mercaderes": [], "Miranda": [], "Morales": [], "Padilla": [], "Páez": [], "Patía": [], "Piamonte": [], "Piendamó": [], "Popayán": [], "Puerto Tejada": [], "Puracé": [], "Rosas": [], "San Sebastián": [], "Santa Rosa": [], "Santander de Quilichao": [], "Silvia": [], "Sotará": [], "Suárez": [], "Sucre": [], "Timbío": [], "Timbiquí": [], "Toribío": [], "Totoró": [], "Villa Rica": [] }, "Cesar": { "Aguachica": [], "Agustín Codazzi": [], "Astrea": [], "Becerril": [], "Bosconia": [], "Chimichagua": [], "Chiriguaná": [], "Curumaní": [], "El Copey": [], "El Paso": [], "Gamarra": [], "González": [], "La Gloria (Cesar)": [], "La Jagua de Ibirico": [], "La Paz": [], "Manaure Balcón del Cesar": [], "Pailitas": [], "Pelaya": [], "Pueblo Bello": [], "Río de Oro": [], "San Alberto": [], "San Diego": [], "San Martín": [], "Tamalameque": [], "Valledupar": [] }, "Chocó": { "Acandí": [], "Alto Baudó": [], "Bagadó": [], "Bahía Solano": [], "Bajo Baudó": [], "Bojayá": [], "Cantón de San Pablo": [], "Cértegui": [], "Condoto": [], "El Atrato": [], "El Carmen de Atrato": [], "El Carmen del Darién": [], "Istmina": [], "Juradó": [], "Litoral de San Juan": [], "Lloró": [], "Medio Atrato": [], "Medio Baudó": [], "Medio San Juan": [], "Nóvita": [], "Nuquí": [], "Quibdó": [], "Río Iró": [], "Río Quito": [], "Riosucio": [], "San José del Palmar": [], "Sipí": [], "Tadó": [], "Unión Panamericana": [], "Unguía": [] }, "Cundinamarca": { "Agua de Dios": [], "Albán": [], "Anapoima": [], "Anolaima": [], "Apulo": [], "Arbeláez": [], "Beltrán": [], "Bituima": [], "Bogotá": [], "Bojacá": [], "Cabrera": [], "Cachipay": [], "Cajicá": [], "Caparrapí": [], "Cáqueza": [], "Carmen de Carupa": [], "Chaguaní": [], "Chía": [], "Chipaque": [], "Choachí": [], "Chocontá": [], "Cogua": [], "Cota": [], "Cucunubá": [], "El Colegio": [], "El Peñón": [], "El Rosal": [], "Facatativá": [], "Fómeque": [], "Fosca": [], "Funza": [], "Fúquene": [], "Fusagasugá": [], "Gachalá": [], "Gachancipá": [], "Gachetá": [], "Gama": [], "Girardot": [], "Granada": [], "Guachetá": [], "Guaduas": [], "Guasca": [], "Guataquí": [], "Guatavita": [], "Guayabal de Síquima": [], "Guayabetal": [], "Gutiérrez": [], "Jerusalén": [], "Junín": [], "La Calera": [], "La Mesa": [], "La Palma": [], "La Peña": [], "La Vega": [], "Lenguazaque": [], "Machetá": [], "Madrid": [], "Manta": [], "Medina": [], "Mosquera": [], "Nariño": [], "Nemocón": [], "Nilo": [], "Nimaima": [], "Nocaima": [], "Pacho": [], "Paime": [], "Pandi": [], "Paratebueno": [], "Pasca": [], "Puerto Salgar": [], "Pulí": [], "Quebradanegra": [], "Quetame": [], "Quipile": [], "Ricaurte": [], "San Antonio del Tequendama": [], "San Bernardo": [], "San Cayetano": [], "San Francisco": [], "San Juan de Rioseco": [], "Sasaima": [], "Sesquilé": [], "Sibaté": [], "Silvania": [], "Simijaca": [], "Soacha": [], "Sopó": [], "Subachoque": [], "Suesca": [], "Supatá": [], "Susa": [], "Sutatausa": [], "Tabio": [], "Tausa": [], "Tena": [], "Tenjo": [], "Tibacuy": [], "Tibirita": [], "Tocaima": [], "Tocancipá": [], "Topaipí": [], "Ubalá": [], "Ubaque": [], "Ubaté": [], "Une": [], "Útica": [], "Venecia": [], "Vergara": [], "Vianí": [], "Villagómez": [], "Villapinzón": [], "Villeta": [], "Viotá": [], "Yacopí": [], "Zipacón": [], "Zipaquirá": [] }, "Córdoba": { "Ayapel": [], "Buenavista": [], "Canalete": [], "Cereté": [], "Chimá": [], "Chinú": [], "Ciénaga de Oro": [], "Cotorra": [], "La Apartada": [], "Lorica": [], "Los Córdobas": [], "Momil": [], "Montelíbano": [], "Montería": [], "Moñitos": [], "Planeta Rica": [], "Pueblo Nuevo": [], "Puerto Escondido": [], "Puerto Libertador": [], "Purísima": [], "Sahagún": [], "San Andrés de Sotavento": [], "San Antero": [], "San Bernardo del Viento": [], "San Carlos": [], "San José de Uré": [], "San Pelayo": [], "Tierralta": [], "Tuchín": [], "Valencia": [] }, "Guainía": { "Inírida": [] }, "Guaviare": { "Calamar": [], "El Retorno": [], "Miraflores": [], "San José del Guaviare": [] }, "Huila": { "Acevedo": [], "Agrado": [], "Aipe": [], "Algeciras": [], "Altamira": [], "Baraya": [], "Campoalegre": [], "Colombia": [], "El Pital": [], "Elías": [], "Garzón": [], "Gigante": [], "Guadalupe": [], "Hobo": [], "Íquira": [], "Isnos": [], "La Argentina": [], "La Plata": [], "Nátaga": [], "Neiva": [], "Oporapa": [], "Paicol": [], "Palermo": [], "Palestina": [], "Pitalito": [], "Rivera": [], "Saladoblanco": [], "San Agustín": [], "Santa María": [], "Suaza": [], "Tarqui": [], "Tello": [], "Teruel": [], "Tesalia": [], "Timaná": [], "Villavieja": [], "Yaguará": [] }, "La Guajira": { "Albania": [], "Barrancas": [], "Dibulla": [], "Distracción": [], "El Molino": [], "Fonseca": [], "Hatonuevo": [], "La Jagua del Pilar": [], "Maicao": [], "Manaure": [], "Riohacha": [], "San Juan del Cesar": [], "Uribia": [], "Urumita": [], "Villanueva": [] }, "Magdalena": { "Algarrobo": [], "Aracataca": [], "Ariguaní": [], "Cerro de San Antonio": [], "Chibolo": [], "Ciénaga": [], "Concordia": [], "El Banco": [], "El Piñón": [], "El Retén": [], "Fundación": [], "Guamal": [], "Nueva Granada": [], "Pedraza": [], "Pijiño del Carmen": [], "Pivijay": [], "Plato": [], "Pueblo Viejo": [], "Remolino": [], "Sabanas de San Ángel": [], "Salamina": [], "San Sebastián de Buenavista": [], "San Zenón": [], "Santa Ana": [], "Santa Bárbara de Pinto": [], "Santa Marta": [], "Sitionuevo": [], "Tenerife": [], "Zapayán": [], "Zona Bananera": [] }, "Meta": { "Acacías": [], "Barranca de Upía": [], "Cabuyaro": [], "Castilla la Nueva": [], "Cubarral": [], "Cumaral": [], "El Calvario": [], "El Castillo": [], "El Dorado": [], "Fuente de Oro": [], "Granada": [], "Guamal": [], "La Macarena": [], "La Uribe": [], "Lejanías": [], "Mapiripán": [], "Mesetas": [], "Puerto Concordia": [], "Puerto Gaitán": [], "Puerto Lleras": [], "Puerto López": [], "Puerto Rico": [], "Restrepo": [], "San Carlos de Guaroa": [], "San Juan de Arama": [], "San Juanito": [], "San Martín": [], "Villavicencio": [], "Vista Hermosa": [] }, "Nariño": { "Aldana": [], "Ancuyá": [], "Arboleda": [], "Barbacoas": [], "Belén": [], "Buesaco": [], "Chachagüí": [], "Colón": [], "Consacá": [], "Contadero": [], "Córdoba": [], "Cuaspud": [], "Cumbal": [], "Cumbitara": [], "El Charco": [], "El Peñol": [], "El Rosario": [], "El Tablón": [], "El Tambo": [], "Francisco Pizarro": [], "Funes": [], "Guachucal": [], "Guaitarilla": [], "Gualmatán": [], "Iles": [], "Imués": [], "Ipiales": [], "La Cruz": [], "La Florida": [], "La Llanada": [], "La Tola": [], "La Unión": [], "Leiva": [], "Linares": [], "Los Andes": [], "Magüí Payán": [], "Mallama": [], "Mosquera": [], "Nariño": [], "Olaya Herrera": [], "Ospina": [], "Pasto": [], "Policarpa": [], "Potosí": [], "Providencia": [], "Puerres": [], "Pupiales": [], "Ricaurte": [], "Roberto Payán": [], "Samaniego": [], "San Bernardo": [], "San José de Albán": [], "San Lorenzo": [], "San Pablo": [], "San Pedro de Cartago": [], "Sandoná": [], "Santa Bárbara": [], "Santacruz": [], "Sapuyes": [], "Taminango": [], "Tangua": [], "Tumaco": [], "Túquerres": [], "Yacuanquer": [] }, "Norte de Santander": { "Ábrego": [], "Arboledas": [], "Bochalema": [], "Bucarasica": [], "Cáchira": [], "Cácota": [], "Chinácota": [], "Chitagá": [], "Convención": [], "Cúcuta": [], "Cucutilla": [], "Duranía": [], "El Carmen": [], "El Tarra": [], "El Zulia": [], "Gramalote": [], "Hacarí": [], "Herrán": [], "La Esperanza": [], "La Playa de Belén": [], "Labateca": [], "Los Patios": [], "Lourdes": [], "Mutiscua": [], "Ocaña": [], "Pamplona": [], "Pamplonita": [], "Puerto Santander": [], "Ragonvalia": [], "Salazar de Las Palmas": [], "San Calixto": [], "San Cayetano": [], "Santiago": [], "Santo Domingo de Silos": [], "Sardinata": [], "Teorama": [], "Tibú": [], "Toledo": [], "Villa Caro": [], "Villa del Rosario": [] }, "Putumayo": { "Colón": [], "Mocoa": [], "Orito": [], "Puerto Asís": [], "Puerto Caicedo": [], "Puerto Guzmán": [], "Puerto Leguízamo": [], "San Francisco": [], "San Miguel": [], "Santiago": [], "Sibundoy": [], "Valle del Guamuez": [], "Villagarzón": [] }, "Quindío": { "Armenia": [], "Buenavista": [], "Calarcá": [], "Circasia": [], "Córdoba": [], "Filandia": [], "Génova": [], "La Tebaida": [], "Montenegro": [], "Pijao": [], "Quimbaya": [], "Salento": [] }, "Risaralda": { "Apía": [], "Balboa": [], "Belén de Umbría": [], "Dosquebradas": [], "Guática": [], "La Celia": [], "La Virginia": [], "Marsella": [], "Mistrató": [], "Pereira": [], "Pueblo Rico": [], "Quinchía": [], "Santa Rosa de Cabal": [], "Santuario": [] }, "San Andrés y Providencia": { "Providencia y Santa Catalina Islas": [], "San Andrés": [] }, "Santander": { "Aguada": [], "Albania": [], "Aratoca": [], "Barbosa": [], "Barichara": [], "Barrancabermeja": [], "Betulia": [], "Bolívar": [], "Bucaramanga": [], "Cabrera": [], "California": [], "Capitanejo": [], "Carcasí": [], "Cepitá": [], "Cerrito": [], "Charalá": [], "Charta": [], "Chima": [], "Chipatá": [], "Cimitarra": [], "Concepción": [], "Confines": [], "Contratación": [], "Coromoro": [], "Curití": [], "El Carmen de Chucurí": [], "El Guacamayo": [], "El Peñón": [], "El Playón": [], "El Socorro": [], "Encino": [], "Enciso": [], "Florián": [], "Floridablanca": [], "Galán": [], "Gámbita": [], "Girón": [], "Guaca": [], "Guadalupe": [], "Guapotá": [], "Guavatá": [], "Güepsa": [], "Hato": [], "Jesús María": [], "Jordán": [], "La Belleza": [], "La Paz": [], "Landázuri": [], "Lebrija": [], "Los Santos": [], "Macaravita": [], "Málaga": [], "Matanza": [], "Mogotes": [], "Molagavita": [], "Ocamonte": [], "Oiba": [], "Onzaga": [], "Palmar": [], "Palmas del Socorro": [], "Páramo": [], "Piedecuesta": [], "Pinchote": [], "Puente Nacional": [], "Puerto Parra": [], "Puerto Wilches": [], "Rionegro": [], "Sabana de Torres": [], "San Andrés": [], "San Benito": [], "San Gil": [], "San Joaquín": [], "San José de Miranda": [], "San Miguel": [], "San Vicente de Chucurí": [], "Santa Bárbara": [], "Santa Helena del Opón": [], "Simacota": [], "Suaita": [], "Sucre": [], "Suratá": [], "Tona": [], "Valle de San José": [], "Vélez": [], "Vetas": [], "Villanueva": [], "Zapatoca": [] }, "Sucre": { "Buenavista": [], "Caimito": [], "Chalán": [], "Colosó": [], "Corozal": [], "Coveñas": [], "El Roble": [], "Galeras": [], "Guaranda": [], "La Unión": [], "Los Palmitos": [], "Majagual": [], "Morroa": [], "Ovejas": [], "Sampués": [], "San Antonio de Palmito": [], "San Benito Abad": [], "San Juan de Betulia": [], "San Marcos": [], "San Onofre": [], "San Pedro": [], "Sincé": [], "Sincelejo": [], "Sucre": [], "Tolú": [], "Tolú Viejo": [] }, "Tolima": { "Alpujarra": [], "Alvarado": [], "Ambalema": [], "Anzoátegui": [], "Armero": [], "Ataco": [], "Cajamarca": [], "Carmen de Apicalá": [], "Casabianca": [], "Chaparral": [], "Coello": [], "Coyaima": [], "Cunday": [], "Dolores": [], "El Espinal": [], "Falán": [], "Flandes": [], "Fresno": [], "Guamo": [], "Herveo": [], "Honda": [], "Ibagué": [], "Icononzo": [], "Lérida": [], "Líbano": [], "Mariquita": [], "Melgar": [], "Murillo": [], "Natagaima": [], "Ortega": [], "Palocabildo": [], "Piedras": [], "Planadas": [], "Prado": [], "Purificación": [], "Rioblanco": [], "Roncesvalles": [], "Rovira": [], "Saldaña": [], "San Antonio": [], "San Luis": [], "Santa Isabel": [], "Suárez": [], "Valle de San Juan": [], "Venadillo": [], "Villahermosa": [], "Villarrica": [] }, "Valle del Cauca": { "Alcalá": [], "Andalucía": [], "Ansermanuevo": [], "Argelia": [], "Bolívar": [], "Buenaventura": [], "Buga": [], "Bugalagrande": [], "Caicedonia": [], "Cali": [], "Calima": [], "Candelaria": [], "Cartago": [], "Dagua": [], "El Águila": [], "El Cairo": [], "El Cerrito": [], "El Dovio": [], "Florida": [], "Ginebra": [], "Guacarí": [], "Jamundí": [], "La Cumbre": [], "La Unión": [], "La Victoria": [], "Obando": [], "Palmira": [], "Pradera": [], "Restrepo": [], "Riofrío": [], "Roldanillo": [], "San Pedro": [], "Sevilla": [], "Toro": [], "Trujillo": [], "Tuluá": [], "Ulloa": [], "Versalles": [], "Vijes": [], "Yotoco": [], "Yumbo": [], "Zarzal": [] }, "Vaupés": { "Carurú": [], "Mitú": [], "Taraira": [] }, "Vichada": { "Cumaribo": [], "La Primavera": [], "Puerto Carreño": [], "Santa Rosalía": [] } } }



// ============================================================
// CONFIGURACIÓN GLOBAL — Editar por funnel
// ============================================================
const BT_CONFIG = {
  STORE_NAME: "BienestarTotal",
  HOST_PRELIMINAR_WEBHOOK: "https://nhccgonibsbymmydovts.supabase.co/functions/v1/capture-abandoned-cart", // <-- cambiar
  TEST_MODE: true,        // true = logs activos, false = producción silenciosa
  INACTIVITY_TIMEOUT: 180000, // 3 minutos de inactividad antes de disparar (ms)
  PRELIMINARY_WINDOW: 30,     // minutos de validez del lead enviado
};

// ============================================================
// UTILIDADES INTERNAS
// ============================================================
const _log = (...args) => { if (BT_CONFIG.TEST_MODE) console.log("[BT]", ...args); };
const _err = (...args) => { if (BT_CONFIG.TEST_MODE) console.error("[BT][ERROR]", ...args); };

function _makeId(length = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
}

function _normalizeText(str) {
  return (str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function _getField(name) {
  return document.querySelector(`[name="${name}"]`) || null;
}

function _triggerChange(el) {
  if (!el) return;
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

// ============================================================
// MÓDULO 1 — Gestión de sesión propia (sessionId)
// ============================================================
let _sessionId = null;

function _initSession() {
  try {
    const currentUrl = `${window.location.hostname}${window.location.pathname}`;
    const stored = JSON.parse(localStorage.getItem("bt_session") || "[]");
    const now = new Date();
    const windowMs = BT_CONFIG.PRELIMINARY_WINDOW * 60 * 1000;

    // Buscar sesión válida para esta URL
    const existing = stored.find(s =>
      s.url === currentUrl &&
      (now - new Date(s.date)) < windowMs
    );

    if (existing) {
      _sessionId = existing.id;
      _log("Sesión recuperada:", _sessionId);
    } else {
      // Crear nueva sesión
      const newSession = {
        id: _makeId(10),
        url: currentUrl,
        date: now.toISOString(),
        leadSent: false,
        orderCompleted: false
      };
      stored.push(newSession);
      // Limpiar sesiones viejas (más de 24h)
      const clean = stored.filter(s => (now - new Date(s.date)) < 24 * 60 * 60 * 1000);
      localStorage.setItem("bt_session", JSON.stringify(clean));
      _sessionId = newSession.id;
      _log("Nueva sesión creada:", _sessionId);
    }

    // Poblar el campo oculto en el DOM si existe
    const btField = document.querySelector('[data-name="bt_session"]');
    if (btField) {
      btField.value = JSON.stringify({
        sessionId: _sessionId,
        urlOrigin: currentUrl
      });
      if (btField.parentElement) btField.parentElement.style.display = "none";
    }

  } catch (e) {
    _err("initSession:", e);
    _sessionId = _makeId(10); // fallback en memoria si localStorage falla
  }
}

function _getSessionData() {
  try {
    const stored = JSON.parse(localStorage.getItem("bt_session") || "[]");
    return stored.find(s => s.id === _sessionId) || null;
  } catch { return null; }
}

function _updateSessionData(updates) {
  try {
    const stored = JSON.parse(localStorage.getItem("bt_session") || "[]");
    const idx = stored.findIndex(s => s.id === _sessionId);
    if (idx !== -1) {
      stored[idx] = { ...stored[idx], ...updates };
      localStorage.setItem("bt_session", JSON.stringify(stored));
    }
  } catch (e) { _err("updateSessionData:", e); }
}

// ============================================================
// MÓDULO 2 — Ocultación de campos
// ============================================================
function _hideFields() {
  try {
    // --- EMAIL: generar aleatorio y ocultar ---
    const emailInput = _getField("email");
    if (emailInput) {
      emailInput.value = _generateRandomEmail();
      emailInput.style.display = "none";
      if (emailInput.previousElementSibling) {
        emailInput.previousElementSibling.style.display = "none";
      }
      if (emailInput.parentElement) {
        emailInput.parentElement.style.display = "none";
      }
      _log("Email oculto:", emailInput.value);
    }

    // --- PAÍS: fijar Colombia y ocultar ---
    const countryInput = _getField("shipping_country");
    if (countryInput) {
      if (countryInput.tagName === "INPUT") {
        countryInput.value = "Colombia";
      } else if (countryInput.tagName === "SELECT") {
        let opt = new Option("Colombia", "Colombia");
        countryInput.add(opt, 1);
        countryInput.selectedIndex = 1;
      }
      const parent = countryInput.parentElement;
      if (parent) {
        parent.style.display = "none";
        if (parent.parentElement) parent.parentElement.style.display = "none";
      }
      _log("País fijado y oculto: Colombia");
    }

    // --- DEPARTAMENTO: vaciar y ocultar ---
    const stateInput = _getField("shipping_state");
    if (stateInput) {
      stateInput.innerHTML = stateInput.tagName === "SELECT" ? "" : undefined;
      stateInput.value = "";
      const parent = stateInput.parentElement;
      if (parent) {
        parent.style.display = "none";
        if (parent.parentElement) parent.parentElement.style.display = "none";
      }
      _log("Departamento vaciado y oculto");
    }

    // --- BT_SESSION: ocultar campo de sesión ---
    const btField = document.querySelector('[data-name="bt_session"]');
    if (btField) {
      btField.style.display = "none";
      if (btField.parentElement) btField.parentElement.style.display = "none";
    }

  } catch (e) { _err("hideFields:", e); }
}

function _generateRandomEmail() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let local = "";
  for (let i = 0; i < 10; i++) {
    local += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${local}@gmail.com`;
}

// ============================================================
// MÓDULO 3 — Widget de teléfono
// ============================================================
function _buildPhoneWidget(hiddenInput) {
  if (hiddenInput.dataset.btPhone) return; // anti doble inyección
  hiddenInput.dataset.btPhone = "1";

  try {
    // Ocultar input original
    try { hiddenInput.type = "hidden"; } catch { hiddenInput.style.display = "none"; }

    // Inyectar estilos (una sola vez)
    if (!document.getElementById("bt-phone-styles")) {
      const css = `
        .bt-phone-wrapper { box-sizing: border-box; width: 100%; margin: 6px 0; }
        .bt-phone-field {
          display: flex; align-items: center; gap: 8px;
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 8px; padding: 8px 14px;
          width: 100%; box-sizing: border-box;
        }
        .bt-phone-field:focus-within { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.15); }
        .bt-phone-prefix {
          display: flex; align-items: center; justify-content: center;
          min-width: 48px; height: 34px; font-size: 15px;
          color: #475569; background: #f8fafc;
          border: 1px solid #e2e8f0; border-radius: 6px;
          padding: 0 10px; box-sizing: border-box;
          user-select: none; font-weight: 600;
        }
        .bt-phone-input {
          border: none; outline: none; flex: 1;
          font-size: 14px; padding: 6px 4px; min-width: 120px;
          background: transparent;
        }
        .bt-phone-warning {
          font-size: 12px; color: #f87171;
          min-height: 16px; margin-top: 4px; display: none;
        }
        .bt-phone-input.valid { color: #16a34a; }
        .bt-phone-input.invalid-input { color: #ef4444; }
      `;
      const styleEl = document.createElement("style");
      styleEl.id = "bt-phone-styles";
      styleEl.textContent = css;
      document.head.appendChild(styleEl);
    }

    // Construir UI
    const wrapper = document.createElement("div");
    wrapper.className = "bt-phone-wrapper";

    const warning = document.createElement("div");
    warning.className = "bt-phone-warning";

    const field = document.createElement("div");
    field.className = "bt-phone-field";

    const prefix = document.createElement("span");
    prefix.className = "bt-phone-prefix";
    prefix.textContent = "+57";

    const local = document.createElement("input");
    local.type = "text";
    local.className = "bt-phone-input";
    local.placeholder = "Número de teléfono";
    local.setAttribute("inputmode", "numeric");
    local.setAttribute("autocomplete", "tel-national");
    local.setAttribute("maxlength", "10");

    field.appendChild(prefix);
    field.appendChild(local);
    wrapper.appendChild(field);
    wrapper.appendChild(warning);

    const parent = hiddenInput.parentElement || document.body;
    parent.insertBefore(wrapper, hiddenInput.nextSibling);

    // Lógica de validación y sincronización
    local.addEventListener("input", () => {
      let digits = local.value.replace(/\D/g, "");

      // Primer dígito debe ser 3
      if (digits.length >= 1 && digits[0] !== "3") {
        digits = "";
      }

      // Máximo 10 dígitos
      if (digits.length > 10) digits = digits.slice(0, 10);

      // Actualizar input visible solo si cambió
      if (local.value !== digits) local.value = digits;

      // Sincronizar con input oculto
      hiddenInput.value = digits.length > 0 ? "+57" + digits : "";
      _triggerChange(hiddenInput);

      // Validación visual
      if (digits.length === 0) {
        warning.style.display = "none";
        local.className = "bt-phone-input";
      } else if (digits.length < 10) {
        warning.textContent = "Número incompleto. Debe tener 10 dígitos y empezar por 3. Ej: 3001234567";
        warning.style.display = "block";
        local.className = "bt-phone-input invalid-input";
      } else if (!/^3\d{9}$/.test(digits)) {
        warning.textContent = "Número inválido. Debe empezar por 3 y tener 10 dígitos.";
        warning.style.display = "block";
        local.className = "bt-phone-input invalid-input";
      } else {
        // Válido y completo — solo actualizar visual
        // El envío del preliminar lo maneja el timer de inactividad y los eventos de abandono
        warning.style.display = "none";
        local.className = "bt-phone-input valid";
        // Notificar al módulo de captura que los datos pueden ser válidos ahora
        _onFormInteraction();
      }

      _log("Teléfono actualizado:", hiddenInput.value);
    });

    _log("Widget de teléfono construido");

  } catch (e) { _err("buildPhoneWidget:", e); }
}

function _initPhoneWidget() {
  let tries = 0;
  const maxTries = 80; // ~20s
  const interval = setInterval(() => {
    const input = _getField("phone");
    if (input) {
      clearInterval(interval);
      _buildPhoneWidget(input);
    } else if (++tries >= maxTries) {
      clearInterval(interval);
      _err("Campo phone no encontrado tras 20s");
    }
  }, 250);
}

// ============================================================
// MÓDULO 4 — Autocomplete de ciudad + autorelleno departamento
// ============================================================
let _cityIndex = {};       // { "medellin": { display: "Medellín", dept: "Antioquia" } }
let _cityConfirmed = false; // true solo cuando el usuario seleccionó del dropdown

function _buildCityIndex() {
  try {
    _cityIndex = {};
    const colombia = countryStateInfo["Colombia"] || {};
    Object.entries(colombia).forEach(([dept, cities]) => {
      if (dept === "Seleccione un Departamento") return;
      Object.keys(cities).forEach(city => {
        const key = _normalizeText(city);
        _cityIndex[key] = { display: city, dept };
      });
    });
    _log("Índice de ciudades construido:", Object.keys(_cityIndex).length, "ciudades");
  } catch (e) { _err("buildCityIndex:", e); }
}

function _buildCityAutocomplete() {
  try {
    const cityField = _getField("shipping_city");
    if (!cityField || cityField.dataset.btCity) return;
    cityField.dataset.btCity = "1";

    // Convertir a input de texto si es SELECT
    let visibleInput;
    if (cityField.tagName === "SELECT") {
      visibleInput = document.createElement("input");
      visibleInput.type = "text";
      visibleInput.name = ""; // sin name para que no duplique
      visibleInput.placeholder = "Escribe tu ciudad o municipio";
      visibleInput.setAttribute("autocomplete", "off");
      // Copiar clases y estilos básicos
      visibleInput.className = cityField.className;
      cityField.style.display = "none";
      cityField.parentElement.insertBefore(visibleInput, cityField);
    } else {
      visibleInput = cityField;
      visibleInput.setAttribute("autocomplete", "off");
      visibleInput.placeholder = "Escribe tu ciudad o municipio";
    }

    // Dropdown de sugerencias
    const dropdown = document.createElement("div");
    dropdown.style.cssText = `
      position: absolute; z-index: 9999; background: #fff;
      border: 1px solid #e2e8f0; border-top: none;
      border-radius: 0 0 8px 8px; max-height: 220px;
      overflow-y: auto; width: 100%; box-sizing: border-box;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08); display: none;
    `;

    // Contenedor relativo para posicionar el dropdown
    const container = visibleInput.parentElement;
    const prevPosition = window.getComputedStyle(container).position;
    if (prevPosition === "static") container.style.position = "relative";
    container.appendChild(dropdown);

    function showSuggestions(query) {
      try {
        // Proteger contra query null/undefined que causa el trim() error en Funnelish
        if (query === null || query === undefined) {
          dropdown.style.display = "none";
          return;
        }
        const norm = _normalizeText(String(query));
        if (norm.length < 2) {
          dropdown.style.display = "none";
          return;
        }

        const matches = Object.entries(_cityIndex)
          .filter(([key]) => key.includes(norm))
          .slice(0, 8);

        if (matches.length === 0) {
          dropdown.style.display = "none";
          return;
        }

        dropdown.innerHTML = "";
        matches.forEach(([, data]) => {
          if (!data || !data.display || !data.dept) return; // skip datos corruptos
          const item = document.createElement("div");
          item.style.cssText = `
            padding: 10px 14px; cursor: pointer; font-size: 14px;
            color: #374151; border-bottom: 1px solid #f3f4f6;
          `;
          item.textContent = `${data.display} — ${data.dept}`;
          item.addEventListener("mousedown", (e) => {
            e.preventDefault();
            e.stopPropagation();
            _selectCity(data.display, data.dept, visibleInput, cityField, dropdown);
          });
          item.addEventListener("mouseover", () => item.style.background = "#f0f9ff");
          item.addEventListener("mouseout", () => item.style.background = "");
          dropdown.appendChild(item);
        });

        dropdown.style.display = "block";
      } catch (e) {
        _err("showSuggestions:", e);
        dropdown.style.display = "none";
      }
    }

    // clearCity solo limpia los campos ocultos y el estado interno
    // NO toca el visibleInput para no interferir con lo que el usuario está escribiendo
    function clearCity() {
      _cityConfirmed = false;
      // Solo limpiar el campo oculto si es distinto al visible
      // (si son el mismo, Funnelish puede leer un valor vacío y explotar)
      if (cityField !== visibleInput) {
        cityField.value = "";
        const stateInput = _getField("shipping_state");
        if (stateInput) stateInput.value = "";
      } else {
        // Si son el mismo campo, solo limpiar el departamento
        const stateInput = _getField("shipping_state");
        if (stateInput) stateInput.value = "";
      }
      _log("Ciudad limpiada (estado interno)");
    }

    visibleInput.addEventListener("input", (e) => {
      // Detener propagación para que Funnelish no intente procesar
      // el valor parcial mientras el usuario está escribiendo
      e.stopPropagation();

      // Solo invalidar la selección previa si el usuario realmente borró o cambió el texto
      // (no si fue un evento sintético disparado por _triggerChange)
      if (e.isTrusted) {
        _cityConfirmed = false;
        const stateInput = _getField("shipping_state");
        if (stateInput) stateInput.value = "";
        if (cityField !== visibleInput) cityField.value = "";
      }

      showSuggestions(visibleInput.value);
    });

    visibleInput.addEventListener("blur", () => {
      // Esperar 200ms antes de ocultar — el mousedown del dropdown necesita tiempo
      // para completarse y marcar _cityConfirmed = true antes de que blur limpie
      setTimeout(() => {
        dropdown.style.display = "none";
        // Solo limpiar si el usuario realmente no seleccionó nada del dropdown
        if (!_cityConfirmed) clearCity();
      }, 200);
    });

    visibleInput.addEventListener("focus", () => {
      if (visibleInput.value.length >= 2 && !_cityConfirmed) {
        showSuggestions(visibleInput.value);
      }
    });

    // Cerrar al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (!container.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });

    _log("Autocomplete de ciudad construido");

  } catch (e) { _err("buildCityAutocomplete:", e); }
}

function _selectCity(city, dept, visibleInput, hiddenCityInput, dropdown) {
  try {
    visibleInput.value = city;
    hiddenCityInput.value = city;

    const stateInput = _getField("shipping_state");
    if (stateInput) {
      stateInput.value = dept;
      _triggerChange(stateInput);
    }

    _cityConfirmed = true;
    dropdown.style.display = "none";

    _triggerChange(hiddenCityInput);
    _log("Ciudad seleccionada:", city, "| Departamento:", dept);

    // Notificar al módulo de captura (reinicia timer de inactividad si los datos son válidos)
    _onFormInteraction();

  } catch (e) { _err("selectCity:", e); }
}

// ============================================================
// MÓDULO 5 — Campo barrio/referencia (address2)
// ============================================================
function _initBarrioField() {
  try {
    const customFields = document.getElementsByName("custom");
    const barrioField = customFields[0]; // único campo custom
    if (barrioField) {
      barrioField.placeholder = "Barrio, apartamento, casa, punto de referencia";
      _log("Campo barrio/referencia inicializado");
    }
  } catch (e) { _err("initBarrioField:", e); }
}

// ============================================================
// MÓDULO 6 — Bloqueo del submit por teléfono inválido
// ============================================================
function _initSubmitGuard() {
  try {
    const submitBtn = document.querySelector('a[href="#submit-step"]');
    if (!submitBtn) {
      _err("Botón submit no encontrado");
      return;
    }

    submitBtn.addEventListener("click", (e) => {
      const phoneInput = _getField("phone");
      const phone = phoneInput ? phoneInput.value : "";
      const valid = /^\+573\d{9}$/.test(phone);

      if (!valid) {
        _log("Submit bloqueado — teléfono inválido:", phone);
        e.stopImmediatePropagation();

        // Mostrar advertencia en el widget
        const warning = document.querySelector(".bt-phone-warning");
        if (warning) {
          warning.textContent = "Por favor ingresa un número de teléfono válido (10 dígitos, empieza por 3).";
          warning.style.display = "block";
        }
        return;
      }

      // Ciudad debe haber sido seleccionada del autocomplete
      if (!_cityConfirmed) {
        _log("Submit bloqueado — ciudad no seleccionada del autocomplete");
        e.stopImmediatePropagation();
        alert("Por favor selecciona tu ciudad o municipio de la lista.");
        return;
      }

      // Marcar orden completada en localStorage
      _updateSessionData({ orderCompleted: true });
      _log("Submit permitido — orden marcada como completada");

    }, true); // captura antes que Funnelish

    _log("Submit guard activado");
  } catch (e) { _err("initSubmitGuard:", e); }
}

// ============================================================
// MÓDULO 7 — Captura de lead preliminar (carrito abandonado)
// Disparadores:
//   1. Inactividad de 3 minutos con datos válidos
//   2. Cambio/cierre de pestaña (visibilitychange)
//   3. Salida/recarga de página (beforeunload)
// ============================================================
let _inactivityTimer = null;
let _hasValidData = false; // true cuando nombre + teléfono son válidos

function _initPreliminaryCapture() {
  try {
    // Escuchar interacciones para resetear el timer de inactividad
    document.body.addEventListener("input", _onFormInteraction);
    document.body.addEventListener("change", _onFormInteraction);

    // Disparador 2: cambio o cierre de pestaña
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        _log("Pestaña oculta — evaluando condiciones de abandono");
        _tryFirePreliminary("visibilitychange");
      }
    });

    // Disparador 3: salida o recarga de página
    window.addEventListener("beforeunload", () => {
      _tryFirePreliminary("beforeunload");
    });

    _log("Listeners de captura preliminar activados");
  } catch (e) { _err("initPreliminaryCapture:", e); }
}

function _onFormInteraction() {
  // Cada vez que el usuario interactúa, verificar si los datos son válidos
  // y (re)iniciar el timer de inactividad
  _hasValidData = _checkConditions();

  if (_hasValidData) {
    // Reiniciar timer de inactividad
    clearTimeout(_inactivityTimer);
    _inactivityTimer = setTimeout(() => {
      _log("3 minutos de inactividad — disparando preliminar");
      _tryFirePreliminary("inactividad");
    }, BT_CONFIG.INACTIVITY_TIMEOUT);
    _log("Timer de inactividad reiniciado (3 min)");
  } else {
    // Si los datos no son válidos, cancelar cualquier timer pendiente
    clearTimeout(_inactivityTimer);
  }
}

// Verifica las condiciones sin enviar — devuelve true/false
function _checkConditions() {
  try {
    const session = _getSessionData();

    if (session && session.orderCompleted) {
      _log("_checkConditions: orden ya completada");
      return false;
    }
    if (session && session.leadSent) {
      const sentTime = new Date(session.leadSentAt);
      const windowMs = BT_CONFIG.PRELIMINARY_WINDOW * 60 * 1000;
      if ((new Date() - sentTime) < windowMs) {
        _log("_checkConditions: lead ya enviado recientemente");
        return false;
      }
    }

    // Nombre completo: mínimo dos palabras
    const fullNameInput = _getField("full_name");
    const fullName = (fullNameInput ? fullNameInput.value : "").trim();
    const nameParts = fullName.split(/\s+/).filter(Boolean);
    if (nameParts.length < 2) {
      _log("_checkConditions: nombre incompleto →", JSON.stringify(fullName));
      return false;
    }

    // Teléfono válido y completo
    const phoneInput = _getField("phone");
    const phone = phoneInput ? phoneInput.value : "";
    if (!/^\+573\d{9}$/.test(phone)) {
      _log("_checkConditions: teléfono inválido →", JSON.stringify(phone));
      return false;
    }

    _log("_checkConditions: OK — nombre:", nameParts[0], "| tel:", phone);
    return true;
  } catch (e) {
    _err("_checkConditions:", e);
    return false;
  }
}

// Intenta disparar el preliminar si las condiciones se cumplen
function _tryFirePreliminary(trigger) {
  try {
    if (!_checkConditions()) {
      _log(`Disparador [${trigger}] — condiciones no cumplidas, no se envía`);
      return;
    }

    const fullNameInput = _getField("full_name");
    const fullName = (fullNameInput ? fullNameInput.value : "").trim();
    const nameParts = fullName.split(/\s+/).filter(Boolean);
    const phoneInput = _getField("phone");
    const phone = phoneInput ? phoneInput.value : "";

    _log(`Disparador [${trigger}] — enviando lead preliminar`);
    _sendPreliminaryLead(fullName, nameParts, phone);

  } catch (e) { _err("tryFirePreliminary:", e); }
}

async function _sendPreliminaryLead(fullName, nameParts, phone) {
  try {
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    const cityInput = _getField("shipping_city");
    const stateInput = _getField("shipping_state");
    const addressInput = _getField("shipping_address");
    const customFields = document.getElementsByName("custom");

    // Capturar oferta y precio del DOM (informativo, no obligatorio)
    const productNames = [...document.querySelectorAll(".os-name")].map(el => el.textContent.trim()).filter(Boolean);
    const totalPriceEl = document.querySelector(".os-total .os-price");
    const totalPrice = totalPriceEl ? totalPriceEl.textContent.trim() : "";

    // Extraer precio numérico para el campo paquete.price
    const priceNumeric = parseFloat((totalPrice || "0").replace(/[^0-9.]/g, "")) || 0;

    // Payload adaptado al formato que espera la Edge Function
    const payload = {
      // Campos requeridos por la Edge Function
      nombre: fullName,
      telefono: phone.replace("+57", ""), // la función acepta 10 dígitos y agrega +57

      // Paquete/oferta — informativo
      paquete: {
        id: 0, // sin ID de producto aún, se puede enriquecer desde n8n
        label: productNames.length > 0 ? productNames.join(" + ") : "Sin producto detectado",
        price: priceNumeric
      },

      // Información adicional — para uso interno en n8n
      _meta: {
        storeName: BT_CONFIG.STORE_NAME,
        sessionId: _sessionId,
        urlOrigin: `${window.location.hostname}${window.location.pathname}`,
        dateTime: new Date().toISOString(),
        leadType: "preliminar",
        testMode: BT_CONFIG.TEST_MODE,
        firstName,
        lastName,
        dataAddress: {
          address: addressInput ? addressInput.value : "",
          address2: customFields[0] ? customFields[0].value : "",
          city: cityInput ? cityInput.value : "",
          state: stateInput ? stateInput.value : "",
          country: "Colombia"
        }
      }
    };

    _log("Payload preliminar:", JSON.stringify(payload));

    const response = await fetch(BT_CONFIG.HOST_PRELIMINAR_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Marcar como enviado
    _updateSessionData({
      leadSent: true,
      leadSentAt: new Date().toISOString()
    });

    _log("Lead preliminar enviado correctamente");

  } catch (e) {
    _err("sendPreliminaryLead:", e);
    // No marcar leadSent para que reintente
  }
}

// ============================================================
// MÓDULO 8 — Detección de orden completada
// ============================================================
function _initOrderCompletionDetector() {
  try {
    // Método 1: Observar cambios de URL (Funnelish redirige tras pago)
    let lastUrl = window.location.href;
    const urlObserver = new MutationObserver(() => {
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        if (_isThankYouPage()) {
          _updateSessionData({ orderCompleted: true });
          _log("Orden completada detectada por cambio de URL");
        }
      }
    });
    urlObserver.observe(document.documentElement, { childList: true, subtree: true });

    // Método 2: Verificar si ya estamos en página de confirmación al cargar
    if (_isThankYouPage()) {
      _updateSessionData({ orderCompleted: true });
      _log("Página de confirmación detectada al cargar");
    }

  } catch (e) { _err("initOrderCompletionDetector:", e); }
}

function _isThankYouPage() {
  const url = window.location.href.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  return url.includes("thank") || url.includes("gracias") ||
    url.includes("confirmacion") || url.includes("success") ||
    path.includes("thank") || path.includes("gracias");
}

// ============================================================
// MÓDULO 9 — Limpieza del campo Dirección (bug Funnelish)
// ============================================================
function _cleanDireccionField() {
  try {
    const dirField = document.querySelector('[data-name="Direccion"]');
    if (dirField) {
      dirField.value = dirField.value.replace(/\{.*?\}/g, "").trim();
      _log("Campo Dirección limpiado");
    }
  } catch (e) { _err("cleanDireccionField:", e); }
}

// ============================================================
// INICIALIZACIÓN — Orden estricta de ejecución
// ============================================================
function _init() {
  _log("=== BienestarTotal Custom Script v2.0.0 iniciando ===");

  // 1. Sesión
  _initSession();

  // 2. Ocultar campos
  _hideFields();

  // 3. Limpiar campo dirección
  _cleanDireccionField();

  // 4. Widget teléfono (con polling por si el DOM no está listo)
  _initPhoneWidget();

  // 5. Índice de ciudades + autocomplete
  _buildCityIndex();
  _buildCityAutocomplete();

  // 6. Campo barrio/referencia
  _initBarrioField();

  // 7. Bloqueo del submit
  _initSubmitGuard();

  // 8. Captura preliminar
  _initPreliminaryCapture();

  // 9. Detector de orden completada
  _initOrderCompletionDetector();

  _log("=== Inicialización completa ===");
}

// ============================================================
// ARRANQUE — Compatible con carga normal y SPA de Funnelish
// ============================================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", _init);
} else {
  _init();
}

// MutationObserver para re-renderizados asincrónicos de Funnelish
// Solo re-aplica los módulos que pueden necesitar re-inyectarse
const _globalObserver = new MutationObserver(() => {
  // Re-inyectar widget de teléfono si el input volvió a aparecer sin el widget
  const phoneInput = _getField("phone");
  if (phoneInput && !phoneInput.dataset.btPhone) {
    _log("Re-inyectando widget de teléfono por re-render");
    _buildPhoneWidget(phoneInput);
  }

  // Re-inyectar autocomplete de ciudad si el campo volvió a aparecer
  const cityInput = _getField("shipping_city");
  if (cityInput && !cityInput.dataset.btCity) {
    _log("Re-inyectando autocomplete de ciudad por re-render");
    _buildCityAutocomplete();
  }
});

_globalObserver.observe(document.documentElement, { childList: true, subtree: true });
