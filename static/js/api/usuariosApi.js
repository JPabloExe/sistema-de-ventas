import { URL_API } from "../config/config.js";

export async function registrarUsuario(usuario) {

    const respuesta = await fetch(`${URL_API}/registrarUsuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });

    return await respuesta.json();

}

export async function obtenerUsuarios() {

    const respuesta = await fetch(`${URL_API}/obtenerUsuarios`);

    return await respuesta.json();

}

export async function eliminarUsuario(cedula) {

    const respuesta = await fetch(`${URL_API}/eliminarUsuario?cedula=${cedula}`, {
        method: "DELETE"
    });

    return await respuesta.json();

}

export async function buscarUsuario(cedula) {

    const respuesta = await fetch(`${URL_API}/buscarUsuario?cedula=${cedula}`, {
        method: "GET"
    });

    return await respuesta.json();

}

export async function actualizarUsuario(datosActualizados) {

    const respuesta = await fetch(`${URL_API}/actualizarUsuario`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados)
    });

    return await respuesta.json();

}

export async function usuarioActual() {

    const respuesta = await fetch(`${URL_API}/usuarioActual`);

    return await respuesta.json();

}