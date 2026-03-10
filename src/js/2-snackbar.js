import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const myBtn = document.querySelector('.form button');

const onClick = myBtn.addEventListener('click', e => {
  e.preventDefault();
  const value = document.querySelector('input[type="radio"]:checked').value;
  const delay = document.querySelector('.form input').value;
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      //   console.log(delay);
      if (value == 'fulfilled') {
        res();
      } else if (value !== 'fulfilled') {
        rej();
      }

      promise.then(onFulfilled, onRejected);
    }, delay);
    //   console.log(delay);
    function onFulfilled() {
      console.log('yes');
      return iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    }
    function onRejected() {
      console.log('no');

      return iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
      });
    }
  });
  //   console.log(myBtn);
});
