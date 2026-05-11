DROP TABLE IF EXISTS public."avaliacao_curso";

CREATE TABLE IF NOT EXISTS public."course_reviews"(
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_coursereviews_users FOREIGN KEY (student_id) REFERENCES public."users"(id) ON DELETE CASCADE,
    CONSTRAINT fk_coursereviews_courses FOREIGN KEY (course_id) REFERENCES public."courses"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."course_reviews"
OWNER TO "EducarDev";