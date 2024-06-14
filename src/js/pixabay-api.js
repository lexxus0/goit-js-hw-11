import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '44377249-dc3d438c16ab3b76144728d61';
const input = document.getElementById('photos_input');

export function fetchImages(query, numberOfImages) {
  const preview = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 200,
  });

  return fetch(`https://pixabay.com/api/?${preview.toString()}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (!data.hits || data.hits.length === 0) {
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          maxWidth: '400px',
          color: '#b90e0a',
          messageColor: '#fff',
          messageLineHeight: '150%',
          messageSize: '16px',
        });
        input.value = '';
        return;
      }

      return data.hits.slice(0, Math.min(numberOfImages, data.hits.length));
    });
}
