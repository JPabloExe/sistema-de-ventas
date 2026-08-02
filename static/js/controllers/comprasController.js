import { mostrarToast } from "../components/toast.js";

import { cargarSelect } from "../utilities/cargarSelects.js";

import { cargarInputBusqueda } from "../components/inputBusqueda.js";

import { obtenerProveedores } from "../api/proveedoresApi.js";

import {
    realizarCompra,
    obtenerCompras,
    obtenerDetalles,
    obtenerMetodosPago
} from "../api/comprasApi.js";

import {
    obtenerDatosFormularioCompras,
    llenarTablaCompras,
    llenarDetalles
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

export async function obtenerDetallesController(boton) {

    const info = await obtenerDetalles(boton.dataset.compra);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    llenarDetalles(boton, info.data)

}

export async function cargarProveedoresController(select) {

    const info = await obtenerProveedores();

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    cargarSelect(info.data, select);

}

export async function cargarMetodosPagoController(select) {

    const info = await obtenerMetodosPago();

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    cargarSelect(info.data, select);

}

export async function cargarInputBusquedaController() {

    const info = await obtenerCompras();

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    cargarInputBusqueda(info.data);

}