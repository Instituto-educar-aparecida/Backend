export class SystemLog {
    constructor(data) {

        this.id = data.id || null;
        this.level = data.level;
        this.message = data.message;
        this.context = data.context || null;
        this.createdAt = data.createdAt || new Date();
    }
}