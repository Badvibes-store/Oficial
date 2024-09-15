// Obtenemos el carrito del almacenamiento local
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Seleccionamos los elementos del DOM
const carritoItems = document.getElementById('carrito-items');
const comprarBtn = document.getElementById('comprar-btn');

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    // Limpiar la vista del carrito
    carritoItems.innerHTML = '';

    // Si el carrito está vacío
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p>Tu carrito está vacío.</p>';
        comprarBtn.style.display = 'none';
        return;
    }

    // Agrupar productos similares y mostrar
    const productosAgrupados = carrito.reduce((acc, item) => {
        if (!acc[item.producto]) {
            acc[item.producto] = { ...item, cantidad: 0 };
        }
        acc[item.producto].cantidad += 1
