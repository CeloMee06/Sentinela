const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    window.location.href = "index.html";
} else {

    const campoNome = document.getElementById("perfil-nome");
    const campoEmail = document.getElementById("perfil-email");
    const campoTipo = document.getElementById("perfil-tipo");

    const senhaAtual = document.getElementById("senha-atual");
    const novaSenha = document.getElementById("nova-senha");
    const confirmarNovaSenha = document.getElementById("confirmar-nova-senha");

    const botaoSalvar = document.getElementById("btn-salvar");
    const botaoSair = document.getElementById("btn-sair");

    campoNome.value = usuario.nome;
    campoEmail.value = usuario.email;

    campoTipo.textContent =
        usuario.tipo === "admin" ? "Administrador" : "Usuário";

    botaoSalvar.addEventListener("click", async () => {

        const nome = campoNome.value.trim();
        const email = campoEmail.value.trim();

        const senhaAtualValor = senhaAtual.value;
        const novaSenhaValor = novaSenha.value;
        const confirmarNovaSenhaValor = confirmarNovaSenha.value;

        if (nome === "") {
            alert("Digite seu nome.");
            return;
        }

        if (email === "") {
            alert("Digite seu e-mail.");
            return;
        }

        try {

            const respostaPerfil = await fetch(`/api/perfil/${usuario.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    email
                })
            });

            const dadosPerfil = await respostaPerfil.json();

            if (!respostaPerfil.ok) {
                alert(dadosPerfil.mensagem);
                return;
            }

            if (
                senhaAtualValor !== "" ||
                novaSenhaValor !== "" ||
                confirmarNovaSenhaValor !== ""
            ) {

                if (senhaAtualValor === "") {
                    alert("Digite sua senha atual.");
                    return;
                }

                if (novaSenhaValor === "") {
                    alert("Digite uma nova senha.");
                    return;
                }

                if (novaSenhaValor.length < 8) {
                    alert("A nova senha deve ter pelo menos 8 caracteres.");
                    return;
                }

                if (novaSenhaValor !== confirmarNovaSenhaValor) {
                    alert("As novas senhas não são iguais.");
                    return;
                }

                const respostaSenha = await fetch(
                    `/api/perfil/${usuario.id}/senha`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            senhaAtual: senhaAtualValor,
                            novaSenha: novaSenhaValor
                        })
                    }
                );

                const dadosSenha = await respostaSenha.json();

                if (!respostaSenha.ok) {
                    alert(dadosSenha.mensagem);
                    return;
                }

                senhaAtual.value = "";
                novaSenha.value = "";
                confirmarNovaSenha.value = "";

                alert("Dados e senha atualizados com sucesso!");

            } else {

                alert(dadosPerfil.mensagem);
            }

            localStorage.setItem(
                "usuario",
                JSON.stringify({
                    ...usuario,
                    nome: dadosPerfil.usuario.nome,
                    email: dadosPerfil.usuario.email
                })
            );

            campoNome.value = dadosPerfil.usuario.nome;
            campoEmail.value = dadosPerfil.usuario.email;

        } catch (erro) {

            console.error("Erro ao atualizar perfil:", erro);

            alert("Não foi possível conectar ao servidor.");
        }
    });

    botaoSair.addEventListener("click", () => {

        localStorage.removeItem("usuario");

        window.location.href = "index.html";
    });
}