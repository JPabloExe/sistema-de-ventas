import {
    iniciarSesionController,
} from "../controllers/loginController.js";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form-login");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        await iniciarSesionController();
    });

});

