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

    // Si hay productos en el carrito, los mostramos
    carrito.forEach((item, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = 
            <img src="${item.imagen}" alt="${item.producto}" width="100">
            <p>${item.producto} - $${item.precio.toFixed(2)}</p>
            <button class="remove-item" data-index="${index}">Quitar</button>
        ;
        carritoItems.appendChild(productoDiv);
    });

    // Mostrar el botón de comprar si hay productos
    comprarBtn.style.display = 'block';

    // Añadir funcionalidad para quitar productos del carrito
    const botonesQuitar = document.querySelectorAll('.remove-item');
    botonesQuitar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            carrito.splice(index, 1);
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
