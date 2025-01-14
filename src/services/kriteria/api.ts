"use server";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";
import {
  ICreateKriteriaRequest,
  IUpdateKriteriaRequest,
} from "@/interfaces/api/kriteria/mutate.interface";
import {
  IGetKriteriaDetailResponse,
  IGetListKriteriaResponse,
} from "@/interfaces/api/kriteria/query.interface";

export const postCreateKriteriaAPI = async (body: ICreateKriteriaRequest) => {
  return await satellite
    .post<IBaseAPIResponse>("/api/criteria", body)
    .then((r) => r.data);
};

export const patchUpdateKriteriaAPI = async (
  body: IUpdateKriteriaRequest,
  id: number
) => {
  return await satellite
    .patch<IBaseAPIResponse>(`/api/criteria/${id}`, body)
    .then((r) => r.data);
};

export const deleteKriteriaAPI = async (id: number) => {
  return await satellite
    .delete<IBaseAPIResponse>(`/api/criteria/${id}`)
    .then((r) => r.data);
};

export const getListKriteriaAPI = async () => {
  return await satellite
    .get<IBaseAPIResponse<IGetListKriteriaResponse[]>>(`/api/criteria`)
    .then((r) => r.data);
};

export const getDetailKriteriaAPI = async (id: number) => {
  return await satellite
    .get<IBaseAPIResponse<IGetKriteriaDetailResponse>>(`/api/criteria/${id}`)
    .then((r) => r.data);
};
