import { 
    ACTIVOS_COMPLETOS, 
    getValoracionActivo, 
    FRECUENCIAS, 
    IMPACTOS, 
    getAmenazasByActivo,
    CATALOGO_CONTROLES,
    getControlesRecomendadosPorAmenaza,
    calcularRiesgoIntrinseco,
    calcularRiesgoResidual,
    calcularEfectividadCombinada
} from './data.js';

// Poblar el select de activos
export function poblarSelectActivos(selectElement) {
    selectElement.innerHTML = '';
    
    ACTIVOS_COMPLETOS.forEach(grupo => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = grupo.grupo;
        
        grupo.items.forEach(item => {
            const option = document.createElement('option');
            option.value = JSON.stringify({ 
                grupo: grupo.grupo, 
                id: item.id, 
                nombre: item.nombre,
                amenazas: item.amenazas 
            });
            option.textContent = `[${item.id}] ${item.nombre}`;
            optgroup.appendChild(option);
        });
        
        selectElement.appendChild(optgroup);
    });
}

// Actualizar etiqueta de valoración
export function actualizarValoracion(valorInput, valuationSpan) {
    const valor = parseFloat(valorInput.value) || 0;
    const valoracion = getValoracionActivo(valor);
    valuationSpan.textContent = `${valoracion.texto} (${valoracion.abrev}) - ${new Intl.NumberFormat('es-ES').format(valor)} €`;
    valuationSpan.className = `valuation-badge ${valoracion.color}`;
    return valoracion;
}

