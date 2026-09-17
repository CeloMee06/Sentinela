const formulario = document.getElementById("login-form");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (email === "") {
        alert("Digite seu e-mail.");
        return;
    }

    if (senha === "") {
        alert("Digite sua senha.");
        return;
    }

    try {
        const resposta = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                senha
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.mensagem);
            return;
        }

        // Guarda os dados do usuário para o Dashboard
        localStorage.setItem("usuario", JSON.stringify(dados.usuario));

        alert(dados.mensagem);

        window.location.href = "dashboard.html";

    } catch (erro) {
        console.error("Erro ao realizar login:", erro);
        alert("Não foi possível conectar ao servidor.");
    }
});