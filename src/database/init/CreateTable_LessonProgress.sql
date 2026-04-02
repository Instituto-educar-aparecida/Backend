CREATE TABLE IF NOT EXISTS public."lesson_progress"
(
    id BIGSERIAL PRIMARY KEY,
    user_id bigint NOT NULL,
    lesson_id bigint NOT NULL,
    lesson_current_time float NOT NULL DEFAULT 0,
    duration float NOT NULL DEFAULT 0,
    percentage float NOT NULL DEFAULT 0,
    completed boolean NOT NULL DEFAULT false,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

ALTER TABLE IF EXISTS public."lesson_progress"
    OWNER TO "EducarDev";
