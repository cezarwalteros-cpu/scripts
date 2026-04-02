onst HOST_WEBHOOK = ""
const HOST_PREELIMINAR_WEBHOOK = ""
const STORE_NAME = "BienestarTotal"

var countryStateInfo = { "Colombia": { "Seleccione un Departamento": {}, "Amazonas": { "Leticia": [], "Puerto Nario": [] }, "Antioquia": { "Abejorral": [], "Abriaquí": [], "Alejandría": [], "Amagá": [], "Amalfi": [], "Andes": [], "Angelópolis": [], "Angostura": [], "Anorí": [], "Anzá": [], "Apartadó": [], "Arboletes": [], "Argelia": [], "Armenia": [], "Barbosa": [], "Bello": [], "Belmira": [], "Betania": [], "Betulia": [], "Briceño": [], "Buriticá": [], "Cáceres": [], "Caicedo": [], "Caldas": [], "Campamento": [], "Cañasgordas": [], "Caracolí": [], "Caramanta": [], "Carepa": [], "Carolina del Príncipe": [], "Caucasia": [], "Chigorodó": [], "Cisneros": [], "Ciudad Bolívar": [], "Cocorná": [], "Concepción": [], "Concordia": [], "Copacabana": [], "Dabeiba": [], "Donmatías": [], "Ebéjico": [], "El Bagre": [], "El Carmen de Viboral": [], "El Peñol": [], "El Retiro": [], "El Santuario": [], "Entrerríos": [], "Envigado": [], "Fredonia": [], "Frontino": [], "Giraldo": [], "Girardota": [], "Gómez Plata": [], "Granada": [], "Guadalupe": [], "Guarne": [], "Guatapé": [], "Heliconia": [], "Hispania": [], "Itagüí": [], "Ituango": [], "Jardín": [], "Jericó": [], "La Ceja": [], "La Estrella": [], "La Pintada": [], "La Unión": [], "Liborina": [], "Maceo": [], "Marinilla": [], "Medellín": [], "Montebello": [], "Murindó": [], "Mutatá": [], "Nariño": [], "Nechí": [], "Necoclí": [], "Olaya": [], "Peque": [], "Pueblorrico": [], "Puerto Berrío": [], "Puerto Nare": [], "Puerto Triunfo": [], "Remedios": [], "Rionegro": [], "Sabanalarga": [], "Sabaneta": [], "Salgar": [], "San Andrés de Cuerquia": [], "San Carlos": [], "San Francisco": [], "San Jerónimo": [], "San José de la Montaña": [], "San Juan de Urabá": [], "San Luis": [], "San Pedro de Urabá": [], "San Pedro de los Milagros": [], "San Rafael": [], "San Roque": [], "San Vicente": [], "Santa Bárbara": [], "Santa Fe de Antioquia": [], "Santa Rosa de Osos": [], "Santo Domingo": [], "Segovia": [], "Sonsón": [], "Sopetrán": [], "Támesis": [], "Tarazá": [], "Tarso": [], "Titiribí": [], "Toledo": [], "Turbo": [], "Uramita": [], "Urrao": [], "Valdivia": [], "Valparaíso": [], "Vegachí": [], "Venecia": [], "Vigía del Fuerte": [], "Yalí": [], "Yarumal": [], "Yolombó": [], "Yondó": [], "Zaragoza": [] }, "Arauca": { "Arauca": [], "Arauquita": [], "Cravo Norte": [], "Fortul": [], "Puerto Rondón": [], "Saravena": [], "Tame": [] }, "Atlántico": { "Baranoa": [], "Barranquilla": [], "Campo de la Cruz": [], "Candelaria": [], "Galapa": [], "Juan de Acosta": [], "Luruaco": [], "Malambo": [], "Manatí": [], "Palmar de Varela": [], "Piojó": [], "Polonuevo": [], "Ponedera": [], "Puerto Colombia": [], "Repelón": [], "Sabanagrande": [], "Sabanalarga": [], "Santa Lucía": [], "Santo Tomás": [], "Soledad": [], "Suán": [], "Tubará": [], "Usiacurí": [] }, "Bolívar": { "Achí": [], "Altos del Rosario": [], "Arenal": [], "Arjona": [], "Arroyohondo": [], "Barranco de Loba": [], "Brazuelo de Papayal": [], "Calamar": [], "Cantagallo": [], "Cartagena": [], "Cicuco": [], "Clemencia": [], "Córdoba": [], "El Carmen de Bolívar": [], "El Guamo": [], "El Peñón": [], "Hatillo de Loba": [], "Magangué": [], "Mahates": [], "Margarita": [], "María la Baja": [], "Mompós": [], "Montecristo": [], "Morales": [], "Norosí": [], "Pinillos": [], "Regidor": [], "Río Viejo": [], "San Cristóbal": [], "San Estanislao": [], "San Fernando": [], "San Jacinto del Cauca": [], "San Jacinto": [], "San Juan Nepomuceno": [], "San Martín de Loba": [], "San Pablo": [], "Santa Catalina": [], "Santa Rosa": [], "Santa Rosa del Sur": [], "Simití": [], "Soplaviento": [], "Talaigua Nuevo": [], "Tiquisio": [], "Turbaco": [], "Turbaná": [], "Villanueva": [], "Zambrano": [] }, "Boyacá": { "Almeida": [], "Aquitania": [], "Arcabuco": [], "Belén": [], "Berbeo": [], "Betéitiva": [], "Boavita": [], "Boyacá": [], "Briceño": [], "Buenavista": [], "Busbanzá": [], "Caldas": [], "Campohermoso": [], "Cerinza": [], "Chinavita": [], "Chiquinquirá": [], "Chíquiza": [], "Chiscas": [], "Chita": [], "Chitaraque": [], "Chivatá": [], "Chivor": [], "Ciénega": [], "Cómbita": [], "Coper": [], "Corrales": [], "Covarachía": [], "Cubará": [], "Cucaita": [], "Cuítiva": [], "Duitama": [], "El Cocuy": [], "El Espino": [], "Firavitoba": [], "Floresta": [], "Gachantivá": [], "Gámeza": [], "Garagoa": [], "Guacamayas": [], "Guateque": [], "Guayatá": [], "Güicán": [], "Iza": [], "Jenesano": [], "Jericó": [], "La Capilla": [], "La Uvita": [], "La Victoria": [], "Labranzagrande": [], "Macanal": [], "Maripí": [], "Miraflores": [], "Mongua": [], "Monguí": [], "Moniquirá": [], "Motavita": [], "Muzo": [], "Nobsa": [], "Nuevo Colón": [], "Oicatá": [], "Otanche": [], "Pachavita": [], "Páez": [], "Paipa": [], "Pajarito": [], "Panqueba": [], "Pauna": [], "Paya": [], "Paz del Río": [], "Pesca": [], "Pisba": [], "Puerto Boyacá": [], "Quípama": [], "Ramiriquí": [], "Ráquira": [], "Rondón": [], "Saboyá": [], "Sáchica": [], "Samacá": [], "San Eduardo": [], "San José de Pare": [], "San Luis de Gaceno": [], "San Mateo": [], "San Miguel de Sema": [], "San Pablo de Borbur": [], "Santa María": [], "Santa Rosa de Viterbo": [], "Santa Sofía": [], "Santana": [], "Sativanorte": [], "Sativasur": [], "Siachoque": [], "Soatá": [], "Socha": [], "Socotá": [], "Sogamoso": [], "Somondoco": [], "Sora": [], "Soracá": [], "Sotaquirá": [], "Susacón": [], "Sutamarchán": [], "Sutatenza": [], "Tasco": [], "Tenza": [], "Tibaná": [], "Tibasosa": [], "Tinjacá": [], "Tipacoque": [], "Toca": [], "Togüí": [], "Tópaga": [], "Tota": [], "Tunja": [], "Tununguá": [], "Turmequé": [], "Tuta": [], "Tutazá": [], "Úmbita": [], "Ventaquemada": [], "Villa de Leyva": [], "Viracachá": [], "Zetaquira": [] }, "Caldas": { "Aguadas": [], "Anserma": [], "Aranzazu": [], "Belalcázar": [], "Chinchiná": [], "Filadelfia": [], "La Dorada": [], "La Merced": [], "Manizales": [], "Manzanares": [], "Marmato": [], "Marquetalia": [], "Marulanda": [], "Neira": [], "Norcasia": [], "Pácora": [], "Palestina": [], "Pensilvania": [], "Riosucio": [], "Risaralda": [], "Salamina": [], "Samaná": [], "San José": [], "Supía": [], "Victoria": [], "Villamaría": [], "Viterbo": [] }, "Caquetá": { "Albania": [], "Belén de los Andaquíes": [], "Cartagena del Chairá": [], "Curillo": [], "El Doncello": [], "El Paujil": [], "Florencia": [], "La Montañita": [], "Milán": [], "Morelia": [], "Puerto Rico": [], "San José del Fragua": [], "San Vicente del Caguán": [], "Solano": [], "Solita": [], "Valparaíso": [] }, "Casanare": { "Aguazul": [], "Chámeza": [], "Hato Corozal": [], "La Salina": [], "Maní": [], "Monterrey": [], "Nunchía": [], "Orocué": [], "Paz de Ariporo": [], "Pore": [], "Recetor": [], "Sabanalarga": [], "Sácama": [], "San Luis de Palenque": [], "Támara": [], "Tauramena": [], "Trinidad": [], "Villanueva": [], "Yopal": [] }, "Cauca": { "Almaguer": [], "Argelia": [], "Balboa": [], "Bolívar": [], "Buenos Aires": [], "Cajibío": [], "Caldono": [], "Caloto": [], "Corinto": [], "El Tambo": [], "Florencia": [], "Guachené": [], "Guapí": [], "Inzá": [], "Jambaló": [], "La Sierra": [], "La Vega": [], "López de Micay": [], "Mercaderes": [], "Miranda": [], "Morales": [], "Padilla": [], "Páez": [], "Patía": [], "Piamonte": [], "Piendamó": [], "Popayán": [], "Puerto Tejada": [], "Puracé": [], "Rosas": [], "San Sebastián": [], "Santa Rosa": [], "Santander de Quilichao": [], "Silvia": [], "Sotará": [], "Suárez": [], "Sucre": [], "Timbío": [], "Timbiquí": [], "Toribío": [], "Totoró": [], "Villa Rica": [] }, "Cesar": { "Aguachica": [], "Agustín Codazzi": [], "Astrea": [], "Becerril": [], "Bosconia": [], "Chimichagua": [], "Chiriguaná": [], "Curumaní": [], "El Copey": [], "El Paso": [], "Gamarra": [], "González": [], "La Gloria (Cesar)": [], "La Jagua de Ibirico": [], "La Paz": [], "Manaure Balcón del Cesar": [], "Pailitas": [], "Pelaya": [], "Pueblo Bello": [], "Río de Oro": [], "San Alberto": [], "San Diego": [], "San Martín": [], "Tamalameque": [], "Valledupar": [] }, "Chocó": { "Acandí": [], "Alto Baudó": [], "Bagadó": [], "Bahía Solano": [], "Bajo Baudó": [], "Bojayá": [], "Cantón de San Pablo": [], "Cértegui": [], "Condoto": [], "El Atrato": [], "El Carmen de Atrato": [], "El Carmen del Darién": [], "Istmina": [], "Juradó": [], "Litoral de San Juan": [], "Lloró": [], "Medio Atrato": [], "Medio Baudó": [], "Medio San Juan": [], "Nóvita": [], "Nuquí": [], "Quibdó": [], "Río Iró": [], "Río Quito": [], "Riosucio": [], "San José del Palmar": [], "Sipí": [], "Tadó": [], "Unión Panamericana": [], "Unguía": [] }, "Cundinamarca": { "Agua de Dios": [], "Albán": [], "Anapoima": [], "Anolaima": [], "Apulo": [], "Arbeláez": [], "Beltrán": [], "Bituima": [], "Bogotá": [], "Bojacá": [], "Cabrera": [], "Cachipay": [], "Cajicá": [], "Caparrapí": [], "Cáqueza": [], "Carmen de Carupa": [], "Chaguaní": [], "Chía": [], "Chipaque": [], "Choachí": [], "Chocontá": [], "Cogua": [], "Cota": [], "Cucunubá": [], "El Colegio": [], "El Peñón": [], "El Rosal": [], "Facatativá": [], "Fómeque": [], "Fosca": [], "Funza": [], "Fúquene": [], "Fusagasugá": [], "Gachalá": [], "Gachancipá": [], "Gachetá": [], "Gama": [], "Girardot": [], "Granada": [], "Guachetá": [], "Guaduas": [], "Guasca": [], "Guataquí": [], "Guatavita": [], "Guayabal de Síquima": [], "Guayabetal": [], "Gutiérrez": [], "Jerusalén": [], "Junín": [], "La Calera": [], "La Mesa": [], "La Palma": [], "La Peña": [], "La Vega": [], "Lenguazaque": [], "Machetá": [], "Madrid": [], "Manta": [], "Medina": [], "Mosquera": [], "Nariño": [], "Nemocón": [], "Nilo": [], "Nimaima": [], "Nocaima": [], "Pacho": [], "Paime": [], "Pandi": [], "Paratebueno": [], "Pasca": [], "Puerto Salgar": [], "Pulí": [], "Quebradanegra": [], "Quetame": [], "Quipile": [], "Ricaurte": [], "San Antonio del Tequendama": [], "San Bernardo": [], "San Cayetano": [], "San Francisco": [], "San Juan de Rioseco": [], "Sasaima": [], "Sesquilé": [], "Sibaté": [], "Silvania": [], "Simijaca": [], "Soacha": [], "Sopó": [], "Subachoque": [], "Suesca": [], "Supatá": [], "Susa": [], "Sutatausa": [], "Tabio": [], "Tausa": [], "Tena": [], "Tenjo": [], "Tibacuy": [], "Tibirita": [], "Tocaima": [], "Tocancipá": [], "Topaipí": [], "Ubalá": [], "Ubaque": [], "Ubaté": [], "Une": [], "Útica": [], "Venecia": [], "Vergara": [], "Vianí": [], "Villagómez": [], "Villapinzón": [], "Villeta": [], "Viotá": [], "Yacopí": [], "Zipacón": [], "Zipaquirá": [] }, "Córdoba": { "Ayapel": [], "Buenavista": [], "Canalete": [], "Cereté": [], "Chimá": [], "Chinú": [], "Ciénaga de Oro": [], "Cotorra": [], "La Apartada": [], "Lorica": [], "Los Córdobas": [], "Momil": [], "Montelíbano": [], "Montería": [], "Moñitos": [], "Planeta Rica": [], "Pueblo Nuevo": [], "Puerto Escondido": [], "Puerto Libertador": [], "Purísima": [], "Sahagún": [], "San Andrés de Sotavento": [], "San Antero": [], "San Bernardo del Viento": [], "San Carlos": [], "San José de Uré": [], "San Pelayo": [], "Tierralta": [], "Tuchín": [], "Valencia": [] }, "Guainía": { "Inírida": [] }, "Guaviare": { "Calamar": [], "El Retorno": [], "Miraflores": [], "San José del Guaviare": [] }, "Huila": { "Acevedo": [], "Agrado": [], "Aipe": [], "Algeciras": [], "Altamira": [], "Baraya": [], "Campoalegre": [], "Colombia": [], "El Pital": [], "Elías": [], "Garzón": [], "Gigante": [], "Guadalupe": [], "Hobo": [], "Íquira": [], "Isnos": [], "La Argentina": [], "La Plata": [], "Nátaga": [], "Neiva": [], "Oporapa": [], "Paicol": [], "Palermo": [], "Palestina": [], "Pitalito": [], "Rivera": [], "Saladoblanco": [], "San Agustín": [], "Santa María": [], "Suaza": [], "Tarqui": [], "Tello": [], "Teruel": [], "Tesalia": [], "Timaná": [], "Villavieja": [], "Yaguará": [] }, "La Guajira": { "Albania": [], "Barrancas": [], "Dibulla": [], "Distracción": [], "El Molino": [], "Fonseca": [], "Hatonuevo": [], "La Jagua del Pilar": [], "Maicao": [], "Manaure": [], "Riohacha": [], "San Juan del Cesar": [], "Uribia": [], "Urumita": [], "Villanueva": [] }, "Magdalena": { "Algarrobo": [], "Aracataca": [], "Ariguaní": [], "Cerro de San Antonio": [], "Chibolo": [], "Ciénaga": [], "Concordia": [], "El Banco": [], "El Piñón": [], "El Retén": [], "Fundación": [], "Guamal": [], "Nueva Granada": [], "Pedraza": [], "Pijiño del Carmen": [], "Pivijay": [], "Plato": [], "Pueblo Viejo": [], "Remolino": [], "Sabanas de San Ángel": [], "Salamina": [], "San Sebastián de Buenavista": [], "San Zenón": [], "Santa Ana": [], "Santa Bárbara de Pinto": [], "Santa Marta": [], "Sitionuevo": [], "Tenerife": [], "Zapayán": [], "Zona Bananera": [] }, "Meta": { "Acacías": [], "Barranca de Upía": [], "Cabuyaro": [], "Castilla la Nueva": [], "Cubarral": [], "Cumaral": [], "El Calvario": [], "El Castillo": [], "El Dorado": [], "Fuente de Oro": [], "Granada": [], "Guamal": [], "La Macarena": [], "La Uribe": [], "Lejanías": [], "Mapiripán": [], "Mesetas": [], "Puerto Concordia": [], "Puerto Gaitán": [], "Puerto Lleras": [], "Puerto López": [], "Puerto Rico": [], "Restrepo": [], "San Carlos de Guaroa": [], "San Juan de Arama": [], "San Juanito": [], "San Martín": [], "Villavicencio": [], "Vista Hermosa": [] }, "Nariño": { "Aldana": [], "Ancuyá": [], "Arboleda": [], "Barbacoas": [], "Belén": [], "Buesaco": [], "Chachagüí": [], "Colón": [], "Consacá": [], "Contadero": [], "Córdoba": [], "Cuaspud": [], "Cumbal": [], "Cumbitara": [], "El Charco": [], "El Peñol": [], "El Rosario": [], "El Tablón": [], "El Tambo": [], "Francisco Pizarro": [], "Funes": [], "Guachucal": [], "Guaitarilla": [], "Gualmatán": [], "Iles": [], "Imués": [], "Ipiales": [], "La Cruz": [], "La Florida": [], "La Llanada": [], "La Tola": [], "La Unión": [], "Leiva": [], "Linares": [], "Los Andes": [], "Magüí Payán": [], "Mallama": [], "Mosquera": [], "Nariño": [], "Olaya Herrera": [], "Ospina": [], "Pasto": [], "Policarpa": [], "Potosí": [], "Providencia": [], "Puerres": [], "Pupiales": [], "Ricaurte": [], "Roberto Payán": [], "Samaniego": [], "San Bernardo": [], "San José de Albán": [], "San Lorenzo": [], "San Pablo": [], "San Pedro de Cartago": [], "Sandoná": [], "Santa Bárbara": [], "Santacruz": [], "Sapuyes": [], "Taminango": [], "Tangua": [], "Tumaco": [], "Túquerres": [], "Yacuanquer": [] }, "Norte de Santander": { "Ábrego": [], "Arboledas": [], "Bochalema": [], "Bucarasica": [], "Cáchira": [], "Cácota": [], "Chinácota": [], "Chitagá": [], "Convención": [], "Cúcuta": [], "Cucutilla": [], "Duranía": [], "El Carmen": [], "El Tarra": [], "El Zulia": [], "Gramalote": [], "Hacarí": [], "Herrán": [], "La Esperanza": [], "La Playa de Belén": [], "Labateca": [], "Los Patios": [], "Lourdes": [], "Mutiscua": [], "Ocaña": [], "Pamplona": [], "Pamplonita": [], "Puerto Santander": [], "Ragonvalia": [], "Salazar de Las Palmas": [], "San Calixto": [], "San Cayetano": [], "Santiago": [], "Santo Domingo de Silos": [], "Sardinata": [], "Teorama": [], "Tibú": [], "Toledo": [], "Villa Caro": [], "Villa del Rosario": [] }, "Putumayo": { "Colón": [], "Mocoa": [], "Orito": [], "Puerto Asís": [], "Puerto Caicedo": [], "Puerto Guzmán": [], "Puerto Leguízamo": [], "San Francisco": [], "San Miguel": [], "Santiago": [], "Sibundoy": [], "Valle del Guamuez": [], "Villagarzón": [] }, "Quindío": { "Armenia": [], "Buenavista": [], "Calarcá": [], "Circasia": [], "Córdoba": [], "Filandia": [], "Génova": [], "La Tebaida": [], "Montenegro": [], "Pijao": [], "Quimbaya": [], "Salento": [] }, "Risaralda": { "Apía": [], "Balboa": [], "Belén de Umbría": [], "Dosquebradas": [], "Guática": [], "La Celia": [], "La Virginia": [], "Marsella": [], "Mistrató": [], "Pereira": [], "Pueblo Rico": [], "Quinchía": [], "Santa Rosa de Cabal": [], "Santuario": [] }, "San Andrés y Providencia": { "Providencia y Santa Catalina Islas": [], "San Andrés": [] }, "Santander": { "Aguada": [], "Albania": [], "Aratoca": [], "Barbosa": [], "Barichara": [], "Barrancabermeja": [], "Betulia": [], "Bolívar": [], "Bucaramanga": [], "Cabrera": [], "California": [], "Capitanejo": [], "Carcasí": [], "Cepitá": [], "Cerrito": [], "Charalá": [], "Charta": [], "Chima": [], "Chipatá": [], "Cimitarra": [], "Concepción": [], "Confines": [], "Contratación": [], "Coromoro": [], "Curití": [], "El Carmen de Chucurí": [], "El Guacamayo": [], "El Peñón": [], "El Playón": [], "El Socorro": [], "Encino": [], "Enciso": [], "Florián": [], "Floridablanca": [], "Galán": [], "Gámbita": [], "Girón": [], "Guaca": [], "Guadalupe": [], "Guapotá": [], "Guavatá": [], "Güepsa": [], "Hato": [], "Jesús María": [], "Jordán": [], "La Belleza": [], "La Paz": [], "Landázuri": [], "Lebrija": [], "Los Santos": [], "Macaravita": [], "Málaga": [], "Matanza": [], "Mogotes": [], "Molagavita": [], "Ocamonte": [], "Oiba": [], "Onzaga": [], "Palmar": [], "Palmas del Socorro": [], "Páramo": [], "Piedecuesta": [], "Pinchote": [], "Puente Nacional": [], "Puerto Parra": [], "Puerto Wilches": [], "Rionegro": [], "Sabana de Torres": [], "San Andrés": [], "San Benito": [], "San Gil": [], "San Joaquín": [], "San José de Miranda": [], "San Miguel": [], "San Vicente de Chucurí": [], "Santa Bárbara": [], "Santa Helena del Opón": [], "Simacota": [], "Suaita": [], "Sucre": [], "Suratá": [], "Tona": [], "Valle de San José": [], "Vélez": [], "Vetas": [], "Villanueva": [], "Zapatoca": [] }, "Sucre": { "Buenavista": [], "Caimito": [], "Chalán": [], "Colosó": [], "Corozal": [], "Coveñas": [], "El Roble": [], "Galeras": [], "Guaranda": [], "La Unión": [], "Los Palmitos": [], "Majagual": [], "Morroa": [], "Ovejas": [], "Sampués": [], "San Antonio de Palmito": [], "San Benito Abad": [], "San Juan de Betulia": [], "San Marcos": [], "San Onofre": [], "San Pedro": [], "Sincé": [], "Sincelejo": [], "Sucre": [], "Tolú": [], "Tolú Viejo": [] }, "Tolima": { "Alpujarra": [], "Alvarado": [], "Ambalema": [], "Anzoátegui": [], "Armero": [], "Ataco": [], "Cajamarca": [], "Carmen de Apicalá": [], "Casabianca": [], "Chaparral": [], "Coello": [], "Coyaima": [], "Cunday": [], "Dolores": [], "El Espinal": [], "Falán": [], "Flandes": [], "Fresno": [], "Guamo": [], "Herveo": [], "Honda": [], "Ibagué": [], "Icononzo": [], "Lérida": [], "Líbano": [], "Mariquita": [], "Melgar": [], "Murillo": [], "Natagaima": [], "Ortega": [], "Palocabildo": [], "Piedras": [], "Planadas": [], "Prado": [], "Purificación": [], "Rioblanco": [], "Roncesvalles": [], "Rovira": [], "Saldaña": [], "San Antonio": [], "San Luis": [], "Santa Isabel": [], "Suárez": [], "Valle de San Juan": [], "Venadillo": [], "Villahermosa": [], "Villarrica": [] }, "Valle del Cauca": { "Alcalá": [], "Andalucía": [], "Ansermanuevo": [], "Argelia": [], "Bolívar": [], "Buenaventura": [], "Buga": [], "Bugalagrande": [], "Caicedonia": [], "Cali": [], "Calima": [], "Candelaria": [], "Cartago": [], "Dagua": [], "El Águila": [], "El Cairo": [], "El Cerrito": [], "El Dovio": [], "Florida": [], "Ginebra": [], "Guacarí": [], "Jamundí": [], "La Cumbre": [], "La Unión": [], "La Victoria": [], "Obando": [], "Palmira": [], "Pradera": [], "Restrepo": [], "Riofrío": [], "Roldanillo": [], "San Pedro": [], "Sevilla": [], "Toro": [], "Trujillo": [], "Tuluá": [], "Ulloa": [], "Versalles": [], "Vijes": [], "Yotoco": [], "Yumbo": [], "Zarzal": [] }, "Vaupés": { "Carurú": [], "Mitú": [], "Taraira": [] }, "Vichada": { "Cumaribo": [], "La Primavera": [], "Puerto Carreño": [], "Santa Rosalía": [] } } }


