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

export const postCreateKriteriaAPI = (body: ICreateKriteriaRequest) => {
  return satellite
    .post<IBaseAPIResponse>("/api/criteria", body)
    .then((r) => r.data);
};

export const patchUpdateKriteriaAPI = (
  body: IUpdateKriteriaRequest,
  id: number
) => {
  return satellite
    .patch<IBaseAPIResponse>(`/api/criteria/${id}`, body)
    .then((r) => r.data);
};

export const deleteKriteriaAPI = (id: number) => {
  return satellite
    .delete<IBaseAPIResponse>(`/api/criteria/${id}`)
    .then((r) => r.data);
};

export const getListKriteriaAPI = () => {
  return satellite
    .get<IBaseAPIResponse<IGetListKriteriaResponse[]>>(`/api/criteria`)
    .then((r) => r.data);
};

export const getDetailKriteriaAPI = (id: number) => {
  return satellite
    .get<IBaseAPIResponse<IGetKriteriaDetailResponse>>(`/api/criteria/${id}`)
    .then((r) => r.data);
};
