
let tasks = [];

const taskInput = document.getElementById("task");
const priorityRadios = document.getElementsByName("priority");
const statusSelect = document.getElementById("status");
const listContainer = document.getElementById("list-container");
const taskForm = document.querySelector('form');

function addTask(event) {
    event.preventDefault();

    let taskName = taskInput.value.trim();
    let priority;
    for (let radio of priorityRadios) {
        if (radio.checked) {
            priority = radio.value;
            break;
        }
    }

    let status = statusSelect.value;

    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    let task = {
        name: taskName,
        priority: priority,
        status: status,
        completed: false
    };
    tasks.push(task);

    let listItem = document.createElement("li");
    listItem.textContent = `Task: ${taskName}, Priority: ${priority}, Status: ${status}`;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    listItem.appendChild(span);

    listContainer.appendChild(listItem);

    taskInput.value = "";
    for (let radio of priorityRadios) {
        radio.checked = false;
    }
    document.getElementById("radio1").checked = true;
    statusSelect.selectedIndex = 0;
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
        let taskNameToRemove = e.target.parentElement.textContent.split(",")[0].replace("Task: ", "");
        tasks = tasks.filter(task => task.name !== taskNameToRemove);

        e.target.parentElement.remove();
    }
}, false);

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        let taskName = e.target.textContent.split(",")[0].replace("Task: ", "");
        let task = tasks.find(t => t.name === taskName);
        if (task) {
            task.completed = !task.completed;
        }
    }
}, false);

taskForm.addEventListener('submit', addTask);
