import { fetchBreeds, fetchCatByBreed } from './cat-api';

const loaderElement = document.querySelector('p.loader');
const errorElement = document.querySelector('p.error');
const catInfoDiv = document.querySelector('div.cat-info');
const breedSelect = document.querySelector('select.breed-select');

function updateCatInfo(catData) {
  catInfoDiv.innerHTML = `
    <img src="${catData.url}" alt="Cat Image">
    <p>Name: ${catData.breeds[0].name}</p>
    <p>Description: ${catData.breeds[0].description}</p>
    <p>Temperament: ${catData.breeds[0].temperament}</p>
  `;
}

function showError(error) {
  errorElement.textContent = `${errorElement.textContent}`;
  errorElement.style.display = 'block';
  loaderElement.style.display = 'none';
  breedSelect.style.display = 'none';
}

function showLoader() {
  loaderElement.style.display = 'block';
}

function hideLoaderAndError() {
  loaderElement.style.display = 'none';
  errorElement.style.display = `${errorElement.textContent}`;
}

function updateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
  breedSelect.style.display = 'block';
  loaderElement.style.display = 'none';
}

function handleBreedSelectChange() {
  const selectedBreedId = breedSelect.value;

  showLoader();

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      updateCatInfo(catData[0]);
    })
    .catch(error => {
      showError(error);
    })
    .finally(() => {
      hideLoaderAndError();
    });
}

fetchBreeds()
  .then(breeds => {
    updateBreedSelect(breeds);

    breedSelect.addEventListener('change', handleBreedSelectChange);
  })
  .catch(error => {
    showError(error);
  });
