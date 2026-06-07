import { 
    llenarTablaUsuarios 
} from "../ui/usuariosUI.js";

import { 
    obtenerDatosFormularioUsuarios 
} from "../ui/usuariosUI.js";

import { 
    registrarUsuario, 
    obtenerUsuarios,
    eliminarUsuario
} from "../api/usuariosApi.js";


import { mostrarToast } from "../components/toast.js";

export async function eliminarUsuarioController(cedula) {

    const info = await eliminarUsuario(cedula);

    if (!info.ok) {

        mostrarToast(info.message, info.type);
        return;

    }

    mostrarToast(info.message, info.type);
    cargarUsuarios();

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