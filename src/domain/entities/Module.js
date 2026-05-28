export class Module {
    constructor(data) {

        if (!data.name) {
            throw new Error('name is required');
        }

        this.id = data.id || null;
        this.name = data.name;
        this.description = data.description;
        this.courseId = data.courseId;
        this.order = data.order || 0;
        this.createdAt = data.createdAt || new Date();
    }
}

export default { Module };