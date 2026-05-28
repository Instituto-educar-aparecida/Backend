export class AuditLog {
    constructor(data) {

        this.id = data.id || null;
        this.userId = data.userId || null;
        this.action = data.action;
        this.entity = data.entity;
        this.entityId = data.entityId || null;
        this.details = data.details || null;
        this.ipAddress = data.ipAddress || null;
        this.createdAt = data.createdAt || new Date();
    }
}