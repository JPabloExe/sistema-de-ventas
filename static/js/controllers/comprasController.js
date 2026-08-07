import { mostrarToast } from "../components/toast.js";

import { cargarSelect } from "../utilities/cargarSelects.js";

import { cargarInputBusqueda } from "../components/inputBusqueda.js";

import { obtenerProveedores } from "../api/proveedoresApi.js";

import {
    realizarCompra,
    obtenerCompras,
    obtenerDetalles,
    obtenerMetodosPago,
    buscarCompra
} from "../api/comprasApi.js";

import {
    obtenerDatosFormularioCompras,
    llenarTablaCompras,
    llenarDetalles,
    obtenerDatosSelectAcciones,
    obtenerNumFactura,
    llenarRecepcion
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

    const datos = obtenerDatosSelectAcciones();

    const info = await obtenerCompras(datos);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    llenarTablaCompras(info.data);
    mostrarToast(info.message, info.type);

}

export async function buscarComprasController() {

    const numFactura = obtenerNumFactura();
    const info = await buscarCompra(numFactura);
    const comprasList = [];

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    comprasList.push(info.data);

    llenarTablaCompras(comprasList);
    mostrarToast(info.message, info.type);

}

export async function obtenerDetallesController(boton) {

    const info = await obtenerDetalles(boton.dataset.compra);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    boton.classList.contains("detalles")
        ? llenarDetalles(boton, info.data)
        : llenarRecepcion(boton, info.data)

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

    const datos = obtenerDatosSelectAcciones();

    const info = await obtenerCompras(datos);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    cargarInputBusqueda(info.data);

}
