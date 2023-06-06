import Library from './modules/library.js';
import navigateMenuItems from './modules/menu_navigation.js';
// import setCurrentDateAndTime from './modules/luxon-date-and-time.js';

navigateMenuItems();
Library.init();

// setCurrentDateAndTime();
const now = document.getElementById('now');
now.textContent = new Date();
