DROP TABLE IF EXISTS public."questao_objetiva";

CREATE TABLE IF NOT EXISTS public."objective_questions"(
    id BIGSERIAL PRIMARY KEY,
    activity_id BIGINT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    option_1 TEXT,
    option_2 TEXT,
    option_3 TEXT,
    option_4 TEXT,
    option_5 TEXT NULL,
    correct_option INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_objectivequestions_activities FOREIGN KEY (activity_id) REFERENCES public."activities"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."objective_questions"
OWNER TO "EducarDev";