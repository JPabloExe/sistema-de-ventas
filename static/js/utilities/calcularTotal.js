import { formatearCOP } from "./moneda.js";

export function recalcularTotal(lblTotal) {
    let totalGeneral = 0;
    // Seleccionamos todos los productos que existen en el carrito en este momento
    const todosLosProductos = document.querySelectorAll(".div-carrito .producto");

    todosLosProductos.forEach(producto => {
        const precio = parseFloat(producto.dataset.precio);
        const cantidad = parseInt(producto.querySelector(".input-cantidad").value) || 0;

        totalGeneral += precio * cantidad;
    });

    lblTotal.textContent = `COP ${formatearCOP(totalGeneral)}`;
    return totalGeneral;

}