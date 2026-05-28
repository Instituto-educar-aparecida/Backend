import { TICKET_STATUS } from '../enums/ticketStatus.enum.js';

export class SupportTicket {
    constructor(data) {

        this.id = data.id || null;
        this.userId = data.userId;
        this.subject = data.subject;
        this.message = data.message;
        this.status = data.status || TICKET_STATUS.OPEN;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
}