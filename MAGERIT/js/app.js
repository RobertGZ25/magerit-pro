import { getValoracionActivo } from './data.js';
import { 
    poblarSelectActivos, 
    actualizarValoracion, 
    renderizarTablaAmenazas, 
    actualizarTodosLosRiesgos,
    mostrarResumenRiesgo,
    mostrarMatriz 
} from './ui.js';

// Elementos del DOM
const assetSel = document.getElementById('assetSel');
const assetValue = document.getElementById('assetValue');
const valuationLabel = document.getElementById('valuationLabel');
const rowsThreats = document.getElementById('rowsThreats');
const sumRisk = document.getElementById('sumRisk');
const btnCalculate = document.getElementById('btnCalculate');
const btnMatrix = document.getElementById('btnMatrix');
const matrixDiv = document.getElementById('matrix');

// Estado global
let activoActual = null;
let valorActivoActual = 5000000; // Valor por defecto
let riesgosDetalle = [];
let resultadoActual = null;

// Inicializar UI
poblarSelectActivos(assetSel);
actualizarValoracion(assetValue, valuationLabel);

// Evento al seleccionar activo
assetSel.addEventListener('change', () => {
    if (assetSel.value) {
        activoActual = JSON.parse(assetSel.value);
        
        // Renderizar las amenazas del activo seleccionado
        renderizarTablaAmenazas(activoActual, rowsThreats, valorActivoActual);
        
        // Ocultar matriz al cambiar de activo
        matrixDiv.style.display = 'none';
        
        // Calcular automáticamente
        if (valorActivoActual > 0) {
            const resultado = actualizarTodosLosRiesgos(rowsThreats, valorActivoActual);
            resultadoActual = resultado;
            riesgosDetalle = resultado.detalle;
            mostrarResumenRiesgo(resultado, valorActivoActual, sumRisk);
        }
    } else {
        // Limpiar tabla si no hay activo seleccionado
        rowsThreats.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #999;">
                    ⚠️ Seleccione un activo para ver sus amenazas asociadas
                </td>
            </tr>
        `;
        sumRisk.innerHTML = '';
        matrixDiv.style.display = 'none';
    }
});

// Evento al cambiar el valor del activo
assetValue.addEventListener('input', () => {
    valorActivoActual = parseFloat(assetValue.value) || 0;
    actualizarValoracion(assetValue, valuationLabel);
    
    // Si hay amenazas, recalcular riesgos
    if (activoActual && activoActual.amenazas && activoActual.amenazas.length > 0) {
        if (valorActivoActual > 0) {
            const resultado = actualizarTodosLosRiesgos(rowsThreats, valorActivoActual);
            resultadoActual = resultado;
            riesgosDetalle = resultado.detalle;
            mostrarResumenRiesgo(resultado, valorActivoActual, sumRisk);
            // Ocultar matriz al cambiar valor
            matrixDiv.style.display = 'none';
        } else {
            sumRisk.innerHTML = '<div class="risk-summary"><p style="color: #999; text-align: center;">💰 Ingrese el valor del activo para calcular los riesgos</p></div>';
        }
    }
});

// Botón calcular
btnCalculate.addEventListener('click', () => {
    if (!activoActual) {
        alert('⚠️ Por favor, selecciona un activo primero');
        return;
    }
    
    if (valorActivoActual <= 0) {
        alert('⚠️ Por favor, ingresa el valor del activo en euros');
        return;
    }
    
    const resultado = actualizarTodosLosRiesgos(rowsThreats, valorActivoActual);
    resultadoActual = resultado;
    riesgosDetalle = resultado.detalle;
    mostrarResumenRiesgo(resultado, valorActivoActual, sumRisk);
    
    // Ocultar matriz al recalcular
    matrixDiv.style.display = 'none';
    
    // Mostrar notificación de éxito
    const btn = btnCalculate;
    const originalText = btn.textContent;
    btn.textContent = '✅ ¡Riesgos Calculados!';
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.transform = '';
    }, 1500);
    
    console.log('Riesgos calculados:', riesgosDetalle);
});

// Botón matriz - AHORA FUNCIONA CORRECTAMENTE
btnMatrix.addEventListener('click', () => {
    if (!activoActual) {
        alert('⚠️ Por favor, selecciona un activo primero');
        return;
    }
    
    if (valorActivoActual <= 0) {
        alert('⚠️ Por favor, ingresa el valor del activo en euros');
        return;
    }
    
    if (riesgosDetalle.length === 0) {
        // Intentar recalcular primero
        const resultado = actualizarTodosLosRiesgos(rowsThreats, valorActivoActual);
        resultadoActual = resultado;
        riesgosDetalle = resultado.detalle;
        
        if (riesgosDetalle.length === 0) {
            alert('⚠️ No hay datos de riesgos para mostrar. Asegúrate de tener amenazas asociadas al activo.');
            return;
        }
    }
    
    // Mostrar la matriz
    mostrarMatriz(riesgosDetalle);
    matrixDiv.style.display = 'block';
    
    // Scroll suave a la matriz
    matrixDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Feedback visual
    const btn = btnMatrix;
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 200);
});

// Inicializar con un valor por defecto si hay algún activo preseleccionado
// Cargar el primer activo automáticamente al iniciar
setTimeout(() => {
    if (assetSel.options.length > 1 && !activoActual) {
        // Seleccionar el primer activo disponible
        const firstOption = assetSel.options[1];
        if (firstOption && firstOption.value) {
            assetSel.value = firstOption.value;
            assetSel.dispatchEvent(new Event('change'));
        }
    }
}, 500);

console.log('✅ MAGERIT PRO v3.0 - Gestión de Riesgos con Controles');
console.log('📋 Características:');
console.log('   • Catálogo de 27 amenazas MAGERIT');
console.log('   • Catálogo de 20 controles de seguridad');
console.log('   • Cálculo de Riesgo Intrínseco y Residual');
console.log('   • Efectividad combinada de múltiples controles');
console.log('   • Matriz de calor interactiva');