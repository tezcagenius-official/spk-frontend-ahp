"use server";
import { env } from "@/config";
import axios from "axios";
import { cookies } from "next/headers";

const satellite = axios.create({
  baseURL: env.API.BASE_URL,
  timeout: 15000,
});

satellite.interceptors.request.use(async (req) => {
  const cookie = await cookies();

  const auth = cookie.get("token");

  req.headers["Authorization"] = `Bearer ${auth?.value}`;

  return req;
});

satellite.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err);
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
