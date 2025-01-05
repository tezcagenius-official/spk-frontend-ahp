import { env } from "@/config";
import axios from "axios";

const satellite = axios.create({
  baseURL: env.API.BASE_URL,
  timeout: 15000,
});

satellite.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default satellite;
