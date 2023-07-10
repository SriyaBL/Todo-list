import { taskList, taskInput, listSelect } from './elements.js';
import { moveTaskToTop } from './mark.js';
import { startTaskEditing } from './edit.js';
import saveList from './save.js';
import { markTaskAsDone } from './mark.js';
import { loadListSelector } from './selector.js';
import { removeTask } from './remove.js';

export function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
    saveList();
}

export function createTaskItem(taskText) {
    const taskItem = document.createElement('li');

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;
    taskTextSpan.addEventListener('click', startTaskEditing);
    taskTextSpan.title = "Click to edit task";
    taskItem.appendChild(taskTextSpan);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.title = "No due date";
    dueDateInput.addEventListener('input', function () {
        if (dueDateInput.value) {
            const selectedDate = new Date(dueDateInput.value);
            const formattedDate = selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            dueDateInput.title = formattedDate;
        } else {
            dueDateInput.title = 'No due date';
        }
        saveList();
    });
    taskItem.appendChild(dueDateInput);

    const doneButton = document.createElement('button');
    doneButton.innerHTML = '<i class="fas fa-check"></i>'; // Tick mark symbol
    doneButton.classList.add('done-button');
    doneButton.addEventListener('click', markTaskAsDone);
    taskItem.appendChild(doneButton);
    doneButton.title = 'Done';

    const starButton = document.createElement('button');
    starButton.innerHTML = '<i class="far fa-star"></i>'; // Star symbol
    starButton.classList.add('star-button');
    starButton.addEventListener('click', moveTaskToTop);
    taskItem.appendChild(starButton);
    starButton.title = 'Star';

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-times"></i>'; // Cross mark symbol
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', removeTask);
    taskItem.appendChild(removeButton);
    removeButton.title = 'Remove';

    return taskItem;
}

// Create a new Empty List
export function createNewList() {
    taskList.innerHTML = '';
    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    todoList.push([]);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    loadListSelector();

    // Move the selector to the newly created list
    listSelect.value = todoList.length - 1;
}