DROP TABLE IF EXISTS public."arquivo" CASCADE;

CREATE TABLE IF NOT EXISTS public."lesson_files"(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    type VARCHAR(50),
    size BIGINT,
    lesson_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_lesson_files_lessons
        FOREIGN KEY (lesson_id)
        REFERENCES public."lessons"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."lesson_files"
