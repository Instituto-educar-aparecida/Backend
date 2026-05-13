-- DROP TABLE IF EXISTS public."audit_logs";

CREATE TABLE IF NOT EXISTS public."audit_logs" (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    action VARCHAR(100),
    entity VARCHAR(100),
    entity_id BIGINT,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT now(),

    CONSTRAINT fk_audit_logs_user
        FOREIGN KEY (user_id)
        REFERENCES public."users"(id)
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."audit_logs"
OWNER TO "EducarDev";