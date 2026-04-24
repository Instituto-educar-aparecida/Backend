-- DROP TABLE IF EXISTS public."inscricao";

create table if not exists public."inscricao"(
    id BIGSERIAL PRIMARY KEY,
    id_aluno BIGINT NOT NULL,
    id_curso BIGINT NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    CONSTRAINT fk_inscricao_user FOREIGN KEY (id_aluno) REFERENCES public."user"(id) ON DELETE CASCADE,
    CONSTRAINT fk_inscricao_curso FOREIGN KEY (id_curso) REFERENCES public."curso"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

alter table if exists public."inscricao"
OWNER to "EducarDev";