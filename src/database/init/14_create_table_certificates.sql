--DROP TABLE IF EXISTS public."certificates" CASCADE;
DROP TYPE IF EXISTS certificate_status CASCADE;

CREATE TYPE certificate_status AS ENUM (
    'PENDING',
    'ISSUED',
    'REVOKED'
);

CREATE TABLE IF NOT EXISTS public."certificates"(
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    verification_code VARCHAR(100) NOT NULL,
    pdf_url TEXT NOT NULL,
    issued_at TIMESTAMP NOT NULL DEFAULT NOW(),
    status certificate_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_certificates_verification_code
        UNIQUE(verification_code),

    CONSTRAINT fk_certificates_users
        FOREIGN KEY (student_id)
        REFERENCES public."users"(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_certificates_courses
        FOREIGN KEY (course_id)
        REFERENCES public."courses"(id)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."certificates"
OWNER TO "EducarDev";