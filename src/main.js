import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const input = document.getElementById('photos_input');
const submitBtn = document.getElementById('submit_button');
const content = document.querySelector('.results');
const loading = document.querySelector('.loading-img');

submitBtn.addEventListener('click', () => {
  const value = input.value.trim();

 if (!value) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please fill the search field first.',
      position: 'topRight',
    }); // add iziToast
    input.value = '';
    return;
  }

  const amountOfImages = prompt(
    'How many images do you want me to show?',
    '10'
  );
  const numberOfImages = Number(amountOfImages);

 

  if (!numberOfImages || numberOfImages <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid number greater than zero.',
      position: 'topRight',
    });
    return;
  }

  loading.classList.add('visible');

  fetchImages(value, numberOfImages)
    .then(images => {
      renderImages(content, images);
    })
    .catch(error => {
      loading.classList.remove('visible');
      console.error('Error fetching images:', error);
      input.value = '';
    })
    .finally(() => {
      //anyway
      loading.classList.remove('visible');
    });
});
