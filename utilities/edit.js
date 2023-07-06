import saveList from "./save.js";

export function startTaskEditing(event) {
    const taskTextSpan = event.target;
    const taskItem = taskTextSpan.closest('li');

    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.value = taskTextSpan.textContent;
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            endTaskEditing(taskInput, taskTextSpan);
        }
    });


    taskItem.replaceChild(taskInput, taskTextSpan);
    taskInput.focus();
}

function endTaskEditing(taskInput, taskTextSpan) {
    const taskItem = taskInput.closest('li');
    taskTextSpan.textContent = taskInput.value;
    taskItem.replaceChild(taskTextSpan, taskInput);

    saveList();
}