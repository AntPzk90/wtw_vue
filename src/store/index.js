import Vue from 'vue';
import Vuex from 'vuex';
import films from '@/store/modules/films';
import auth from '@/store/modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    films,
    auth,
  },
});
