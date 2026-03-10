CREATE TABLE IF NOT EXISTS public."user"
(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to "EducarDev";
