import { taskList } from './elements.js';
import saveList from './save.js';

export function moveTaskToTop(event) {
    const starButton = event.target;
    const taskItem = starButton.closest('li');
    console.log(taskItem.classList);
    const hasStarredClass = taskItem.classList.contains('starred');
    console.log(hasStarredClass);

    taskItem.classList.toggle('starred');

    console.log(taskItem.classList.contains('starred'));

    if (!hasStarredClass) {
        taskList.insertBefore(taskItem, taskList.firstChild);
    } else {
        taskList.append(taskItem);
    }

    saveList();

}

export function markTaskAsDone(event) {
    const doneButton = event.target;
    const taskItem = doneButton.closest('li');

    taskItem.classList.toggle('done');

    saveList();
}