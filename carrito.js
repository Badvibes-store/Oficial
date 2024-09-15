// carrito.js

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones de añadir al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Obtén el producto relacionado
            const productElement = event.target.closest('.producto');
            const productName = productElement.querySelector('h3').innerText;
            const productPrice = productElement.querySelector('p').innerText;
            
            // Añade el producto al carrito
            addToCart(productName, productPrice);
        });
    });
});

function addToCart(name, price) {
    // Aquí se puede implementar la lógica para añadir al carrito
    console.log(`Añadido al carrito: ${name} - ${price}`);
    
    // Actualiza el contador del carrito
    const carritoCount = document.getElementById('carrito-count');
    carritoCount.innerText = parseInt(carritoCount.innerText) + 1;
}
