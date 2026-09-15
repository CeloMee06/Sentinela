const Database = require("better-sqlite3");
const path = require("path");

const caminhoBanco = path.join(__dirname, "sentinela.db");

const db = new Database(caminhoBanco);

db.pragma("journal_mode = WAL");

db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        tipo TEXT NOT NULL DEFAULT 'usuario',
        bloqueado INTEGER NOT NULL DEFAULT 0,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

module.exports = db;