// Retrieve necessary elements from the DOM and export

const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const saveListBtn = document.getElementById('save-list-btn');
const newListBtn = document.getElementById('new-list-btn');
const listSelect = document.getElementById('list-select');
const deleteListBtn = document.getElementById('delete-list-btn');
const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const body = document.body;

export { taskInput, taskList, saveListBtn, newListBtn, listSelect, deleteListBtn, toggleThemeBtn, body };