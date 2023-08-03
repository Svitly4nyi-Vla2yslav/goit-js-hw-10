import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_VhS0gIDTmgOPHiWEPwELZWfTm5nPqfaEnwVhJII0n05SOylY1t3qrzW4fHoO3EVX';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const queryParams = { breed_ids: breedId };
  return axios
    .get('https://api.thecatapi.com/v1/images/search', { params: queryParams })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
