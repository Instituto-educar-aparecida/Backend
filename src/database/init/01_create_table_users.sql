DROP TABLE IF EXISTS public."user" CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

CREATE TYPE user_role AS ENUM (
    'STUDENT',
    'INSTRUCTOR',
    'SECRETARIA',
    'ADMIN'
);

CREATE TABLE IF NOT EXISTS public."users"(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    phone VARCHAR(30),
    role user_role NOT NULL DEFAULT 'STUDENT',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_users_email UNIQUE(email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."users"


CREATE INDEX idx_users_email
ON public."users"(email);