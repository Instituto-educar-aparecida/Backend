-- Table: public.curso

-- DROP TABLE IF EXISTS public."curso";

CREATE TABLE IF NOT EXISTS public."curso"
(
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    carga_horaria INT CHECK (carga_horaria >= 0),
    nota INT CHECK (nota >= 0),
    imagem_capa BYTEA,
    status VARCHAR(50) NOT NULL CHECK (
    status IN (
        'Programado',
        'Inscricoes Abertas',
        'Aguardando inicio',
        'Arquivado',
        'Em andamento',
        'Cancelado'
    )
),
    matriculas_abertas BOOLEAN DEFAULT FALSE,
    em_destaque BOOLEAN DEFAULT FALSE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."curso"
    OWNER to "EducarDev";