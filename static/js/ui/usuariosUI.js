let cedulaAEliminar = null;

export function inicializarDialogEliminar(onConfirmar) {

    const btnConfirmar = document.getElementById("btn-confirmar-borrado");
    const btnCancelar = document.getElementById("btn-cancelar-confirmacion");
    const dialogConfirmacion = document.getElementById("dialog-confirmacion");
    const tbody = document.getElementById("tbody-usuarios");


    tbody.addEventListener("click", (e) => {
        const botonEliminar = e.target.closest(".btn-eliminar");

        if (botonEliminar) {
            cedulaAEliminar = botonEliminar.dataset.cedula;
            dialogConfirmacion.showModal();
        }
    });

    btnCancelar.addEventListener("click", () => {
        dialogConfirmacion.close();
    });

    btnConfirmar.addEventListener("click", () => {
        if (cedulaAEliminar) {
            onConfirmar(cedulaAEliminar);
            dialogConfirmacion.close();
        }
    });

}

export function llenarTablaUsuarios(usuarios) {

    const tbody = document.getElementById('tbody-usuarios');

    if (usuarios === null) {

        tbody.innerHTML = '';
        return;
    }

    tbody.innerHTML = '';

    for (const usuario of usuarios) {

        const fila = document.createElement('tr')

        fila.innerHTML = `
          
            <tr>
                <td>${usuario.nombre}</td>
                <td>${usuario.cedula}</td>
                <td>${usuario.telefono}</td>

                <td>
                    <span class="badge-admin">
                        ${usuario.cargo}
                    </span>
                </td>

                <td>
                    <i id="btn-actualizar" class="fa-solid fa-pen-to-square btn-actualizar"
                        data-nombre="${usuario.nombre}"
                        data-apellido="${usuario.apellido}"
                        data-cedula="${usuario.cedula}"
                        data-telefono="${usuario.telefono}"
                        data-usuario="${usuario.usuario}"
                        data-contrasena="${usuario.contrasena}"
                        data-cargo="${usuario.cargo}">
                    </i>

                    <i id="btn-eliminar" class="fa-solid fa-trash btn-eliminar"
                        data-cedula="${usuario.cedula}">  
                    </i>

                </td>

            <tr>
        `;

        tbody.appendChild(fila);

    }

}

export function obtenerDatosFormularioUsuarios() {

    return {
        'nombre': document.getElementById('input-nombre').value,
        'apellido': document.getElementById('input-apellido').value,
        'cedula': document.getElementById('input-cedula').value,
        'telefono': document.getElementById('input-telefono').value,
        'usuario': document.getElementById('input-usuario').value,
        'contrasena': document.getElementById('input-contrasena').value,
        'id_cargo': document.getElementById('select-cargo').value,
    }

}

export function limpiarFormulario() {

    document.getElementById('input-nombre').value = '';
    document.getElementById('input-apellido').value = '';
    document.getElementById('input-cedula').value = '';
    document.getElementById('input-telefono').value = '';
    document.getElementById('input-usuario').value = '';
    document.getElementById('input-contrasena').value = '';
    document.getElementById('select-cargo').value = '0';

}