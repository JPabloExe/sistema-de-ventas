import {
    obtenerProductosDeCarrito,
    agregarProductoAlCarrito,
    recalcularTotal,
    limpiarInputsPago
} from "../ui/puntoVentasUI.js";

import {
    realizarVenta
} from "../api/puntoVentasApi.js";

import {
    buscarProducto
} from "../api/productosApi.js";

import { mostrarToast } from "../components/toast.js";

export async function realizarVentaController() {

    const productosEncarrito = obtenerProductosDeCarrito();

    const info = await realizarVenta(productosEncarrito);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    recalcularTotal();
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
    recalcularTotal();
    mostrarToast(info.message, info.type);

}