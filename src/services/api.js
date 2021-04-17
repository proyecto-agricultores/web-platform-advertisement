import axios from "axios";
import qs from "qs";

const BASE_URL = "https://dev-cosecha-pr-45.herokuapp.com";

const ApiWithToken = axios.create({
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
    response.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    };
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refresh_token");
    refreshToken = refreshToken === "null" ? null : refreshToken;
    if (refreshToken && error.response?.status === 401) {
      const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access);
        return ApiWithToken(originalRequest);
      } else {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
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
  getCredits: () => {
    return ApiWithToken.get(`${BASE_URL}/myCredits/`);
  },
  purchaseCredits: (amount, sourceId, email) => {
    return ApiWithToken.post(`${BASE_URL}/purchaseCredits/`, {
      amount: amount,
      source_id: sourceId,
      email: email,
    });
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
  createUser: ({
    firstName,
    lastName,
    phoneNumber,
    dni,
    ruc,
    password,
    district,
    file,
  }) => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone_number", phoneNumber);
    formData.append("DNI", dni);
    formData.append("RUC", ruc);
    formData.append("password", password);
    formData.append("district_id", district);
    if (file) {
      formData.append("file", file, file.name);
    }
    // return axios.post(`${BASE_URL}/postUserFromWeb/`, formData, {
    //   headers: { "Access-Control-Allow-Origin": "*" },
    // });
    return axios.post(`${BASE_URL}/postUserFromWeb/`, formData);
  },
  generateTwilioCode: () => {
    return ApiWithToken.get(`${BASE_URL}/phoneVerification/`);
  },
  sendTwilioCode: (code) => {
    return ApiWithToken.post(`${BASE_URL}/phoneVerification/`, { code: code });
  },
  postAd: ({
    remainingCredits,
    departmentId,
    regionId,
    districtId,
    forOrders,
    forPublications,
    url,
    name,
    beginningSowingDate,
    endingSowingDate,
    beginningHarvestDate,
    endingHarvestDate,
    supplies,
    file,
  }) => {
    const formData = new FormData();
    formData.append("remaining_credits", remainingCredits);
    formData.append("department_id", departmentId);
    formData.append("region_id", regionId);
    formData.append("district_id", districtId);
    formData.append("for_orders", forOrders);
    formData.append("for_publications", forPublications);
    formData.append("picture_url", "");
    formData.append("url", url);
    formData.append("name", name);
    formData.append("beginning_sowing_date", beginningSowingDate);
    formData.append("ending_sowing_date", endingSowingDate);
    formData.append("beginning_harvest_date", beginningHarvestDate);
    formData.append("ending_harvest_date", endingHarvestDate);
    for (let i = 0; i < supplies.length; ++i) {
      formData.append("supplies[]", supplies[i]);
    }
    formData.append("file", file, file.name);
    return ApiWithToken.post(`${BASE_URL}/postAd/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default api;
