-- Table: public.curso

-- DROP TABLE IF EXISTS public.curso;

CREATE TABLE IF NOT EXISTS public."curso"
(
    id bigint NOT NULL PRIMARY KEY,
    titulo varchar(45) NOT NULL,
    materia_id bigint,
    professor_id bigint,
    status varchar(45) NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.curso
    OWNER to "EducarDev";