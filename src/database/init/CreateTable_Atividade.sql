-- Table: public.curso

-- DROP TABLE IF EXISTS public.curso;

-- Obs: usar Date.toISOString() para salvar Date como string e depois utilizar o parse para recuperar

create table if not exists public."atividade"(
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    modulo_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'nao iniciado' CHECK (status IN ('nao iniciado','em andamento','concluido')),
    qtdquestoes INT DEFAULT 0,
    FOREIGN KEY (modulo_id) REFERENCES modoulo(id)
)

TABLESPACE pg_default;

alter table if exists public."aula"
OWNER to "EducarDev";
