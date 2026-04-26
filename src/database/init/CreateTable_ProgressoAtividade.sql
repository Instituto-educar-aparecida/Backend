-- DROP TABLE IF EXISTS public."progresso_atividade";

CREATE TABLE IF NOT EXISTS public."progresso_atividade"(
    id BIGSERIAL PRIMARY KEY,
    aluno_id BIGINT NOT NULL,
    aula_id BIGINT NOT NULL,
    status VARCHAR(50),
    resposta TEXT,
    avaliacao BIGINT,
    CONSTRAINT fk_progresso_atividade_aluno FOREIGN KEY (aluno_id) REFERENCES public."user"(id) ON DELETE CASCADE,
    CONSTRAINT fk_progresso_atividade_aula FOREIGN KEY (aula_id) REFERENCES public."aula"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."progresso_atividade"
OWNER TO "EducarDev";