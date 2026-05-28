export class SupportTicketMessage {
    constructor(data) {

        this.id = data.id || null;
        this.ticketId = data.ticketId;
        this.userId = data.userId;
        this.message = data.message;
        this.createdAt = data.createdAt || new Date();
    }
}