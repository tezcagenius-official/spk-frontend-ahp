"use server";
import { ICreatePerbSubKriteriaRequest } from "@/interfaces/api/perb-sub-kriteria/mutate.interface";
import {
  IGetPerbSubKriteriaListCompResponse,
  IGetPerbSubKriteriaResponse,
} from "@/interfaces/api/perb-sub-kriteria/query.interface";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";

export const postCreateSubPerbandinganAPI = async (
  body: ICreatePerbSubKriteriaRequest
) => {
  return await satellite
    .post<IBaseAPIResponse>(`/api/perbandingan-sub/perbandingan`, body)
    .then((r) => r.data);
};

export const getDisplaySubKriteriaAPI = async (kriteria_id: number) => {
  return await satellite
    .get<IBaseAPIResponse>(`/api/perbandingan-sub/display-sub/${kriteria_id}`)
    .then((r) => r.data);
};

export const getCalcSubPerbandinganAPI = async (id: number) => {
  return await satellite
    .get<IBaseAPIResponse<IGetPerbSubKriteriaResponse>>(
      `/api/perbandingan-sub/calculate-sub/${id}`
    )
    .then((r) => r.data);
};

export const getSubPerbandinganListAPI = async (kriteria_id: number) => {
  return await satellite
    .get<IBaseAPIResponse<IGetPerbSubKriteriaListCompResponse>>(
      `/api/perbandingan-sub/perbandingan/${kriteria_id}`
    )
    .then((r) => r.data);
};
