import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const myBtn = document.querySelector('.form button');

let value = document.querySelectorAll(".form fieldset input[name='state']");

// function onFulfilled(data) {
//   console.log('yes');
//   return iziToast.show({
//     message: `✅ Fulfilled promise in ${data}ms`,
//   });
// }
// function onRejected(data) {
//   console.log('no');

//   return iziToast.show({
//     message: `❌ Rejected promise in ${data}ms`,
//   });
// }

// promise.then(onFulfilled).catch(onRejected);
const onClick = myBtn.addEventListener('click', e => {
  e.preventDefault();
  const delay = document.querySelector(".form label input[name='delay']").value;
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (value[0].checked) {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });
  promise
    .then(res => {
      return iziToast.show({
        message: `✅ Fulfilled promise in ${res}ms`,
      });
    })
    .catch(res => {
      return iziToast.show({
        message: `❌ Rejected promise in ${res}ms`,
      });
    });

  //   console.log(delay);
});
//   console.log(myBtn);
