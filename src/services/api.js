import axios from "axios";

const BASE_URL = "https://dev-cosecha-pr-43.herokuapp.com";

axios.interceptors.request.use(
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

axios.interceptors.response.use(
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
    return axios.get(`${BASE_URL}/hello/`);
  },
  token: (body) => {
    return axios.post(`${BASE_URL}/api/token/`, body);
  },
  supplies: () => {
    return axios.get(`${BASE_URL}/supplys/`);
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
    const body = {
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
    };
    const options = {
      method: "get",
      url: `${BASE_URL}/estimatePublic/`,
      data: body,
    };
    return axios(options);
  },
};

export default api;
