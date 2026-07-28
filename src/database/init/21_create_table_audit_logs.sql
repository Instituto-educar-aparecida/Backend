--DROP TABLE IF EXISTS public."audit_logs" CASCADE;

CREATE TABLE IF NOT EXISTS public."audit_logs"(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    action VARCHAR(100) NOT NULL,
    entity VARCHAR(100) NOT NULL,
    entity_id BIGINT,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_audit_logs_users
        FOREIGN KEY (user_id)
        REFERENCES public."users"(id)
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."audit_logs"
