
CREATE TABLE IF NOT EXISTS public."user"
(
    id bigint NOT NULL,
    hash "char"[],
    role bigint,
    email "char"[],
    name character varying(45)[] COLLATE pg_catalog."default",
    CONSTRAINT "User_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;
