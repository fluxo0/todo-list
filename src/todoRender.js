import { format } from 'date-fns';
import { render } from "./render";

export function todoRender(projectId, todoId, projectList) {
    const todoItem = projectList.arr[projectId].todoItems[todoId];  

    const topBar = document.querySelector("#top-bar");
    topBar.setAttribute("class", "hidden");

    const content = document.querySelector("#content");

    const todoPage = document.createElement("div");
    todoPage.setAttribute("class", "todo-page");
    content.appendChild(todoPage);

    const todoTitle = document.createElement("div");  
    todoTitle.setAttribute("class", "todo-title");
    todoTitle.textContent = todoItem.title;
    todoPage.appendChild(todoTitle);

    const todoBack = document.createElement("button");
    todoBack.setAttribute("class", "todo-back-btn");
    todoBack.textContent = "back";

    todoBack.addEventListener("click", () => {
        todoPage.remove();
        topBar.removeAttribute("class", "hidden");
        render(projectList);
    });

    todoPage.appendChild(todoBack);

    const description = document.createElement("input");
    description.setAttribute("placeholder", "Description...");
    description.setAttribute("class", "more-description");
    description.value = todoItem.description;

    description.addEventListener("keyup", () => {
        todoItem.description = description.value;
    });

    todoPage.appendChild(description);

    const priorityDiv = document.createElement("div");
    todoPage.appendChild(priorityDiv);

    priority(todoItem, priorityDiv);

    const label = document.createElement("label");
    label.textContent = "due date:";
    label.setAttribute("for", "dueDate");
    label.setAttribute("class", "due-date");
    todoPage.appendChild(label);

    const date = document.createElement("input");
    date.setAttribute("type", "date");

    date.addEventListener("change", (e) => {
        const cDate = e.target.value;
        todoItem.dueDate = formatDate(cDate);
    });
    
    todoPage.appendChild(date);

    const notesLabel = document.createElement("label");
    notesLabel.setAttribute("for", "notes");
    notesLabel.setAttribute("class", "notes");
    notesLabel.textContent = "Notes";

    todoPage.appendChild(notesLabel);

    const notes = document.createElement("textarea");
    notes.setAttribute("id", "notes");
    notes.setAttribute("name", "notes");
    notes.setAttribute("rows", "10");    
    notes.setAttribute("cols", "40");
    notes.value = todoItem.notes;

    notes.addEventListener("keyup", () => {
        todoItem.notes = notes.value;
    });

    todoPage.appendChild(notes);
}

function priority(todoItem, priorityDiv) {
    const fieldset = document.createElement("fieldset");
    priorityDiv.appendChild(fieldset);

    const legend = document.createElement("legend");
    legend.textContent = "Priority:"
    fieldset.appendChild(legend);

    const highDiv = document.createElement("div");
    fieldset.appendChild(highDiv);

    const highLabel = document.createElement("label");
    highLabel.textContent = "High";
    highDiv.appendChild(highLabel);

    const highInput = document.createElement("input");
    highInput.setAttribute("type", "radio");
    highInput.setAttribute("id", "high");

    highDiv.appendChild(highInput);

    const middleDiv = document.createElement("div");
    fieldset.appendChild(middleDiv);

    const middleLabel = document.createElement("label");
    middleLabel.textContent = "Middle";
    middleDiv.appendChild(middleLabel);

    const middleInput = document.createElement("input");
    middleInput.setAttribute("type", "radio");
    middleInput.setAttribute("id", "middle");

    middleDiv.appendChild(middleInput);

    const lowDiv = document.createElement("div");
    fieldset.appendChild(lowDiv);

    const lowLabel = document.createElement("label");
    lowLabel.textContent = "Low";
    lowDiv.appendChild(lowLabel);

    const lowInput = document.createElement("input");
    lowInput.setAttribute("type", "radio");
    lowInput.setAttribute("id", "low");

    lowDiv.appendChild(lowInput);

    switch (todoItem.priority) {
        case "high":
            highInput.setAttribute("checked", "");
            break;
        case "middle":
            middleInput.setAttribute("checked", "");
            break;
        case "low":
            lowInput.setAttribute("checked", "");
            break;
    }

    highInput.addEventListener("click", () => {
        fieldset.remove();
        todoItem.priority = "high";
        priority(todoItem, priorityDiv);
    });

    middleInput.addEventListener("click", () => {
        fieldset.remove();
        todoItem.priority = "middle";
        priority(todoItem, priorityDiv);
    });

    lowInput.addEventListener("click", () => {
        fieldset.remove();
        todoItem.priority = "low";
        priority(todoItem, priorityDiv);
    });
}

function formatDate(cDate) {
    const cDateArr = cDate.split("-");
    const result = 
        format(new Date(cDateArr[0], (cDateArr[1] - 1), cDateArr[2]), 'MM/dd/yyyy');
    return result;
}






