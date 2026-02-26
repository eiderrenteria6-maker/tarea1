/**
 * INVENTECH PRO - LOGIC ENGINE
 */

// --- ESTADO GLOBAL ---
let productos = JSON.parse(localStorage.getItem('it_productos')) || [
    { id: 1, nombre: "MacBook Pro M2", categoria: "Electrónica", stock: 12 },
    { id: 2, nombre: "Escritorio Ergonómico", categoria: "Mobiliario", stock: 4 }
];
let movimientos = JSON.parse(localStorage.getItem('it_movimientos')) || [];
let rolActual = 'admin';

// --- PERSISTENCIA ---
const sincronizar = () => {
    localStorage.setItem('it_productos', JSON.stringify(productos));
    localStorage.setItem('it_movimientos', JSON.stringify(movimientos));
    render();
};

// --- CONTROL DE ROLES ---
window.cambiarRol = (rol) => {
    rolActual = rol;
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${rol}`).classList.add('active');
    render();
};

// --- CONTROL DE STOCK AUTOMÁTICO ---
window.operarStock = (id, tipo) => {
    const prod = productos.find(p => p.id === id);
    if (!prod) return;

    if (tipo === 'salida' && prod.stock <= 0) {
        alert("¡Error! No hay stock disponible para retirar.");
        return;
    }

    prod.stock += (tipo === 'entrada' ? 1 : -1);

    // Registro de Historial (Requisito Obligatorio)
    movimientos.unshift({
        id: Date.now(),
        nombre: prod.nombre,
        tipo: tipo,
        fecha: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        rol: rolActual
    });

    if (movimientos.length > 10) movimientos.pop(); // Mantener historial limpio
    sincronizar();
};

// --- CRUD: ELIMINAR ---
window.eliminar = (id) => {
    if (confirm('¿Desea eliminar este producto de forma permanente?')) {
        productos = productos.filter(p => p.id !== id);
        sincronizar();
    }
};

// --- RENDERIZADO PROFESIONAL ---
const render = () => {
    const lista = document.getElementById('lista-productos');
    const historial = document.getElementById('historial-movimientos');
    const statsContainer = document.getElementById('dashboard-stats');
    const btnNuevo = document.getElementById('btn-nuevo');

    // 1. Visibilidad según Rol
    const isAdmin = rolActual === 'admin';
    btnNuevo.style.display = isAdmin ? 'block' : 'none';
    statsContainer.style.display = isAdmin ? 'grid' : 'none';

    // 2. Render de Estadísticas
    if (isAdmin) {
        const bajoStock = productos.filter(p => p.stock < 5).length;
        statsContainer.innerHTML = `
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-fade">
                <p class="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Productos</p>
                <p class="text-3xl font-black text-slate-800">${productos.length}</p>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-fade">
                <p class="text-slate-500 text-xs font-bold uppercase tracking-wider">Bajo Stock</p>
                <p class="text-3xl font-black text-red-500">${bajoStock}</p>
            </div>
            <div class="bg-blue-600 p-6 rounded-2xl shadow-lg shadow-blue-100 animate-fade">
                <p class="text-blue-100 text-xs font-bold uppercase tracking-wider">Movimientos</p>
                <p class="text-3xl font-black text-white">${movimientos.length}</p>
            </div>
        `;
    }

    // 3. Render de Tabla
    lista.innerHTML = productos.map(p => `
        <tr class="animate-fade">
            <td class="px-6 py-4 font-semibold text-slate-700">${p.nombre}</td>
            <td class="px-6 py-4 text-slate-500 text-sm">${p.categoria}</td>
            <td class="px-6 py-4 text-center">
                <span class="px-3 py-1 rounded-full text-xs font-bold ${p.stock < 5 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}">
                    ${p.stock} Unidades
                </span>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
                <button onclick="operarStock(${p.id}, 'entrada')" class="p-2 hover:bg-slate-100 rounded-lg text-blue-600" title="Entrada">↑</button>
                <button onclick="operarStock(${p.id}, 'salida')" class="p-2 hover:bg-slate-100 rounded-lg text-orange-600" title="Salida">↓</button>
                ${isAdmin ? `<button onclick="eliminar(${p.id})" class="p-2 hover:bg-red-50 rounded-lg text-red-500" title="Eliminar">🗑</button>` : ''}
            </td>
        </tr>
    `).join('');

    // 4. Historial
    historial.innerHTML = movimientos.length ? movimientos.map(m => `
        <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 animate-fade">
            <div class="w-2 h-2 rounded-full ${m.tipo === 'entrada' ? 'bg-green-500' : 'bg-orange-500'}"></div>
            <div class="flex-1">
                <p class="text-sm font-bold text-slate-700">${m.nombre}</p>
                <p class="text-[10px] text-slate-400 uppercase">${m.tipo} • ${m.fecha} • ${m.rol}</p>
            </div>
        </div>
    `).join('') : '<p class="text-slate-400 text-sm text-center py-4 italic">No hay registros hoy</p>';
};

// --- MODAL CONTROL ---
window.abrirModal = () => document.getElementById('modal-container').classList.remove('hidden');
window.cerrarModal = () => document.getElementById('modal-container').classList.add('hidden');

document.getElementById('form-producto').onsubmit = (e) => {
    e.preventDefault();
    const nuevo = {
        id: Date.now(),
        nombre: document.getElementById('prod-nombre').value,
        categoria: document.getElementById('prod-categoria').value,
        stock: parseInt(document.getElementById('prod-stock').value)
    };
    productos.push(nuevo);
    sincronizar();
    cerrarModal();
    e.target.reset();
};

// Arranque
render();