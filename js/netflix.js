const movieWrapper = document.querySelector('.movie-wrapper');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

const movieWidth = document.querySelector('.movie').offsetWidth;
let currentPosition = 0;

prevButton.addEventListener('click', () => {
  currentPosition += movieWidth;
  if (currentPosition > 0) {
    currentPosition = -movieWidth * 5;
  }
  movieWrapper.style.transform = `translateX(${currentPosition}px)`;
});

nextButton.addEventListener('click', () => {
  currentPosition -= movieWidth;
  if (currentPosition < -movieWidth * 5) {
    currentPosition = 0;
  }
  movieWrapper.style.transform = `translateX(${currentPosition}px)`;
});
