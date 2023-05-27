const header = document.querySelector('.header');
let currentButton = document.querySelector('.shedule__shedule-button--active');
const shedule = document.querySelector('.shedule__shedule');

let slide = 1;

setInterval(() => {
  if (slide === 1) {
    header.classList.remove('header__background--image1');
    header.classList.add('header__background--image2');
    slide = 2;
    return slide;
  }
  if (slide === 2) {
    header.classList.remove('header__background--image2');
    header.classList.add('header__background--image3');
    slide = 3;
    return slide;
  }
  if (slide === 3) {
    header.classList.remove('header__background--image3');
    header.classList.add('header__background--image1');
    slide = 1;
    return slide;
  }
}, 3000);

const toogleButtonToActive = (buttonEl) => {
  if (currentButton !== buttonEl) {
    currentButton.classList.remove('shedule__shedule-button--active');
    currentButton = buttonEl;
    currentButton.classList.add('shedule__shedule-button--active');
  }
};

shedule.onclick = (event) => {
  const { target } = event;
  if (target.tagName !== 'BUTTON') return;
  toogleButtonToActive(target);
};
