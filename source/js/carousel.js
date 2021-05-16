import Splide from '@splidejs/splide';

const options = {
  type: 'loop',
  perPage: 2,
  perMove: 1,
  padding: {
    left: '64px',
    right: '64px',
  },
  gap: '68px',
  breakpoints: {
    899: {
      perPage: 1,
      padding: {
        left: 0,
        right: 0,
      },
      gap: '4px',
    },
  },
};

new Splide('.splide--review', options).mount();
new Splide('.splide--result', {
  type: 'loop',
  perPage: 1,
  perMove: 1,
  gap: '4px',
}).mount();
