import {onlineManager} from '@tanstack/react-query';
import axios from 'axios';
import store from '../redux/configureStore';
// urls.js or urls.ts
import Config from 'react-native-config';

console.log('Config:', Config); // This should now include your LIVE_URL and LOCAL_URL

const Urls = {
  liveUrl: Config.LIVE_URL,
  localUrl: Config.LOCAL_URL,
};

const AxiosInstance = axios.create({
  baseURL: Urls.localUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br', // Added to match Postman
    // 'Connection': 'keep-alive', // Not needed, as it's the default
    // Add other default headers if needed
    // 'User-Agent': 'MyApp/1.0',
    // 'Accept-Language': 'en-US',
  },
});

AxiosInstance.interceptors.request.use(request => {
  if (!onlineManager.isOnline()) {
    return Promise.reject(new Error('Internet connection is not available'));
  }

  const storeData = store.getState();
  if (storeData?.auth?.token) {
    request.headers.Authorization = `Bearer ${storeData.auth.token}`;
  }

  return request;
});

AxiosInstance.interceptors.response.use(
  response => response,
  error => {
    const errorObj = JSON.parse(JSON.stringify(error?.response ?? error));

    if (errorObj.status == 401) {
      // store.dispatch(logout()); // Uncomment when logout is ready
    }

    return Promise.reject(errorObj);
  },
);

export default AxiosInstance;
