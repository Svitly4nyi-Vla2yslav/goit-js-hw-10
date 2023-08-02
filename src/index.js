import { fetchBreeds, fetchCatByBreed } from "./cat-api";

function updateCatInfo(catData) {
  const catInfoDiv = document.querySelector("div.cat-info");
  catInfoDiv.innerHTML = `
    <img src="${catData.url}" alt="Cat Image">
    <p>Name: ${catData.breeds[0].name}</p>
    <p>Description: ${catData.breeds[0].description}</p>
    <p>Temperament: ${catData.breeds[0].temperament}</p>
  `;
}

function showError(error) {
  const errorElement = document.querySelector("p.error");
  errorElement.textContent = `Error: ${error.message}`;
  errorElement.style.display = "block";
}

function showLoader() {
  const loaderElement = document.querySelector("p.loader");
  loaderElement.style.display = "block";
}


function hideLoaderAndError() {
  const loaderElement = document.querySelector("p.loader");
  const errorElement = document.querySelector("p.error");
  loaderElement.style.display = "none";
  errorElement.style.display = "none";
}


function updateBreedSelect(breeds) {
  const breedSelect = document.querySelector("select.breed-select");
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function handleBreedSelectChange() {
  const breedSelect = document.querySelector("select.breed-select");
  const selectedBreedId = breedSelect.value;

 
  showLoader();

  fetchCatByBreed(selectedBreedId)
    .then((catData) => {

      updateCatInfo(catData[0]);
    })
    .catch((error) => {
      showError(error);
    })
    .finally(() => {
      hideLoaderAndError();
    });
}

fetchBreeds()
  .then((breeds) => {
    updateBreedSelect(breeds);

    const breedSelect = document.querySelector("select.breed-select");
    breedSelect.addEventListener("change", handleBreedSelectChange);
  })
  .catch((error) => {
    showError(error);
  });
