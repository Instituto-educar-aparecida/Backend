DROP TABLE IF EXISTS public."questao_aberta";

CREATE TABLE IF NOT EXISTS public."open_questions"(
    id BIGSERIAL PRIMARY KEY,
    activity_id BIGINT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_openquestions_activities FOREIGN KEY (activity_id) REFERENCES public."activities"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."open_questions"
OWNER TO "EducarDev";