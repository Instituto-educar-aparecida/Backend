export class LessonSupportText {
    constructor(data) {

        this.id = data.id || null;
        this.content = data.content;
        this.lessonId = data.lessonId;
    }
}