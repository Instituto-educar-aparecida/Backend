--DROP TABLE IF EXISTS public."notifications" CASCADE;

CREATE TABLE IF NOT EXISTS public."notifications"(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN NOT NULL DEFAULT FALSE,
    type VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_notifications_users
        FOREIGN KEY (user_id)
        REFERENCES public."users"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."notifications"


CREATE INDEX idx_notifications_user_id
ON public."notifications"(user_id);