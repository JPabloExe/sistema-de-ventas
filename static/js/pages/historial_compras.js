import { activarSidebar } from "../components/sidebar.js";

import { botonDesplegableCompras } from "../utilities/botonDesplegable.js";

import {
    cargarCompras,
    obtenerDetallesController,
    cargarProveedoresController
} from "../controllers/comprasController.js";

document.addEventListener('DOMContentLoaded', () => {

    const selectProveedoresAcciones = document.getElementById("select-proveedores-acciones");

    activarSidebar();
    botonDesplegableCompras();
    cargarCompras();
    cargarProveedoresController(selectProveedoresAcciones);
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