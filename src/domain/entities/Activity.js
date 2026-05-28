import { ACTIVITY_STATUS } from '../enums/activityStatus.enum.js';

export class Activity {
    constructor(data) {

        if (!data.title) {
            throw new Error('title is required');
        }

        if (!Object.values(ACTIVITY_STATUS).includes(data.status)) {
            throw new Error('invalid activity status');
        }

        this.id = data.id || null;
        this.title = data.title;
        this.moduleId = data.moduleId;
        this.status = data.status;
        this.minimumGrade = data.minimumGrade || 0;
        this.deadline = data.deadline || null;
        this.questionCount = data.questionCount || 0;
        this.createdAt = data.createdAt || new Date();
    }
}