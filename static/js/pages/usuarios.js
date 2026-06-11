import { activarSidebar } from "../components/sidebar.js";

import {
    obtenerDatosFormularioUsuarios,
    limpiarFormulario,
    llenarTablaUsuarios,
    inicializarDialogEliminar,
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

    inicializarDialogEliminar(eliminarUsuarioController);
    activarSidebar();
    cargarUsuarios();

});

// Registrar usuarios
document.addEventListener("DOMContentLoaded", () => {

    const botonAbrirRegistrar = document.getElementById("btn-nuevo-usuario");
    const botonCerrar = document.getElementById("btn-cancelar");
    const dialog = document.getElementById("dialog-usuarios");
    const btnAccion = document.getElementById("btn-accion-dialog");
    const form = document.getElementById("form-usuarios");
    const tbody = document.getElementById("tbody-usuarios");

    let modo = null;

    tbody.addEventListener("click", (e) => {
        const boton = e.target.closest(".btn-actualizar");

        if (boton) {
            modo = "actualizar";

            llenarFormularioUsuarios(boton);
            
            btnAccion.textContent = "Actualizar";

            dialog.showModal();
        }
    });


    botonAbrirRegistrar.addEventListener("click", () => {
        modo = "registrar";
        limpiarFormulario(form);
        btnAccion.textContent = "Registrar";

        dialog.showModal();
    });


    botonCerrar.addEventListener("click", () => {
        dialog.close();
    });


    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (modo === "registrar") {

            await registrarUsuarioController();
            console.log('entro a registrar');

        } else if (modo === "actualizar") {

            await actualizarUsuarioController();
            console.log('entro a actualizar');

        }

        await cargarUsuarios();
        limpiarFormulario(form);
    });

});

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form-usuarios');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        await registrarUsuarioController();

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