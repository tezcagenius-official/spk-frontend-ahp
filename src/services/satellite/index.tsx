import { env } from "@/config";
import axios from "axios";

const satellite = axios.create({
  baseURL: env.API.BASE_URL,
  timeout: 15000,
});

satellite.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(
      new Error(
        JSON.stringify(
          err?.response?.data ?? { message: err.message ?? "Request failed" }
        )
      )
    );
  }
);

export default satellite;
