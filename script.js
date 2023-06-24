// Retrieve necessary elements from the DOM
const taskInput = document.getElementById('task-input');
//const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
// const saveListBtn = document.getElementById('save-list-btn');
const newListBtn = document.getElementById('new-list-btn');
const listSelect = document.getElementById('list-select');
const deleteListBtn = document.getElementById('delete-list-btn');

// Add task event listener
//addTaskBtn.addEventListener('click', addTask);

// Load saved tasks from local storage on page load
//document.addEventListener('DOMContentLoaded', loadTasks);

taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
});

// Add task function
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
    taskInput.value = '';
  }
  saveList();
}

// Create a new task item
function createTaskItem(taskText) {
  const taskItem = document.createElement('li');

  const taskTextSpan = document.createElement('span');
  taskTextSpan.textContent = taskText;
  taskItem.appendChild(taskTextSpan);

  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  taskItem.appendChild(dueDateInput);

  const starButton = document.createElement('button');
  starButton.innerHTML = '<i class="far fa-star"></i>'; // Star symbol
  starButton.classList.add('star-button');
  starButton.addEventListener('click', moveTaskToTop);
  taskItem.appendChild(starButton);

  const removeButton = document.createElement('button');
  removeButton.innerHTML = '<i class="fas fa-times"></i>'; // Cross mark symbol
  removeButton.classList.add('remove-button');
  removeButton.addEventListener('click', removeTask);
  taskItem.appendChild(removeButton);

  return taskItem;
}

// Remove task function
function removeTask(event) {
  const taskItem = event.target.closest('li');
  taskList.removeChild(taskItem);
  saveList();
}

// Move task to the top
function moveTaskToTop(event) {
  const starButton = event.target;
  const taskItem = starButton.closest('li');
  if (taskItem.classList.contains('starred')) {
    taskItem.classList.remove('starred');
    taskList.append(taskItem);
    
  } else {
    taskItem.classList.add('starred');
    taskList.insertBefore(taskItem, taskList.firstChild);
  }
}

// Save list function
function saveList() {
  const tasks = Array.from(taskList.children).map((taskItem) => ({
    text: taskItem.firstChild.textContent,
    dueDate: taskItem.querySelector('input').value,
    isStarred: taskItem.classList.contains('starred'),
  }));

  let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

  const selectedIndex = listSelect.value;
  if (selectedIndex >= 0 && selectedIndex < todoList.length) {
    // Update the existing list
    todoList[selectedIndex] = tasks;
  } else {
    // Create a new list
    todoList.push(tasks);
  }

  localStorage.setItem('todoList', JSON.stringify(todoList));

  if(listSelect.value == '')
  {
    loadListSelector();
    listSelect.value = 0;
  }
}

// Load tasks from local storage
// function loadTasks() {
// //   let todoList = JSON.parse(localStorage.getItem('todoList'));
// //   if (todoList && todoList.length > 0) {
// //     const savedTasks = todoList[todoList.length - 1];
// //     savedTasks.forEach((task) => {
// //       const taskItem = createTaskItem(task.text);
// //       taskItem.querySelector('input').value = task.dueDate;
// //       if (task.isStarred) {
// //         moveTaskToTop({ target: taskItem.querySelector('.star-button') });
// //       }
// //       taskList.appendChild(taskItem);
// //     });
// //   }
// }

// Save list button click event listener
//saveListBtn.addEventListener('click', saveList);

// New list button click event listener
newListBtn.addEventListener('click', createNewList);

// Create a new Empty List
function createNewList() {
  taskList.innerHTML = '';
  let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  todoList.push([]);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  loadListSelector();

  // Move the selector to the newly created list
  listSelect.value = todoList.length - 1;
}

// Delete list button click event listener
deleteListBtn.addEventListener('click', deleteList);

// Delete the selected list
function deleteList() {
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

function loadListSelector() {
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
    selectedList.forEach((task) => {
      const taskItem = createTaskItem(task.text);
      taskItem.querySelector('input').value = task.dueDate;
      if (task.isStarred) {
        moveTaskToTop({ target: taskItem.querySelector('button') });
      }
      taskList.appendChild(taskItem);
    });
  }
}

const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const body = document.body;

toggleThemeBtn.addEventListener('click', toggleTheme);

function toggleTheme() {
    body.classList.toggle('dark-theme');

    const isDarkTheme = body.classList.contains('dark-theme');
    toggleThemeBtn.innerHTML = isDarkTheme ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

loadListSelector();
