import { COURSE_STATUS } from '../enums/courseStatus.enum.js';

export class Course{
    constructor(data){

        if (!data.title) {
            throw new Error('title is required');
        }

        if (!data.description) {
            throw new Error('description is required');
        }

        if (!Object.values(COURSE_STATUS).includes(data.status)) {
            throw new Error('invalid course status');
        }

        this.id = data.id || null;
        this.title = data.title;
        this.description = data.description;
        this.syllabus = data.syllabus;
        this.programContent = data.programContent;
        this.prerequisites = data.prerequisites || null;
        this.targetAudience = data.targetAudience || null;
        this.certificationInfo = data.certificationInfo || null;
        this.workloadHours = data.workloadHours;
        this.thumbnailUrl = data.thumbnailUrl;
        this.status = data.status;
        this.featured = data.featured ?? false;
        this.enrollmentOpen = data.enrollmentOpen ?? true;
        this.instructorId = data.instructorId;
        this.createdAt = data.createdAt || new Date();
        this.updateAt = data.updateAt || new Date();
    }
}