--DROP TABLE IF EXISTS public."support_tickets" CASCADE;
--DROP TYPE IF EXISTS ticket_status CASCADE;

CREATE TYPE ticket_status AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'CLOSED'
);

CREATE TABLE IF NOT EXISTS public."support_tickets"(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ticket_status NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_support_tickets_users
        FOREIGN KEY (user_id)
        REFERENCES public."users"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."support_tickets"
