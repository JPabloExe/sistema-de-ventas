import { URL_API } from "../config/config.js";

export async function registrarProveedor(datos) {

    const respuesta = await fetch(`${URL_API}/registrarProveedor`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    return respuesta.json();
}

export async function actualizarProveedor(datosActualizados, proveedorId) {

    const respuesta = await fetch(`${URL_API}/actualizarProveedor?id=${proveedorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados)
    });

    return respuesta.json();

}

export async function eliminarProveedor(proveedorId) {

    const respuesta = await fetch(`${URL_API}/eliminarProveedor?id=${proveedorId}`, {
        method: "DELETE"
    });

    return respuesta.json();
}

export async function obtenerProveedores() {

    const respuesta = await fetch(`${URL_API}/obtenerProveedores`);

    return respuesta.json();
}

export async function obtenerEstadosProveedores() {

    const respuesta = await fetch(`${URL_API}/obtenerEstadosProveedores`);

    return respuesta.json();

}