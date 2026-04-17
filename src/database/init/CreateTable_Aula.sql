create table if not exists public."aula"(
    id BIGSERIAL PRIMARY KEY,
    duracao VARCHAR(20),
    descricao TEXT,
    linkaula TEXT,
    modulo_id BIGINT NOT NULL,
    professor_id varchar(50) NOT NULL,
    FOREIGN KEY (modulo_id) REFERENCES modulo(id)
)

TABLESPACE pg_default;

alter table if exists public."aula"
OWNER to "EducarDev";