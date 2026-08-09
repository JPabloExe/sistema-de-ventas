import { URL_API } from "../config/config.js";

export async function realizarCompra(datos) {

    const respuesta = await fetch(`${URL_API}/realizarCompra`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })

    return await respuesta.json()

}

export async function obtenerCompras(datos) {

    const respuesta = await
        fetch(`${URL_API}/obtenerCompras?id_proveedor=${datos.id_proveedor}&id_estado=${datos.id_estado}`)

    return await respuesta.json()

}

export async function buscarCompra(num_factura) {

    const respuesta = await fetch(`${URL_API}/buscarCompra?num_factura=${num_factura}`)

    return await respuesta.json()

}

export async function eliminarCompra(id_compra) {

    const respuesta = await fetch(`${URL_API}/eliminarCompra?id_compra=${id_compra}`, {
        method: 'DELETE'
    })

    return await respuesta.json();

}

export async function obtenerDetalles(id_compra) {

    const respuesta = await fetch(`${URL_API}/obtenerDetallesCompra?id_compra=${id_compra}`)

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

export async function recibirCompra(datos) {

    const respuesta = await fetch(`${URL_API}/recibirCompra`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })

    return await respuesta.json();

}