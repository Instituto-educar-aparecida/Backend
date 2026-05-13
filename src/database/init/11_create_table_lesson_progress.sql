DROP TABLE IF EXISTS public."progresso_aula";
DROP TYPE IF EXISTS progress_status CASCADE;

CREATE TYPE progress_status AS ENUM ('NOT_STARTED','IN_PROGRESS','COMPLETED');

CREATE TABLE IF NOT EXISTS public."lesson_progress"(
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL,
    lesson_id BIGINT NOT NULL,
    current_time INT,
    status progress_status NOT NULL DEFAULT 'NOT_STARTED',
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_lessonprogress_users FOREIGN KEY (student_id) REFERENCES public."users"(id) ON DELETE CASCADE,
    CONSTRAINT fk_lessonprogress_lessons FOREIGN KEY (lesson_id) REFERENCES public."lessons"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."lesson_progress"
OWNER TO "EducarDev";