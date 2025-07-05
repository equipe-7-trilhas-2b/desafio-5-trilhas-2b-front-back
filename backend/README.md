# 🔥 API Projeto Trilhas Queimadas

Bem-vindo à API do Projeto Trilhas Queimadas!  
Este backend foi desenvolvido em Node.js + Express e utiliza PostgreSQL como banco de dados.  
Aqui você encontra endpoints para autenticação, gestão de usuários, focos de queimadas, denúncias, estatísticas e muito mais.

## 🚀 Como rodar o projeto

1. **Clone o repositório**
   ```sh
   git clone https://seu-repo.git
   
2. **Instale as dependências**
   ```sh
   npm install
   
3. **Configure o arquivo .env**

   Use o arquivo env.exemple como base.
   Preencha com os dados do seu banco PostgreSQL.

4. **Crie o banco de dados no PostgreSQL**
   
   ```sql
   CREATE DATABASE db_alerta_fogo

5. **Rode as migrations para criar as tabelas**
   ```sh
   npm run migrate:up

6. **Inicie o servidor**
   ```sh
   npm run dev

   O backend estará disponível em http://localhost:3000

📁 **Estrutura de Pastas**

backend/

├── src/

│   ├── config/         # ⚙️ Configurações (ex: banco de dados)

│   ├── controllers/    # 🎯 Lógica dos endpoints

│   ├── models/         # 🗂️ Modelos do banco de dados

│   ├── routes/         # 🚦 Rotas da API

│   ├── services/       # 🔧 Serviços auxiliares

│   ├── utils/          # 🛠️ Funções utilitárias

│   ├── app.js          # 🚀 Configuração do Express

│   └── server.js       # 🔌 Inicialização do servidor

│

├── migrations/         # 🧱 Migrations do banco

├── scripts/            # 📜 Scripts para popular dados

├── dados/              # 📊 Arquivos CSV

├── env.exemple         # 📄 Exemplo de .env

├── package.json        # 📦 Dependências e scripts

└── README.md           # 📘 Este arquivo


🛠️ **Principais Funcionalidades**

🔐 Autenticação JWT (login, cadastro, reset de senha)

👥 Gestão de usuários (admin e cidadão)

🔥 Focos de queimadas (listagem, busca por município, etc)

📣 Denúncias (criação, listagem, status)

📈 Estatísticas (ranking, KPIs, histórico)

🧩 Scripts para popular municípios e focos

📦 Scripts úteis

| Comando                                    | Descrição                                    |
| ------------------------------------------ | -------------------------------------------- |
| `npm run dev`                              | 🚀 Inicia o servidor em modo desenvolvimento |
| `npm run migrate:up`                       | 🧱 Executa as migrations do banco            |
| `npm run migrate:down`                     | ↩️ Reverte a última migration                |
| `npm run seed:municipios`                  | 🌎 Popula a tabela de municípios             |
| `npm run seed:focos`                       | 🔥 Popula os focos de queimadas              |
| `npm run migrate:create nome_da_migration` | 🏗️ Cria uma nova migration                  |

📝 **Observações**

✅ Certifique-se de que o PostgreSQL está rodando e o banco foi criado antes de executar as migrations.

🛑 O arquivo .env NÃO deve ser versionado. (Adicione ao .gitignore)

📌 Mantenha o projeto organizado conforme a estrutura proposta.
