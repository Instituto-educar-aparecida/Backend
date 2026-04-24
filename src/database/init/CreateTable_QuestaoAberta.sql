-- DROP TABLE IF EXISTS public."questao_aberta";

create table if not exists public."questao_aberta"(
    id BIGSERIAL PRIMARY KEY,
    id_atividade BIGINT NOT NULL,
    imagem BYTEA,
    numero INTEGER,
    descricao TEXT,
    CONSTRAINT fk_questao_aberta_atividade FOREIGN KEY (id_atividade) REFERENCES public."atividade"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

alter table if exists public."questao_aberta"
OWNER to "EducarDev";