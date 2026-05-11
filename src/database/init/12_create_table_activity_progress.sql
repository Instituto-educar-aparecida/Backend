DROP TABLE IF EXISTS public."progresso_aula";
DROP TYPE IF EXISTS activity_progress_status CASCADE;

CREATE TYPE activity_progress_status AS ENUM ('NOT_STARTED','IN_PROGRESS','SUBMITTED','GRADED');

CREATE TABLE IF NOT EXISTS public."activity_progress"(
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL,
    activity_id BIGINT NOT NULL,
    status activity_progress_status NOT NULL DEFAULT 'NOT_STARTED',
    grade DECIMAL(5,2) NULL,
    submitted_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_activityprogress_users FOREIGN KEY (student_id) REFERENCES public."users"(id) ON DELETE CASCADE,
    CONSTRAINT fk_activityprogress_activities FOREIGN KEY (activity_id) REFERENCES public."activities"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."activity_progress"
OWNER TO "EducarDev";