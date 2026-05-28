export class Lesson {
    constructor(data) {

        if (!data.title) {
            throw new Error('title is required');
        }

        this.id = data.id || null;
        this.title = data.title;
        this.description = data.description;
        this.duration = data.duration;
        this.videoUrl = data.videoUrl;
        this.moduleId = data.moduleId;
        this.teacherId = data.teacherId;
        this.createdAt = data.createdAt || new Date();
    }
}

export default { Lesson };
