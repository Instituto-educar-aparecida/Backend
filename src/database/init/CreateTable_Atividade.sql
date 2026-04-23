-- DROP TABLE IF EXISTS public."atividade";

create table if not exists public."atividade"(
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    modulo_id BIGINT NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'nao iniciado' CHECK (status IN ('nao iniciado','em andamento','concluido')),
    qtdquestoes INT DEFAULT 0,
    CONSTRAINT fk_atividade_modulo FOREIGN KEY (modulo_id) REFERENCES public."modulo"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

alter table if exists public."atividade"
OWNER to "EducarDev";