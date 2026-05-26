DROP TABLE IF EXISTS public."modulos" CASCADE;

CREATE TABLE IF NOT EXISTS public."modules"(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    course_id BIGINT NOT NULL,
    "order" INT NOT NULL DEFAULT 1,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_modules_courses
        FOREIGN KEY (course_id)
        REFERENCES public."courses"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."modules"
OWNER TO "EducarDev";

CREATE INDEX idx_modules_course_id
ON public."modules"(course_id);