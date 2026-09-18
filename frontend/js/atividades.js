const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {

    window.location.href = "index.html";

} else {

    const listaAtividades = document.getElementById("lista-atividades");
    const botaoSair = document.getElementById("btn-sair");

    async function carregarAtividades() {

        try {

            const resposta = await fetch(
                `/api/atividades/${usuario.id}`
            );

            const dados = await resposta.json();

            if (!resposta.ok) {

                listaAtividades.innerHTML = `
                    <p>${dados.mensagem}</p>
                `;

                return;
            }

            if (dados.atividades.length === 0) {

                listaAtividades.innerHTML = `
                    <div class="account-status">
                        <h3>Nenhuma atividade encontrada</h3>
                        <p>Sua conta ainda não possui atividades registradas.</p>
                    </div>
                `;

                return;
            }

            listaAtividades.innerHTML = "";

            dados.atividades.forEach((atividade) => {

                const card = document.createElement("div");

                card.className = "account-status";

                card.innerHTML = `
                    <h3>🔐 ${atividade.tipo}</h3>

                    <p>
                        ${atividade.descricao}
                    </p>

                    <p>
                        <strong>Data:</strong>
                        ${atividade.criado_em}
                    </p>
                `;

                listaAtividades.appendChild(card);
            });

        } catch (erro) {

            console.error(
                "Erro ao carregar atividades:",
                erro
            );

            listaAtividades.innerHTML = `
                <p>Não foi possível carregar as atividades.</p>
            `;
        }
    }

    botaoSair.addEventListener("click", () => {

        localStorage.removeItem("usuario");

        window.location.href = "index.html";
    });

    carregarAtividades();
}