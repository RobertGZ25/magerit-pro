// Tabla de frecuencias de vulnerabilidad
export const FRECUENCIAS = {
    FMA: { abrev: "FMA", nombre: "Frecuencia muy alta", frecuencia: "1 vez al día", valor: 1.0000000000 },
    FA: { abrev: "FA", nombre: "Frecuencia alta", frecuencia: "1 vez cada 2 semanas", valor: 0.0712328767 },
    FM: { abrev: "FM", nombre: "Frecuencia media", frecuencia: "1 vez cada 2 meses", valor: 0.0164383562 },
    FB: { abrev: "FB", nombre: "Frecuencia baja", frecuencia: "1 vez cada 6 meses", valor: 0.0054794521 },
    FMB: { abrev: "FMB", nombre: "Frecuencia muy baja", frecuencia: "1 vez al año", valor: 0.0027397260 }
};

// Tabla de impactos
export const IMPACTOS = {
    C: { abrev: "C", nombre: "Crítico", porcentaje: 100, valor: 1.00 },
    A: { abrev: "A", nombre: "Alto", porcentaje: 75, valor: 0.75 },
    M: { abrev: "M", nombre: "Medio", porcentaje: 50, valor: 0.50 },
    B: { abrev: "B", nombre: "Bajo", porcentaje: 25, valor: 0.25 }
};

// Catálogo de Controles de Seguridad con su efectividad
export const CATALOGO_CONTROLES = {
    // Controles preventivos
    "C001": { codigo: "C001", nombre: "Cortafuegos (Firewall)", categoria: "Preventivo", efectividad: 0.85 },
    "C002": { codigo: "C002", nombre: "Sistema de Detección de Intrusos (IDS/IPS)", categoria: "Detectivo", efectividad: 0.75 },
    "C003": { codigo: "C003", nombre: "Antivirus/Antimalware", categoria: "Preventivo", efectividad: 0.80 },
    "C004": { codigo: "C004", nombre: "Control de acceso basado en roles (RBAC)", categoria: "Preventivo", efectividad: 0.90 },
    "C005": { codigo: "C005", nombre: "Autenticación multifactor (MFA)", categoria: "Preventivo", efectividad: 0.95 },
    "C006": { codigo: "C006", nombre: "Cifrado de datos", categoria: "Correctivo", efectividad: 0.90 },
    "C007": { codigo: "C007", nombre: "Copia de seguridad (Backup)", categoria: "Recuperativo", efectividad: 0.85 },
    "C008": { codigo: "C008", nombre: "Plan de continuidad de negocio (BCP)", categoria: "Recuperativo", efectividad: 0.70 },
    "C009": { codigo: "C009", nombre: "Seguridad física (cerraduras, vigilancia)", categoria: "Preventivo", efectividad: 0.75 },
    "C010": { codigo: "C010", nombre: "Sistema de extinción de incendios", categoria: "Preventivo", efectividad: 0.80 },
    "C011": { codigo: "C011", nombre: "Grupo electrógeno/SAI", categoria: "Recuperativo", efectividad: 0.85 },
    "C012": { codigo: "C012", nombre: "Formación y concienciación", categoria: "Preventivo", efectividad: 0.60 },
    "C013": { codigo: "C013", nombre: "Gestión de parches (Patch Management)", categoria: "Correctivo", efectividad: 0.70 },
    "C014": { codigo: "C014", nombre: "Segregación de redes (VLAN)", categoria: "Preventivo", efectividad: 0.80 },
    "C015": { codigo: "C015", nombre: "Monitorización continua (SIEM)", categoria: "Detectivo", efectividad: 0.75 },
    "C016": { codigo: "C016", nombre: "Política de contraseñas robustas", categoria: "Preventivo", efectividad: 0.70 },
    "C017": { codigo: "C017", nombre: "Registro de auditoría (Logs)", categoria: "Detectivo", efectividad: 0.65 },
    "C018": { codigo: "C018", nombre: "Control de medios extraíbles", categoria: "Preventivo", efectividad: 0.70 },
    "C019": { codigo: "C019", nombre: "VPN para acceso remoto", categoria: "Preventivo", efectividad: 0.85 },
    "C020": { codigo: "C020", nombre: "Segmentación de aplicaciones", categoria: "Preventivo", efectividad: 0.75 }
};

