# API — Instituto Educar

API REST do Instituto Educar (plataforma de cursos online gratuitos).

- **Base URL:** `http://localhost:5173/api`
- **Formato:** JSON. Respostas seguem o padrão `{ "status": "success" | "error", "message"?, "data"? , "details"? }`.
- **Autenticação:** JWT via header `Authorization: Bearer <token>`.
- **Papéis (roles):** `STUDENT`, `INSTRUCTOR`, `SECRETARIA`, `ADMIN`.

> Todos os corpos (body) abaixo são JSON. Campos marcados com `?` são opcionais.

---

## Autenticação — `/auth`

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/auth/register` | Público | Cadastro de usuário. |
| POST | `/auth/login` | Público | Login; retorna `token` e `refreshToken`. |
| POST | `/auth/forgot-password` | Público | Solicita recuperação de senha. |
| POST | `/auth/reset-password` | Público | Redefine a senha via token. |
| POST | `/auth/logout` | Autenticado | Encerra a sessão. |
| GET  | `/auth/me` | Autenticado | Dados do usuário autenticado. |

```jsonc
// POST /auth/register
{ "name": "Ana", "email": "ana@ex.com", "password": "senha123", "role": "INSTRUCTOR" }
// POST /auth/login
{ "email": "ana@ex.com", "password": "senha123" }
// POST /auth/reset-password
{ "token": "<token>", "password": "novaSenha123" }
```

## Aluno — `/student` (papel STUDENT)

| Método | Rota | Descrição |
|---|---|---|
| PUT | `/student/profile` | Atualiza o perfil. |
| GET | `/student/dashboard` | Painel do aluno (RF17). |
| GET | `/student/courses` | Cursos matriculados (RF16). |
| GET | `/student/courses/:courseId/progress` | Recalcula/consulta o progresso. |
| POST | `/student/enrollments` | Matricula em um curso (RF10). `{ "course_id": 1 }` |
| DELETE | `/student/enrollments/:courseId` | Cancela a matrícula. |
| POST | `/student/reviews` | Avalia um curso (RF19). `{ "course_id":1, "rating":5, "comment":"" }` |
| GET | `/student/certificates` | Lista os certificados (RF18). |
| POST | `/student/courses/:courseId/certificate` | Emite o certificado (RF18). |

## Cursos — `/courses`

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| GET | `/courses` | Público | Catálogo (filtros: `search`, `status`, `featured`, `instructorId`). |
| GET | `/courses/:id` | Público | Detalhes com módulos, aulas e avaliação (RF12). |
| POST | `/courses` | INSTRUCTOR/ADMIN | Cria um curso. |
| PUT | `/courses/:id` | Dono/ADMIN | Atualiza o curso. |
| DELETE | `/courses/:id` | Dono/ADMIN | Exclui logicamente o curso. |
| POST | `/courses/:id/modules` | Dono/ADMIN | Cria um módulo no curso. |

```jsonc
// POST /courses
{ "title":"Curso de Python", "description":"...", "syllabus":"...",
  "program_content":"...", "workload_hours":40, "thumbnail_url?":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1280px-Python-logo-notext.svg.png" }
```

## Módulos — `/modules` (INSTRUCTOR/ADMIN)

| Método | Rota | Descrição |
|---|---|---|
| PUT | `/modules/:id` | Atualiza um módulo. |
| DELETE | `/modules/:id` | Exclui logicamente um módulo. |
| POST | `/modules/:id/lessons` | Cria uma aula (RF13). |
| POST | `/modules/:id/activities` | Cria uma atividade (RF14). |

## Aulas — `/lessons` (autenticado)

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| GET | `/lessons/:id` | Autenticado | Conteúdo da aula (textos de apoio + arquivos). |
| POST | `/lessons/:id/progress` | STUDENT | Registra progresso (RF13). |
| PUT | `/lessons/:id` | Dono/ADMIN | Atualiza a aula. |
| DELETE | `/lessons/:id` | Dono/ADMIN | Exclui logicamente a aula. |
| POST | `/lessons/:id/support-texts` | Dono/ADMIN | Adiciona texto de apoio. |
| POST | `/lessons/:id/files` | Dono/ADMIN | Adiciona arquivo de apoio. |

## Atividades — `/activities` (autenticado)

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/activities/:id/objective-questions` | Dono/ADMIN | Adiciona questão objetiva. |
| POST | `/activities/:id/open-questions` | Dono/ADMIN | Adiciona questão aberta. |
| POST | `/activities/:id/submit` | STUDENT | Submete respostas — correção automática das objetivas (RF15). |
| PATCH | `/activities/:id/submissions/:studentId/grade` | Dono/ADMIN | Correção manual das abertas (RF15). |
| GET | `/activities/:id/progress` | STUDENT | Consulta progresso/nota. |

```jsonc
// POST /activities/:id/submit
{ "answers": [ { "question_id":1, "selected_option":2 } ],
  "open_answers?": [ { "question_id":1, "answer":"..." } ] }
```

## Administração — `/admin` (papel ADMIN)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/admin/users` | Lista usuários (filtro `?role=`) (RF06). |
| PUT | `/admin/users/:id` | Atualiza um usuário (RF06). |
| PATCH | `/admin/users/:id/block` | Bloqueia/desbloqueia (RF07). `{ "active": false }` |
| DELETE | `/admin/users/:id` | Exclui logicamente um usuário. |
| GET | `/admin/courses/pending` | Cursos pendentes de aprovação (RF08). |
| PATCH | `/admin/courses/:id/status` | Aprova/rejeita um curso (RF08). `{ "status":"APPROVED" }` |
| PATCH | `/admin/courses/:id/featured` | Destaca um curso (RF09). `{ "featured": true }` |
| GET | `/admin/dashboard` | Painel com métricas (RF20). |
| GET | `/admin/audit-logs` | Logs de auditoria (RF21). |

## Instrutor — `/instructor` (INSTRUCTOR/ADMIN)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/instructor/dashboard` | Relatório dos próprios cursos (RF20). |
| GET | `/instructor/courses` | Lista os cursos do instrutor. |

## Suporte — `/support` (autenticado) (RF22)

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/support/tickets` | Autenticado | Abre um chamado. |
| GET | `/support/tickets` | Autenticado | Lista chamados (staff vê todos). |
| GET | `/support/tickets/:id` | Dono/Staff | Detalha um chamado com mensagens. |
| POST | `/support/tickets/:id/messages` | Dono/Staff | Adiciona mensagem. |
| PATCH | `/support/tickets/:id/status` | ADMIN/SECRETARIA | Atualiza o status. |

## Certificados — `/certificates` (público) (RF18)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/certificates/verify/:code` | Verificação pública de um certificado. |

Os PDFs emitidos ficam disponíveis em `/certificates/<codigo>.pdf`.

## Notificações — `/notifications` (autenticado) (RF23)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/notifications` | Lista notificações + contador de não lidas. |
| PATCH | `/notifications/:id/read` | Marca como lida. |

## Vídeos — `/videos` (autenticado)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/videos/data/:videoId` | Gera a URL de incorporação (embed) do vídeo. |

## Utilitário

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Verificação de saúde da API. |
