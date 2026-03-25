-- Table: public.ProgressoCurso

-- DROP TABLE IF EXISTS public."ProgressoCurso";

CREATE TABLE IF NOT EXISTS public."ProgressoCurso"
(
    id BIGSERIAL PRIMARY KEY,
    aluno_id bigint NOT NULL,
    curso_id bigint NOT NULL,
    status VARCHAR(20) COLLATE pg_catalog."default" NOT NULL,
    updated_at VARCHAR(30) COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."ProgressoCurso"
    OWNER to "EducarDev";
