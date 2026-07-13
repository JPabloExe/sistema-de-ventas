export function obtenerDatosLogin() {
    
    return {
        "usuario": document.getElementById("input-usuario").value,
        "contrasena": document.getElementById("input-contrasena").value
    }

}