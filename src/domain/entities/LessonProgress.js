import { PROGRESS_STATUS } from '../enums/progressStatus.enum.js';

export class LessonProgress {
    constructor(data) {

        this.id = data.id || null;
        this.studentId = data.studentId;
        this.lessonId = data.lessonId;
        this.watchSeconds = data.watchSeconds || 0;
        this.status = data.status || PROGRESS_STATUS.NOT_STARTED;
        this.completedAt = data.completedAt || null;
        this.createdAt = data.createdAt || new Date();
    }
}