// Inicializamos el carrito o lo obtenemos del almacenamiento local
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Seleccionamos los botones de "Añadir al carrito"
const botonesAñadir = document.querySelectorAll('.add-to-cart');

// Manejamos el evento de añadir productos al carrito
botonesAñadir.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const producto = e.target.getAttribute('data-product');
        const precio = parseFloat(e.target.getAttribute('data-price'));
        const imagen = e.target.parentElement.querySelector('img').src;

        // Añadir el producto al carrito
        carrito.push({ producto, precio, imagen });

        // Guardar el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualizar el número de productos en el carrito
        actualizarCarrito();
    });
});

// Actualiza el número de productos en el carrito
function actualizarCarrito() {
    const carritoCount = document.getElementById('carrito-count');
    carritoCount.textContent = carrito.length;
}

// Actualizamos el contador del carrito al cargar la página
actualizarCarrito();

