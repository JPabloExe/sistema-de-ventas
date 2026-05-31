import { activarSidebar } from "../components/sidebar.js";

import {
    registrarUsuarioController,
    cargarUsuarios
} from "../controllers/usuariosController.js";

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form-registrar-usuarios');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        await registrarUsuarioController();
        await cargarUsuarios();

    });

});

document.addEventListener('DOMContentLoaded', () => {

    activarSidebar();
    cargarUsuarios();

});