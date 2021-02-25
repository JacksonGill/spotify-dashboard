import axios from '../../_snowpack/pkg/axios.js';
const baseUrl = '/api';

const initializeData = async () => {
  const response = await axios.get(baseUrl);
  if (response.data.error) {
    return {
      error: 'Spotify API is currently unavaiable, try again after some time.',
    };
  }
  return response.data;
};

const initializeLocalStorageData = async (localStorageData) => {
  const response = await axios.post(`${baseUrl}/initialize`, localStorageData);
  if (response.data.error) {
    return {
      error: 'Spotify API is currently unavaiable, try again after some time.',
    };
  }
  return response.data;
};

const getNew = async ({ q, type }) => {
  try {
    const response = await axios.get(`${baseUrl}/new/${q}/${type}`);
    return response.data;
  } catch (err) {
    return {
      error: `unable to find the ${type} of ${q === '' ? 'nothing?' : q}`,
    };
  }
};

export default {
  initializeData,
  getNew,
  initializeLocalStorageData,
};
