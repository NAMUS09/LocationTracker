import axios from "axios";

const baseURL =
  import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VERSION;

export const axiosConfig = {
  baseURL: baseURL,
  mode: "no-cors",
  withCredentials: true,
};

const axiosClient = axios.create(axiosConfig);

export default axiosClient;
