import axios from "axios";

//deployment API
const axiosConfig = axios.create({
  baseURL: "",
});

//open API
const openAPI = axios.create({
  baseURL:
    "https://virtserver.swaggerhub.com/ALISYIFA221202/Empower_HR/1.0.0",
});

let bearerToken = "";

export const setAxiosConfig = (token: string) => {
  bearerToken = token;

  if (bearerToken !== "") {
    axiosConfig.defaults.headers.Authorization = `Bearer ${bearerToken}`;
    openAPI.defaults.headers.Authorization = `Bearer ${bearerToken}`;
  } else {
    delete axiosConfig.defaults.headers.Authorization;
    delete openAPI.defaults.headers.Authorization;
  }
};

axiosConfig.interceptors.request.use((config) => {
  return config;
});

openAPI.interceptors.request.use((config) => {
  return config;
});

export { axiosConfig, openAPI };
