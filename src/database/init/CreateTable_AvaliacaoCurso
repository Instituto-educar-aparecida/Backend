-- DROP TABLE IF EXISTS public."avaliacao_curso";

create table if not exists public."avaliacao_curso"(
    id BIGSERIAL PRIMARY KEY,
    id_curso BIGINT NOT NULL,
    nota INTEGER,
    comentario TEXT,
    CONSTRAINT fk_avaliacao_curso_curso FOREIGN KEY (id_curso) REFERENCES public."curso"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

alter table if exists public."avaliacao_curso"
OWNER to "EducarDev";