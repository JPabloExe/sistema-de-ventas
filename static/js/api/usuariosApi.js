import { URL_API } from "../config/config.js";

export async function registrarUsuario(usuario) {

    const respuesta = await fetch(`${URL_API}/registrarUsuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });

    return await respuesta.json()
    
}

export async function obtenerUsuarios() {

    const respuesta = fetch(`${URL_API}/obtenerUsuarios`);

    return (await respuesta).json();
    
}