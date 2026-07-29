import { URL_API } from "../config/config.js";

export async function realizarCompra(datos) {

    const respuesta = await fetch(`${URL_API}/realizarCompra`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })

    return await respuesta.json()

}

export async function obtenerCompras() {

    const respuesta = await fetch(`${URL_API}/obtenerCompras`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    return await respuesta.json()

}