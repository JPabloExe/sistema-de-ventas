import { mostrarToast } from "../components/toast.js";

import {
    llenarTablaUsuarios,
    mostrarUsuarioActual,
    obtenerDatosFormularioUsuarios
} from "../ui/usuariosUI.js";

import {
    registrarUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    buscarUsuario,
    actualizarUsuario,
    usuarioActual
} from "../api/usuariosApi.js";

export async function eliminarUsuarioController(cedula) {

    const info = await eliminarUsuario(cedula);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    mostrarToast(info.message, info.type);

}

export async function registrarUsuarioController() {

    const usuario = obtenerDatosFormularioUsuarios();

    const info = await registrarUsuario(usuario);

    if (!info.ok) {
        mostrarToast(info.message, info.type);
        return;
    }

    mostrarToast(info.message, info.type);

}

export async function cargarUsuarios() {

    const info = await obtenerUsuarios();

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    llenarTablaUsuarios(info.data);
    mostrarToast(info.message, info.type);

}

export async function buscarUsuarioController(cedula) {

    const info = await buscarUsuario(cedula);
    const userList = [];

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    userList.push(info.data);

    llenarTablaUsuarios(userList);
    mostrarToast(info.message, info.type);

}

export async function actualizarUsuarioController(usuarioId) {

    const datosActualizados = obtenerDatosFormularioUsuarios();

    const info = await actualizarUsuario(datosActualizados, usuarioId);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    mostrarToast(info.message, info.type);

}

export async function usuarioActualController() {

    const info = await usuarioActual();

    mostrarUsuarioActual(info.data);

}