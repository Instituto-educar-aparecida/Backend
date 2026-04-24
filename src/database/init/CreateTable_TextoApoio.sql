-- DROP TABLE IF EXISTS public."texto_apoio";

create table if not exists public."texto_apoio"(
    id BIGSERIAL PRIMARY KEY,
    duracao VARCHAR(50),
    texto TEXT,
    modulo_id BIGINT NOT NULL,
    CONSTRAINT fk_texto_apoio_modulo FOREIGN KEY (modulo_id) REFERENCES public."modulo"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

alter table if exists public."texto_apoio"
OWNER to "EducarDev";