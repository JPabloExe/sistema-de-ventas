export function abrirVentanas(ventana) {
    if (ventana != "") {
        window.location.href = `/${ventana}`;
    } else {
        window.location.href = '/';
    }
};