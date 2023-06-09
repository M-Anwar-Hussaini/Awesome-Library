import { DateTime } from '../node_modules/luxon/src/luxon.js';

const setCurrentDateAndTime = () => {
  const currentTime = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
  const dateEl = document.getElementById('now');
  dateEl.textContent = currentTime;
};

export default setCurrentDateAndTime;