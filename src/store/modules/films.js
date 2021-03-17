import filmsApi from '@/api/films';
import utils from '@/helpers/utils';

const state = {
  data: null,
  genre: null,
  promoFilm: null,
  comments: null,
  favoriteFilms: null,
};

const mutations = {
  getFilms(state, payload) {
    state.data = payload;
  },
  getPromoFilm(state, payload) {
    state.promoFilm = payload;
  },
  changeGenre(state, payload) {
    state.genre = payload;
  },
  updateFilm(state, payload) {
    const index = state.data.findIndex((film) => {
      return film.id === payload.id;
    });
    state.data.splice(index, 1, payload);
  },
  updatePromoFilm(state, payload) {
    state.promoFilm.isFavorite = payload.isFavorite;
  },
  getComments(state, payload) {
    state.comments = payload;
  },
  addComment(state, payload) {
    console.log(payload);
    state.comments.push(payload);
  },
  getFavoriteFilms(state, payload) {
    state.favoriteFilms = payload;
  },
};

const actions = {
  getFilmsAction(context, {apiUrl}) {
    return new Promise((resolve) => {
      filmsApi
        .getFilms(apiUrl)
        .then((response) => {
          context.commit('getFilms', utils.adapter(response.data));
          resolve(response.data);
        })
        .catch((result) => {
          console.log('get films error', result);
        });
    });
  },
  getPromoFilmAction(context, {apiUrl}) {
    return new Promise((resolve) => {
      filmsApi
        .getPromoFilm(apiUrl)
        .then((response) => {
          context.commit('getPromoFilm', utils.adapter(response.data));
          resolve(response.data);
        })
        .catch((result) => {
          console.log('get promo film error', result);
        });
    });
  },
  addToMyListAction(context, {id, status}) {
    return new Promise((resolve, reject) => {
      console.log(id, status);
      filmsApi
        .addToFavorite(id, status)
        .then((response) => {
          context.commit('updateFilm', utils.adapter(response.data));
          resolve(response.data);
        })
        .catch((reason) => {
          console.log('erroe add to favorite film', reason);
          sessionStorage.removeItem('userData');
          reject(reason);
        });
    });
  },
  addToMyListPromoFilmAction(context, {id, status}) {
    return new Promise((resolve, reject) => {
      filmsApi
        .addToFavorite(id, status)
        .then((response) => {
          context.commit('updatePromoFilm', utils.adapter(response.data));
          resolve(response.data);
        })
        .catch((reason) => {
          console.log('erroe add to favorite film', reason);
          sessionStorage.removeItem('userData');
          reject(reason);
        });
    });
  },
  getCommentsAction(context, id) {
    return new Promise((resolve) => {
      filmsApi
        .getComments(id)
        .then((response) => {
          context.commit('getComments', response.data);
          resolve(response.data);
        })
        .catch((result) => {
          console.log('get comments error', result);
        });
    });
  },
  addCommentAction(context, {id, data}) {
    return new Promise((resolve) => {
      filmsApi
        .addComment(id, data)
        .then((response) => {
          context.commit('addComment', response.data);
          resolve(response.data);
        })
        .catch((result) => {
          console.log('add comments error', result);
        });
    });
  },
  getFavoriteFilmsAction(context, {apiUrl}) {
    return new Promise((resolve) => {
      filmsApi
        .getFavoriteFilms(apiUrl)
        .then((response) => {
          context.commit('getFavoriteFilms', utils.adapter(response.data));
          resolve(response.data);
        })
        .catch((result) => {
          console.log('get favorite films error', result);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
