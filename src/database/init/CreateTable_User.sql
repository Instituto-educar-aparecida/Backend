-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user"(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role INT NOT NULL,
    senhahash TEXT NOT NULL,
    ativa BOOLEAN DEFAULT TRUE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
OWNER TO "EducarDev";