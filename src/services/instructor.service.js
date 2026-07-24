import * as reportRepo
    from '../repositories/report.repository.js';

import * as courseRepo
    from '../repositories/course.repository.js';

export const getDashboard = async (
    instructorId
) => {
    return reportRepo.instructorReport(
        instructorId
    );
};

export const getMyCourses = async (
    instructorId
) => {
    return courseRepo.listCourses({
        instructorId
    });
};

export default {
    getDashboard,
    getMyCourses
};