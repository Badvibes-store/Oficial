// Obtenemos el carrito del almacenamiento local
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Seleccionamos los elementos del DOM
const carritoItems = document.getElementById('carrito-items');
const comprarBtn = document.getElementById('comprar-btn');

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    // Limpiar la vista del carrito
    carritoItems.innerHTML = '';

    // Agrupar productos por nombre
    const productosAgrupados = carrito.reduce((acc, item) => {
        if (!acc[item.producto]) {
            acc[item.producto] = { ...item, cantidad: 1 };
        } else {
            acc[item.producto].cantidad += 1;
        }
        return acc;
    }, {});

    const productosArray = Object.values(productosAgrupados);

    // Si el carrito está vacío
    if (productosArray.length === 0) {
        carritoItems.innerHTML = '<p>Tu carrito está vacío.</p>';
        comprarBtn.style.display = 'none';
        return;
    }

    // Si hay productos en el carrito, los mostramos
    productosArray.forEach((item, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <img src="${item.imagen}" alt="${item.producto}" width="100">
            <p>${item.producto} - $${(item.precio * item.cantidad).toFixed(2)} (${item.cantidad}x)</p>
            <button class="remove-item" data-product="${item.producto}">Quitar 1</button>
        `;
        carritoItems.appendChild(productoDiv);
    });

    // Mostrar el botón de comprar si hay productos
    comprarBtn.style.display = 'block';

    // Añadir funcionalidad para quitar productos del carrito
    const botonesQuitar = document.querySelectorAll('.remove-item');
    botonesQuitar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const producto = e.target.getAttribute('data-product');
            // Encontrar el índice del primer producto del tipo seleccionado
            const index = carrito.findIndex(item => item.producto === producto);
            if (index !== -1) {
                carrito[index].cantidad -= 1;
                // Eliminar el producto del carrito si la cantidad llega a 0
                if (carrito[index].cantidad <= 0) {
                    carrito.splice(index, 1);
                }
            }
            localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizamos localStorage
            actualizarCarrito();
        });
    });
}

// Manejamos el evento de "Comprar"
comprarBtn.addEventListener('click', () => {
    alert('Gracias por tu compra!');
    carrito = [];  // Vaciamos el carrito
    localStorage.removeItem('carrito');  // Limpiamos el almacenamiento local
    actualizarCarrito();  // Actualizamos la vista del carrito
});

// Actualizamos el contenido del carrito al cargar la página
actualizarCarrito();
