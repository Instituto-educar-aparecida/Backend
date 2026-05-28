import { ACTIVITY_PROGRESS_STATUS } from '../enums/activityProgressStatus.enum.js';

export class ActivityProgress {
    constructor(data) {

        this.id = data.id || null;
        this.studentId = data.studentId;
        this.activityId = data.activityId;
        this.status = data.status || ACTIVITY_PROGRESS_STATUS.NOT_STARTED;
        this.grade = data.grade || null;
        this.submittedAt = data.submittedAt || null;
        this.createdAt = data.createdAt || new Date();
    }
}