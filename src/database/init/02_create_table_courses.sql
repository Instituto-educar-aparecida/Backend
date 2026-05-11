DROP TABLE IF EXISTS public."curso";
DROP TYPE IF EXISTS course_status CASCADE;

CREATE TYPE course_status AS ENUM ('PENDING','APPROVED','REJECTED', 'ARCHIVED');

CREATE TABLE IF NOT EXISTS public."courses"(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    syllabus TEXT NOT NULL,
    program_content TEXT NOT NULL,
    prerequisites TEXT,
    target_audience TEXT,
    certification_info TEXT,
    workload_hours INT NOT NULL,
    thumbnail_url TEXT,
    status course_status NOT NULL DEFAULT 'PENDING',
    featured BOOLEAN DEFAULT FALSE,
    enrollment_open BOOLEAN DEFAULT TRUE,
    instructor_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_courses_users FOREIGN KEY (instructor_id) REFERENCES public."users"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."courses"
OWNER TO "EducarDev";