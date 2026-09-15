const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../database/database");

const router = express.Router();

router.post("/", async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Nome, e-mail e senha são obrigatórios."
        });
    }

    if (senha.length < 8) {
        return res.status(400).json({
            mensagem: "A senha deve ter pelo menos 8 caracteres."
        });
    }

    try {
        const emailExistente = db
            .prepare("SELECT id FROM usuarios WHERE email = ?")
            .get(email);

        if (emailExistente) {
            return res.status(409).json({
                mensagem: "Este e-mail já está cadastrado."
            });
        }

        const senhaHash = await bcrypt.hash(senha, 12);

        const resultado = db
            .prepare(`
                INSERT INTO usuarios (nome, email, senha)
                VALUES (?, ?, ?)
            `)
            .run(nome, email, senhaHash);

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario: {
                id: resultado.lastInsertRowid,
                nome,
                email
            }
        });
    } catch (erro) {
        console.error("Erro ao cadastrar usuário:", erro);

        res.status(500).json({
            mensagem: "Não foi possível realizar o cadastro."
        });
    }
});

module.exports = router;