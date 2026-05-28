export class Notification {
    constructor(data) {

        this.id = data.id || null;
        this.userId = data.userId;
        this.title = data.title;
        this.message = data.message;
        this.read = data.read ?? false;
        this.type = data.type || null;
        this.createdAt = data.createdAt || new Date();
    }
}