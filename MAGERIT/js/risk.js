// Cálculo de riesgos según MAGERIT
export function calcularRiesgo(probabilidad, impacto, valorActivo, dimensiones) {
    // Factor de dimensión (cuantas más dimensiones afectadas, mayor riesgo)
    const factorDimension = 1 + (dimensiones.length * 0.1);
    
    // Riesgo base = (probabilidad * impacto) / 100
    const riesgoBase = (probabilidad * impacto) / 100;
    
    // Ajuste por valor del activo (normalizado)
    let factorValor = 1;
    if (valorActivo >= 20000000) factorValor = 2.0;
    else if (valorActivo >= 10000000) factorValor = 1.6;
    else if (valorActivo >= 5000000) factorValor = 1.3;
    else if (valorActivo >= 1000000) factorValor = 1.0;
    else factorValor = 0.7;
    
    const riesgoTotal = riesgoBase * factorValor * factorDimension;
    
    // Redondear a 2 decimales
    return Math.round(riesgoTotal * 100) / 100;
}

export function getNivelRiesgo(riesgo) {
    if (riesgo >= 40) return { nivel: "Crítico", class: "risk-critical" };
    if (riesgo >= 25) return { nivel: "Alto", class: "risk-high" };
    if (riesgo >= 12) return { nivel: "Moderado", class: "risk-moderate" };
    return { nivel: "Bajo", class: "risk-low" };
}

export function calcularRiesgoTotal(riesgos) {
    const suma = riesgos.reduce((acc, r) => acc + r.riesgo, 0);
    const promedio = suma / riesgos.length;
    return {
        suma: Math.round(suma * 100) / 100,
        promedio: Math.round(promedio * 100) / 100,
        nivel: getNivelRiesgo(promedio)
    };
}