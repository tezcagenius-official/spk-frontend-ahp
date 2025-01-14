"use server";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";
import {
  ILoginRequest,
  ILoginResponse,
} from "@/interfaces/api/auth/query.interface";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAPI = async (body: ILoginRequest) => {
  return await satellite
    .post<IBaseAPIResponse<ILoginResponse>>(`/api/auth/login`, body)
    .then((r) => {
      cookies().set("token", r?.data?.data?.token ?? "");
      cookies().set("role", r?.data?.data?.users.role ?? "");
      return r.data;
    });
};

export const logout = async () => {
  cookies().delete("token");
  cookies().delete("role");
  redirect("/login");
};
