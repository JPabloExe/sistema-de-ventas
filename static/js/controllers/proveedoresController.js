import { mostrarToast } from "../components/toast.js";

import { cargarSelect } from "../utilities/cargarSelects.js";

import {
    obtenerProveedores,
    registrarProveedor,
    actualizarProveedor,
    eliminarProveedor,
    obtenerEstadosProveedores
} from "../api/proveedoresApi.js";

import {
    llenarTablaProveedores,
    obtenerDatosFormularioProveedores
} from "../ui/proveedoresUI.js";

export async function registrarProveedorController() {

    const datos = obtenerDatosFormularioProveedores();

    const info = await registrarProveedor(datos);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    mostrarToast(info.message, info.type);

}

export async function actualizarProveedorController(proveedorId) {

    const datosActualizados = obtenerDatosFormularioProveedores();

    const info = await actualizarProveedor(datosActualizados, proveedorId);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    mostrarToast(info.message, info.type);

}

export async function eliminarProveedorController(proveedorId) {

    const info = await eliminarProveedor(proveedorId);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    mostrarToast(info.message, info.type);

}

export async function cargarProveedoresController() {

    const info = await obtenerProveedores();

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    llenarTablaProveedores(info.data);
    mostrarToast(info.message, info.type);

}

export async function cargarEstadosProveedoresController(select) {

    const info = await obtenerEstadosProveedores();

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    cargarSelect(info.data, select);

}


