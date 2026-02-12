---

### 2. CONTRIBUTING.md (As Regras do Jogo)
*Este arquivo define a ordem e o respeito ao código da ONG.*

```markdown
# 🤝 Contribuindo para o Instituto Educar

Para mantermos a organização com 14 colaboradores, seguimos rigorosamente este fluxo de trabalho baseado no Capítulo 25 do Sommerville.

## 🌿 Fluxo de Branches
- **main**: Código estável. Ninguém faz commit direto aqui.
- **feat/nome-da-tarefa**: Para novas funcionalidades.
- **fix/descricao-do-erro**: Para correções urgentes.

## 🔄 Ciclo de Trabalho
1. Crie uma branch a partir da `main`.
2. Desenvolva sua tarefa no ambiente Docker.
3. Certifique-se de que não quebrou o build: `docker compose up`.
4. Envie para o GitHub: `git push origin feat/sua-tarefa`.
5. Abra um **Pull Request (PR)** para a `main`.

## 🔎 Revisão de Código
Todo PR deve ser revisado por pelo menos um colega do time antes de ser aprovado pela Coordenadora ou Sec. Executivo.

## 💬 Padrão de Commits
Seja claro e profissional:
- `feat: adiciona botão de login`
- `fix: resolve erro de conexão com banco`
- `docs: atualiza manual de instalação`
