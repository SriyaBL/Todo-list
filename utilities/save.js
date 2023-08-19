import { listSelect, taskList } from "./elements.js";
import { loadListSelector } from "./selector.js";
// Save list function
export default function saveList() {
    const tasks = Array.from(taskList.children).map((taskItem) => ({
      text: taskItem.firstChild.textContent,
      dueDate: taskItem.querySelector('input[type="date"]').value,
      isStarred: taskItem.classList.contains('starred'),
      isDone: taskItem.classList.contains('done')
    }));
  
    if (!tasks.length)
      return;
  
    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  
    const selectedIndex = listSelect.value;
    if (selectedIndex && selectedIndex >= 0 && selectedIndex < todoList.length) {
      // Update the existing list
      todoList[selectedIndex] = tasks;
    } else {
      // Create a new list
      todoList.push(tasks);
    }
  
    localStorage.setItem('todoList', JSON.stringify(todoList));
  
    if (!listSelect.value) {
      if (todoList.length == 1) {
        loadListSelector();
        listSelect.value = 0;
      }
      else {
        loadListSelector();
        listSelect.value = todoList.length - 1;
      }
    }
  
  }