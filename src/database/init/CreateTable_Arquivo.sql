-- DROP TABLE IF EXISTS public."arquivo";

create table if not exists public."arquivo"(
    id BIGSERIAL PRIMARY KEY,
    "data" BYTEA,
    titulo VARCHAR(255) NOT NULL,
    modulo_id BIGINT NOT NULL,
    CONSTRAINT fk_arquivo_modulo FOREIGN KEY (modulo_id) REFERENCES public."modulo"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

alter table if exists public."arquivo"
OWNER to "EducarDev";