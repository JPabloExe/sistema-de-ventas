import { mostrarToast } from "../components/toast.js";

import {
    realizarCompra,
    obtenerCompras
} from "../api/comprasApi.js";

import {
    obtenerDatosFormularioCompras,
    llenarTablaCompras
} from "../ui/comprasUI.js";

export async function realizarCompraController() {

    const datos = obtenerDatosFormularioCompras();

    const info = await realizarCompra(datos);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    mostrarToast(info.message, info.type);

}

export async function cargarCompras() {

    const info = await obtenerCompras();

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    llenarTablaCompras(info.data);
    mostrarToast(info.message, info.type);

}