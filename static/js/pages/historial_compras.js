import { activarSidebar } from "../components/sidebar.js";

import { botonDesplegableCompras } from "../utilities/botonDesplegable.js";

import {
    cargarCompras,
    obtenerDetallesController,
    cargarProveedoresController,
    cargarInputBusquedaController
} from "../controllers/comprasController.js";

document.addEventListener('DOMContentLoaded', () => {

    const selectProveedoresAcciones = document.getElementById("select-proveedores-acciones");

    activarSidebar();
    botonDesplegableCompras();
    cargarCompras();
    cargarProveedoresController(selectProveedoresAcciones);
    cargarInputBusquedaController();
});

// Buscar Compra
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("input-buscar");
    input.setAttribute("placeholder", "Buscar compra por numero");

    input.addEventListener("input", () => {

        if (input.value.trim() === "") {
            cargarCompras();
        }
        if (input.value.trim().length >= 1) {
            buscarCompraController(input.value.trim());
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.getElementById("dialog-detalles");
    const tbody = document.getElementById("tbody-compras");
    const btnCerrar = document.getElementById("btn-cerrar-detalles");
    const btnX = document.getElementById("btn-x-detalles");
    const lblNumeroOperacion = document.getElementById("lbl-numero-operacion");
    const lblTituloOperacion = document.getElementById("lbl-titulo-operacion");
    const lblUsuario = document.getElementById("lbl-usuario");

    tbody.addEventListener("click", (e) => {
        const boton = e.target.closest(".detalles");

        if (boton) {
            obtenerDetallesController(boton)
            lblTituloOperacion.textContent = "Detalles de la Compra";
            lblNumeroOperacion.textContent = "N° Factura";
            lblUsuario.textContent = "Proveedor";

            dialog.showModal();
        }
    });

    btnX.addEventListener("click", () => {
        dialog.close();
    });

    btnCerrar.addEventListener("click", () => {
        dialog.close();
    });
});