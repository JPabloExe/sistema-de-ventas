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

    const respuesta = await fetch(`${URL_API}/obtenerCompras`)

    return await respuesta.json()

}

export async function obtenerDetalles(id_compra) {

    const respuesta = await fetch(`${URL_API}/obtenerDetalles?id_compra=${id_compra}`)

    return await respuesta.json()

}

export async function obtenerMetodosPago() {

    const respuesta = await fetch(`${URL_API}/obtenerMetodosPago`);

    return await respuesta.json();

}

export async function obtenerEstadosCompra() {

    const respuesta = await fetch(`${URL_API}/obtenerEstadosCompra`);

    return await respuesta.json();

}