import { URL_API } from "../config/config.js";

export async function obtenerVentas() {

    const respuesta = await fetch(`${URL_API}/obtenerVentas`);

    return await respuesta.json();

};

export async function buscarVentas(fechaInicial, fechaFinal) {

    const intervalo = {
        "inicial": fechaInicial,
        "final": fechaFinal
    }

    const respuesta = await fetch(`${URL_API}/buscarVentas?intervalo=${intervalo}`);

    return await respuesta.json();

};

export async function eliminarVenta(numeroVenta) {

    const respuesta = await fetch(`${URL_API}/eliminarVenta?numero=${numeroVenta}`, {
        method: "DELETE"
    });

    return await respuesta.json();

}

export async function obtenerInformeVentas() {

    const respuesta = await fetch('/obtenerInformeVentas');
    return await respuesta.json();

}

