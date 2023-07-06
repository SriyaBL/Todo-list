import  {taskInput, saveListBtn, newListBtn, deleteListBtn, toggleThemeBtn} from './utilities/elements.js';
import { addTask, createNewList } from './utilities/create.js';
import { deleteList } from './utilities/remove.js';
import saveList from './utilities/save.js';
import toggleTheme from './utilities/toggle.js';
import { loadListSelector } from './utilities/selector.js';

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter')
    addTask();
});

saveListBtn.addEventListener('click', saveList);

newListBtn.addEventListener('click', createNewList);

deleteListBtn.addEventListener('click', deleteList);

toggleThemeBtn.addEventListener('click', toggleTheme);

loadListSelector();

document.addEventListener('beforeunload', saveList);