// Renderizar tabla de amenazas con controles
export function renderizarTablaAmenazas(activo, tbody, valorActivo = 0) {
    tbody.innerHTML = '';
    
    if (!activo || !activo.amenazas || activo.amenazas.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 8;
        cell.textContent = '⚠️ Este activo no tiene amenazas asociadas';
        cell.style.textAlign = 'center';
        cell.style.padding = '40px';
        cell.style.color = '#999';
        return;
    }
    
    // Obtener las amenazas completas para este activo
    const amenazasCompletas = getAmenazasByActivo(activo);
    
    amenazasCompletas.forEach((amenaza, index) => {
        const row = tbody.insertRow();
        
        // Código y nombre de la amenaza
        const threatCell = row.insertCell(0);
        threatCell.innerHTML = `<strong>${amenaza.codigo}</strong><br><small>${amenaza.nombre}</small>`;
        threatCell.style.fontSize = '13px';
        
        // Categoría
        row.insertCell(1).textContent = amenaza.categoria;
        
        // Frecuencia (Vulnerabilidad) - Select
        const freqCell = row.insertCell(2);
        const freqSelect = document.createElement('select');
        freqSelect.className = 'freq-select';
        freqSelect.setAttribute('data-codigo', amenaza.codigo);
        for (const [key, freq] of Object.entries(FRECUENCIAS)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = `${freq.abrev} - ${freq.nombre} (${freq.frecuencia}) - ${(freq.valor * 100).toFixed(2)}%`;
            if (key === amenaza.frecuencia) option.selected = true;
            freqSelect.appendChild(option);
        }
        freqCell.appendChild(freqSelect);
        
        // Impacto - Select
        const impactCell = row.insertCell(3);
        const impactSelect = document.createElement('select');
        impactSelect.className = 'impact-select';
        impactSelect.setAttribute('data-codigo', amenaza.codigo);
        for (const [key, impact] of Object.entries(IMPACTOS)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = `${impact.abrev} - ${impact.nombre} (${impact.porcentaje}%) - Factor: ${impact.valor}`;
            if (key === amenaza.impacto) option.selected = true;
            impactSelect.appendChild(option);
        }
        impactCell.appendChild(impactSelect);
        
        // Controles - Select múltiple
        const controlCell = row.insertCell(4);
        const controlesRecomendados = getControlesRecomendadosPorAmenaza(amenaza.codigo);
        const controlSelect = document.createElement('select');
        controlSelect.multiple = true;
        controlSelect.size = Math.min(3, controlesRecomendados.length);
        controlSelect.className = 'control-select';
        controlSelect.setAttribute('data-codigo', amenaza.codigo);
        controlSelect.style.width = '100%';
        controlSelect.style.minWidth = '200px';
        
        // Agregar opción "Sin control"
        const noneOption = document.createElement('option');
        noneOption.value = "";
        noneOption.textContent = "--- Sin control seleccionado ---";
        controlSelect.appendChild(noneOption);
        
        // Agregar controles recomendados
        controlesRecomendados.forEach(control => {
            const option = document.createElement('option');
            option.value = control.codigo;
            option.textContent = `${control.codigo} - ${control.nombre} (${(control.efectividad * 100).toFixed(0)}% efectividad)`;
            option.setAttribute('data-efectividad', control.efectividad);
            controlSelect.appendChild(option);
        });
        
        controlCell.appendChild(controlSelect);
        
        // Efectividad combinada
        const efectividadCell = row.insertCell(5);
        efectividadCell.className = 'efectividad-cell';
        efectividadCell.style.textAlign = 'center';
        efectividadCell.textContent = '0%';
        
        // Riesgo Intrínseco
        const riesgoIntrinsecoCell = row.insertCell(6);
        riesgoIntrinsecoCell.className = 'risk-cell';
        
        // Riesgo Residual
        const riesgoResidualCell = row.insertCell(7);
        riesgoResidualCell.className = 'risk-residual-cell';
        
        // Guardar referencias para actualización
        row.freqSelect = freqSelect;
        row.impactSelect = impactSelect;
        row.controlSelect = controlSelect;
        row.efectividadCell = efectividadCell;
        row.riesgoIntrinsecoCell = riesgoIntrinsecoCell;
        row.riesgoResidualCell = riesgoResidualCell;
        row.amenaza = amenaza;
        
        // Función para actualizar efectividad
        const actualizarEfectividad = () => {
            const selectedOptions = Array.from(controlSelect.selectedOptions);
            const controlesSeleccionados = selectedOptions
                .filter(opt => opt.value !== "")
                .map(opt => ({
                    codigo: opt.value,
                    nombre: opt.textContent.split(' - ')[1],
                    efectividad: parseFloat(opt.getAttribute('data-efectividad'))
                }));
            
            const efectividad = calcularEfectividadCombinada(controlesSeleccionados);
            efectividadCell.textContent = `${(efectividad * 100).toFixed(0)}%`;
            return efectividad;
        };
        
        // Función para actualizar riesgos
        const actualizarRiesgos = () => {
            if (valorActivo <= 0) {
                riesgoIntrinsecoCell.textContent = '--- €';
                riesgoResidualCell.textContent = '--- €';
                return;
            }
            
            const riesgoIntrinseco = calcularRiesgoIntrinseco(valorActivo, freqSelect.value, impactSelect.value);
            const efectividad = actualizarEfectividad();
            const riesgoResidual = calcularRiesgoResidual(riesgoIntrinseco, efectividad);
            
            riesgoIntrinsecoCell.textContent = new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR'
            }).format(riesgoIntrinseco);
            
            riesgoResidualCell.textContent = new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR'
            }).format(riesgoResidual);
            
            // Cambiar color según riesgo residual
            if (riesgoResidual >= 15000000) {
                riesgoResidualCell.style.color = '#d32f2f';
                riesgoResidualCell.style.fontWeight = 'bold';
            } else if (riesgoResidual >= 5000000) {
                riesgoResidualCell.style.color = '#f44336';
                riesgoResidualCell.style.fontWeight = 'bold';
            } else if (riesgoResidual >= 1000000) {
                riesgoResidualCell.style.color = '#ff9800';
                riesgoResidualCell.style.fontWeight = 'bold';
            } else if (riesgoResidual >= 100000) {
                riesgoResidualCell.style.color = '#ffc107';
            } else {
                riesgoResidualCell.style.color = '#4caf50';
            }
            
            return { riesgoIntrinseco, riesgoResidual, efectividad };
        };
        
        // Eventos para recalcular
        freqSelect.addEventListener('change', () => actualizarRiesgos());
        impactSelect.addEventListener('change', () => actualizarRiesgos());
        controlSelect.addEventListener('change', () => actualizarRiesgos());
        
        // Calcular inicial si hay valor
        if (valorActivo > 0) {
            actualizarRiesgos();
        } else {
            riesgoIntrinsecoCell.textContent = '--- €';
            riesgoResidualCell.textContent = '--- €';
        }
    });
}

