import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const customAxios = axios.create({
  timeout: 10000,
});

const getToken = () => AsyncStorage.getItem('sessionToken');

customAxios.interceptors.request.use(async request => {
  // request.headers = {
  //   ...request.headers,
  //   'x-ac-key':
  //     'W3ChV22wAGqZJceSBdApVjXpGxD8upNYrtDhF5SmUXeW2PfNotEsKDx7Wo8XfXFL-finpro-dev',
  //   'x-user-id': '110000011',
  // };
  const token = await getToken();
  request.headers = {
    ...request.headers,
    Authorization: 'Bearer ' + token,
  };
  return request;
});

customAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // TODO: Add method call to get token from android
    } else {
      throw error;
    }
  },
);

export default customAxios;
