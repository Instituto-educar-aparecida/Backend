export class PasswordReset {
    constructor(data) {

        this.id = data.id || null;
        this.userId = data.userId;
        this.token = data.token;
        this.expiresAt = data.expiresAt;
        this.used = data.used ?? false;
        this.createdAt = data.createdAt || new Date();
    }
}