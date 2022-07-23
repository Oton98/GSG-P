const iniciosesion = document.getElementById("login");
const registro = document.getElementById("registro");
const logueado = sessionStorage.getItem("logueado");
const usuario = sessionStorage.getItem("usuario");


if (logueado === "true") {
    iniciosesion.innerText = "Logout";
    iniciosesion.href = "#";
    iniciosesion.onclick = () => { 
        sessionStorage.setItem("logueado", "false");
        window.location.href = "index.html"
}
    registro.innerText = usuario;
    registro.href = "#";
    if (usuario === "carlos"){
        registro.innerText = "Admin";
        registro.href = "admin.html";

    };
}
