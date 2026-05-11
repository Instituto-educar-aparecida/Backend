-- DROP TABLE IF EXISTS public."support_tickets";

CREATE TABLE IF NOT EXISTS public."support_tickets" (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    subject VARCHAR(255),
    message TEXT,
    status ticket_status,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),

    CONSTRAINT fk_support_tickets_user
        FOREIGN KEY (user_id)
        REFERENCES public."users"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."support_tickets"
OWNER TO "EducarDev";