import { USER_ROLE } from '../../enums/userRole.enum.js';

export class CreateUserDTO {
    constructor(data) {

        if (!data.name) {
            throw new Error('name is required');
        }

        if (!data.email) {
            throw new Error('email is required');
        }

        if (!data.password) {
            throw new Error('password is required');
        }

        this.name = data.name;
        this.email = data.email;
        this.password = data.password;

        // impede criação arbitrária de admin
        this.role = data.role || USER_ROLE.STUDENT;
        this.avatarUrl = data.avatarUrl || null;
        this.bio = data.bio || null;
        this.phone = data.phone || null;
    }
}