// Catálogo completo de amenazas MAGERIT
export const CATALOGO_AMENAZAS = {
    // Desastres naturales (DN)
    "DN01": { codigo: "DN01", nombre: "Fuego", categoria: "Desastres naturales", controlesRecomendados: ["C009", "C010", "C008"] },
    "DN02": { codigo: "DN02", nombre: "Daños por agua", categoria: "Desastres naturales", controlesRecomendados: ["C009", "C008"] },
    "DN03": { codigo: "DN03", nombre: "Terremotos", categoria: "Desastres naturales", controlesRecomendados: ["C008", "C009"] },
    "DN04": { codigo: "DN04", nombre: "Otros desastres", categoria: "Desastres naturales", controlesRecomendados: ["C008"] },
    
    // Origen industrial (OI)
    "OI01": { codigo: "OI01", nombre: "Corte de suministro eléctrico", categoria: "Origen industrial", controlesRecomendados: ["C011", "C008"] },
    "OI02": { codigo: "OI02", nombre: "Malas condiciones", categoria: "Origen industrial", controlesRecomendados: ["C012", "C009"] },
    "OI03": { codigo: "OI03", nombre: "Daños por agua", categoria: "Origen industrial", controlesRecomendados: ["C009", "C008"] },
    "OI04": { codigo: "OI04", nombre: "Fallo de servicios de comunicaciones", categoria: "Origen industrial", controlesRecomendados: ["C014", "C019"] },
    "OI05": { codigo: "OI05", nombre: "Degradación de soportes", categoria: "Origen industrial", controlesRecomendados: ["C007", "C006"] },
    
    // Errores (E)
    "E01": { codigo: "E01", nombre: "Errores de configuración", categoria: "Errores", controlesRecomendados: ["C012", "C013", "C017"] },
    "E02": { codigo: "E02", nombre: "Errores de usuarios", categoria: "Errores", controlesRecomendados: ["C012", "C016"] },
    "E03": { codigo: "E03", nombre: "Errores del gerente", categoria: "Errores", controlesRecomendados: ["C012", "C008"] },
    "E04": { codigo: "E04", nombre: "Errores de mantenimiento", categoria: "Errores", controlesRecomendados: ["C012", "C013", "C017"] },
    "E05": { codigo: "E05", nombre: "Fuga de información", categoria: "Errores", controlesRecomendados: ["C005", "C006", "C015", "C017"] },
    "E06": { codigo: "E06", nombre: "Deficiencias de la empresa", categoria: "Errores", controlesRecomendados: ["C008", "C012"] },
    "E07": { codigo: "E07", nombre: "Vulnerabilidades del software", categoria: "Errores", controlesRecomendados: ["C001", "C003", "C013", "C002"] },
    "E08": { codigo: "E08", nombre: "Daños en los equipos", categoria: "Errores", controlesRecomendados: ["C009", "C007", "C011"] },
    
    // Ataques intencionados (AI)
    "AI01": { codigo: "AI01", nombre: "Robo de equipos", categoria: "Ataques intencionados", controlesRecomendados: ["C009", "C005", "C006"] },
    "AI02": { codigo: "AI02", nombre: "Daños en los equipos", categoria: "Ataques intencionados", controlesRecomendados: ["C009", "C007"] },
    "AI03": { codigo: "AI03", nombre: "Divulgación de información", categoria: "Ataques intencionados", controlesRecomendados: ["C004", "C005", "C006", "C015"] },
    "AI04": { codigo: "AI04", nombre: "Suplantación de identidad", categoria: "Ataques intencionados", controlesRecomendados: ["C005", "C004", "C015"] },
    "AI05": { codigo: "AI05", nombre: "Destrucción de información", categoria: "Ataques intencionados", controlesRecomendados: ["C004", "C007", "C017"] },
    "AI06": { codigo: "AI06", nombre: "Extorsión", categoria: "Ataques intencionados", controlesRecomendados: ["C001", "C002", "C007"] },
    "AI07": { codigo: "AI07", nombre: "Uso no previsto de las instalaciones", categoria: "Ataques intencionados", controlesRecomendados: ["C009", "C004"] },
    "AI08": { codigo: "AI08", nombre: "Acceso no autorizado", categoria: "Ataques intencionados", controlesRecomendados: ["C001", "C004", "C005", "C002", "C015"] }
};

