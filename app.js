import { comunasData } from './data.js';

// Elementos del DOM
const selectComuna = document.getElementById('select-comuna');
const selectSupermercado = document.getElementById('select-supermercado');
const wrapperSupermercado = document.getElementById('wrapper-supermercado');
const resultado = document.getElementById('resultado');

const resNombre = document.getElementById('res-nombre');
const resDireccion = document.getElementById('res-direccion');
const resBadge = document.getElementById('res-badge');
const resHorario = document.getElementById('res-horario');

// 1. Poblar el selector de Comunas al cargar la página
Object.keys(comunasData).forEach(comuna => {
    const option = document.createElement('option');
    option.value = comuna;
    option.textContent = comuna;
    selectComuna.appendChild(option);
});

// 2. Evento cuando cambia la comuna
selectComuna.addEventListener('change', (e) => {
    const comunaSeleccionada = e.target.value;
    
    // Resetear el segundo selector y ocultar resultado
    selectSupermercado.innerHTML = '<option value="">-- Elige un local --</option>';
    resultado.classList.add('hidden');

    if (!comunaSeleccionada) {
        wrapperSupermercado.classList.add('hidden');
        return;
    }
    // Poblar los supermercados de esa comuna
    comunasData[comunaSeleccionada].forEach(supermercado => {
        const option = document.createElement('option');
        option.value = supermercado.id;
        option.textContent = supermercado.nombre;
        selectSupermercado.appendChild(option);
    });

    wrapperSupermercado.classList.remove('hidden');
});

// 3. Evento cuando cambia el supermercado (Cálculo del Estado)
selectSupermercado.addEventListener('change', (e) => {
    const superId = e.target.value;
    const comunaSeleccionada = selectComuna.value;

    if (!superId) {
        resultado.classList.add('hidden');
        return;
    }

    // Buscar el objeto del supermercado seleccionado
    const local = comunasData[comunaSeleccionada].find(s => s.id === superId);
    
    // Obtener la hora y el día actual
    const ahora = new Date();
    const diaSemana = ahora.getDay(); // 0 = Domingo, 1-6 = Lunes a Sábado
    const horaActualStr = ahora.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false });

    // Determinar qué horario aplicar (semana o domingo)
    const tipoHorario = (diaSemana === 0) ? 'domingo' : 'semana';
    const { apertura, cierre } = local.horarios[tipoHorario];

    // Verificar si está abierto (comparación de strings "HH:MM")
    const estaAbierto = (horaActualStr >= apertura && horaActualStr < cierre);

// 4. Renderizar el resultado en pantalla utilizando el nuevo archivo CSS
    resNombre.textContent = local.nombre;
    resDireccion.textContent = local.direccion;
    resHorario.textContent = `Horario de hoy: ${apertura} a ${cierre} hrs.`;
    // === LÍNEAS DE PRUEBA (Bórralas después) ===
    console.log("Hora actual:", horaActualStr);
    console.log("Horario local:", apertura, "a", cierre);
    console.log("¿Está abierto?:", estaAbierto);
    console.log("Elemento badge:", resBadge);
    // ===========================================

    if (estaAbierto) {
        resultado.style.backgroundColor = "#f0fdf4";
        resultado.style.borderColor = "#bbf7d0";
        resBadge.style.backgroundColor = "#22c55e";
        resBadge.style.color = "#ffffff";
        resBadge.textContent = "🟢 Abierto Ahora";
    } else {
        resultado.style.backgroundColor = "#fef2f2";
        resultado.style.borderColor = "#fca5a5";
        resBadge.style.backgroundColor = "#ef4444";
        resBadge.style.color = "#ffffff";
        resBadge.textContent = "🔴 Cerrado";
    }
    if (estaAbierto) {
        // ... tus estilos de abierto ...
    } else {
        // ... tus estilos de cerrado ...
    } // <-- ASEGÚRATE DE QUE ESTA LLAVE ESTÉ AQUÍ

    resultado.classList.remove('hidden');
}); // <-- Esta llave y paréntesis cierran el addEventListener