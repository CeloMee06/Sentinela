const Database = require("better-sqlite3");
const path = require("path");

const email = process.argv[2];

if (!email) {
    console.log("Uso: npm run admin -- email@exemplo.com");
    process.exit(1);
}

const db = new Database(
    path.join(__dirname, "../backend/database/sentinela.db")
);

const usuario = db
    .prepare("SELECT id, nome, email FROM usuarios WHERE email = ?")
    .get(email);

if (!usuario) {
    console.log("Usuário não encontrado. Faça o cadastro primeiro.");
    db.close();
    process.exit(1);
}

db.prepare("UPDATE usuarios SET tipo = 'admin' WHERE id = ?")
    .run(usuario.id);

console.log(`Usuário ${usuario.nome} (${usuario.email}) agora é administrador.`);

db.close();