window.addEventListener('load', personalizarSelects);

function personalizarSelects() {

    //miramos si existe el contryStateInfo 
    if (typeof countryStateInfo === 'undefined') {
        console.error('countryStateInfo no está definido, debes usar el script listStatesCitySelect[Pais].js ')
        //deberíamos de mandar un error al servidor para que lo registre
        return
    }
    // seleccionamos el primer país del objeto
    const firstCountry = Object.keys(countryStateInfo)[0];
    //seleccionamos el primer estado del objeto


    const listCountry = countryStateInfo[firstCountry];


    // Obtenemos los elementos HTML por su nombre
    const countrySel = document.getElementsByName("shipping_country")[0];
    const stateSel = document.getElementsByName("shipping_state")[0];
    const citySel = document.getElementsByName("shipping_city")[0];


    //establecer el valor de countrySel ( en campo select ) como el primer país
    establecerCountry(firstCountry, countrySel);

    // Limpiamos las opciones existentes en los selects de estado y ciudad
    stateSel.innerHTML = '';
    citySel.innerHTML = '';

    // Carga inicial de los estados para el país por defecto
    Object.keys(listCountry).forEach(state => {
        const option = new Option(state, state);
        stateSel.options.add(option);
    });

    // Función para manejar el cambio de estado y cargar las ciudades correspondientes
    stateSel.onchange = function () {
        // Limpia las opciones de ciudades anteriores
        citySel.innerHTML = '';
        // Obtiene y carga las ciudades para el estado seleccionado
        const cities = listCountry[this.value];
        // creamos un option vació para que no se muestre nada por defecto
        const optionDefault = new Option('Selecciona una opción', '');
        citySel.options.add(optionDefault);

        Object.keys(cities).forEach(city => {
            const option = new Option(city, city);
            citySel.options.add(option);
        });
    };

    // Función para manejar el cambio de ciudad
    citySel.onchange = function () {
        // console.log('Ciudad cambiada:', this.value);
    };
}

