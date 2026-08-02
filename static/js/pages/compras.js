import { activarSidebar } from "../components/sidebar.js";

import { botonDesplegableCompras } from "../utilities/botonDesplegable.js";

import { formatearCOP } from "../utilities/moneda.js";

import {
    agregarProductosAlcarritoController,
} from "../controllers/puntoVentasController.js";

import {
    limpiarCarrito,
    productosEnCarrito,
    calcularVueltos,
    limpiarInputsPago
} from "../ui/puntoVentasUI.js";

import { recalcularTotal } from "../utilities/calcularTotal.js";

import { cargarInputBusquedaController } from "../controllers/puntoVentasController.js";

import {
    realizarCompraController,
    cargarProveedoresController,
    cargarMetodosPagoController
} from "../controllers/comprasController.js";

document.addEventListener("DOMContentLoaded", () => {
    const selectProveedor = document.getElementById("select-proveedor");
    const selectMetodoPago = document.getElementById("select-metodo-pago");

    activarSidebar();
    botonDesplegableCompras();

    cargarProveedoresController(selectProveedor);
    cargarMetodosPagoController(selectMetodoPago);
    cargarInputBusquedaController();
});

document.addEventListener("DOMContentLoaded", () => {

    const btnConfirmarCompra = document.getElementById("btnConfirmarCompra");

    btnConfirmarCompra.addEventListener("click", async () => {

        await realizarCompraController();

    });

});

// Agrega producto al carrito
document.addEventListener("DOMContentLoaded", () => {
    const lblTotal = document.getElementById("totalCompra");
    const input = document.getElementById("input-buscar");
    input.setAttribute("placeholder", "Buscar producto por codigo");

    input.addEventListener("input", async () => {

        if (input.value.trim().length > 3) {
            await agregarProductosAlcarritoController(input.value.trim());
            recalcularTotal(lblTotal);
        }
    });
});

// Recalcula el subtotal de un producto dependiendo de la cantidad
document.addEventListener("DOMContentLoaded", () => {

    const lblTotal = document.getElementById("totalCompra");

    recalcularTotal(lblTotal);

    const divCarrito = document.querySelector(".div-carrito");
    const cantidad = document.getElementById("cantidad");

    // 1. Escuchar cambios en el input (escribe manual o disparado por botones)
    divCarrito.addEventListener("input", (e) => {
        if (!e.target.classList.contains("input-cantidad")) return;

        const filaProducto = e.target.closest(".producto");
        const precio = parseFloat(filaProducto.dataset.precio);
        const cantidad = parseInt(e.target.value) || 0; // || 0 por si el input queda vacío

        const subtotal = precio * cantidad;

        // Actualizamos el <b> con clase .subtotal
        filaProducto.querySelector(".subtotal").textContent = `COP ${formatearCOP(subtotal)}`;

        if (typeof recalcularTotal === "function") recalcularTotal(lblTotal);
    });

    // 2. Escuchar clics en botones (+, -, borrar)
    divCarrito.addEventListener("click", (e) => {
        // Buscamos el botón más cercano al click (por si hace click en el icono)
        const btnAumentar = e.target.closest(".btn-aumentar");
        const btnDisminuir = e.target.closest(".btn-disminuir");
        const btnBorrar = e.target.closest(".btn-borrar");

        if (btnAumentar) {
            const input = btnAumentar.closest(".producto").querySelector(".input-cantidad");
            input.value = parseInt(input.value) + 1;
            input.dispatchEvent(new Event("input", { bubbles: true })); // Forzamos la actualización
        }

        if (btnDisminuir) {
            const input = btnDisminuir.closest(".producto").querySelector(".input-cantidad");
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                input.dispatchEvent(new Event("input", { bubbles: true }));
            }
        }

        if (btnBorrar) {
            e.target.closest(".producto").remove();
            if (typeof recalcularTotal === "function") recalcularTotal(lblTotal);
            cantidad.textContent = `(${productosEnCarrito()} productos)`;

        }
    });
});
