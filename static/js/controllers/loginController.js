import { mostrarToast } from "../components/toast.js";

import { abrirVentanas } from "../utilities/ventanas.js";

import {
    obtenerDatosLogin
} from "../ui/loginUi.js";

import {
    iniciarSesion,
    cerrarSesion
} from "../api/loginApi.js";

export async function iniciarSesionController() {

    const datos = obtenerDatosLogin();

    const info = await iniciarSesion(datos);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    mostrarToast(info.message, info.type);
    abrirVentanas("");

}

export async function cerrarSesionController() {

    const info = await cerrarSesion();

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    mostrarToast(info.message, info.type);
    abrirVentanas("login");

}