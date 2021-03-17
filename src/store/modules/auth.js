import authApi from '@/api/auth';
import utils from '@/helpers/utils';

const state = {
  data: null,
  isLoggedIn: false,
};

const mutations = {
  getUserData(state, payload) {
    state.data = payload.data;
    state.isLoggedIn = payload.isLoggedIn;
  },
};

const actions = {
  autorizationUser(context, data) {
    return new Promise((resolve) => {
      authApi
        .autorize(data)
        .then((response) => {
          context.commit('getUserData', {
            data: response.data,
            isLoggedIn: true,
          });
          utils.setItem('userData', response.data);
          resolve(response.data);
        })
        .catch((result) => {
          console.log('get User error', result);
        });
    });
  },
  autorizationUserCheck(context) {
    return new Promise((resolve) => {
      authApi
        .autorizeCheck()
        .then((response) => {
          context.commit('getUserData', {
            data: response.data,
            isLoggedIn: true,
          });
          utils.setItem('userData', response.data);
          resolve(response.data);
        })
        .catch((result) => {
          console.log('get User error', result);
          context.commit('getUserData', {
            data: null,
            isLoggedIn: false,
          });
          utils.setItem('userData', null);
        });
    });
  },
  getUserDataFromLocalStorage(context, {key}) {
    context.commit('getUserData', {
      data: utils.getItem(key),
      isLoggedIn: utils.getItem(key) ? true : false,
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
