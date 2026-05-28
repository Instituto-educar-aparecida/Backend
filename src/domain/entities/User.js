import { USER_ROLE } from '../enums/userRole.enum.js';

export class User {
    constructor(data) {

        if (!data.name) {
            throw new Error('name is required');
        }

        if (!data.email) {
            throw new Error('email is required');
        }

        if (!data.passwordHash) {
            throw new Error('passwordHash is required');
        }

        if (!Object.values(USER_ROLE).includes(data.role)) {
            throw new Error('invalid role');
        }

        this.id = data.id || null;
        this.name = data.name;
        this.email = data.email;
        this.passwordHash = data.passwordHash;
        this.avatarUrl = data.avatarUrl || null;
        this.bio = data.bio || null;
        this.phone = data.phone || null;
        this.role = data.role;
        this.active = data.active ?? true;
        this.deletedAt = data.deletedAt || null;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
}

export default {User}