import { activarSidebar } from "../components/sidebar.js";

import {
    obtenerDatosFormularioUsuarios,
    limpiarFormulario,
    llenarTablaUsuarios,
    llenarFormularioUsuarios
} from "../ui/usuariosUI.js"

import {
    registrarUsuarioController,
    cargarUsuarios,
    eliminarUsuarioController,
    buscarUsuarioController,
    actualizarUsuarioController
} from "../controllers/usuariosController.js";

document.addEventListener("DOMContentLoaded", () => {

    activarSidebar();
    cargarUsuarios();

});

// Registrar y actualizar usuarios
document.addEventListener("DOMContentLoaded", () => {

    const botonAbrir = document.getElementById("btn-nuevo-usuario");
    const botonCerrar = document.getElementById("btn-cancelar");
    const dialog = document.getElementById("dialog-usuarios");
    const btnAccion = document.getElementById("btn-accion-dialog-usuarios");
    const form = document.getElementById("form-usuarios");
    const tbody = document.getElementById("tbody-usuarios");

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
            llenarFormularioUsuarios(boton);
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

            await registrarUsuarioController();

        } else if (modo === "actualizar") {

            await actualizarUsuarioController();

        }

        await cargarUsuarios();
        limpiarFormulario(form);
    });

});

// Eliminar Usuarios
document.addEventListener("DOMContentLoaded", () => {

    const btnConfirmar = document.getElementById("btn-confirmar-borrado");
    const btnCancelar = document.getElementById("btn-cancelar-confirmacion");
    const dialogConfirmacion = document.getElementById("dialog-eliminar");
    const tbody = document.getElementById("tbody-usuarios");
    
    let cedulaAEliminar = null;
    
    tbody.addEventListener("click", (e) => {
        const botonEliminar = e.target.closest(".btn-eliminar");
    
        if (botonEliminar) {
            cedulaAEliminar = botonEliminar.dataset.cedula;
            dialogConfirmacion.showModal();
        }
    });
    
    btnCancelar.addEventListener("click", () => {
        dialogConfirmacion.close();
    });
    
    btnConfirmar.addEventListener("click", () => {
        if (cedulaAEliminar) {
            eliminarUsuarioController(cedulaAEliminar);
            cargarUsuarios();
            dialogConfirmacion.close();
        }
    });
}); 

// Buscar usuario
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("input-buscar-usuarios");

    input.addEventListener("input", () => {

        if (input.value.trim() === "") {
            cargarUsuarios();
        }

        if (input.value.trim().length < 8) {
            return;
        }

        buscarUsuarioController(input.value.trim());
    });
});