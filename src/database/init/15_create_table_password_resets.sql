CREATE TABLE IF NOT EXISTS public."password_resets"(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_passwordreset_users FOREIGN KEY (user_id) REFERENCES public."users"(id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."password_resets"
OWNER TO "EducarDev";