// Calcular y actualizar todos los riesgos
export function actualizarTodosLosRiesgos(tbody, valorActivo) {
    const rows = tbody.querySelectorAll('tr');
    let riesgoTotalIntrinseco = 0;
    let riesgoTotalResidual = 0;
    const riesgosDetalle = [];
    
    rows.forEach(row => {
        if (row.freqSelect && row.impactSelect && row.controlSelect && valorActivo > 0) {
            const frecuenciaKey = row.freqSelect.value;
            const impactoKey = row.impactSelect.value;
            const frecuencia = FRECUENCIAS[frecuenciaKey];
            const impacto = IMPACTOS[impactoKey];
            
            const riesgoIntrinseco = valorActivo * frecuencia.valor * impacto.valor;
            const riesgoIntrinsecoRedondeado = Math.round(riesgoIntrinseco * 100) / 100;
            
            // Calcular efectividad de controles seleccionados
            const selectedOptions = Array.from(row.controlSelect.selectedOptions);
            const controlesSeleccionados = selectedOptions
                .filter(opt => opt.value !== "")
                .map(opt => ({
                    codigo: opt.value,
                    nombre: opt.textContent.split(' - ')[1],
                    efectividad: parseFloat(opt.getAttribute('data-efectividad'))
                }));
            
            const efectividad = calcularEfectividadCombinada(controlesSeleccionados);
            const riesgoResidual = calcularRiesgoResidual(riesgoIntrinsecoRedondeado, efectividad);
            
            row.riesgoIntrinsecoCell.textContent = new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR'
            }).format(riesgoIntrinsecoRedondeado);
            
            row.riesgoResidualCell.textContent = new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR'
            }).format(riesgoResidual);
            
            row.efectividadCell.textContent = `${(efectividad * 100).toFixed(0)}%`;
            
            riesgoTotalIntrinseco += riesgoIntrinsecoRedondeado;
            riesgoTotalResidual += riesgoResidual;
            
            riesgosDetalle.push({
                codigo: row.amenaza.codigo,
                amenaza: row.amenaza.nombre,
                categoria: row.amenaza.categoria,
                frecuencia: frecuencia.nombre,
                frecuenciaValor: frecuencia.valor,
                frecuenciaAbrev: frecuencia.abrev,
                impacto: impacto.nombre,
                impactoValor: impacto.valor,
                impactoAbrev: impacto.abrev,
                riesgoIntrinseco: riesgoIntrinsecoRedondeado,
                riesgoResidual: riesgoResidual,
                efectividad: efectividad,
                controles: controlesSeleccionados.map(c => c.nombre).join(', ') || 'Ninguno'
            });
        }
    });
    
    return {
        totalIntrinseco: Math.round(riesgoTotalIntrinseco * 100) / 100,
        totalResidual: Math.round(riesgoTotalResidual * 100) / 100,
        detalle: riesgosDetalle,
        reduccion: riesgoTotalIntrinseco > 0 ? ((riesgoTotalIntrinseco - riesgoTotalResidual) / riesgoTotalIntrinseco * 100).toFixed(1) : 0
    };
}

