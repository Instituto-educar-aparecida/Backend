export class ObjectiveQuestion {
    constructor(data) {

        this.id = data.id || null;
        this.activityId = data.activityId;
        this.description = data.description;
        this.imageUrl = data.imageUrl || null;
        this.option1 = data.option1;
        this.option2 = data.option2;
        this.option3 = data.option3;
        this.option4 = data.option4;
        this.option5 = data.option5 || null;
        this.correctOption = data.correctOption;
        this.createdAt = data.createdAt || new Date();
    }
}