import { ENROLLMENT_STATUS } from '../enums/enrollmentStatus.enum.js';

export class Enrollment {
    constructor(data) {

        if (!Object.values(ENROLLMENT_STATUS).includes(data.status)) {
            throw new Error('invalid enrollment status');
        }

        this.id = data.id || null;
        this.studentId = data.studentId;
        this.courseId = data.courseId;
        this.status = data.status;
        this.progressPercent = data.progressPercent || 0;
        this.startedAt = data.startedAt || null;
        this.completedAt = data.completedAt || null;
        this.createdAt = data.createdAt || new Date();
    }
}