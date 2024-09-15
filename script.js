// Mostrar la sección de productos al hacer clic en "Ver Productos"
document.getElementById('verProductos').addEventListener('click', function() {
    document.getElementById('productos').classList.toggle('hidden');
});

// Mensaje de alerta cuando el usuario hace clic en "Comprar"
const botonesCompra = document.querySelectorAll('.btn-compra');
botonesCompra.forEach(boton => {
    boton.addEventListener('click', function() {
        alert('Gracias por tu compra.');
    });
});
