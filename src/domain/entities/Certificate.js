import { CERTIFICATE_STATUS } from '../enums/certificateStatus.enum.js';

export class Certificate {
    constructor(data) {

        this.id = data.id || null;
        this.studentId = data.studentId;
        this.courseId = data.courseId;
        this.verificationCode = data.verificationCode;
        this.pdfUrl = data.pdfUrl;
        this.issuedAt = data.issuedAt || new Date();
        this.status = data.status || CERTIFICATE_STATUS.PENDING;
    }
}