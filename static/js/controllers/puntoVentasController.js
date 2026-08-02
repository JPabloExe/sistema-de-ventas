import { mostrarToast } from "../components/toast.js";

import { cargarInputBusqueda } from "../components/inputBusqueda.js";

import {
    obtenerProductosDeCarrito,
    agregarProductoAlCarrito,
    reCalcularTotal,
    limpiarInputsPago
} from "../ui/puntoVentasUI.js";

import {
    realizarVenta
} from "../api/puntoVentasApi.js";

import {
    buscarProducto,
    obtenerProductos
} from "../api/productosApi.js";


export async function realizarVentaController() {

    const productosEncarrito = obtenerProductosDeCarrito();

    const info = await realizarVenta(productosEncarrito);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    reCalcularTotal();
    limpiarInputsPago();
    mostrarToast(info.message, info.type);

}

export async function agregarProductosAlcarritoController(codigo) {

    const info = await buscarProducto(codigo);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    agregarProductoAlCarrito(info.data);
    reCalcularTotal();
    mostrarToast(info.message, info.type);

}

export async function cargarInputBusquedaController() {

    const info = await obtenerProductos(0);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    cargarInputBusqueda(info.data);

}