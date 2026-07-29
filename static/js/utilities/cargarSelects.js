export function cargarSelect(datos, select) {

    select.innerHTML = '';


    switch (select.name) {
        case "proveedor":
            select.innerHTML = '<option value="0">Seleccione un proveedor</option>';
            break;
        case "proveedores-acciones":
            select.innerHTML = '<option value="0">Seleccione un proveedor</option>';
            break;
        case "metodo-pago":
            select.innerHTML = '<option value="0">Seleccione un metodo</option>';
            break;

        default:
            break;
    }

    for (const dato of datos) {

        select.innerHTML += `
            <option value="${dato.id}">
                ${dato.nombre}
            </option>
        `;

    }

}