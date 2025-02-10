"use server";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";
import { ICreatePerbKriteriaRequest } from "@/interfaces/api/perb-kriteria/mutate.interface";
import {
  IGetPerbKriteriaListResponse,
  IGetPerbKriteriaResponse,
} from "@/interfaces/api/perb-kriteria/query.interface";

export const postCreatePerbandinganKriteriaAPI = async (
  body: ICreatePerbKriteriaRequest
) => {
  return await satellite
    .post<IBaseAPIResponse>(`/api/perbandingan-kriteria/perbandingan`, body)
    .then((r) => r.data);
};

export const getCalcKriteriaAPI = async () => {
  return await satellite
    .get<IBaseAPIResponse<IGetPerbKriteriaResponse>>(
      `/api/perbandingan-kriteria/calculate`
    )
    .then((r) => r.data);
};

export const getKriteriaListAPI = async () => {
  return await satellite
    .get<IBaseAPIResponse<IGetPerbKriteriaListResponse>>(
      `/api/perbandingan-kriteria/perbandingan`
    )
    .then((r) => r.data);
};
