import { sendData } from './api.js';
import Inputmask from 'inputmask';

const PHONE_REGEX = /^(\+7|7|8)?[\s-]?\(?[49][0-9]{2}\)?[\s-]?[0-9]{2}[\s-]?([0-9][\s-]?){3}[0-9]{2}$/;
const ESC_KEYS = [
  'Escape',
  'Esc',
];
const LABEL_DEFAULT = 'Ваш номер телефона';
const LABEL_INVALID = 'Введите номер телефона в&nbsp;формате <span class="form__label-text-accent">+7 (999) 859-69-15</span>';
const SUCCESS_MESSAGES = [
  'Номер отправлен.',
  'Свяжусь с&nbsp;вами в&nbsp;течение&nbsp;дня.',
];
const ERROR_MESSAGES = [
  'Ошибка отправки.',
  'Попробуйте еще раз.',
];

const forms = Array.from(document.querySelectorAll('.form'));

const showInputInvalid = (form) => {
  const errorMessage = form.querySelector('.form__label-text--error');
  const input = form.querySelector('.form__input');
  input.focus();

  if (errorMessage) {
    errorMessage.classList.remove('form__label-text--error');
    requestAnimationFrame(() => errorMessage.classList.add('form__label-text--error'));
    return;
  }

  const label = form.querySelector('.form__label-text');
  label.classList.add('form__label-text--error');
  label.innerHTML = LABEL_INVALID;
};

const hideInputInvalid = (form) => {
  const labelInvalid = form.querySelector('.form__label-text--error');
  if (!labelInvalid) {
    return;
  }

  labelInvalid.classList.remove('form__label-text--error');
  labelInvalid.textContent = LABEL_DEFAULT;
};

const validateForm = (form) => {
  const value = form.querySelector('.form__input').value;

  const isValid = PHONE_REGEX.test(value.trim());

  isValid ? hideInputInvalid(form) : showInputInvalid(form);

  return isValid;
};

const closePopup = () => {
  const popup = document.querySelector('.popup');
  const underlay = popup.querySelector('.popup__underlay');
  const popupButton = popup.querySelector('.popup__button');

  popup.addEventListener('transitionend', () => {
    document.body.classList.remove('no-scroll');
    popup.remove();
  }, {
    once: true,
  });

  popup.classList.remove('popup--show');
  underlay.removeEventListener('click', onUnderlayClick);
  popupButton.removeEventListener('click', onPopupButtonClick);
  document.removeEventListener('keydown', onEscPopup);
};

const onEscPopup = (evt) => {
  evt.preventDefault();
  if (ESC_KEYS.some((key) => evt.key === key)) {
    closePopup();
  }
};

const onPopupButtonClick = (evt) => {
  evt.preventDefault();
  closePopup();
};

const onUnderlayClick = (evt) => {
  evt.preventDefault();
  closePopup();
};

const openPopup = (isSuccess) => {
  const messages = isSuccess ? SUCCESS_MESSAGES : ERROR_MESSAGES;

  const popupContent = `<div class="popup__underlay"></div>
                        <div class="popup__content">
                          <p class="popup__text">
                            <span class="popup__text-block">${messages[0]}</span>
                            <span class="popup__text-block">${messages[1]}</span>
                          </p>
                          <button class="popup__button button" type="button">ОК</button>
                        </div>`;

  const popup = document.createElement('div');
  popup.classList.add('page__popup', 'popup');
  popup.innerHTML = popupContent;
  const underlay = popup.querySelector('.popup__underlay');
  const popupButton = popup.querySelector('.popup__button');

  if (!isSuccess) {
    popup.classList.add('popup--error');
  }

  document.body.classList.add('no-scroll');
  document.body.append(popup);

  popup.classList.add('popup--show');
  underlay.addEventListener('click', onUnderlayClick);
  popupButton.addEventListener('click', onPopupButtonClick);
  document.addEventListener('keydown', onEscPopup);
};

const onSuccessSubmit = () => {
  openPopup(true);
};

const onErrorSubmit = () => {
  openPopup(false);
};

const onSubmit = (evt) => {
  evt.preventDefault();
  if (!validateForm(evt.target)) {
    return;
  }
  const data = new FormData(evt.target);
  sendData(data, onSuccessSubmit, onErrorSubmit);
  evt.target.querySelector('.form__submit').blur();
  evt.target.reset();
};

const onResetClick = (evt) => {
  evt.preventDefault();
  const form = evt.target.closest('.form');
  const input = form.querySelector('.form__input');

  hideInputInvalid(form);

  input.value = '';
  input.focus();
};

const im = new Inputmask({
  mask: '+7 (999) 999-99-99',
});

forms.forEach((form) => {
  const input = form.querySelector('.form__input');
  const resetButton = form.querySelector('.form__reset');
  input.required = false;
  im.mask(input);
  resetButton.addEventListener('click', onResetClick);
  form.addEventListener('submit', onSubmit);
});
