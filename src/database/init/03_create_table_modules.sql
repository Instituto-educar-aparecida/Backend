DROP TABLE IF EXISTS public."modulos";

CREATE TABLE IF NOT EXISTS public."modules"(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    course_id BIGINT NOT NULL,
    "order" INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_modules_courses FOREIGN KEY (course_id) REFERENCES public."courses"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."modules"
OWNER TO "EducarDev";