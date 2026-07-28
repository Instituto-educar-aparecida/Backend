--DROP TABLE IF EXISTS public."user_sessions" CASCADE;

CREATE TABLE IF NOT EXISTS public."user_sessions"(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    refresh_token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_user_sessions_users
        FOREIGN KEY (user_id)
        REFERENCES public."users"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user_sessions"
