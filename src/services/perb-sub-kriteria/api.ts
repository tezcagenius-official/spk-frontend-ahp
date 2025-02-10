"use server";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";
import {
  IGetPerbSubKriteriaListCompResponse,
  IGetPerbSubKriteriaResponse,
} from "@/interfaces/api/perb-sub-kriteria/query.interface";
import { ICreatePerbSubKriteriaRequest } from "@/interfaces/api/perb-sub-kriteria/mutate.interface";

export const postCreateSubPerbandinganAPI = async (
  body: ICreatePerbSubKriteriaRequest
) => {
  return await satellite
    .post<IBaseAPIResponse>(`/api/perbandingan-sub/perbandingan`, body)
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