function establecerCountry(country, countrySel) {
    if (!countrySel) {
        console.error('No se ha especificado el elemento de país');
        return;
    }
    // Esconder el campo del país y establecer su valor
    countrySel.parentElement.parentElement.style.display = `none`

    // Configuración común para INPUT
    if (countrySel.tagName === "INPUT") {
        countrySel.value = country;
    }
    // Configuración específica para SELECT
    else if (countrySel.tagName === "SELECT") {
        var newOption = new Option(`${country}`, country); // Simplifica la creación de opciones
        countrySel.add(newOption, 1); // Agrega la nueva opción
        countrySel.selectedIndex = 1; // Selecciona la opción agregada
    }
}

window.addEventListener('load', ocularEmail);

//Función que oculta el campo de correo y le pone un valor aleatorio
function ocularEmail() {
    const inputEmail = document.getElementsByName("email")[0]
    //le ponemos un valor por defecto al campo de correo
    if (inputEmail) {
        inputEmail.value = createMailAleatory()
        //ocultamos el campo de correo y su label
        inputEmail.style.display = `none`
        inputEmail.previousElementSibling.style.display = `none`
        //ocultamos el contenedor padre del campo de correo
        inputEmail.parentElement.style.display = `none`
    }
}

function createMailAleatory() {
    let mail = ``
    let caracteres = `abcdefghijklmnopqrstuvwxyz0123456789`
    for (let i = 0; i < 10; i++) {
        mail += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    }
    return mail + `@gmail.com`
}

