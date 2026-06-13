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
                <td class="nombre">${usuario.nombre}</td>
                <td>${usuario.cedula}</td>
                <td>${usuario.telefono}</td>

                <td>
                    <span class=${
                        usuario.cargo === "Administrador" ?
                            "badge-admin" :
                            usuario.cargo === "Supervisor" ?
                                "badge-supervisor" :
                                "badge-empleado"}>

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
        'cargo': document.getElementById('select-cargo').value
    }

}

export function limpiarFormulario(form) {

    form.reset();

}

export function llenarFormularioUsuarios(boton) {

    document.getElementById('input-nombre').value = boton.dataset.nombre;
    document.getElementById('input-apellido').value = boton.dataset.apellido;
    document.getElementById('input-cedula').value = boton.dataset.cedula;
    document.getElementById('input-telefono').value = boton.dataset.telefono;
    document.getElementById('input-usuario').value = boton.dataset.usuario;

    console.log(document.getElementById("input-nombre").value);

    switch (boton.dataset.cargo) {

        case 'Administrador':
            document.getElementById('select-cargo').value = '1';
            break;

        case 'Empleado':
            document.getElementById('select-cargo').value = '2';
            break;

        case 'Supervisor':
            document.getElementById('select-cargo').value = '3';
            break;

        default:
            document.getElementById('select-cargo').value = '0';

    }

}