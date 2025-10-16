import "./styles.css"
import { TodoItem, Project, ProjectList } from "./todo";
import { render } from "./render";

const newProjectBtn = document.querySelector("#new-project-btn");
const projectList = new ProjectList;
const home = new Project("Home");

projectList.add(home);
render(projectList);

newProjectBtn.addEventListener("click", () => {
    const project = new Project("");
    projectList.add(project);

    render(projectList);
});








