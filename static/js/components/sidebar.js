export function activarSidebar() {
    const btnMenu = document.getElementById("btn-menu");
    const sidebar = document.getElementById("sidebar");
    const contenedor = document.getElementById("contenedor");
    const divboton = document.getElementById("div-boton");

    if (btnMenu && sidebar) {
        btnMenu.addEventListener("click", () => {
            btnMenu.classList.toggle("active");
            sidebar.classList.toggle("active");
            contenedor.classList.toggle("active");
            divboton.classList.toggle("active");
        });
    }
};