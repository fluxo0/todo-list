export class TodoItem {
    constructor(title) {
        this.title = title;
        this.description = "";
        this.dueDate = "";
        this.priority = "low";
        this.notes = "";
        this.checkList = false;
    }
}

export class Project {
    constructor(title) {
        this.title = title;
        this.todoItems = [];
    }

    add(todoItem) {
        this.todoItems.unshift(todoItem);
    }
}

export class ProjectList {
    constructor() {
        this.arr = [];
    }

    add(project) {
        this.arr.unshift(project);
    }

    remove(id) {
        this.arr.splice(id, 1);
    }

    get length() {
        return this.arr.length;
    }
}