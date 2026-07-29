DROP TABLE IF EXISTS public."inscricao" CASCADE;
DROP TYPE IF EXISTS enrollment_status CASCADE;

CREATE TYPE enrollment_status AS ENUM (
    'ACTIVE',
    'COMPLETED',
    'CANCELLED'
);

CREATE TABLE IF NOT EXISTS public."enrollments"(
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    status enrollment_status NOT NULL DEFAULT 'ACTIVE',
    progress_percent INT NOT NULL DEFAULT 0,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT ck_enrollments_progress
        CHECK (progress_percent BETWEEN 0 AND 100),

    CONSTRAINT uq_enrollments_student_course
        UNIQUE(student_id, course_id),

    CONSTRAINT fk_enrollments_users
        FOREIGN KEY (student_id)
        REFERENCES public."users"(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_enrollments_courses
        FOREIGN KEY (course_id)
        REFERENCES public."courses"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."enrollments"


CREATE INDEX idx_enrollments_student_id
ON public."enrollments"(student_id);

CREATE INDEX idx_enrollments_course_id
ON public."enrollments"(course_id);