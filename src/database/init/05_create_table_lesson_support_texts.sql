DROP TABLE IF EXISTS public."texto_apoio" CASCADE;

CREATE TABLE IF NOT EXISTS public."lesson_support_texts"(
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    lesson_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_lesson_support_texts_lessons
        FOREIGN KEY (lesson_id)
        REFERENCES public."lessons"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."lesson_support_texts"
OWNER TO "EducarDev";