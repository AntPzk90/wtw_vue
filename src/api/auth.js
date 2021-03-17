// POST /login
import axios from '@/api/axios';

const autorize = (data) => {
  return axios.post('/login', data);
};

const autorizeCheck = () => {
  return axios.get('login');
};
export default {
  autorize,
  autorizeCheck,
};