//creamos un div para mostrar el mensaje de error del teléfono si no es válido y lo añadimos al lado del input
//otra manera en la que podemos hacer todo  esto seria creando un input falso de teléfono , para poner el verdadero input de teléfono oculto y vació , para que hasta que nuestro input de teléfono sea valido , todo esto para funnelish haga la validación de que falta uno campo, lo malo es que puede ser complicado hacer todo esto en funnelish xd

window.addEventListener('load', verifyPhone);

function verifyPhone() {

    //creamos un div para mostrar el mensaje de error del teléfono
    const div = document.createElement('div');

    const mensajeAdvertencia = `Exactamente 10 números. Ej: 3054859895`

    div.innerHTML = `<p><p/><input id="inputPhoneInvalid" class="invalid" placeholder="${mensajeAdvertencia}" style="border: 2px solid #f89708 !important; display: none; font-size: 14px; text-align: left; font-weight: normal; font-style: normal;" readonly="true">`

    //añadimos el div al lado del input
    const inputTelefono = document.getElementsByName("phone")[0]
    inputTelefono.parentNode.insertBefore(div, inputTelefono.nextSibling);


    //función para verificar el teléfono
    checkPhoneValidity()
    inputTelefono.addEventListener('input', checkPhoneValidity);

    function checkPhoneValidity() {
        const valid = phoneIsValid(inputTelefono);
        if (!valid) {
            document.getElementById('inputPhoneInvalid').style.display = 'none';
        } else {
            document.getElementById('inputPhoneInvalid').style.display = 'none';
        }
    }
}

