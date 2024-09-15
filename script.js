// Inicializamos el carrito como un array vacío
let carrito = [];

// Seleccionamos los botones de "Añadir al carrito"
const botonesAñadir = document.querySelectorAll('.add-to-cart');

// Manejamos el evento de añadir productos al carrito
botonesAñadir.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const producto = e.target.getAttribute('data-product');
        const precio = parseFloat(e.target.getAttribute('data-price'));

        // Añadir el producto al carrito
        carrito.push({ producto, precio });

        // Actualizar el número de productos en el carrito
        actualizarCarrito();
    });
});

// Actualiza el contenido del carrito en la sección correspondiente
function actualizarCarrito() {
    const carritoCount = document.getElementById('carrito-count');
    const carritoItems = document.getElementById('carrito-items');
    const comprarBtn = document.getElementById('comprar-btn');

    carritoCount.textContent = carrito.length;

    // Limpiar el carrito visualmente
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
        productoDiv.innerHTML = `${item.producto} - $${item.precio.toFixed(2)} <button class="remove-item" data-index="${index}">Quitar</button>`;
        carritoItems.appendChild(productoDiv);
    });

    // Mostrar el botón de comprar
    comprarBtn.style.display = 'block';

    // Añadir funcionalidad para quitar productos del carrito
    const botonesQuitar = document.querySelectorAll('.remove-item');
    botonesQuitar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            carrito.splice(index, 1);
            actualizarCarrito();
        });
    });
}

// Manejamos el evento de "Comprar"
const comprarBtn = document.getElementById('comprar-btn');
comprarBtn.addEventListener('click', () => {
    alert('Gracias por tu compra!');
    carrito = [];  // Vaciamos el carrito
    actualizarCarrito();  // Actualizamos la vista del carrito
});
