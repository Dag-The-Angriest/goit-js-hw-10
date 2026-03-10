import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const myBtn = document.querySelector('.form button');
const delay = document.querySelector(".form label input[name='delay']").value;
let value = document.querySelectorAll(".form fieldset input[name='state']");

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
// promise.then(onFulfilled).catch(onRejected);
const onClick = myBtn.addEventListener('click', e => {
  e.preventDefault();

  console.log(value[0].checked);
  //   console.log(delay);
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      //   console.log(delay);
      if (value[0].checked) {
        res();
      } else {
        rej();
      }
    }, delay);
    setTimeout(() => {
      promise.then(onFulfilled).catch(onRejected);
    }, 1000);
  });
  //   console.log(myBtn);
});
