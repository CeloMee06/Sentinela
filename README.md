# Sentinela

Sistema web acadêmico desenvolvido para a disciplina de Segurança em Sistemas da Informação.

O **Sentinela** demonstra conceitos de autenticação, autorização, controle de acesso, proteção de senhas, validação de dados e registro de atividades.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- SQLite com better-sqlite3
- bcrypt
- Git e GitHub
- Visual Studio Code

## Funcionalidades

### Usuário
- Cadastro de conta
- Login
- Sessão autenticada
- Dashboard
- Consulta e atualização do perfil
- Alteração de senha
- Consulta das atividades da própria conta
- Logout

### Administrador
- Listagem de usuários
- Consulta de status das contas
- Bloqueio e desbloqueio
- Alteração do tipo de acesso
- Remoção de usuários
- Proteção das rotas administrativas no backend

## Segurança aplicada

- Senhas armazenadas com hash usando bcrypt.
- Validação no frontend e também no backend.
- Consultas SQLite parametrizadas para evitar injeção SQL.
- Controle de autenticação por sessão.
- Controle de autorização no backend, e não apenas na interface.
- Mensagens de erro sem exposição de senha ou outros segredos.
- Dados sensíveis não ficam no código-fonte.
- Limites de tamanho nos campos.
- Registro de atividades importantes.
- Sessões com expiração de 2 horas.
- Logout invalida a sessão no servidor.
- Usuário comum não consegue acessar as rotas administrativas.
- Um administrador não pode bloquear, remover ou retirar o próprio acesso de administrador pela área administrativa.

## Como executar

### 1. Instalar as dependências

```bash
npm install
```

No PowerShell do Windows, caso `npm` seja bloqueado pela política de execução, use:

```bash
npm.cmd install
```

### 2. Iniciar o sistema

```bash
npm start
```

ou no PowerShell:

```bash
npm.cmd start
```

Acesse:

`http://localhost:3000`

## Criar um administrador para teste

Primeiro faça um cadastro normalmente pela tela de cadastro.

Depois execute:

```bash
npm run admin -- email@exemplo.com
```

No PowerShell:

```bash
npm.cmd run admin -- email@exemplo.com
```

Substitua o e-mail pelo usuário cadastrado.

## Estrutura

```text
Sentinela/
├── frontend/
│   ├── index.html
│   ├── cadastro.html
│   ├── dashboard.html
│   ├── perfil.html
│   ├── atividades.html
│   ├── admin.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── login.js
│       ├── cadastro.js
│       ├── dashboard.js
│       ├── perfil.js
│       ├── atividades.js
│       └── admin.js
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── database/
│   └── server.js
├── scripts/
│   └── tornar-admin.js
├── .gitignore
├── README.md
└── package.json
```

## Observação acadêmica

O projeto utiliza sessões em memória para manter a implementação simples para o trabalho acadêmico. Por isso, as sessões ativas são encerradas quando o servidor é reiniciado.

O objetivo do projeto é demonstrar, de forma prática, os conceitos de **entender, proteger, controlar, detectar e testar** segurança em um sistema.

## Teste para apresentação

1. Cadastre um usuário.
2. Faça login.
3. Mostre o dashboard.
4. Mostre o perfil e altere o nome.
5. Mostre a alteração de senha.
6. Mostre as atividades registradas.
7. Promova um segundo usuário a administrador.
8. Entre com o administrador e mostre a área administrativa.
9. Bloqueie/desbloqueie um usuário.
10. Mostre que um usuário comum não possui autorização para a área administrativa.
11. Faça logout.

## Git

O projeto possui histórico de commits desde a criação da estrutura inicial. Antes da entrega, revise as alterações pendentes com:

```bash
git status
```

Depois, registre as alterações finais com commits descritivos e envie o repositório para o GitHub.
