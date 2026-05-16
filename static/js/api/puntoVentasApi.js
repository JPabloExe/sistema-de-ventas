import { URL_API } from "../config/config.js";

export async function realizarVenta(productosEncarrito) {

    const respuesta = await fetch(`${URL_API}/realizarVenta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productosEncarrito)
    });

    return await respuesta.json();

}