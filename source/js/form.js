import { sendData } from './api.js';
import Inputmask from 'inputmask';
// import IMask from 'imask';

const PHONE_REGEX = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{2}[\s-]?([0-9][\s-]?){3}[0-9]{2}$/;
// const ERROR_TIMEOUT = 5000;
// const ERROR_MESSAGE = 'Ошибка отправки данных. Попробуйте еще раз.';
// const SUCCESS_MESSAGE = 'Мы свяжемся с вами в ближайшее время';

const form = document.querySelector('.form');
const telInput = form.querySelector('.form__input');
const resetButton = form.querySelector('.form__reset');

const im = new Inputmask({
  mask: '+7 (999) 999-99-99',
  // placeholder: '    000  000 00 00',
});

im.mask(telInput);

// const showInputInvalid = () => {
//   const invalidMessage = document.createElement

//   if (invalidMessage) {
//     return;
//   }

//   const message = document.createElement('span');
//   message.classList.add('contact__form-label-invalid');
//   message.textContent = input.dataset.error;
//   input.parentNode.append(message);
// }

// const hideInputInvalid = (input) => {
//   const message = input.parentNode.querySelector('.contact__form-label-invalid');
//   if (message) {
//     message.remove();
//   }
//   input.classList.remove('contact__form-input--invalid');
// };

const validateTel = () => {
  const value = telInput.value;
  if (value === '') {
    return false;
  }

  const isValid = PHONE_REGEX.test(value.trim());

  // isValid ? hideInputInvalid : showInputInvalid;

  return isValid;
};


const onSuccessSubmit = (responce) => {
  responce.text().then((text) => console.log(text));
};

const onErrorSubmit = (error) => {
  console.log(error);
};

const onSubmit = (evt) => {
  evt.preventDefault();
  if (validateTel()) {
    const data = new FormData(evt.target);
    const obj = {};
    data.forEach((value, key) => {
      obj[key] = value;
    });
    const dataJson = JSON.stringify(obj);
    console.log(dataJson);
    sendData(dataJson, onSuccessSubmit, onErrorSubmit);
  } else {
    console.log('indalid!');
  }
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (telInput.value === '') {
    resetButton.blur();
    return;
  }

  telInput.value = '';
  telInput.focus();
});
form.addEventListener('submit', onSubmit);
