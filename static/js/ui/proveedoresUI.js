export function llenarTablaProveedores(proveedores) {

    const tbody = document.getElementById('tbody-proveedores');

    if (proveedores === null) {

        tbody.innerHTML = '';
        return;
    }

    tbody.innerHTML = '';

    for (const proveedor of proveedores) {

        const fila = document.createElement('tr')

        fila.innerHTML = `
          
            <tr>
                <td class="nombre">${proveedor.nombre}</td>
                <td>${proveedor.telefono}</td>
                <td>${proveedor.correo}</td>
                <td>${proveedor.ciudad}</td>

                <td>
                    <span class=${proveedor.estado === 1
                ? "badge-active"
                : "badge-inactive"}>

                        <i class="${proveedor.estado === 1
                ? "fa-solid fa-user-check"
                : "fa-solid fa-user-xmark"}">
                        </i>
                        ${proveedor.estado === 1 ? "Activo" : "Inactivo"}
                    </span>
                </td>

                <td>
                    <i id="btn-actualizar" class="fa-solid fa-pen-to-square btn-actualizar"
                        data-id="${proveedor.id}"
                        data-nombre="${proveedor.nombre}"
                        data-nit="${proveedor.nit}"
                        data-telefono="${proveedor.telefono}"
                        data-correo="${proveedor.correo}"
                        data-direccion="${proveedor.direccion}"
                        data-ciudad="${proveedor.ciudad}"
                        data-estado="${proveedor.estado}">
                    </i>

                    <i id="btn-eliminar" class="fa-solid fa-trash btn-eliminar"
                        data-id="${proveedor.id}">  
                    </i>

                </td>

            <tr>
        `;

        tbody.appendChild(fila);

    }

}

export function obtenerDatosFormularioProveedores() {

    return {
        'nombre': document.getElementById('input-nombre').value,
        'nit': document.getElementById('input-nit').value,
        'telefono': document.getElementById('input-telefono').value,
        'correo': document.getElementById('input-correo').value,
        'direccion': document.getElementById('input-direccion').value,
        'ciudad': document.getElementById('input-ciudad').value,
        'estado': document.getElementById('select-estado').value
    }

}

export function limpiarFormulario(form) {

    form.reset();

}

export function llenarFormularioProveedores(boton) {

    document.getElementById('input-nombre').value = boton.dataset.nombre;
    document.getElementById('input-nit').value = boton.dataset.nit;
    document.getElementById('input-telefono').value = boton.dataset.telefono;
    document.getElementById('input-correo').value = boton.dataset.correo;
    document.getElementById('input-direccion').value = boton.dataset.direccion;
    document.getElementById('input-ciudad').value = boton.dataset.ciudad;
    document.getElementById('select-estado').value = boton.dataset.estado;

}