function phoneIsValid(input) {
    // 1. Forzamos que la cadena empiece con +57
    let raw = input.value.toString();

    // 2. Extraemos solo los dígitos que haya ingresado el usuario
    let digits = raw.replace(/[^0-9]/g, '');

    // 3. Si el usuario incluyó el 57 (o +57), lo descartamos: siempre añadiremos nosotros +57
    if (digits.startsWith('57')) {
        digits = digits.substring(2);
    }

    // 4. Si el número no arranca con '3', lo consideramos inválido (vacío)
    if (!digits.startsWith('3')) {
        digits = '';
    }

    // 5. Limitamos a 10 dígitos
    if (digits.length > 10) {
        digits = digits.slice(0, 10);
    }

    // 6. Reconstruimos el valor del campo: +57 seguido de los 10 dígitos (o menos si aún no completa)
    input.value = '+57' + digits;

    // 7. Validamos: debemos tener exactamente 10 dígitos tras el +57
    return digits.length === 10;
}

//Para No permitir enviar el formulario sin un Telefono valido
document.addEventListener('DOMContentLoaded', function () {
    //var submitButton = document.getElementById('submitButton');
    submitButton = document.querySelector('a[href="#submit-step"]')
    // Agregar el evento en la fase de captura
    submitButton.addEventListener('click', function (event) {
        var inputTelefono = document.getElementsByName('phone')[0];
        var telefono = inputTelefono.value;
        var patronTelefonoColombia = /^\+57[3]\d{9}$/;

        if (!patronTelefonoColombia.test(telefono)) {
            console.log("No se permite enviar el formulario pues el telefono " + telefono + " es invalido")
            //alert('Por favor ingrese un número de teléfono válido en Colombia (10 dígitos y comienza con 3).');
            inputTelefono.className = 'invalid';
            event.stopImmediatePropagation(); // Detiene la propagación del evento
        }
    }, true); // True indica que el evento se maneja en la fase de captura
});



//crear un add event listener para cuando cargue la pagina
window.addEventListener('load', mainIntegramelo);

