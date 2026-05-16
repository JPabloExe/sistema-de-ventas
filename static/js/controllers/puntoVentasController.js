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

    if (info["mensaje"] == "n") {
        mostrarToast(info["excepcion"], 'error');
        return;
    }

    mostrarToast("Venta realizada", "success");
    recalcularTotal();
    limpiarInputsPago();
    
}

export async function agregarProductosAlcarritoController(codigo) {
    
    const info = await buscarProducto(codigo);
    
    if (info["mensaje"] === "n") {
        mostrarToast("Producto no encontrado", "error");
        return;
    }
    
    agregarProductoAlCarrito(info["producto"]);
    recalcularTotal();
    mostrarToast("Producto agregado", "success");

}