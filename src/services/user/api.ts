"use server";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";
import {
  ILoginRequest,
  ILoginResponse,
} from "@/interfaces/api/auth/query.interface";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IPostCreateUserRequest } from "@/interfaces/api/user/mutate.interface";
import {
  IGetListUserParams,
  IGetListUserResonse,
} from "@/interfaces/api/user/query.interface";

export const loginAPI = async (body: ILoginRequest) => {
  const cookie = await cookies();
  const res = await satellite.post<IBaseAPIResponse<ILoginResponse>>(
    `/api/auth/login`,
    body
  );

  cookie.set("token", res?.data?.data?.token ?? "");
  cookie.set("role", res?.data?.data?.users.role ?? "");

  return res.data;
};

export const logout = async () => {
  const cookie = await cookies();

  cookie.delete("token");
  cookie.delete("role");

  redirect("/login");
};

export const createUserAPI = async (body: IPostCreateUserRequest) => {
  return (await satellite.post<IBaseAPIResponse>("/api/users", body)).data;
};

export const getListUserAPI = async (params?: IGetListUserParams) => {
  return (
    await satellite.get<IBaseAPIResponse<IGetListUserResonse[]>>("/api/users", {
      params: params,
    })
  ).data;
};

export const deleteUserAPI = async (id: string) => {
  return (await satellite.delete<IBaseAPIResponse>(`/api/users/${id}`)).data;
};
