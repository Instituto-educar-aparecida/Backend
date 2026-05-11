-- DROP TABLE IF EXISTS public."notifications";

CREATE TABLE IF NOT EXISTS public."notifications" (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255),
    message TEXT,
    read BOOLEAN DEFAULT false,
    type VARCHAR(50),
    created_at TIMESTAMP DEFAULT now(),

    CONSTRAINT fk_notifications_user
        FOREIGN KEY (user_id)
        REFERENCES public."users"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."notifications"
OWNER TO "EducarDev";