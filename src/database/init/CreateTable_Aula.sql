-- DROP TABLE IF EXISTS public."aula";

create table if not exists public."aula"(
    id BIGSERIAL PRIMARY KEY,
    duracao VARCHAR(20),
    descricao TEXT,
    linkaula TEXT,
    modulo_id BIGINT NOT NULL,
    professor_id BIGINT NOT NULL,
    CONSTRAINT fk_aula_user FOREIGN KEY (professor_id) REFERENCES public."user"(id) ON DELETE CASCADE,
    CONSTRAINT fk_aula_modulo FOREIGN KEY (modulo_id) REFERENCES public."modulo"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

alter table if exists public."aula"
OWNER to "EducarDev";