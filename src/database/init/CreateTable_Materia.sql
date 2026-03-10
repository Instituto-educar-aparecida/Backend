-- Table: public.materia

-- DROP TABLE IF EXISTS public.materia;

CREATE TABLE IF NOT EXISTS public."materia"
(
    id bigint NOT NULL PRIMARY KEY,
    nome  varchar(45) NOT NULL,
    descricao  varchar(100) COLLATE pg_catalog."default",
    professor_id bigint
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.materia
    OWNER to "EducarDev";