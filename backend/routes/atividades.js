const express = require("express");

const db = require("../database/database");

const router = express.Router();

router.get("/:usuarioId", (req, res) => {

    const { usuarioId } = req.params;

    try {

        const atividades = db
            .prepare(`
                SELECT id, tipo, descricao, criado_em
                FROM atividades
                WHERE usuario_id = ?
                ORDER BY criado_em DESC
            `)
            .all(usuarioId);

        res.status(200).json({
            atividades
        });

    } catch (erro) {

        console.error("Erro ao buscar atividades:", erro);

        res.status(500).json({
            mensagem: "Não foi possível carregar as atividades."
        });
    }
});

module.exports = router;