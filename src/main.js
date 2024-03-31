import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchPhotoFromPixabay, limit } from './js/pixabay-api';
import { renderPhotos, listOfPhotos } from './js/render-functions';

export const form = document.querySelector('.search-form');
export let page = 1;
export let input = '';
const nextPageBtn = document.querySelector('.next-page-btn');
hideElement(nextPageBtn);
const preLoader = document.querySelector('.loader');
hideElement(preloader);
let totalPages = 1;



const inputfield = document.querySelector('input');
const inputBtn = document.querySelector('button');
const fillForm = document.querySelector('form');
const preloader = document.querySelector('.preloader');

const showLoader = () => {
  preLoader.style.display = 'flex';
};
const hideLoader = () => {
  preLoader.style.display = 'none';
};
const handleLoad = () => {
  document.body.classList.add('loaded');
  document.body.classList.remove('loaded_hiding');
};

window.onload = handleLoad;

inputBtn.addEventListener('click', async event => {
  event.preventDefault();

  searchImgs = inputfield.value.trim();


  if (!searchImgs.length) {
    iziToast.error({
      color: 'yellow',
      message: ` Please fill in the field for search query.`,
      position: 'topRight',
    });
    setGallery.innerHTML = '';
  }

  
  showLoader();
  try {

    const images = await fetchImg();

    imgset = images.hits;

    if (!imgset.length) {
      iziToast.error({
        color: 'red',
  
        message: `❌ Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });
    }


    renderImgs(images);
  } catch (error) {
    iziToast.error({
      color: 'red',
      message: `:x: Sorry, there was a mistake. Please try again!`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    handleLoad();
  }
});
