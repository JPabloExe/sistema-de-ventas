import { activarSidebar } from "../components/sidebar.js";

import { botonDesplegableCompras } from "../utilities/botonDesplegable.js";

import {
    registrarProveedorController,
    actualizarProveedorController,
    cargarProveedoresController
} from "../controllers/proveedoresController.js";

import {
    limpiarFormulario,
    llenarFormularioProveedores
} from "../ui/proveedoresUI.js";

// Cargar proveedores
document.addEventListener("DOMContentLoaded", () => {

    activarSidebar();
    botonDesplegableCompras();
    cargarProveedoresController();

});

// Registrar y actualizar proveedores
document.addEventListener("DOMContentLoaded", () => {

    const botonAbrir = document.getElementById("btn-nuevo-proveedor");
    const botonCerrar = document.getElementById("btn-cancelar-proveedores");
    const dialog = document.getElementById("dialog-proveedores");
    const btnAccion = document.getElementById("btn-accion-dialog-proveedores");
    const form = document.getElementById("form-proveedores");
    const tbody = document.getElementById("tbody-proveedores");

    let proveedorId = null;
    let modo = null;

    botonAbrir.addEventListener("click", () => {
        modo = "registrar";
        limpiarFormulario(form);
        btnAccion.textContent = "Registrar";

        dialog.showModal();
    });

    tbody.addEventListener("click", (e) => {
        const boton = e.target.closest(".btn-actualizar");

        if (boton) {
            modo = "actualizar";
            proveedorId = boton.dataset.id;
            llenarFormularioProveedores(boton);
            btnAccion.textContent = "Actualizar";

            dialog.showModal();
        }
    });

    botonCerrar.addEventListener("click", () => {
        dialog.close();
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (modo === "registrar") {

            await registrarProveedorController();

        } else if (modo === "actualizar") {

            await actualizarProveedorController(proveedorId);

        }

        await cargarProveedoresController();
        limpiarFormulario(form);
    });

});


// Recargar Pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.reload();
    });
});
