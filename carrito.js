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
        acc[item.producto].cantidad += 1;
        return acc;
    }, {});

    for (const producto in productosAgrupados) {
        const item = productosAgrupados[producto];
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <img src="${item.imagen}" alt="${item.producto}" width="100">
            <p>${item.producto} - $${item.precio.toFixed(2)} x ${item.cantidad}</p>
            <button class="remove-item" data-product="${item.producto}">Quitar 1</button>
        `;
        carritoItems.appendChild(productoDiv);
    }

    // Mostrar el botón de comprar si hay productos
    comprarBtn.style.display = 'block';

    // Añadir funcionalidad para quitar productos del carrito
    const botonesQuitar = document.querySelectorAll('.remove-item');
    botonesQuitar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const producto = e.target.getAttribute('data-product');
            const index = carrito.findIndex(item => item.producto === producto);
            if (index !== -1) {
                carrito.splice(index, 1);  // Eliminar el primer producto encontrado
                localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizamos localStorage
                actualizarCarrito(); // Actualizamos la vista del carrito
            }
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
