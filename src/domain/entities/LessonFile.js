export class LessonFile {
    constructor(data) {

        this.id = data.id || null;
        this.title = data.title;
        this.fileUrl = data.fileUrl;
        this.type = data.type;
        this.size = data.size;
        this.lessonId = data.lessonId;
    }
}