import { URL_API } from "../config/config.js";

export async function iniciarSesion(datos) {

    const respuesta = await fetch(`${URL_API}/iniciarSesion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    return await respuesta.json();

}

export async function cerrarSesion() {

    const respuesta = await fetch(`${URL_API}/cerrarSesion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });

    return await respuesta.json();

}