//retrieve necessary elements from the DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const starredTaskBtn = document.getElementById('starred-tasks-btn');
const saveListBtn = document.getElementById('save-list-btn');
const newListBtn = document.getElementById('new-list-btn');


//add task event listener
addTaskBtn.addEventListener('click', addTask);

//load saved tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

//add task function
function addTask() {
    const taskText = taskInput.value.trim();
    if(taskText !== '') {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
}

//create a new task item
function createTaskItem(taskText) {
    const taskItem = document.createElement('li');

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;
    taskItem.appendChild(taskTextSpan);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    taskItem.appendChild(dueDateInput);

    const starButton = document.createElement('button');
    starButton.textContent = 'Star';
    starButton.addEventListener('click', moveTaskToTop);
    taskItem.appendChild(starButton);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', removeTask);
    taskItem.appendChild(removeButton);

    return taskItem;

}

//remove task function
function removeTask(event) {
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);
}


function moveTaskToTop(event) {
    const taskItem = event.target.parentElement;
    taskList.prepend(taskItem);
}

//save list function
function saveList() {
    const tasks = Array.from(taskList.children).map(taskItem => ({
        text: taskItem.firstChild.textContent,
        dueDate: taskItem.querySelector('input').value,
        isStarred: taskItem.querySelector('button').textContent === 'Star'
    }));

    localStorage.setItem('todoList', JSON.stringify(tasks));
}

//load tasks from local storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('todoList'));

    if(savedTasks) {
        savedTasks.forEach(task => {
            const taskItem = createTaskItem(task.text);
            taskItem.querySelector('input').value = task.dueDate;
            if(task.isStarred) {
                moveTaskToTop({target: taskItem.querySelector('button')});
            }
            taskList.appendChild(taskItem);
        });
    }

}
//starred tasks button click event listener
starredTaskBtn.addEventListener('click', showStarredTasks);

//show starred tasks
function showStarredTasks() {
    const starredTasks = Array.from(taskList.children).filter(taskItem => taskItem.querySelector('button').textContent === 'Star'
    );
    taskList.innerHTML = '';
    starredTasks.forEach(taskItem => {
        taskList.appendChild(taskItem);
    });
}

//save list button click event listener
saveListBtn.addEventListener('click', saveList);

//new list button click event listener
newListBtn.addEventListener('click', createNewList);

//create a new Empty List
function createNewList() {
    taskList.innerHTML = '';
    localStorage.removeItem('todoList');
}

