export class UpdateUserDTO {
    constructor(data) {

        this.name = data.name;
        this.email = data.email;
        this.avatarUrl = data.avatarUrl;
        this.bio = data.bio;
        this.phone = data.phone;
        this.active = data.active;
    }
}