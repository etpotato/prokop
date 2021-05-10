import Splide from '@splidejs/splide';

const options = {
  type: 'loop',
  perPage: 2,
  perMove: 1,
  padding: {
    left : '40px',
    right: '40px',
  },
  gap: '44px',
  breakpoints: {
    899: {
      perPage: 1,
      padding: {
        left : '30px',
        right: '30px',
      },
      gap: '34px',
    },
    600: {
      perPage: 1,
      padding: {
        left : '20px',
        right: '20px',
      },
      gap: '24px',
    },
  },
};

new Splide('.splide--review', options).mount();
new Splide('.splide--result', options).mount();
new Splide('.splide--price', options).mount();
