import {
    eliminarProducto, 
    obtenerProductos,
    agregarProducto
} from "../api/productos_api.js";

import {
    llenarTablaInventario, 
    obtenerDatosFormularioProducto,
    limpiarFormularioProducto,
    mostrarInformeInventario
} from "../ui/inventarioUI.js";

import {mostrarToast} from "../ui/toast.js"

export async function eliminarProductoController(codigo) {
    
    const info = await eliminarProducto(codigo);

    if(info["mensaje"] === "s") {
        llenarTabla("");
        mostrarToast("Producto eliminado", "success");
    } else {
        mostrarToast(info["excepcion"], "error");
    }

}

export async function cargarInventario() {

    const info = await obtenerProductos("");

    llenarTablaInventario(info["productos"]);
}

export async function agregarProductoController() {

    const producto = obtenerDatosFormularioProducto();

    const info = await agregarProducto(producto);

    if (info["mensaje"] == "s") {
        mostrarToast("Producto agregado", "success");
        limpiarFormularioProducto();
        cargarInventario();
    } else {
        mostrarToast(info["exepcion"], "error");
    }
    
}

export async function actualizarProductoController() {
    
    const productoActualizado = obtenerDatosFormularioProducto();
    
    const info = await actualizarProducto(productoActualizado);
    
    if (info["mensaje"] == "s") {
        mostrarToast("Producto actualizado", "success");
        limpiarFormularioProducto();
        cargarInventario();
    } else {
        mostrarToast(info["exepcion"], "error");
    }

}

export async function cargarInformeInventario() {

    const info = await obtenerInformeInventario();

    mostrarInformeInventario(info);


    
}