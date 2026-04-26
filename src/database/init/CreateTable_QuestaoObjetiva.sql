-- DROP TABLE IF EXISTS public."questao_objetiva";

create table if not exists public."questao_objetiva"(
    id BIGSERIAL PRIMARY KEY,
    id_atividade BIGINT NOT NULL,
    imagem BYTEA,
    numero INTEGER,
    descricao TEXT,
    alternativa INTEGER,
    alternativa_correta INTEGER NOT NULL DEFAULT 1 CHECK (alternativa_correta IN (1,2,3,4,5)),
    CONSTRAINT fk_questao_objetiva_atividade FOREIGN KEY (id_atividade) REFERENCES public."atividade"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

alter table if exists public."questao_objetiva"
OWNER to "EducarDev";