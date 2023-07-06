import { toggleThemeBtn, body } from './elements.js';

export default function toggleTheme() {
    body.classList.toggle('dark-theme');
  
    const isDarkTheme = body.classList.contains('dark-theme');
    toggleThemeBtn.innerHTML = isDarkTheme ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}
  