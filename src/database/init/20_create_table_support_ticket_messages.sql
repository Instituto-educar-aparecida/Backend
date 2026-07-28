--DROP TABLE IF EXISTS public."support_ticket_messages" CASCADE;

CREATE TABLE IF NOT EXISTS public."support_ticket_messages"(
    id BIGSERIAL PRIMARY KEY,
    ticket_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_support_ticket_messages_tickets
        FOREIGN KEY (ticket_id)
        REFERENCES public."support_tickets"(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_support_ticket_messages_users
        FOREIGN KEY (user_id)
        REFERENCES public."users"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."support_ticket_messages"
