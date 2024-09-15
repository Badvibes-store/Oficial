document.addEventListener('DOMContentLoaded', () => {
    // Cargar carrito desde el almacenamiento local
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function actualizarCarrito() {
        const carritoContenedor = document.getElementById('carrito-items');
        const carritoTotal = document.getElementById('carrito-total');
        carritoContenedor.innerHTML = ''; // Limpiar carrito

        if (carrito.length === 0) {
            carritoContenedor.innerHTML = '<p>El carrito está vacío.</p>';
            carritoTotal.textContent = 'Total: $0 COP';
            return;
        }

        let total = 0;

        carrito.forEach(item => {
            const div = document.createElement('div');
            div.className = 'carrito-item';
            div.innerHTML = `
                <p>${item.producto} - $${item.precio} COP</p>
                <button class="quitar-item" data-product="${item.producto}">Quitar 1</button>
                <span class="cantidad">x${item.cantidad}</span>
            `;
            carritoContenedor.appendChild(div);
            total += item.precio * item.cantidad;
        });

        carritoTotal.textContent = `Total: $${total} COP`;

        // Guardar cambios en el almacenamiento local
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Manejar eventos de "Quitar 1"
    document.getElementById('carrito-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('quitar-item')) {
            const producto = event.target.getAttribute('data-product');

            // Encontrar el índice del producto en el carrito
            const index = carrito.findIndex(item => item.producto === producto);
            if (index !== -1) {
                carrito[index].cantidad--;

                if (carrito[index].cantidad <= 0) {
                    carrito.splice(index, 1); // Eliminar el producto si la cantidad es 0
                }

                actualizarCarrito(); // Actualizar carrito en la interfaz
            }
        }
    });

    // Manejar el evento de "Vaciar carrito"
    document.getElementById('vaciar-carrito-btn').addEventListener('click', () => {
        localStorage.removeItem('carrito');
        actualizarCarrito(); // Actualizar carrito en la interfaz
    });

    actualizarCarrito(); // Inicializar carrito
});
