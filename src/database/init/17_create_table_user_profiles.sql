--DROP TABLE IF EXISTS public."user_profiles" CASCADE;

CREATE TABLE IF NOT EXISTS public."user_profiles"(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    bio TEXT,
    phone VARCHAR(30),
    avatar_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_profiles_user_id
        UNIQUE(user_id),

    CONSTRAINT fk_user_profiles_users
        FOREIGN KEY (user_id)
        REFERENCES public."users"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user_profiles"
