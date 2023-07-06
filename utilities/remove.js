// Remove task function
import { taskList,  listSelect } from './elements.js';
import { loadListSelector } from './selector.js';
import saveList from './save.js'; 

export function removeTask(event) {
    const taskItem = event.target.closest('li');
    taskList.removeChild(taskItem);
    saveList();
}

  // Delete the selected list
export function deleteList() {
    const selectedIndex = listSelect.value;
    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    if (selectedIndex >= 0 && selectedIndex < todoList.length) {
      todoList.splice(selectedIndex, 1); // Remove the selected list
      localStorage.setItem('todoList', JSON.stringify(todoList));
      loadListSelector();
      listSelect.value = ""; // Reset the selected value in the list selector
      taskList.innerHTML = ""; // Clear the task list
    }
  }