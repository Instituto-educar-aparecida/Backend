export class CourseReview {
    constructor(data) {

        this.id = data.id || null;
        this.studentId = data.studentId;
        this.courseId = data.courseId;
        this.rating = data.rating;
        this.comment = data.comment || null;
        this.createdAt = data.createdAt || new Date();
    }
}