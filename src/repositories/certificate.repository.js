// Acesso à tabela "certificates".
import { pool } from '../config/db.js';

// Cria um registro de certificado.
export const createCertificate = async ({ student_id, course_id, verification_code, pdf_url, status = 'ISSUED' }) => {
    const res = await pool.query(
        `INSERT INTO "certificates" (student_id, course_id, verification_code, pdf_url, status)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [student_id, course_id, verification_code, pdf_url, status]
    );
    return res.rows[0];
};

// Busca certificado existente para aluno/curso.
export const findByStudentCourse = async (studentId, courseId) => {
    const res = await pool.query(
        'SELECT * FROM "certificates" WHERE student_id = $1 AND course_id = $2',
        [studentId, courseId]
    );
    return res.rows[0];
};

// Lista certificados de um aluno (com título do curso).
export const findByStudent = async (studentId) => {
    const res = await pool.query(
        `SELECT cert.id, cert.verification_code, cert.pdf_url, cert.status, cert.issued_at,
                c.title AS course_title, c.workload_hours
         FROM "certificates" cert
         JOIN "courses" c ON c.id = cert.course_id
         WHERE cert.student_id = $1
         ORDER BY cert.issued_at DESC`,
        [studentId]
    );
    return res.rows;
};

// Verificação pública de certificado pelo código.
export const findByCode = async (code) => {
    const res = await pool.query(
        `SELECT cert.verification_code, cert.status, cert.issued_at,
                u.name AS student_name, c.title AS course_title, c.workload_hours
         FROM "certificates" cert
         JOIN "users" u ON u.id = cert.student_id
         JOIN "courses" c ON c.id = cert.course_id
         WHERE cert.verification_code = $1`,
        [code]
    );
    return res.rows[0];
};

export default { createCertificate, findByStudentCourse, findByStudent, findByCode };
