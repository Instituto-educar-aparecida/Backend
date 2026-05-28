export class UserSession {
    constructor(data) {

        this.id = data.id || null;
        this.userId = data.userId;
        this.refreshToken = data.refreshToken;
        this.expiresAt = data.expiresAt;
        this.used = data.used ?? false;
        this.createdAt = data.createdAt || new Date();
    }
}