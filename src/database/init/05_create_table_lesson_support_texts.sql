DROP TABLE IF EXISTS public."texto_apoio";

CREATE TABLE IF NOT EXISTS public."lesson_support_texts"(
    id BIGSERIAL PRIMARY KEY,
    content TEXT,
    lesson_id BIGINT NOT NULL,
    CONSTRAINT fk_lessonsupporttexts_lessons FOREIGN KEY (lesson_id) REFERENCES public."lessons"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."lesson_support_texts"
OWNER TO "EducarDev";