import { URL_API } from "../config/config.js";

export async function buscarVentas(fechaInicial, fechaFinal) {

    const respuesta = await fetch(`${URL_API}/obtenerVentas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "inicial": fechaInicial,
            "final": fechaFinal
        })
    });

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

