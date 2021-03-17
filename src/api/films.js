import axios from '@/api/axios';

const getFilms = (apiUrl) => {
  return axios.get(apiUrl);
};

const getPromoFilm = (apiUrl) => {
  return axios.get(apiUrl);
};

const addToFavorite = (id, status) => {
  return axios.post(`/favorite/${id}/${status}`);
};

const addToFavoritePromoFilm = (apiUrl, data) => {
  return axios.post(apiUrl, data);
};

const getComments = (id) => {
  return axios.get(`comments/${id}`);
};

const addComment = (id, data) => {
  return axios.post(`comments/${id}`, data);
};

const getFavoriteFilms = (apiUrl) => {
  return axios.get(apiUrl);
};
export default {
  getFilms,
  addToFavorite,
  getPromoFilm,
  addToFavoritePromoFilm,
  getComments,
  addComment,
  getFavoriteFilms,
};
