import { taskList, listSelect } from './elements.js';
import { createTaskItem } from './create.js';

export function loadListSelector() {
    listSelect.innerHTML = `<option value="">Select List</option>`;
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    todoList.forEach((_, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `List ${index + 1}`;
        listSelect.appendChild(option);
    });
    listSelect.addEventListener('change', handleListSelectChange);
}

function handleListSelectChange() {
    const selectedListIndex = listSelect.value;
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    if (selectedListIndex >= 0 && selectedListIndex < todoList.length) {
        const selectedList = todoList[selectedListIndex];
        taskList.innerHTML = '';
        if (selectedList && selectedList.length) {
            selectedList.forEach((task) => {
                const taskItem = createTaskItem(task.text);
                taskItem.querySelector('input').value = task.dueDate;
                if (task.isStarred === true) {
                    //moveTaskToTop({ target: taskItem.querySelector('button') });
                    taskItem.classList.add('starred');
                }
                if (task.isDone === true) {
                    taskItem.classList.add('done');
                }

                if (task.dueDate) {
                    const selectedDate = new Date(task.dueDate);
                    const formattedDate = selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                    taskItem.querySelector('input').title = formattedDate;
                }
                taskList.appendChild(taskItem);
            });
        }
    }
}