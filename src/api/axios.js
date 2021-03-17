import axios from 'axios';
import utils from '@/helpers/utils';
import router from '@/router/index';

axios.defaults.baseURL = `https://htmlacademy-react-3.appspot.com/wtw/`;
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  return config;
});
axios.interceptors.response.use((response) => {
  if (response.status === 401) {
    utils.setItem('userData', null);
    router.push({name: 'login'});
  }
  return response;
});

export default axios;
