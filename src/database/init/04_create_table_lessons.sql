DROP TABLE IF EXISTS public."aula" CASCADE;

CREATE TABLE IF NOT EXISTS public."lessons"(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration_seconds INT NOT NULL,
    video_url TEXT NOT NULL,
    module_id BIGINT NOT NULL,
    teacher_id BIGINT NOT NULL,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_lessons_modules
        FOREIGN KEY (module_id)
        REFERENCES public."modules"(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_lessons_users
        FOREIGN KEY (teacher_id)
        REFERENCES public."users"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."lessons"


CREATE INDEX idx_lessons_module_id
ON public."lessons"(module_id);