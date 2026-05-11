CREATE TABLE IF NOT EXISTS public."user_sessions"(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    refresh_token TEXT,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_usersessions_users FOREIGN KEY (user_id) REFERENCES public."users"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user_sessions"
OWNER TO "EducarDev";