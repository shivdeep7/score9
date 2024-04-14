import axios from "axios";

export default axios.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    config.baseURL = process.env.CORAL;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
