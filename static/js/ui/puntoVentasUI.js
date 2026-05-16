import { formatearCOP } from "../utilities/moneda.js";

export function obtenerProductosDeCarrito() {

    const productos = document.querySelectorAll(".producto");

    const productosEnCarrito = [];

    productos.forEach(producto => {
        productosEnCarrito.push({
            "codigo": producto.dataset.codigo,
            "cantidad": Number(producto.querySelector(".input-cantidad").value)
        });
    });

    return productosEnCarrito;
}

export function productosEnCarrito() {
    let cantidad = 0;

    const productos = document.querySelectorAll(".div-carrito .producto");

    productos.forEach(producto => {
        cantidad++;
    });

    return cantidad;
};

export function limpiarCarrito() {
    const carrito = document.querySelectorAll(".div-carrito .producto");

    carrito.forEach(producto => {
        producto.remove();
    });

    recalcularTotal();
};

export function limpiarInputsPago() {

    document.getElementById("recibido").value = "";
    document.getElementById("estadoPago").textContent = "";
    calcularVueltos();

}

export function agregarProductoAlCarrito(producto) {

    const input = document.getElementById("input-producto-carrito");
    const divCarrito = document.querySelector(".div-carrito");
    const cantidad = document.getElementById("cantidad");

    cantidad.style.color = "gray";

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

    cantidad.textContent = `(${productosEnCarrito()} productos)`;
    input.value = "";

}

let total = 0;

export function recalcularTotal() {
    let totalGeneral = 0;
    // Seleccionamos todos los productos que existen en el carrito en este momento
    const todosLosProductos = document.querySelectorAll(".div-carrito .producto");

    todosLosProductos.forEach(producto => {
        const precio = parseFloat(producto.dataset.precio);
        const cantidad = parseInt(producto.querySelector(".input-cantidad").value) || 0;

        totalGeneral += precio * cantidad;
    });

    // Buscamos el elemento donde quieres mostrar el gran total
    const lblTotal = document.getElementById("totalPagar");
    if (lblTotal) {
        lblTotal.value = `COP ${formatearCOP(totalGeneral)}`;
        total = totalGeneral;
        calcularVueltos();
    }
}

const totalInput = document.getElementById("totalPagar");
const recibidoInput = document.getElementById("recibido");
const cambioInput = document.getElementById("cambio");
const estado = document.getElementById("estadoPago");

export function calcularVueltos() {
    const recibido = parseInt(recibidoInput.value) || 0;

    const cambio = recibido - total;

    cambioInput.value = cambio >= 0 ? `COP ${formatearCOP(cambio)}` : `COP ${formatearCOP(0)}`;

    if (recibido === 0) {
        estado.textContent = "";
    } else if (cambio < 0) {
        estado.textContent = "Pago incompleto";
        estado.style.color = "red";
    } else {
        estado.textContent = "Pago completo";
        estado.style.color = "green";
    }
}


export function agregarMonto(valor) {
    recibidoInput.value = (parseFloat(recibidoInput.value) || 0) + valor;
    calcularVueltos();
}