function mainIntegramelo() {
    //crear objeto base
    const dataForm = recoverData()
    // console.log(`Mandamos el lead al cargar la pagina`)
    // pushLead()

    // Añadir el event listener al elemento contenedor
    const body = document.body; // Cambia esto por el elemento contenedor específico si lo prefieres
    console.log(`activamos los addEvents`);
    body.addEventListener('input', (e) => {
        console.log(`[addEvents] input`)
        handleInputEvent(e)
    });
    body.addEventListener('change', (e) => {
        console.log(`[addEvents] change`)
        handleInputEvent(e)
    });

    // document.querySelectorAll('a[href="#submit-step"]').forEach(function (element) {
    //   element.addEventListener('click', function (event) {
    //     event.preventDefault(); // Prevenir el comportamiento por defecto del enlace

    //     // Coloca aquí la función que quieres ejecutar
    //     console.log('El botón de pago fue presionado.');

    //     // Envía el lead al presionar el botón de pago
    //     pushSendLead();
    //   }, true); // Usar true para capturar el evento antes que en la fase de burbuja
    // });
}

let timerId;
let count = 0;
const time = 4000;//7000

function enviarConDebouncing() {
    console.log(`[enviarConDebouncing] count: ${count}`)
    // Cancela el temporizador anterior si existe
    clearTimeout(timerId);
    // Establece un nuevo temporizador
    timerId = setTimeout(async () => {
        count++
        // Envía el lead
        console.log(`enviamos el lead con debouncing, count: ${count}`)
        pushLead();
    }, time);
}

//recolectamos la data del lead y miramos si vale la pena enviarlo al servidor
async function pushLead() {
    try {
        const dataForm = recoverData()
        //miramos si vale la pena mandar el lead, puede que no estén los datos suficientes o que el no hallan cambio con respecto la vez pasada que mandamos
        if (dataForm.client.phone === '' ||
            dataForm.client.phone == '+57') {
            //dataForm.client.email === '' ||
            console.log(`no se puede enviar el lead, algunos campos son inválidos`)
            return false
        }

        await sendLead(dataForm)
        // enviamos bien el formulario
    } catch (error) {
        console.log(error)
        // algo paso
    }
}

