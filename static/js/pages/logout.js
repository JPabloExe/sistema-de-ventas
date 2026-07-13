import { cerrarSesionController } from "../controllers/loginController.js";

document.addEventListener("DOMContentLoaded", () => {

    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

    btnCerrarSesion.addEventListener("click", async () => {

        console.log("hola");
        await cerrarSesionController();

    });

});