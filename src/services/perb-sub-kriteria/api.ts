"use server";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";
import { IGetPerbSubKriteriaResponse } from "@/interfaces/api/perb-sub-kriteria/query.interface";
import { ICreatePerbSubKriteriaRequest } from "@/interfaces/api/perb-sub-kriteria/mutate.interface";

export const postCreateSubPerbandinganAPI = (
  body: ICreatePerbSubKriteriaRequest
) => {
  return satellite
    .post<IBaseAPIResponse>(`/api/perbandingan-sub/perbandingan`, body)
    .then((r) => r.data);
};

export const getCalcSubPerbandinganAPI = (id: number) => {
  return satellite
    .get<IBaseAPIResponse<IGetPerbSubKriteriaResponse>>(
      `/api/perbandingan-sub/calculate-sub/${id}`
    )
    .then((r) => r.data);
};
