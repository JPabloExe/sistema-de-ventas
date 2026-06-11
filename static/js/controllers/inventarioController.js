import {
    eliminarProducto,
    obtenerProductos,
    agregarProducto,
    actualizarProducto,
    buscarProducto,
    obtenerInformeInventario
} from "../api/productosApi.js";

import {
    llenarTablaInventario,
    obtenerDatosFormularioProducto,
    limpiarFormularioProducto,
    mostrarInformeInventario
} from "../ui/inventarioUI.js";

import { mostrarToast } from "../components/toast.js";

export async function eliminarProductoController(codigo) {

    const info = await eliminarProducto(codigo);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    cargarInventario("");
    mostrarToast(info.message, info.type);

}

export async function cargarInventario(categoria) {

    const info = await obtenerProductos(categoria);

    if (!info.ok) {

        mostrarToast(info.message, info.type);

        llenarTablaInventario(null);
        return;

    }

    mostrarToast(info.message, info.type)
    llenarTablaInventario(info.data);
}

export async function agregarProductoController(formulario) {

    const producto = obtenerDatosFormularioProducto(formulario);

    const info = await agregarProducto(producto);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;
        
    }

    mostrarToast(info.message, info.type);
    limpiarFormularioProducto(formulario);
    cargarInventario("");

}

export async function actualizarProductoController(formulario) {

    const productoActualizado = obtenerDatosFormularioProducto(formulario);

    const info = await actualizarProducto(productoActualizado);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    mostrarToast(info.message, info.type);
    limpiarFormularioProducto(formulario);
    cargarInventario("");

}

export async function buscarProductoController(codigo) {

    const info = await buscarProducto(codigo);
    const productList = [];

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    productList.push(info.data);

    llenarTablaInventario(productList);
    mostrarToast(info.message, info.type);

}

export async function cargarInformeInventario() {

    const info = await obtenerInformeInventario();

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;
        
    }
    
    mostrarInformeInventario(info.data);
    mostrarToast(info.message, info.type);

}