// Activos completos con amenazas específicas asignadas (mínimo 6 por activo)
export const ACTIVOS_COMPLETOS = [
    {
        grupo: "📁 DATOS / INFORMACIÓN",
        items: [
            { 
                id: "files", 
                nombre: "Ficheros",
                amenazas: ["E05", "E02", "AI03", "AI05", "E07", "AI08", "OI05"]
            },
            { 
                id: "conf", 
                nombre: "Datos de configuración",
                amenazas: ["E01", "E02", "E07", "AI08", "AI03", "E06"]
            },
            { 
                id: "int", 
                nombre: "Datos de gestión interna",
                amenazas: ["E05", "AI03", "AI04", "E02", "AI08", "E06"]
            },
            { 
                id: "password", 
                nombre: "Credenciales",
                amenazas: ["AI04", "AI08", "E05", "AI03", "E02", "AI01"]
            },
            { 
                id: "auth", 
                nombre: "Datos de validación de credenciales",
                amenazas: ["AI04", "AI08", "E07", "AI03", "E05", "E02"]
            },
            { 
                id: "acl", 
                nombre: "Datos de control de acceso",
                amenazas: ["AI08", "AI04", "E01", "E07", "AI03", "E06"]
            },
            { 
                id: "log", 
                nombre: "Registro de actividad",
                amenazas: ["E02", "AI05", "AI03", "E06", "AI08", "E07"]
            }
        ]
    },
    {
        grupo: "💿 SOFTWARE",
        items: [
            { 
                id: "os", 
                nombre: "Sistemas Operativos (Win10)",
                amenazas: ["E07", "E01", "AI08", "E02", "OI01", "AI02", "E04"]
            },
            { 
                id: "wu", 
                nombre: "Windows Update",
                amenazas: ["E01", "E07", "E04", "OI04", "E02", "AI08"]
            },
            { 
                id: "prp", 
                nombre: "Desarrollo propio",
                amenazas: ["E07", "E01", "E02", "AI08", "E05", "E06"]
            },
            { 
                id: "hypervisor", 
                nombre: "Gestor de máquinas virtuales",
                amenazas: ["E07", "E01", "E04", "AI08", "OI01", "E02"]
            },
            { 
                id: "app", 
                nombre: "Aplicaciones (reporte horas, E-Learning)",
                amenazas: ["E07", "E01", "E02", "AI08", "E05", "AI03"]
            },
            { 
                id: "ldap", 
                nombre: "Servidor de directorio LDAP",
                amenazas: ["E07", "E01", "AI08", "AI04", "OI04", "E02"]
            }
        ]
    },
    {
        grupo: "🖥️ HARDWARE",
        items: [
            { 
                id: "dbms", 
                nombre: "Servidor de base de datos",
                amenazas: ["E08", "OI01", "E07", "AI08", "E02", "DN01", "OI03"]
            },
            { 
                id: "app_server", 
                nombre: "Servidor de aplicaciones",
                amenazas: ["E08", "OI01", "E07", "AI08", "E02", "DN01"]
            },
            { 
                id: "mainframe", 
                nombre: "Mainframe",
                amenazas: ["E08", "OI01", "E07", "AI02", "DN01", "OI03"]
            },
            { 
                id: "print_server", 
                nombre: "Servidor de ficheros e impresión",
                amenazas: ["E08", "OI01", "E07", "AI02", "E02", "OI04"]
            },
            { 
                id: "workstations", 
                nombre: "Workstations de desarrollo",
                amenazas: ["E08", "E02", "AI01", "AI08", "E07", "OI01"]
            },
            { 
                id: "proxy_fw", 
                nombre: "Servidor proxy + firewall",
                amenazas: ["E08", "E01", "E07", "AI08", "OI01", "E04"]
            },
            { 
                id: "dns_int", 
                nombre: "Servidor DNS interno + IDS",
                amenazas: ["E08", "E01", "E07", "AI08", "OI04", "E02"]
            },
            { 
                id: "dns_ext", 
                nombre: "Servidor DNS externo + IDS",
                amenazas: ["E08", "E01", "E07", "AI08", "OI04", "AI02"]
            },
            { 
                id: "web_int", 
                nombre: "Servidor web interno + IDS",
                amenazas: ["E08", "E01", "E07", "AI08", "AI03", "E02"]
            },
            { 
                id: "web_ext", 
                nombre: "Servidor web externo + IDS",
                amenazas: ["E08", "E01", "E07", "AI08", "AI03", "AI02"]
            },
            { 
                id: "pabx", 
                nombre: "Servidor acceso remoto telefónico",
                amenazas: ["E08", "E01", "E07", "AI08", "OI04", "AI04"]
            },
            { 
                id: "email_server", 
                nombre: "Servidor correo electrónico + IDS",
                amenazas: ["E08", "E01", "E07", "AI08", "AI03", "E05"]
            },
            { 
                id: "nids", 
                nombre: "Network IDS",
                amenazas: ["E08", "E01", "E07", "AI08", "E02", "OI04"]
            },
            { 
                id: "fw_int", 
                nombre: "Firewall interno",
                amenazas: ["E08", "E01", "E07", "AI08", "E04", "AI02"]
            },
            { 
                id: "fw_ext", 
                nombre: "Firewall externo",
                amenazas: ["E08", "E01", "E07", "AI08", "AI02", "OI01"]
            },
            { 
                id: "fw_wifi", 
                nombre: "Firewall Zona Wifi",
                amenazas: ["E08", "E01", "E07", "AI08", "E02", "AI02"]
            }
        ]
    },
    {
        grupo: "🌐 COMUNICACIONES",
        items: [
            { 
                id: "internet_isp", 
                nombre: "Acceso internet ISP",
                amenazas: ["OI04", "OI01", "E08", "AI08", "DN04", "E02"]
            },
            { 
                id: "pstn", 
                nombre: "Red Telefónica básica/RDSI",
                amenazas: ["OI04", "E08", "AI08", "E02", "OI01", "AI04"]
            },
            { 
                id: "wifi", 
                nombre: "Red WIFI",
                amenazas: ["OI04", "E07", "AI08", "AI04", "E02", "AI03"]
            },
            { 
                id: "lan", 
                nombre: "Red LAN",
                amenazas: ["OI04", "E07", "AI08", "AI04", "E02", "AI03"]
            },
            { 
                id: "internet", 
                nombre: "Internet",
                amenazas: ["OI04", "AI08", "AI03", "E07", "AI04", "E02"]
            },
            { 
                id: "vpn", 
                nombre: "Red VPN",
                amenazas: ["OI04", "E07", "AI08", "AI04", "E02", "AI03"]
            }
        ]
    },
    {
        grupo: "🔌 EQUIPOS AUXILIARES",
        items: [
            { 
                id: "sei", 
                nombre: "Sistema de extinción de incendios",
                amenazas: ["E04", "E02", "E08", "DN01", "OI01", "AI02"]
            },
            { 
                id: "ac", 
                nombre: "Equipos de climatización",
                amenazas: ["E08", "E04", "OI01", "OI02", "E02", "AI02"]
            }
        ]
    },
    {
        grupo: "🛠️ SERVICIOS",
        items: [
            { 
                id: "email", 
                nombre: "Correo electrónico",
                amenazas: ["OI04", "E07", "AI08", "E02", "AI03", "E05"]
            },
            { 
                id: "file_storage", 
                nombre: "Almacenamiento de ficheros",
                amenazas: ["E08", "E07", "AI05", "E02", "OI05", "AI03"]
            },
            { 
                id: "edi", 
                nombre: "Intercambio electrónico de datos",
                amenazas: ["OI04", "E07", "AI08", "AI03", "E05", "AI04"]
            },
            { 
                id: "ftp", 
                nombre: "Transferencia de ficheros",
                amenazas: ["OI04", "E07", "AI08", "AI03", "E05", "AI04"]
            }
        ]
    },
    {
        grupo: "🏢 INSTALACIONES",
        items: [
            { 
                id: "building", 
                nombre: "Oficinas",
                amenazas: ["DN01", "DN02", "DN03", "DN04", "OI01", "AI07"]
            },
            { 
                id: "cpd", 
                nombre: "CPD",
                amenazas: ["DN01", "DN02", "OI01", "OI02", "E08", "AI07"]
            }
        ]
    },
    {
        grupo: "👥 PERSONAL",
        items: [
            { 
                id: "ur", 
                nombre: "Usuarios remotos",
                amenazas: ["E02", "E05", "AI04", "AI08", "E06", "AI03"]
            },
            { 
                id: "des", 
                nombre: "Desarrolladores",
                amenazas: ["E02", "E05", "E07", "AI08", "E06", "AI04"]
            },
            { 
                id: "adm", 
                nombre: "Funcionarios gestión infraestructura",
                amenazas: ["E02", "E03", "E06", "AI08", "E05", "AI04"]
            }
        ]
    },
    {
        grupo: "💾 SOPORTES DE INFORMACIÓN",
        items: [
            { 
                id: "san", 
                nombre: "Almacenamiento en red",
                amenazas: ["E08", "E07", "AI05", "OI05", "E02", "AI03"]
            },
            { 
                id: "seg", 
                nombre: "Tarjeta de identificación",
                amenazas: ["AI01", "AI04", "AI08", "E02", "AI03", "E06"]
            },
            { 
                id: "electronic", 
                nombre: "Electrónicos",
                amenazas: ["E08", "E07", "AI02", "OI05", "E02", "AI01"]
            }
        ]
    }
];

