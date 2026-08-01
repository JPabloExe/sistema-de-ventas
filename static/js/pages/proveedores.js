import { activarSidebar } from "../components/sidebar.js";

import { botonDesplegableCompras } from "../utilities/botonDesplegable.js";

import {
    registrarProveedorController,
    actualizarProveedorController,
    eliminarProveedorController,
    cargarProveedoresController,
    cargarEstadosProveedoresController
} from "../controllers/proveedoresController.js";

import {
    limpiarFormulario,
    llenarFormularioProveedores
} from "../ui/proveedoresUI.js";

// Cargar proveedores
document.addEventListener("DOMContentLoaded", () => {

    const selectEstadosProveedores = document.getElementById("select-estado");

    activarSidebar();
    botonDesplegableCompras();
    cargarProveedoresController();
    cargarEstadosProveedoresController(selectEstadosProveedores);

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
        const boton = e.target.closest(".actualizar");

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
            dialog.close();

        } else if (modo === "actualizar") {

            await actualizarProveedorController(proveedorId);
            dialog.close();

        }

        await cargarProveedoresController();
        limpiarFormulario(form);
    });

});

// Eliminar Proveedor
document.addEventListener("DOMContentLoaded", () => {

    const btnConfirmar = document.getElementById("btn-confirmar-borrado");
    const btnCancelar = document.getElementById("btn-cancelar-confirmacion");
    const dialogConfirmacion = document.getElementById("dialog-eliminar");
    const tituloDialog = document.getElementById("titulo");
    const tbody = document.getElementById("tbody-proveedores");

    let proveedorId = null;

    tbody.addEventListener("click", (e) => {
        const botonEliminar = e.target.closest(".eliminar");

        if (botonEliminar) {
            tituloDialog.textContent = "¿Deseas eliminar a este proveedor?";
            proveedorId = botonEliminar.dataset.id;
            dialogConfirmacion.showModal();
        }
    });

    btnCancelar.addEventListener("click", () => {
        dialogConfirmacion.close();
    });

    btnConfirmar.addEventListener("click", async () => {
        if (proveedorId) {
            await eliminarProveedorController(proveedorId);
            await cargarProveedoresController();
            dialogConfirmacion.close();
        }
    });

});

// Recargar Pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.reload();
    });
});
