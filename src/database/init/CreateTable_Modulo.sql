-- DROP TABLE IF EXISTS public."modulo";

CREATE TABLE IF NOT EXISTS public."modulo"
(
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    curso_id BIGINT NOT NULL,

    CONSTRAINT fk_modulo_curso
        FOREIGN KEY (curso_id)
        REFERENCES public."curso"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."modulo"
    OWNER to "EducarDev";