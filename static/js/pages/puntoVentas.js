import { activarSidebar } from "../components/sidebar.js";

import { mostrarToast } from "../components/toast.js";

import { formatearCOP } from "../utilities/moneda.js";

import { total } from "../ui/puntoVentasUI.js";

import {
    limpiarCarrito,
    productosEnCarrito,
    calcularVueltos,
    recalcularTotal,
    limpiarInputsPago
} from "../ui/puntoVentasUI.js";

import {
    agregarProductosAlcarritoController,
    realizarVentaController
} from "../controllers/puntoVentasController.js";

document.addEventListener("DOMContentLoaded", () => {
    activarSidebar();
});

// Realizar venta
document.addEventListener("DOMContentLoaded", () => {
    const cantidad = document.getElementById("cantidad");
    const botonProcesar = document.getElementById("btn-procesar-venta");
    const botonLimpiar = document.getElementById("btn-limpiar-carrito");
    const montoRecibido = document.getElementById("recibido");

    botonProcesar.addEventListener("click", () => {
        if (montoRecibido.value === "") {
            mostrarToast("Debe ingresar el monto", "exception");
            return;
        }
        
        if (montoRecibido.value < total) {
            mostrarToast("Monto menor al total de la venta", "exception");
            return;
        }
        
        realizarVentaController();
        limpiarCarrito();   
        cantidad.textContent = `(${productosEnCarrito()} productos)`;
    });
    
    botonLimpiar.addEventListener("click", () => {
        limpiarCarrito();
        limpiarInputsPago();
        cantidad.textContent = `(${productosEnCarrito()} productos)`;
    });
});


// Agrega producto al carrito
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input-producto-carrito");

    input.addEventListener("input", () => {

        if (input.value.trim().length === 4) {
            agregarProductosAlcarritoController(input.value.trim());
        }
    });
});

// Recalcula el subtotal de un producto dependiendo de la cantidad
document.addEventListener("DOMContentLoaded", () => {

    recalcularTotal();

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

        if (typeof recalcularTotal === "function") recalcularTotal();
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
            if (typeof recalcularTotal === "function") recalcularTotal();
            cantidad.textContent = `(${productosEnCarrito()} productos)`;

        }
    });
});


// Calcular Vueltos
document.addEventListener("DOMContentLoaded", () => {

    const recibidoInput = document.getElementById("recibido");

    recibidoInput.addEventListener("input", () => {
        calcularVueltos();
    });

});
