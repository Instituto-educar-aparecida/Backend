export class OpenQuestion {
    constructor(data) {

        this.id = data.id || null;
        this.activityId = data.activityId;
        this.description = data.description;
        this.imageUrl = data.imageUrl || null;
        this.createdAt = data.createdAt || new Date();
    }
}