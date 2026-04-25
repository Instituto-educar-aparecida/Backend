-- DROP TABLE IF EXISTS public."progresso_aula";

CREATE TABLE IF NOT EXISTS public."progresso_aula"(
    id BIGSERIAL PRIMARY KEY,
    aluno_id BIGINT NOT NULL,
    aula_id BIGINT NOT NULL,
    tempoatual INT DEFAULT 0,
    status VARCHAR(50),
    CONSTRAINT fk_progresso_aula_aluno FOREIGN KEY (aluno_id) REFERENCES public."user"(id) ON DELETE CASCADE,
    CONSTRAINT fk_progresso_aula_aula FOREIGN KEY (aula_id) REFERENCES public."aula"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."progresso_aula"
OWNER TO "EducarDev";