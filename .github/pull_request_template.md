# 🚀 Pull Request: [Título Breve]

## 📝 Descrição Geral
<!-- Descreva o 'porquê' da mudança. Quais problemas ela resolve? -->

## 🔗 Dependências e Contexto
- [ ] **Mudança em múltiplos repos?** (Ex: Alteração no Back exige novo campo no Front/Infra)
- [ ] **Repositório de Infra afetado?** (Necessário alterar `docker-compose.yml` ou `.env`)
- **ID da Task/Card:** #

## 🛠️ Tipo de Alteração (Conventional Commits)
- [ ] `feat`: Nova funcionalidade.
- [ ] `fix`: Correção de bug.
- [ ] `refactor`: Melhoria de código sem alteração funcional.
- [ ] `chore`: Atualização de dependências ou Docker.
- [ ] `test`: Adição/Ajuste de testes (Postman/Unitários).

## 🐳 Ambiente Docker & Infraestrutura
- [ ] O `Dockerfile` ou `docker-compose.yml` foi alterado.
- [ ] É necessário rodar `docker-compose up --build` após o merge.
- [ ] Novas variáveis de ambiente foram adicionadas ao `.env.example`.

## 🧪 Garantia de Qualidade (QA)
- **Testes de API (Postman):**
  - [ ] Collection atualizada e exportada para a pasta `/tests`.
  - [ ] Newman rodou localmente com sucesso.
- **Integração:**
  - [ ] Testado em conjunto com o Repo de Infra (Front + Back operantes).
- **Evidências:**
  - <!-- Cole aqui um print do Postman com status 200 ou logs do Newman -->

## ✅ Checklist de Revisão (Final)
- [ ] Minhas mensagens de commit seguem o padrão **Conventional Commits**.
- [ ] Não há chaves de API ou segredos expostos no código.
- [ ] O código foi revisado por pelo menos um par (Peer Review).

---
*Assinado por: @${user.login}*

