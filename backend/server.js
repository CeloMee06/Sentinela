const express = require("express");
const path = require("path");

const db = require("./database/database");
const usuariosRoutes = require("./routes/usuarios");
const loginRoutes = require("./routes/login");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/login", loginRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const servidor = app.listen(PORT, () => {
    console.log(`Servidor Sentinela rodando em http://localhost:${PORT}`);
});

servidor.on("error", (erro) => {
    console.error("Erro no servidor:", erro);
});