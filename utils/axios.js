import axios from "axios";

axios.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    config.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axios;