// Mostrar resumen del riesgo con intrínseco y residual
export function mostrarResumenRiesgo(resultado, valorActivo, element) {
    const porcentajePatrimonioIntrinseco = resultado.totalIntrinseco > 0 ? (resultado.totalIntrinseco / valorActivo * 100).toFixed(2) : 0;
    const porcentajePatrimonioResidual = resultado.totalResidual > 0 ? (resultado.totalResidual / valorActivo * 100).toFixed(2) : 0;
    
    let nivelClassIntrinseco = '';
    let nivelTextoIntrinseco = '';
    let nivelClassResidual = '';
    let nivelTextoResidual = '';
    
    // Nivel riesgo intrínseco
    if (resultado.totalIntrinseco >= 15000000) {
        nivelClassIntrinseco = 'critical';
        nivelTextoIntrinseco = 'CRÍTICO';
    } else if (resultado.totalIntrinseco >= 5000000) {
        nivelClassIntrinseco = 'high';
        nivelTextoIntrinseco = 'ALTO';
    } else if (resultado.totalIntrinseco >= 1000000) {
        nivelClassIntrinseco = 'moderate';
        nivelTextoIntrinseco = 'MODERADO';
    } else if (resultado.totalIntrinseco >= 100000) {
        nivelClassIntrinseco = 'low';
        nivelTextoIntrinseco = 'BAJO';
    } else {
        nivelClassIntrinseco = 'very-low';
        nivelTextoIntrinseco = 'MUY BAJO';
    }
    
    // Nivel riesgo residual
    if (resultado.totalResidual >= 15000000) {
        nivelClassResidual = 'critical';
        nivelTextoResidual = 'CRÍTICO';
    } else if (resultado.totalResidual >= 5000000) {
        nivelClassResidual = 'high';
        nivelTextoResidual = 'ALTO';
    } else if (resultado.totalResidual >= 1000000) {
        nivelClassResidual = 'moderate';
        nivelTextoResidual = 'MODERADO';
    } else if (resultado.totalResidual >= 100000) {
        nivelClassResidual = 'low';
        nivelTextoResidual = 'BAJO';
    } else {
        nivelClassResidual = 'very-low';
        nivelTextoResidual = 'MUY BAJO';
    }
    
    element.innerHTML = `
        <div class="risk-summary">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <!-- Riesgo Intrínseco -->
                <div class="risk-card ${nivelClassIntrinseco}">
                    <h3>📊 RIESGO INTRÍNSECO</h3>
                    <div class="risk-value-large">${new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'EUR'
                    }).format(resultado.totalIntrinseco)}</div>
                    <div class="risk-percent">${porcentajePatrimonioIntrinseco}% del valor del activo</div>
                    <div class="risk-badge ${nivelClassIntrinseco}">${nivelTextoIntrinseco}</div>
                </div>
                
                <!-- Riesgo Residual -->
                <div class="risk-card ${nivelClassResidual}">
                    <h3>🛡️ RIESGO RESIDUAL</h3>
                    <div class="risk-value-large">${new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'EUR'
                    }).format(resultado.totalResidual)}</div>
                    <div class="risk-percent">${porcentajePatrimonioResidual}% del valor del activo</div>
                    <div class="risk-badge ${nivelClassResidual}">${nivelTextoResidual}</div>
                </div>
            </div>
            <div class="reduction-summary">
                <span class="reduction-label">✅ Reducción lograda con controles:</span>
                <span class="reduction-value">${resultado.reduccion}%</span>
                <span class="reduction-amount">(${new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                }).format(resultado.totalIntrinseco - resultado.totalResidual)} ahorrados)</span>
            </div>
        </div>
    `;
}

