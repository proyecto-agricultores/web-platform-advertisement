import axios from "axios";

const BASE_URL = "https://dev-cosecha-pr-32.herokuapp.com";

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refreshToken");
    if (
      refreshToken &&
      error.response.status === 401 &&
      originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${BASE_URL}/api/token/refresh`, {
          refresh: refreshToken,
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", null);
            console.log("Access token refreshed!", response.data);
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

const api = {
  hello: () => {
    return axios.get(`${BASE_URL}/hello/`);
  },
  token: (body) => {
    return axios.post(`${BASE_URL}/api/token/`, body);
  },
};

export default api;
