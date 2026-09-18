const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../database/database");

const router = express.Router();

router.put("/:id", (req, res) => {

    const { id } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({
            mensagem: "Nome e e-mail são obrigatórios."
        });
    }

    if (nome.length > 100 || email.length > 100) {
        return res.status(400).json({
            mensagem: "Nome ou e-mail muito longo."
        });
    }

    try {

        const usuario = db
            .prepare("SELECT id FROM usuarios WHERE id = ?")
            .get(id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        }

        const emailExistente = db
            .prepare(
                "SELECT id FROM usuarios WHERE email = ? AND id != ?"
            )
            .get(email, id);

        if (emailExistente) {
            return res.status(409).json({
                mensagem: "Este e-mail já está sendo utilizado."
            });
        }

        db.prepare(`
            UPDATE usuarios
            SET nome = ?, email = ?
            WHERE id = ?
        `).run(nome, email, id);

        res.status(200).json({
            mensagem: "Dados atualizados com sucesso!",
            usuario: {
                id,
                nome,
                email
            }
        });

    } catch (erro) {

        console.error("Erro ao atualizar perfil:", erro);

        res.status(500).json({
            mensagem: "Não foi possível atualizar os dados."
        });
    }
});


router.put("/:id/senha", async (req, res) => {

    const { id } = req.params;
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
        return res.status(400).json({
            mensagem: "A senha atual e a nova senha são obrigatórias."
        });
    }

    if (novaSenha.length < 8) {
        return res.status(400).json({
            mensagem: "A nova senha deve ter pelo menos 8 caracteres."
        });
    }

    try {

        const usuario = db
            .prepare("SELECT * FROM usuarios WHERE id = ?")
            .get(id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        }

        const senhaAtualCorreta = await bcrypt.compare(
            senhaAtual,
            usuario.senha
        );

        if (!senhaAtualCorreta) {
            return res.status(401).json({
                mensagem: "A senha atual está incorreta."
            });
        }

        const novaSenhaHash = await bcrypt.hash(novaSenha, 12);

        db.prepare(`
            UPDATE usuarios
            SET senha = ?
            WHERE id = ?
        `).run(novaSenhaHash, id);

        res.status(200).json({
            mensagem: "Senha alterada com sucesso!"
        });

    } catch (erro) {

        console.error("Erro ao alterar senha:", erro);

        res.status(500).json({
            mensagem: "Não foi possível alterar a senha."
        });
    }
});


module.exports = router;