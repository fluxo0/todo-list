import { TodoItem, Project } from "./todo";
import { todoRender } from "./todoRender";

export function render(projectList) {
    const projectContainers = document.querySelectorAll(".project-container");

    const content = document.querySelector("#content");
    populateStorage(projectList.arr);

    deleteContainers(projectContainers);

    const list = projectList.length;
    for (let i = 0; i < list; i++) {
        const projectContainer = document.createElement("div");
        projectContainer.setAttribute("class", "project-container");
        content.appendChild(projectContainer);

        const project = document.createElement("input");
        project.setAttribute("class", "project-input");

        inputAttribs(project);
        projectInputAttribs(project, i, projectList);
        projectContainer.appendChild(project);

        const addTodoBtn = document.createElement("button");
        addTodoBtn.setAttribute("class", "add-todo-btn");
        todoBtnAttribs(addTodoBtn, i, projectList);
        projectContainer.appendChild(addTodoBtn);

        const deleteProjectBtn = document.createElement("button");
        deleteProjectBtn.setAttribute("class", "delete-project-btn");

        deleteBtnAttribs(deleteProjectBtn, i, projectList);
        projectContainer.appendChild(deleteProjectBtn);
        
        const todoItems = projectList.arr[i].todoItems;
        for (let j = 0; j < todoItems.length; j++) {
            const todoItem = todoItems[j];

            const todoContainer = document.createElement("div");
            todoContainer.setAttribute("class", "todo-container");
            projectContainer.appendChild(todoContainer);

            const todoCheck = document.createElement("input");
            todoCheck.setAttribute("type", "checkbox");

            if (todoItem.checkList === true) {
                todoCheck.setAttribute("checked", "");
            }

            todoCheck.addEventListener("click", () => {
                todoItem.checkList = !todoItem.checkList;
                populateStorage(projectList.arr);
            });

            todoContainer.appendChild(todoCheck);

            const todo = document.createElement("input");
            todo.setAttribute("class", "todo-input");
            inputAttribs(todo);
            todoInputAttribs(todo, j, projectList, i);

            borderRight(todo, todoItem.priority);

            todoContainer.appendChild(todo);

            const todoDate = document.createElement("p");
            todoDate.textContent = todoItem.dueDate;
            todoDate.setAttribute("class", "todo-date");

            todoContainer.appendChild(todoDate);
            
            const todoMore = document.createElement("button");
            todoMore.setAttribute("class", "todo-more-btn")
            todoMore.textContent = "more";

            todoMore.addEventListener("click", () => {
                const containers = document.querySelectorAll(".project-container");
                deleteContainers(containers);
                todoRender(i, j, projectList);
            });

            todoContainer.appendChild(todoMore);

            const description = document.createElement("p");
            description.setAttribute("class", "description");
            description.textContent = todoItem.description;

            todoContainer.appendChild(description);
        }
    } 
}

export function deleteContainers(containers) {
    containers.forEach(container => {
        container.remove();
    });
}

function inputAttribs(input) { 
    input.setAttribute("type", "text");
    input.setAttribute("minlength", "1");
    input.setAttribute("maxlength", "75");
}

function projectInputAttribs(input, id, projectList) {
    const project = projectList.arr[id];

    input.setAttribute("placeholder", "New project name...");
    input.value = project.title;

    input.addEventListener("keyup", () => {
        project.title = input.value;
        populateStorage(projectList.arr);
    });
}

function todoInputAttribs(input, id, projectList, projectId) {
    const project = projectList.arr[projectId];

    input.setAttribute("placeholder", "New to-do name...");  
    input.value = project.todoItems[id].title;

    input.addEventListener("keyup", () => {
        project.todoItems[id].title = input.value;
    });

}

function todoBtnAttribs(todoBtn, id, projectList) {
    todoBtn.textContent = "+";
    todoBtn.addEventListener("click", () => {
        const todo = new TodoItem("");
        const project = new Project;

        const copyP = projectList.arr[id];
        project.update(copyP.title, copyP.todoItems);
        project.add(todo);
        projectList.arr[id] = project;
        console.log(projectList.arr[id]);
        
        render(projectList);
    });
}

function deleteBtnAttribs(deleteBtn, id, projectList) {
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", () => {
        projectList.remove(id);
        render(projectList);
    });
}

function borderRight(todo, priority) {
    switch (priority) {
        case "low":
            todo.setAttribute("id", "low");
            break;
        case "middle":
            todo.setAttribute("id", "middle");
            break;
        case "high":
            todo.setAttribute("id", "high");
            break;
    }
}

function populateStorage(arr) {
    const listStr = JSON.stringify(arr);
    localStorage.setItem('listarr', listStr);
} 

