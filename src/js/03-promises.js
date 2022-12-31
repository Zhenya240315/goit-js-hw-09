import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function createPromise(delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  let delay = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);

  if (delay < 0 || step < 0 || amount <= 0) {
    alert('Зповніть вcі поля.');
    return;
  }
  for (let position = 1; position <= amount; position++) {
    createPromise(delay)
      .then(delayStep => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delayStep}ms`, {
          useIcon: false,
        });
      })
      .catch(delayStep => {
        Notify.failure(`❌ Rejected promise ${position} in ${delayStep}ms`, {
          useIcon: false,
        });
      });
    delay += step;
  }
  event.currentTarget.reset();
}
