import { activarSidebar } from "../components/sidebar.js";

import { 
    obtenerDatosFormularioUsuarios,
    limpiarFormulario,
    llenarTablaUsuarios,
    inicializarDialogEliminar
} from "../ui/usuariosUI.js"

import {
    registrarUsuarioController,
    cargarUsuarios,
    eliminarUsuarioController
} from "../controllers/usuariosController.js";

document.addEventListener("DOMContentLoaded", () => {
    
    inicializarDialogEliminar(eliminarUsuarioController);
    activarSidebar();
    cargarUsuarios();
    
});

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form-registrar-usuarios');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        await registrarUsuarioController();
        await cargarUsuarios();
        limpiarFormulario();

    });

});
