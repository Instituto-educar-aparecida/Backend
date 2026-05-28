export class UserProfile {
    constructor(data) {

        this.id = data.id || null;
        this.userId = data.userId;
        this.bio = data.bio || null;
        this.phone = data.phone || null;
        this.avatarUrl = data.avatarUrl || null;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
}