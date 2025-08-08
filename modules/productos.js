export function obtenerProductos() {
    fetch('https://funval-backend.onrender.com/productos')
        .then(respuesta => respuesta.json())
        .then(productos => mostrarProductos(productos))
        .catch(error => console.error('Error al obtener productos:', error));
}

obtenerProductos();

function mostrarProductos(productos) {
    const contenedor = document.getElementById('contenedorProducto');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card');

        tarjeta.innerHTML = `
        <div class="bg-green-600 text-white font-bold grid place-items-center gap-2 pt-6 pb-6 w-auto rounded-2xl" >
        <img src="./saladix-picante.jpg" alt="" class="rounded-2xl mt-2 mb-8">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p>$ ${producto.precio}</p>
        <p>stock (${producto.stock})</p>
        <button class="bg-red-500 p-4 hover:bg-red-700 rounded-2xl">Agregar al Carrito</button>
        </div>
    `;

        contenedor.appendChild(tarjeta);
    });
}