DROP TABLE IF EXISTS public."atividade" CASCADE;
DROP TYPE IF EXISTS activity_status CASCADE;

CREATE TYPE activity_status AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'CLOSED'
);

CREATE TABLE IF NOT EXISTS public."activities"(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    module_id BIGINT NOT NULL,
    status activity_status NOT NULL DEFAULT 'DRAFT',
    minimum_grade DECIMAL(5,2) NOT NULL DEFAULT 0,
    deadline TIMESTAMP NULL,
    question_count INT NOT NULL DEFAULT 0,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_activities_minimum_grade
        CHECK (minimum_grade BETWEEN 0 AND 10),

    CONSTRAINT fk_activities_modules
        FOREIGN KEY (module_id)
        REFERENCES public."modules"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."activities"


CREATE INDEX idx_activities_module_id
ON public."activities"(module_id);