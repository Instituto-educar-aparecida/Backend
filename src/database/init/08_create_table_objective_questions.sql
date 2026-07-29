DROP TABLE IF EXISTS public."questao_objetiva" CASCADE;

CREATE TABLE IF NOT EXISTS public."objective_questions"(
    id BIGSERIAL PRIMARY KEY,
    activity_id BIGINT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    option_1 TEXT NOT NULL,
    option_2 TEXT NOT NULL,
    option_3 TEXT NOT NULL,
    option_4 TEXT NOT NULL,
    option_5 TEXT,
    correct_option INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_objective_questions_correct_option
        CHECK (correct_option BETWEEN 1 AND 5),

    CONSTRAINT fk_objective_questions_activities
        FOREIGN KEY (activity_id)
        REFERENCES public."activities"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."objective_questions"
