const formulario = document.getElementById("cadastro-form");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    if (nome === "") {
        alert("Digite seu nome.");
        return;
    }

    if (email === "") {
        alert("Digite seu e-mail.");
        return;
    }

    if (senha === "") {
        alert("Digite uma senha.");
        return;
    }

    if (senha.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres.");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não são iguais.");
        return;
    }

    alert("Cadastro validado com sucesso!");
});