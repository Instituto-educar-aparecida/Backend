-- Table: public.curso

-- DROP TABLE IF EXISTS public.curso;

-- Obs: usar Date.toISOString() para salvar Date como string e depois utilizar o parse para recuperar

CREATE TABLE IF NOT EXISTS public."atividade"
(
    id BIGSERIAL PRIMARY KEY,
    titulo character varying(45) COLLATE pg_catalog."default" NOT NULL,
    materia_id bigint,
    professor_id bigint,
    status character varying(45) COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."atividade"
    OWNER to "EducarDev";
