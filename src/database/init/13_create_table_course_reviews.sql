DROP TABLE IF EXISTS public."avaliacao_curso" CASCADE;

CREATE TABLE IF NOT EXISTS public."course_reviews"(
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_course_reviews_rating
        CHECK (rating BETWEEN 1 AND 5),

    CONSTRAINT uq_course_reviews_student_course
        UNIQUE(student_id, course_id),

    CONSTRAINT fk_course_reviews_users
        FOREIGN KEY (student_id)
        REFERENCES public."users"(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_course_reviews_courses
        FOREIGN KEY (course_id)
        REFERENCES public."courses"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."course_reviews"
OWNER TO "EducarDev";

CREATE INDEX idx_course_reviews_course_id
ON public."course_reviews"(course_id);