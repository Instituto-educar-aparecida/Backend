-- Adiciona constraint UNIQUE faltante em activity_progress, necessária para
-- o ON CONFLICT (student_id, activity_id) usado no upsert de submissão de
-- atividades (activityProgress.repository.js). Sem essa constraint, o
-- Postgres rejeita o INSERT ... ON CONFLICT com erro "there is no unique or
-- exclusion constraint matching the ON CONFLICT specification".
ALTER TABLE IF EXISTS public."activity_progress"
ADD CONSTRAINT uq_activity_progress_student_activity
UNIQUE (student_id, activity_id);