//enviamos el lead al server
async function sendLead(Lead, preliminar = true) {
    try {
        let HOST = preliminar ? HOST_PREELIMINAR_WEBHOOK : HOST_WEBHOOK


        const UrlHost = HOST
        //hacemos fetch a la url y mandamos un post con la data del lead

        const response = await fetch(UrlHost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Lead)
        });
        const data = await response.json();
        //si no nos da un 200 o 201 es error
        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Error sending lead: ${response.status} - ${response.statusText}`);
        }
        return true
        //limpiamos el formulario
    } catch (error) {
        console.log(`error al enviar el lead`, error)
        return false
    }
}


// Función que deseas ejecutar cuando se dispare el evento input
function handleInputEvent(event) {
    // Asegúrate de que el evento proviene de un elemento input
    // if (event.target.tagName.toLowerCase() === 'input' ||
    //   event.target.tagName.toLowerCase() === 'select') {
    //   // Aquí puedes añadir lo que desees hacer con el valor del input, etc.
    // }
    enviarConDebouncing()
}

//para mandar el lead cuando se presione el botón de pago
async function pushSendLead() {
    //miramos si es valido enviar el lead, si los campos están  llenos
    if (!this.funnelish.validateFields()) {
        console.log(`no se puede enviar el lead, algunos campos son inválidos`)
        return false
    }
    //si es valido enviamos el lead
    const dataForm = recoverData()
    console.log(`enviamos el lead con el botón de pago`)
    console.log(`dataForm`, JSON.stringify(dataForm))

    sendLead(dataForm, false)
    //dejamos una pausa de 500 ms para que se envié el lead
    await delay(500)
    console.log(`enviamos el lead con el botón de pago`)
}

//crear un función de delay con promesas
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function recoverData() {
    // Simplificación de la obtención de datos utilizando una función genérica
    const getValueQuery = (name) => document.querySelector(`[name="${name}"]`)?.value || '';

    // Simplificación de la estructura de datos utilizando funciones de utilidad
    const data = {
        storeName: STORE_NAME || 'Teste',
        idIntegramelo: idMake,
        urlOrigin: `${location.hostname}${location.pathname}`,
        dateTime: new Date().toISOString(),
        leadType: '',
        ipOrigin: '',
        notes: getValueQuery('notes'),
        client: {
            name: '',
            lastName: '',
            fullName: getValueQuery('full_name'),
            email: getValueQuery('email'), // Asegúrate de que el selector sea correcto (email, no mail)
            phone: getValueQuery('phone'),
            // birthDate: '',
            // gender: ''
        },
        dataAddress: {
            address: getValueQuery('shipping_address'),
            city: getValueQuery('shipping_city'),
            state: getValueQuery('shipping_state'),
            country: getValueQuery('shipping_country'),
            zipCode: getValueQuery('zip_code'),
            notes: getValueQuery('notes'),
            coordinates: { latitude: null, longitude: null }
        },

    };
    data.products = getDataProducts()
    data.totalPrice = getDataPrice(data.products)

    // Extracción del nombre y apellido del nombre completo
    // const fullName = getValueQuery('full_name').split(' ');
    // if (fullName.length >= 2) {
    //   data.client.lastName = fullName.pop();
    //   data.client.name = fullName.join(' ');
    // } else {
    //   data.client.name = fullName.pop()
    //   data.client.lastName = ''
    // }

    return data;
}

function getDataProducts() {
    // Extrae los nombres de los productos y el precio total del HTML
    const productNames = [...document.querySelectorAll('.os-name')].map(element => element.textContent.trim());

    // console.log(productNames); // Muestra los nombres de los productos
    // console.log(totalPriceFromHTML); // Muestra el total extraído del HTML
    const mergedProductInfo = PRODUCTS.filter(product => productNames.includes(product.name)).map(product => {
        return {
            name: product.name,
            price: product.price,
            // id: product.id,
            // sku: product.sku,
            // Cualquier otra propiedad que desees incluir
        };
    });

    return mergedProductInfo;

}

function getDataPrice(mergedProductInfo) {
    const totalPriceFromHTML = document.querySelector('.os-total .os-price').textContent.trim();

    const calculatedTotal = mergedProductInfo.reduce((acc, product) => acc + product.price, 0);

    console.log(`Total Calculado: Col$ ${calculatedTotal}`); // Muestra el total calculado

    // Verificación de consistencia
    if (totalPriceFromHTML.includes(calculatedTotal.toString())) {
        console.log('El total calculado coincide con el total del HTML');
        return calculatedTotal;
    } else {
        console.log('Hay una discrepancia entre el total calculado y el total del HTML');
        return totalPriceFromHTML;
    }


}

let idMake
getId(); // = makeId()  Simplificación de la declaración de idMake
let urlOrigin = `${window.location.hostname}${window.location.pathname}`;
let objIntegramelo = { idIntegramelo: idMake, urlOrigin }

//debemos de guardarlo en el id del idIntegramelo
//buscamos el campo por el name de idIntegramelo
const idIntegramelo = document.querySelector(`[data-name="idIntegramelo"]`)
idIntegramelo.value = JSON.stringify(objIntegramelo)
//ocultamos el campo idIntegramelo y el padre
idIntegramelo.parentElement.style.display = 'none'



addEventListener('load', () => {
    //hay un erro que hace que el input de "Direccion" se autocomplete con el valor del idIntegramelo , hay que retirarlo
    const DireccionInput = document.querySelector(`[data-name="Direccion"]`)
    //con una exprecion regular retiramos todo lo que este dentro de llaves {} incluidas las llaves
    DireccionInput.value = DireccionInput.value.replace(/{.*}/, '')
})


function setIdLocalStorage() {
    if (idMake) {

        return { id: idMake };
    }

    const currentUrl = `${window.location.hostname}${window.location.pathname}`;
    let elementosArray = JSON.parse(localStorage.getItem('idIntegramelo')) || [];
    let existingElement = elementosArray.find(e => e.url === currentUrl && new Date() - new Date(e.date) < 20 * 60 * 1000);

    if (existingElement) {
        return existingElement;
    }

    const newElement = {
        url: currentUrl,
        id: makeId(10), // Ajuste para llamar a makeId con un valor específico de longitud
        date: new Date().toISOString()
    };

    elementosArray.push(newElement);
    localStorage.setItem('idIntegramelo', JSON.stringify(elementosArray));

    idMake = newElement.id;


    return newElement;
}
function getId() {
    if (!idMake) {
        idMake = setIdLocalStorage().id;
    }

    return idMake
}

function makeId(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

//concatena direccion
window.addEventListener('load', initConcatenarDireccion);

function initConcatenarDireccion() {

    var camposCustom = document.getElementsByName("custom")
    var barrioFiled = camposCustom[1]
    var direccionParcial = camposCustom[0]
    var referencia = camposCustom[2]
    var direccion = document.getElementsByName('shipping_address')[0]

    direccion.setAttribute('readonly', true);// Establecemos la direccion como un campo se solo lectura.
    barrioFiled.addEventListener('change', actualizarDireccion)
    direccionParcial.addEventListener('change', actualizarDireccion)
    referencia.addEventListener('change', actualizarDireccion)
    //cada ves que haya un cambio en alguno de los campos , actualizamos la direccion
    barrioFiled.addEventListener('input', actualizarDireccion)
    direccionParcial.addEventListener('input', actualizarDireccion)
    referencia.addEventListener('input', actualizarDireccion)

    function actualizarDireccion() {
        direccion.value = `${direccionParcial?.value || ''} , ${barrioFiled?.value || ''} , ${referencia?.value || ''}`
    }
}
window.addEventListener('load', ocultarInputs);

function ocultarInputs() {
    const idIntegrameloInput = document.querySelector('input[data-name="idIntegramelo"]')
    if (idIntegrameloInput) {
        idIntegrameloInput.style.display = `none`
    }

    // Obtener el elemento del país
    const countryField = document.getElementsByName("shipping_country")[0];

    // Predefinir el código del país a "CO"
    // seleccionamos el primer país del objeto

    const firstKey = Object.keys(countryStateInfo)[0] || 'CO';
    const countryCode = firstKey;

    if (countryField) {
        // Ocultar el campo del país y su contenedor
        const fieldContainer = countryField.parentNode;
        fieldContainer.style.display = 'none';

        // Comportamiento específico basado en el tipo de campo
        if (countryField.tagName === "INPUT") {
            // Establecer el valor para un campo de entrada
            countryField.value = countryCode;
        } else if (countryField.tagName === "SELECT") {
            // Crear y seleccionar una nueva opción para un campo select
            const newOption = new Option(countryCode, countryCode);
            countryField.add(newOption, 1); // Añadir la nueva opción
            countryField.selectedIndex = 1; // Seleccionar la nueva opción

            // También ocultar el contenedor del padre del campo
            const grandparentContainer = fieldContainer.parentNode;
            grandparentContainer.style.display = 'none';
        }
    }

}

(() => {
    // ====== Config ======
    // Expresión regular para verificar si un número colombiano es válido (empieza con 3 y tiene 10 dígitos)
    // Ejemplo: 3001234567, 3219876543, etc.
    // Validadores y mensajes reutilizables por país
    const VALIDATORS = {
        CO: {
            initial: /^3$/, // Solo puede empezar con 3
            regex: /^3\d{9}$/,
            maxLength: 10,
            message: "Debe empezar con 3 y tener 10 dígitos. Ejemplo: 3001234567."
        },
        US: {
            initial: /^\d$/, // Cualquier dígito
            regex: /^\d{10}$/,
            maxLength: 10,
            message: "Debe tener 10 dígitos (sin código de país). Ejemplo: 3051234567."
        },
        VE: {
            initial: /^4$/, // Solo puede empezar con 4
            regex: /^4(12|14|16|24|26)\d{7}$/,
            maxLength: 10,
            message: "Debe empezar con 412, 414, 416, 424 o 426 y tener 10 dígitos. Ejemplo: 4121234567."
        },
        PE: {
            initial: /^9$/, // Solo puede empezar con 9
            regex: /^9\d{8}$/,
            maxLength: 9,
            message: "Debe empezar con 9 y tener 9 dígitos. Ejemplo: 912345678."
        },
        EC: {
            initial: /^9$/, // Solo puede empezar con 9
            regex: /^9\d{8}$/,
            maxLength: 9,
            message: "Debe empezar con 9 y tener 9 dígitos. Ejemplo: 912345678."
        },
        MX: {
            initial: /^\d$/, // Cualquier dígito
            regex: /^\d{10}$/,
            maxLength: 10,
            message: "Debe tener 10 dígitos (sin código de país). Ejemplo: 5512345678."
        },
        GT: {
            initial: /^\d$/, // Cualquier dígito
            regex: /^\d{8}$/,
            maxLength: 8,
            message: "Debe tener 8 dígitos. Ejemplo: 51234567."
        },
    };

    const COUNTRIES = [
        { code: "CO", dial: "+57", flag: "🇨🇴", name: "Colombia" },
        { code: "US", dial: "+1", flag: "🇺🇸", name: "Estados Unidos" },
        { code: "VE", dial: "+58", flag: "🇻🇪", name: "Venezuela" },
        { code: "PE", dial: "+51", flag: "🇵🇪", name: "Perú" },
        { code: "EC", dial: "+593", flag: "🇪🇨", name: "Ecuador" },
        { code: "MX", dial: "+52", flag: "🇲🇽", name: "México" },
        { code: "GT", dial: "+502", flag: "🇬🇹", name: "Guatemala" },
    ];
    const STYLE_ID = "phone-enhancer-styles";

    // ====== Utils ======
    const onlyDigits = v => (v || "").replace(/\D+/g, "");
    const once = (el, key) => { if (el.dataset[key]) return false; el.dataset[key] = "1"; return true; };

    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;
        const css = `
    /* scoped a nuestro wrapper para no contaminar */
    .element-wrapper.phone-ui {
        max-width: 100vw;
        box-sizing: border-box;
        display: block;
    }
    .phone-ui .label {
        display:block; margin:6px 0; font-size:14px; color:#252A32;
    }
    .phone-ui .phone-field{
        position:relative;
        display:flex;
        align-items:center;
        gap:10px;
        background:#fff;
        border:1px solid #e2e8f0;
        border-radius:8px;
        padding:8px 16px;
        margin-left: 0;
        margin-right: 0;
        width: 100%;
        box-sizing: border-box;
        max-width: 100%;
    }
    .phone-ui .phone-field:focus-within{
        border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.15);
    }
    .phone-ui select.fe-select{
        border:none; background:transparent; padding:6px 2px; font-size:14px;
        outline:none; width:40px; cursor:pointer;
    }
    .phone-ui .prefix{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        min-width: 48px;
        font-size: 15px;
        color: #475569;
        padding: 0 12px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        user-select: none;
        box-sizing: border-box;
        margin: 0 2px;
    }
    .phone-ui input.phone-input{
        border:none; outline:none; flex:1; font-size:14px; padding:6px 4px; min-width:120px;
    }
    `;
        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = css;
        document.head.appendChild(style);
    }

    function buildPhoneUI(hiddenInput) {
        // Evitar doble inyección
        if (!once(hiddenInput, "enhancedPhone")) return;

        // Ocultar el input original sin romper el form
        try { hiddenInput.type = "hidden"; } catch { hiddenInput.style.display = "none"; }

        // Contenedor externo (imitamos estructura Funnelish)
        const wrapper = document.createElement("div");
        wrapper.className = "element-wrapper phone-ui";



        // Espacio para advertencia
        const warning = document.createElement("div");
        warning.className = "phone-warning";
        warning.style.cssText = "color:#f87171;font-size:13px;min-height:18px;margin-bottom:2px;display:none;";
        wrapper.appendChild(warning);

        // Campo combinado
        const field = document.createElement("div");
        field.className = "phone-field";
        wrapper.appendChild(field);

        // Select de país (flags)
        const sel = document.createElement("select");
        sel.className = "fe-select";
        sel.setAttribute("aria-label", "Selecciona país");

        COUNTRIES.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.code;
            opt.dataset.dial = c.dial;
            opt.textContent = c.flag + " " + c.name; // compacto y visual
            if (c.code === "CO") opt.selected = true;
            sel.appendChild(opt);
        });

        // Prefijo visible
        const prefix = document.createElement("span");
        prefix.className = "prefix";
        prefix.textContent = "+57";

        // Al hacer clic en el prefix, abrir el select de países
        prefix.style.cursor = "pointer";
        prefix.title = "Cambiar país";
        prefix.addEventListener("click", () => {
            sel.focus();
            // Para algunos navegadores, simular click para abrir el desplegable
            if (typeof sel.showPicker === "function") {
                sel.showPicker();
            } else {
                const event = document.createEvent('MouseEvents');
                event.initMouseEvent('mousedown', true, true, window);
                sel.dispatchEvent(event);
            }
        });

        // Input local visible (solo número sin código)
        const local = document.createElement("input");
        local.type = "text";
        local.className = "phone-input";
        local.placeholder = "Ingresa el número de teléfono";
        local.setAttribute("inputmode", "numeric");
        local.setAttribute("autocomplete", "tel-national");
        local.setAttribute("aria-label", "Número local sin código");

        field.appendChild(sel);
        field.appendChild(prefix);
        field.appendChild(local);

        // Insertar justo después del input original
        const parent = hiddenInput.parentElement || document.body;
        parent.insertBefore(wrapper, hiddenInput.nextSibling);

        // --- Lógica de sincronización ---
        function currentDial() {
            const opt = sel.options[sel.selectedIndex];
            return (opt && opt.dataset.dial) ? opt.dataset.dial : "+57";
        }
        function updateHidden() {
            const dial = currentDial();
            const num = onlyDigits(local.value);
            const full = num ? (dial + num) : "";
            hiddenInput.value = full;      // E.164
            prefix.textContent = dial;     // actualizar badge
        }

        sel.addEventListener("change", updateHidden);

        // Validación en tiempo real según el país
        local.addEventListener("input", (e) => {
            const country = COUNTRIES.find(c => c.code === sel.value);
            const validator = VALIDATORS[country?.code];
            let val = onlyDigits(e.target.value);
            let showWarning = false;
            let warningMsg = "";
            // Validar primer dígito si hay validador inicial
            if (validator && validator.initial && val.length === 1 && !validator.initial.test(val)) {
                val = "";
            }
            // Si hay validador para el país seleccionado
            if (validator) {
                if (validator.maxLength) val = val.slice(0, validator.maxLength);
                // Mostrar advertencia si no se alcanza la longitud mínima
                if (val.length > 0 && val.length < validator.maxLength) {
                    local.style.borderColor = "#f87171";
                    showWarning = true;
                    warningMsg = `Número incompleto para ${country.name}. ${validator.message}`;
                } else if (!validator.regex.test(val) && val.length === validator.maxLength) {
                    local.style.borderColor = "#f87171";
                    showWarning = true;
                    warningMsg = `Número inválido para ${country.name}. ${validator.message}`;
                } else {
                    local.style.borderColor = "";
                }
            } else {
                local.style.borderColor = "";
            }
            if (val !== e.target.value) e.target.value = val;
            updateHidden();
            // Mostrar u ocultar advertencia
            warning.textContent = showWarning ? warningMsg : "";
            warning.style.display = showWarning ? "block" : "none";
        });

        // Estado inicial
        updateHidden();
    }

    function enhanceWhenReady() {
        // Algunos embudos renderizan los inputs tras cargar: hacemos polling corto y luego paramos.
        let tries = 0;
        const maxTries = 80; // ~20s si interval=250ms
        const interval = setInterval(() => {
            const hidden = document.querySelector('input[name="phone"]');
            if (hidden) {
                clearInterval(interval);
                injectStyles();
                buildPhoneUI(hidden);
            } else if (++tries >= maxTries) {
                clearInterval(interval);
            }
        }, 250);
    }



    // Disparar al cargar (soporta DOM listo y SPA)
    if (document.readyState === "complete" || document.readyState === "interactive") {
        enhanceWhenReady();
    } else {
        window.addEventListener("DOMContentLoaded", enhanceWhenReady);
        window.addEventListener("load", enhanceWhenReady);
    }

    // Por si Funnelish re-renderiza dinámicamente después
    const mo = new MutationObserver(() => {
        const hidden = document.querySelector('input[name="phone"]');
        if (hidden && !hidden.dataset.enhancedPhone) {
            injectStyles();
            buildPhoneUI(hidden);
        }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
})();
