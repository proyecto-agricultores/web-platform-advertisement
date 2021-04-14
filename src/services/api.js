import axios from "axios";
import qs from "qs";

const BASE_URL = "https://dev-cosecha-pr-43.herokuapp.com";

const ApiWithToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

ApiWithToken.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, { indices: false }); // param=value1&param=value2
};

ApiWithToken.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

ApiWithToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refresh_token");
    refreshToken = refreshToken === "null" ? null : refreshToken;
    if (refreshToken && error.response.status === 401) {
      const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.removeItem("refresh_token");
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  hello: () => {
    return ApiWithToken.get(`${BASE_URL}/hello/`);
  },
  token: (body) => {
    return axios.post(`${BASE_URL}/api/token/`, body);
  },
  supplies: () => {
    return ApiWithToken.get(`${BASE_URL}/supplys/`);
  },
  getRegionsByDepartmentId: (departmentId) => {
    if (departmentId !== 0) {
      return axios.get(
        `${BASE_URL}/api/filter/regions/?department=${departmentId}`
      );
    }
  },
  getDistrictsByRegionId: (regionId) => {
    if (regionId !== 0) {
      return axios.get(`${BASE_URL}/api/filter/districts/?region=${regionId}`);
    }
  },
  calculateAudience: ({
    departmentId,
    regionId,
    districtId,
    forOrders,
    forPublications,
    beginningSowingDate,
    endingSowingDate,
    beginningHarvestDate,
    endingHarvestDate,
    supplies,
  }) => {
    return ApiWithToken.get(`${BASE_URL}/estimatePublic/`, {
      params: {
        department_id: departmentId,
        region_id: regionId,
        district_id: districtId,
        for_orders: forOrders,
        for_publications: forPublications,
        beginning_sowing_date: beginningSowingDate,
        ending_sowing_date: endingSowingDate,
        beginning_harvest_date: beginningHarvestDate,
        ending_harvest_date: endingHarvestDate,
        supplies: supplies,
      },
    });
  },
};

export default api;
