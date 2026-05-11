DROP TABLE IF EXISTS public."arquivo";

CREATE TABLE IF NOT EXISTS public."lesson_files"(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_url TEXT,
    type VARCHAR(50),
    size BIGINT,
    lesson_id BIGINT NOT NULL,
    CONSTRAINT fk_lessonfiles_lessons FOREIGN KEY (lesson_id) REFERENCES public."lessons"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."lesson_files"
OWNER TO "EducarDev";