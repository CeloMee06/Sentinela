const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../database/database");

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: "E-mail e senha são obrigatórios."
        });
    }

    try {
        const usuario = db
            .prepare("SELECT * FROM usuarios WHERE email = ?")
            .get(email);

        if (!usuario) {
            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });
        }

        if (usuario.bloqueado) {
            return res.status(403).json({
                mensagem: "Esta conta está bloqueada."
            });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });
        }

        res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });
    } catch (erro) {
        console.error("Erro ao realizar login:", erro);

        res.status(500).json({
            mensagem: "Não foi possível realizar o login."
        });
    }
});

module.exports = router;