import { mostrarToast } from "../components/toast.js";

import { cargarInputBusqueda } from "../components/inputBusqueda.js";

import { cargarSelect } from "../utilities/cargarSelects.js";

import { obtenerProveedores } from "../api/proveedoresApi.js";

import {
    eliminarProducto,
    obtenerProductos,
    agregarProducto,
    actualizarProducto,
    buscarProducto,
    obtenerInformeInventario,
    crearCategoria,
    obtenerCategorias,
    obtenerProductosStockBajo,
    obtenerProductosAVencer
} from "../api/productosApi.js";

import {
    llenarTablaInventario,
    obtenerDatosFormularioProducto,
    mostrarInformeInventario,
    obtenerDatosFormularioCategoria,
    limpiarFormularioProducto
} from "../ui/inventarioUI.js";


export async function eliminarProductoController(codigo) {

    const info = await eliminarProducto(codigo);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    mostrarToast(info.message, info.type);

}

export async function cargarInventarioController(categoria) {

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

    limpiarFormularioProducto(formulario);
    mostrarToast(info.message, info.type);

}

export async function crearCategoriaController() {

    const categoria = obtenerDatosFormularioCategoria();

    const info = await crearCategoria(categoria);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    mostrarToast(info.message, info.type);

}

export async function actualizarProductoController(formulario) {

    const productoActualizado = obtenerDatosFormularioProducto();

    const info = await actualizarProducto(productoActualizado);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    limpiarFormularioProducto(formulario);
    mostrarToast(info.message, info.type);

}

export async function buscarProductoController(codigo) {

    const info = await buscarProducto(codigo);
    const productList = [];

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

export async function cargarCategoriasController(select) {

    const info = await obtenerCategorias();

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    cargarSelect(info.data, select);

}

export async function cargarProveedoresController(select) {

    const info = await obtenerProveedores();

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    cargarSelect(info.data, select);

}

export async function cargarInputBusquedaController() {

    const info = await obtenerProductos(0);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    cargarInputBusqueda(info.data);

}

export async function cargarProductosStockBajoController() {

    const info = await obtenerProductosStockBajo();

    mostrarToast(info.message, info.type);
    llenarTablaInventario(info.data);

}

export async function cargarProductosAVencerController() {

    const info = await obtenerProductosAVencer();

    mostrarToast(info.message, info.type);
    llenarTablaInventario(info.data);

}