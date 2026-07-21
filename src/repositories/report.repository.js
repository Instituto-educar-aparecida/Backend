// Consultas agregadas para painéis administrativos
// e de instrutor (RF20, RF21).
import { pool } from '../config/db.js';

// Relatório administrativo geral da plataforma.
export const adminOverview = async () => {
    const res = await pool.query(`
        SELECT
            (SELECT COUNT(*) FROM "users" WHERE deleted_at IS NULL) AS total_users,
            (SELECT COUNT(*) FROM "users" WHERE role = 'STUDENT' AND deleted_at IS NULL) AS total_students,
            (SELECT COUNT(*) FROM "users" WHERE role = 'INSTRUCTOR' AND deleted_at IS NULL) AS total_instructors,
            (SELECT COUNT(*) FROM "courses" WHERE deleted_at IS NULL) AS total_courses,
            (SELECT COUNT(*) FROM "courses" WHERE status = 'PENDING' AND deleted_at IS NULL) AS pending_courses,
            (SELECT COUNT(*) FROM "courses" WHERE status = 'APPROVED' AND deleted_at IS NULL) AS approved_courses,
            (SELECT COUNT(*) FROM "enrollments" WHERE status <> 'CANCELLED') AS total_enrollments,
            (SELECT COUNT(*) FROM "certificates" WHERE status = 'ISSUED') AS total_certificates,
            (SELECT COUNT(*) FROM "support_tickets" WHERE status = 'OPEN') AS open_tickets
    `);
    return res.rows[0];
};

// Cursos mais populares (por número de matrículas).
export const topCourses = async (limit = 5) => {
    const res = await pool.query(
        `SELECT c.id, c.title,
                COUNT(e.id)::int AS enrollments,
                COALESCE(ROUND(AVG(r.rating), 2), 0) AS average_rating
         FROM "courses" c
         LEFT JOIN "enrollments" e ON e.course_id = c.id AND e.status <> 'CANCELLED'
         LEFT JOIN "course_reviews" r ON r.course_id = c.id
         WHERE c.deleted_at IS NULL
         GROUP BY c.id
         ORDER BY enrollments DESC
         LIMIT $1`,
        [limit]
    );
    return res.rows;
};

// Relatório de um instrutor: seus cursos, matrículas e avaliações.
export const instructorReport = async (instructorId) => {
    const summary = await pool.query(
        `SELECT
            COUNT(DISTINCT c.id)::int AS total_courses,
            COUNT(DISTINCT e.id)::int AS total_enrollments,
            COALESCE(ROUND(AVG(r.rating), 2), 0) AS average_rating
         FROM "courses" c
         LEFT JOIN "enrollments" e ON e.course_id = c.id AND e.status <> 'CANCELLED'
         LEFT JOIN "course_reviews" r ON r.course_id = c.id
         WHERE c.instructor_id = $1 AND c.deleted_at IS NULL`,
        [instructorId]
    );

    const courses = await pool.query(
        `SELECT c.id, c.title, c.status,
                COUNT(DISTINCT e.id)::int AS enrollments,
                COALESCE(ROUND(AVG(r.rating), 2), 0) AS average_rating
         FROM "courses" c
         LEFT JOIN "enrollments" e ON e.course_id = c.id AND e.status <> 'CANCELLED'
         LEFT JOIN "course_reviews" r ON r.course_id = c.id
         WHERE c.instructor_id = $1 AND c.deleted_at IS NULL
         GROUP BY c.id
         ORDER BY enrollments DESC`,
        [instructorId]
    );

    return { summary: summary.rows[0], courses: courses.rows };
};

export default { adminOverview, topCourses, instructorReport };
