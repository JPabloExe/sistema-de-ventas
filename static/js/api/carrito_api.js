async function agregarAlCarrito(codigo) {

    const divCarrito = document.querySelector(".div-carrito");
    const cantidad = document.getElementById("cantidad");

    const respuesta = await fetch(`${URL_API}/buscarProducto?codigo=${codigo}`, {
        method: "POST"
    });

    if (!respuesta.ok) {
        mostrarToast("Ocurrio un error", "error");
        return;
    }

    const info = await respuesta.json();

    if (info["mensaje"] == "n") {
        mostrarToast("Producto no encontrado", "error");
        return;
    }

    const producto = info["producto"];

    const contenedor = document.createElement("div")

    contenedor.innerHTML = `
        <div class="producto" 
        data-codigo="${producto['codigo']}"
        data-precio="${producto['valor_unitario']}">

            
            <div class="div-info">
                <b>${producto['nombre']}</b>
                <p>Codigo: ${producto['codigo']}</p>
            </div>

            <div class="div-cantidad">
                <button class="btn-disminuir">-</button>
                <input class="input-cantidad" type="number" value="1" min="1">
                <button class="btn-aumentar">+</button>
            </div>

            <div class="div-subtotal">
                <b class="subtotal">COP ${formatearCOP(producto['valor_unitario'])}</b>
                <button class="btn-borrar">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>`;
    divCarrito.appendChild(contenedor);

    mostrarToast("Producto agregado al carrito", "success");
    recalcularTotal();
    cantidad.textContent = `(${productosEnCarrito()} productos)`;
};
