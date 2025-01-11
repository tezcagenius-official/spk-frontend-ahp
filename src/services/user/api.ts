"use server";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";
import {
  ILoginRequest,
  ILoginResponse,
} from "@/interfaces/api/auth/query.interface";

export const loginAPI = (body: ILoginRequest) => {
  return satellite
    .post<IBaseAPIResponse<ILoginResponse>>(`/api/auth/login`, body)
    .then((r) => r.data);
};