// Mostrar matriz de calor actualizada con riesgo residual
export function mostrarMatriz(riesgosDetalle) {
    const matrixDiv = document.getElementById('matrix');
    if (!matrixDiv) return;
    
    // Crear matriz frecuencia vs impacto para riesgo residual
    const frecuencias = ['FMB', 'FB', 'FM', 'FA', 'FMA'];
    const impactos = ['B', 'M', 'A', 'C'];
    
    let html = '<h3>📐 Matriz de Calor - Riesgo Residual (con controles aplicados)</h3>';
    html += '<div style="overflow-x: auto;"><table class="matrix-table"><thead>';
    html += '<tr><th>Frecuencia \\ Impacto</th>';
    
    for (let impacto of impactos) {
        html += `<th>${IMPACTOS[impacto].nombre}<br><small>${IMPACTOS[impacto].porcentaje}%</small></th>`;
    }
    html += '</tr></thead><tbody>';
    
    for (let freq of frecuencias) {
        html += `<tr><th style="background:#667eea; color:white;">${FRECUENCIAS[freq].nombre}<br><small>${FRECUENCIAS[freq].frecuencia}</small><br><small>${(FRECUENCIAS[freq].valor * 100).toFixed(2)}%</small></th>`;
        
        for (let impacto of impactos) {
            // Buscar riesgos con esta combinación
            const riesgosCombinacion = riesgosDetalle.filter(r => 
                r.frecuenciaAbrev === freq && 
                r.impactoAbrev === impacto
            );
            
            const sumaRiesgosResidual = riesgosCombinacion.reduce((sum, r) => sum + r.riesgoResidual, 0);
            const sumaRiesgosIntrinseco = riesgosCombinacion.reduce((sum, r) => sum + r.riesgoIntrinseco, 0);
            const promedioResidual = riesgosCombinacion.length > 0 ? sumaRiesgosResidual / riesgosCombinacion.length : 0;
            const promedioIntrinseco = riesgosCombinacion.length > 0 ? sumaRiesgosIntrinseco / riesgosCombinacion.length : 0;
            
            let bgColor = '#e8f5e9';
            let textColor = 'black';
            
            if (promedioResidual >= 15000000) {
                bgColor = '#d32f2f';
                textColor = 'white';
            } else if (promedioResidual >= 5000000) {
                bgColor = '#f44336';
                textColor = 'white';
            } else if (promedioResidual >= 1000000) {
                bgColor = '#ff9800';
                textColor = 'black';
            } else if (promedioResidual >= 100000) {
                bgColor = '#ffc107';
                textColor = 'black';
            } else if (promedioResidual > 0) {
                bgColor = '#4caf50';
                textColor = 'black';
            }
            
            const reduccion = promedioIntrinseco > 0 ? ((promedioIntrinseco - promedioResidual) / promedioIntrinseco * 100).toFixed(0) : 0;
            
            html += `<td style="background:${bgColor}; color:${textColor}; text-align:center; padding:12px;">
                        ${riesgosCombinacion.length > 0 ? 
                            `<strong>${new Intl.NumberFormat('es-ES').format(Math.round(promedioResidual))} €</strong><br>
                             <small style="font-size: 11px;">(Residual)</small>
                             <br><small>⬇️ Reducción: ${reduccion}%</small>
                             <br><small>(${riesgosCombinacion.length} amenazas)</small>` : 
                            '-'}
                       </td>`;
        }
        html += '</tr>';
    }
    html += '</tbody></table></div>';
    
    // Agregar leyenda
    html += `
        <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <h4>📖 Leyenda de Colores (Riesgo Residual)</h4>
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                <div><span style="display: inline-block; width: 20px; height: 20px; background: #d32f2f; border-radius: 4px;"></span> > 15.000.000 € (Crítico)</div>
                <div><span style="display: inline-block; width: 20px; height: 20px; background: #f44336; border-radius: 4px;"></span> 5.000.000 - 15.000.000 € (Alto)</div>
                <div><span style="display: inline-block; width: 20px; height: 20px; background: #ff9800; border-radius: 4px;"></span> 1.000.000 - 5.000.000 € (Moderado)</div>
                <div><span style="display: inline-block; width: 20px; height: 20px; background: #ffc107; border-radius: 4px;"></span> 100.000 - 1.000.000 € (Bajo)</div>
                <div><span style="display: inline-block; width: 20px; height: 20px; background: #4caf50; border-radius: 4px;"></span> < 100.000 € (Muy Bajo)</div>
            </div>
            <p style="margin-top: 10px; font-size: 12px; color: #666;">💡 El riesgo residual se calcula aplicando la efectividad combinada de los controles seleccionados</p>
        </div>
    `;
    
    matrixDiv.innerHTML = html;
}