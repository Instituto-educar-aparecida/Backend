-- DROP TABLE IF EXISTS public."system_logs";

CREATE TABLE IF NOT EXISTS public."system_logs" (
    id BIGSERIAL PRIMARY KEY,
    level VARCHAR(20),
    message TEXT,
    context JSONB,
    created_at TIMESTAMP DEFAULT now()
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."system_logs"
OWNER TO "EducarDev";