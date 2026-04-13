const STORAGE_KEY = 'magerit_analisis_completo';

export function guardarAnalisis(activo, valor, riesgosDetalle, riesgoTotal) {
    const analisis = {
        timestamp: new Date().toISOString(),
        activo: activo,
        valor: valor,
        riesgosDetalle: riesgosDetalle,
        riesgoTotal: riesgoTotal
    };
    
    const historial = cargarHistorial();
    historial.unshift(analisis);
    
    if (historial.length > 20) historial.pop();
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
    return analisis;
}

export function cargarHistorial() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

export function cargarUltimoAnalisis() {
    const historial = cargarHistorial();
    return historial.length > 0 ? historial[0] : null;
}

export function limpiarHistorial() {
    localStorage.removeItem(STORAGE_KEY);
}