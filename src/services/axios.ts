import axios from "axios";

console.log(import.meta.env.SOME_KEY);
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