// Función para obtener las amenazas de un activo con sus configuraciones por defecto
export function getAmenazasByActivo(activo) {
    if (!activo || !activo.amenazas) return [];
    
    return activo.amenazas.map(codigo => {
        const amenaza = CATALOGO_AMENAZAS[codigo];
        if (!amenaza) return null;
        
        // Asignar frecuencia e impacto por defecto según el tipo de amenaza
        let frecuenciaDefault = "FM";  // Frecuencia media por defecto
        let impactoDefault = "M";      // Impacto medio por defecto
        
        // Reglas de negocio para asignar valores por defecto
        if (amenaza.codigo.startsWith("DN")) {
            frecuenciaDefault = "FB";   // Desastres naturales son poco frecuentes
            impactoDefault = "C";       // Pero impacto crítico
        } else if (amenaza.codigo.startsWith("OI")) {
            frecuenciaDefault = "FM";   // Fallos industriales frecuencia media
            impactoDefault = "A";       // Impacto alto
        } else if (amenaza.codigo.startsWith("E")) {
            frecuenciaDefault = "FA";   // Errores son frecuentes
            impactoDefault = "M";       // Impacto medio
        } else if (amenaza.codigo.startsWith("AI")) {
            frecuenciaDefault = "FM";   // Ataques frecuencia media
            impactoDefault = "A";       // Impacto alto
        }
        
        return {
            codigo: amenaza.codigo,
            nombre: amenaza.nombre,
            categoria: amenaza.categoria,
            frecuencia: frecuenciaDefault,
            impacto: impactoDefault,
            controlesRecomendados: amenaza.controlesRecomendados || []
        };
    }).filter(a => a !== null);
}

