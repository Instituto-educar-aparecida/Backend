-- DROP TABLE IF EXISTS public."system_logs";

CREATE TABLE IF NOT EXISTS public."system_logs" (
    id BIGSERIAL PRIMARY KEY,
    level VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    context JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT now()
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."system_logs"
OWNER TO "EducarDev";