// Serviço de cursos. Lógica de negócio e regras de autorização por dono/perfil.
import * as courseRepo from '../repositories/course.repository.js';
import * as moduleRepo from '../repositories/module.repository.js';
import * as lessonRepo from '../repositories/lesson.repository.js';
import * as reviewRepo from '../repositories/courseReview.repository.js';
import { AppError } from '../utils/AppError.js';
import { USER_ROLE } from '../domain/enums/userRole.enum.js';
import { COURSE_STATUS } from '../domain/enums/courseStatus.enum.js';

// Garante que o curso existe; caso contrário, lança 404.
export const getCourseOrFail = async (id) => {
    const course = await courseRepo.findById(id);
    if (!course) throw new AppError('Curso não encontrado.', 404);
    return course;
};

// Verifica se o usuário pode gerenciar o curso (dono instrutor ou admin).
export const assertCanManage = (course, user) => {
    const isOwner = String(course.instructor_id) === String(user.id);
    if (user.role !== USER_ROLE.ADMIN && !isOwner) {
        throw new AppError('Você não tem permissão para gerenciar este curso.', 403);
    }
};

// Cria um curso. O instrutor autenticado vira o dono; admin também pode criar.
export const createCourse = async (data, user) => {
    const instructorId = user.id;
    const course = await courseRepo.createCourse({ ...data, instructor_id: instructorId });
    return course;
};

// Catálogo público. Alunos/visitantes veem apenas cursos aprovados por padrão.
export const listCourses = async (queryParams = {}, user = null) => {
    const filtros = {
        search: queryParams.search,

        status: queryParams.status,

        featured:
            queryParams.featured === 'true'
                ? true
                : queryParams.featured === 'false'
                    ? false
                    : undefined,

        instructorId:
            queryParams.instructorId ??
            queryParams.instructor_id,

        onlyOpen:
            queryParams.onlyOpen === 'true' ||
            queryParams.only_open === 'true'
    };

    const isStaff =
        user &&
        [
            USER_ROLE.ADMIN,
            USER_ROLE.SECRETARIA
        ].includes(user.role);

    const isInstructorViewingOwn =
        user &&
        user.role === USER_ROLE.INSTRUCTOR &&
        String(filtros.instructorId) ===
            String(user.id);

    if (
        !isStaff &&
        !isInstructorViewingOwn &&
        !filtros.status
    ) {
        filtros.status = COURSE_STATUS.APPROVED;
    }

    return courseRepo.listCourses(filtros);
};

// Detalhes do curso com módulos, aulas e média de avaliações.
export const getCourseDetails = async (id) => {
    const course = await getCourseOrFail(id);
    const modules = await moduleRepo.findByCourse(id);

    // Anexa as aulas de cada módulo.
    const modulesWithLessons = await Promise.all(
        modules.map(async (m) => ({
            ...m,
            lessons: await lessonRepo.findByModule(m.id),
        }))
    );

    const rating = await reviewRepo.averageByCourse(id);

    return { ...course, modules: modulesWithLessons, rating };
};

// Atualiza informações do curso (somente dono/admin).
export const updateCourse = async (id, data, user) => {
    const course = await getCourseOrFail(id);
    assertCanManage(course, user);
    return courseRepo.updateCourse(id, data);
};

// Altera o status do curso (somente admin).
export const updateStatus = async (id, status) => {
    await getCourseOrFail(id);
    return courseRepo.updateStatus(id, status);
};

// Destaca/remove destaque do curso (somente admin).
export const updateFeatured = async (id, featured) => {
    await getCourseOrFail(id);
    return courseRepo.updateFeatured(id, featured);
};

// Exclui logicamente o curso (dono/admin).
export const deleteCourse = async (id, user) => {
    const course = await getCourseOrFail(id);
    assertCanManage(course, user);
    return courseRepo.softDelete(id);
};

export default {
    getCourseOrFail, assertCanManage, createCourse, listCourses,
    getCourseDetails, updateCourse, updateStatus, updateFeatured, deleteCourse,
};
