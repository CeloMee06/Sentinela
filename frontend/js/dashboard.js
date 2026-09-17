const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    window.location.href = "index.html";
} else {
    const titulo = document.querySelector(".dashboard-welcome h2");

    titulo.textContent = `Bem-vindo, ${usuario.nome}!`;
}