import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('button[data-start]');
const picker = document.querySelector('#datetime-picker');
let days = document.querySelector('span[data-days]');
let hours = document.querySelector('span[data-hours]');
let minutes = document.querySelector('span[data-minutes]');
let seconds = document.querySelector('span[data-seconds]');

button.setAttribute('disabled', 'disabled');
let timer;
let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    // console.log(userSelectedDate);

    console.log(fp.selectedDates[0].getTime());
    // console.log(selectedDates[0]);
    if (Date.now() >= selectedDates[0].getTime()) {
      button.setAttribute('disabled', 'disabled');
      return iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    }
    button.removeAttribute('disabled');
  },
};
flatpickr('#datetime-picker', options);
const fp = document.querySelector('#datetime-picker')._flatpickr;
// let userSelectedDate = new Date().getTime();

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(d, h, m, s) {
  d = days.innerHTML < 10 ? '0' + days.innerHTML : days.innerHTML;
  h = hours.innerHTML < 10 ? '0' + hours.innerHTML : hours.innerHTML;
  m = minutes.innerHTML < 10 ? '0' + minutes.innerHTML : minutes.innerHTML;
  s = seconds.innerHTML < 10 ? '0' + seconds.innerHTML : seconds.innerHTML;
  days.innerHTML = d;
  hours.innerHTML = h;
  minutes.innerHTML = m;
  seconds.innerHTML = s;

  return d + h + m + s;
}
console.log();

button.addEventListener('click', () => {
  picker.setAttribute('disabled', 'disabled');

  button.setAttribute('disabled', 'disabled');
  timer = setInterval(() => {
    const currentTime = Date.now();
    const diff = fp.selectedDates[0] - currentTime;
    const str = convertMs(diff);
    days.innerHTML = str.days;
    hours.innerHTML = str.hours;
    minutes.innerHTML = str.minutes;
    seconds.innerHTML = str.seconds;
    addLeadingZero(str.days);
    if (diff <= 1000) {
      clearInterval(timer);

      picker.removeAttribute('disabled');
    }
  }, 1000);
});
