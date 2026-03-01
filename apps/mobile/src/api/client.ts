import axios from "axios";
import { getAuthToken } from "../utils/authTokenStore";

export const api = axios.create({
  baseURL: "http://192.168.29.98:5000/api/v1",
});

api.interceptors.request.use(async (config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => Promise.reject(error),
// );