// Función para obtener controles disponibles
export function getControlesDisponibles() {
    return Object.values(CATALOGO_CONTROLES);
}

// Función para obtener controles recomendados para una amenaza
export function getControlesRecomendadosPorAmenaza(codigoAmenaza) {
    const amenaza = CATALOGO_AMENAZAS[codigoAmenaza];
    if (!amenaza || !amenaza.controlesRecomendados) return [];
    
    return amenaza.controlesRecomendados.map(codigo => CATALOGO_CONTROLES[codigo]).filter(c => c);
}

// Valoración de activos
export function getValoracionActivo(valor) {
    if (valor >= 20000000) return { abrev: "MA", texto: "Muy alto", color: "MA", factor: 1.0 };
    if (valor >= 10000000) return { abrev: "A", texto: "Alto", color: "A", factor: 0.0712328767 };
    if (valor >= 5000000) return { abrev: "M", texto: "Medio", color: "M", factor: 0.0164383562 };
    if (valor >= 1000000) return { abrev: "B", texto: "Bajo", color: "B", factor: 0.0054794521 };
    return { abrev: "MB", texto: "Muy bajo", color: "MB", factor: 0.0027397260 };
}

// Calcular Riesgo Intrínseco
export function calcularRiesgoIntrinseco(valorActivo, frecuenciaKey, impactoKey) {
    const frecuencia = FRECUENCIAS[frecuenciaKey];
    const impacto = IMPACTOS[impactoKey];
    
    if (!frecuencia || !impacto) return 0;
    
    // Riesgo Intrínseco = Valor del Activo × Valor Vulnerabilidad × Valor Impacto
    const riesgo = valorActivo * frecuencia.valor * impacto.valor;
    
    return Math.round(riesgo * 100) / 100;
}

// Calcular Riesgo Residual = Riesgo Intrínseco × (1 - Efectividad del Control)
export function calcularRiesgoResidual(riesgoIntrinseco, efectividadControl) {
    const riesgoResidual = riesgoIntrinseco * (1 - efectividadControl);
    return Math.round(riesgoResidual * 100) / 100;
}

// Calcular efectividad combinada de múltiples controles
export function calcularEfectividadCombinada(controlesSeleccionados) {
    if (!controlesSeleccionados || controlesSeleccionados.length === 0) return 0;
    
    // Fórmula de combinación: 1 - ∏(1 - efectividad_i)
    let producto = 1;
    for (const control of controlesSeleccionados) {
        producto *= (1 - control.efectividad);
    }
    return 1 - producto;
}

// Obtener nivel de riesgo cualitativo
export function getNivelRiesgo(riesgo) {
    if (riesgo >= 15000000) return { nivel: "Crítico", class: "risk-critical", icon: "🔴" };
    if (riesgo >= 5000000) return { nivel: "Alto", class: "risk-high", icon: "🟠" };
    if (riesgo >= 1000000) return { nivel: "Moderado", class: "risk-moderate", icon: "🟡" };
    if (riesgo >= 100000) return { nivel: "Bajo", class: "risk-low", icon: "🟢" };
    return { nivel: "Muy Bajo", class: "risk-very-low", icon: "⚪" };
}
