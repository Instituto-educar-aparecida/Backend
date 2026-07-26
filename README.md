# 🚀 Instituto Educar - Aparecida (Backend)

Bem-vindo ao ecossistema de desenvolvimento do **Instituto Educar**. Este repositório contém a **API REST (backend)** da plataforma de cursos online gratuitos.

## 🧱 Arquitetura

API em **Node.js 20 + Express** com **PostgreSQL** (driver `pg`, SQL puro — sem ORM), organizada em camadas:

```
routes → controllers → services → repositories → (PostgreSQL)
```

- **Validação:** Zod (`src/validators`)
- **Autenticação:** JWT (`Authorization: Bearer <token>`) + RBAC por papel
- **Erros:** classe `AppError` + middleware global de tratamento de erros
- **Logs:** Winston
- **Certificados:** geração de PDF com `pdfkit` (servidos em `/certificates`)
- **Segurança:** helmet, CORS, rate limit no login

A documentação completa dos endpoints está em **APIDoc.md**. O esquema do banco está em **db_schema.md**.

## ▶️ Rodando localmente (sem Docker)

1. Tenha **Node.js 20+** e **PostgreSQL** instalados e em execução.
2. Crie o banco e o usuário (ex.: `EducarDev` / senha `271627` / db `EducarDev`).
3. Execute os scripts de `database/init/*.sql` (em ordem) para criar o schema.
4. Copie `.env.example` para `.env` e ajuste as variáveis (DB, `JWT_SECRET`, `PORT`).
5. Instale as dependências e inicie:
   ```bash
   npm install
   npm run dev      # desenvolvimento (nodemon)
   npm start        # produção
   ```
6. A API sobe em `http://localhost:5173` (rota de saúde: `GET /api/health`).

## 🐳 Rodando com Docker

##  🛠️ Pré-requisitos
Você precisa apenas do **Docker** instalado:
- [Instalar Docker](https://docs.docker.com)

## 🏃 Como Iniciar
1. Clone o repositório: `git clone [URL]`
2. Entre na pasta: `cd [NOME-DA-PASTA]`
3. Suba o ambiente: `docker compose up --build`
    3 containers serão carregados:
    * App : o servidor node.js
    * PgAdmin : Aplicativo rodando no localhost que permite editar/visualizar as informações do banco de dados
    * PostgresSQL : Banco de dados utilizado

    **Obs.:** Na primeira vez que executar os containers, o Postgres irá levar um tempo inicializando o schema, é possível que isso cause algum erro no App ou no PgAdmin. Nessa situação basta abrir Docker desktop e reinicializar os containers ou usar um `docker compose down` para "baixar" os containers e depois um `docker compose up`  para subi-los  novamente.

## Documentação
1. Esquema do banco de dados - db_schema.md
2. Api - APIDoc.md

## 🌐 Portas do Projeto
- **Backend:** http://localhost:5173 (Node.js + PostgreSQL)
- **Frontend:** http://localhost:5174 (Vite + Tailwind v4)
- **PgAdmin:** http://localhost:8080 
## 🗄️ Banco de Dados e PgAdmin

### Credenciais
No ambiente de desenvolvimento as credenciais são:
- Db: EducarDev
- User: EducarDev
- Senha: "271627"

### Iniciando o pgAdmin
1. Tenha certeza de ter subido as imagens corretamente
2. Com o db funcional digite no navegador http://localhost:8080 
3. Deve abrir a página de login, caso não abra, aguarde um pouco. Utilize as seguintes credenciais:
    - Email: Educar@gmail.com
    - Senha: ProjetoEducar
4. Click com o botão direito em **servers** e depois em conectar server
5. Crie um nome qualquer para o servidor e vá para a próxima aba
6. Em host você deve escrever **db** e preencher as credenciais confome descrito acima.
7. Clique em próximo e seu pgAdmin deve estar conectado ao db. Enquanto o volume do pgAdmin não for excluido, você não precisará mais fazer a configuração do server. Sendo necessário apenas o login.
   

### Arquivos de inicialização do schema do Banco de dados
Os arquivos de inicialização do esquema são os que estão na pasta `\database\init\` com tipo **.sql**. Esses arquivos só serão executados caso o volume de dados do container do banco de dados esteja vazio. Caso deseje adicionar mais tables no banco de dados:
1. Adicione o arquivo `.sql`na pasta `\database\init\` 
    *obs* você pode usar o pgAdmin para criar as tables e gerar o sql
2. Limpe o volume do banco de dados: pode ser feito no Docker desktop ou utilizando o comando `docker compose down -v-`, que "baixa" os containers e remove todos os volumes.


