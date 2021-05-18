import Splide from '@splidejs/splide';

const options = {
  type: 'loop',
  perPage: 2,
  perMove: 2,
  padding: {
    left: '64px',
    right: '64px',
  },
  gap: '68px',
  breakpoints: {
    899: {
      perPage: 1,
      perMove: 1,
      padding: {
        left: 0,
        right: 0,
      },
      gap: '4px',
    },
  },
};

const splideReview = document.querySelector('.splide--review');
const splideResult = document.querySelector('.splide--result');
splideReview.classList.remove('splide--no-js');
splideResult.classList.remove('splide--no-js');

new Splide(splideReview, options).mount();
new Splide(splideResult, {
  type: 'loop',
  perPage: 1,
  perMove: 1,
  gap: '4px',
}).mount();
