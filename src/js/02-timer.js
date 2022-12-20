import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const styleDiv = document.querySelector('.timer');
const dataInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;
const timeValues = document.querySelector('value');
const daysT = document.querySelector('[data-days]');
const hoursT = document.querySelector('[data-hours]');
const minutesT = document.querySelector('[data-minutes]');
const secondsT = document.querySelector('[data-seconds]');
// let
let intervalId = null;
// styleTimer
styleDiv.style.display = 'flex';
styleDiv.style.marginTop = '10px';
styleDiv.style.gap = '10px';
// ///////

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userselectedDates = selectedDates[0];
    console.log(selectedDates[0]);
    if (userselectedDates < Date.now()) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',
      });
      return;
    }
    btnStart.disabled = false;
  },
};

const flatpickr = flatpickr('#datetime-picker', options);

// !!!
btnStart.addEventListener('click', onClickStartTimer);
function onClickStartTimer() {
  dataInput.disabled = true;
  btnStart.disabled = true;
  start();
}

function start() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userselectedDates - currentTime;
    changeHtmlValues(convertMs(deltaTime));
    if (deltaTime <= 0) {
      stop();
    }
  }, 1000);
}
function stop() {
  changeHtmlValues(convertMs(0));
  clearInterval(intervalId);
  btnStart.disabled = true;
  dataInput.disabled = false;
  console.log('timer off');
}

function changeHtmlValues({ days, hours, minutes, seconds }) {
  daysT.textContent = `${days}`;
  hoursT.textContent = `${hours}`;
  minutesT.textContent = `${minutes}`;
  secondsT.textContent = `${seconds}`;
}
// time
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
