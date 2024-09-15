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

        // Comprobar si el producto ya está en el carrito
        const itemExistente = carrito.find(item => item.producto === producto);
        if (itemExistente) {
            // Si ya existe, aumentar la cantidad
            itemExistente.cantidad++;
        } else {
            // Si no existe, añadir nuevo producto con cantidad 1
            carrito.push({ producto, precio, imagen, cantidad: 1 });
        }

        // Guardar el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualizar el número de productos en el carrito
        actualizarCarrito();
    });
});

// Actualiza el número de productos en el carrito
function actualizarCarrito() {
    const carritoCount = document.getElementById('carrito-count');
    carritoCount.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
}

// Actualizamos el contador del carrito al cargar la página
actualizarCarrito();

// Manejamos el evento de "Ver Productos"
document.getElementById('ver-productos-btn').addEventListener('click', () => {
    document.getElementById('productos').classList.toggle('hidden');
});
