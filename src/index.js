import "./fonts/stylesheet.css";
import "./styles.css";
import "./todo-page.css"
import { Project, ProjectList } from "./todo";
import { render } from "./render";

const newProjectBtn = document.querySelector("#new-project-btn");
const projectList = new ProjectList;

newProjectBtn.addEventListener("click", () => {
    const project = new Project("");
    projectList.add(project);
    render(projectList);
});

if (!localStorage.getItem('listarr')) {
    const home = new Project("Home");

    projectList.add(home);
} else {
    const listStr = localStorage.getItem('listarr');
    const listObj = JSON.parse(listStr);
    
    projectList.update(listObj);
}

render(projectList);
















