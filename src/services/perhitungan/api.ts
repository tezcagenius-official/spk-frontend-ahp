"use server";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";
import { ICreatePerhitunganRequest } from "@/interfaces/api/perhitungan/mutate.interface";
import {
  IGetListPerhitunganParams,
  IGetPerhitunganAltResponse,
} from "@/interfaces/api/perhitungan/query.interface";

export const getPerhitunganAltAPI = async (alt_id: number) => {
  return await satellite
    .get<IBaseAPIResponse<IGetPerhitunganAltResponse>>(
      `/api/perhitungan/${alt_id}`
    )
    .then((r) => r.data);
};

export const postCreatePerhitunganAPI = async (
  body: ICreatePerhitunganRequest
) => {
  return await satellite
    .post<IBaseAPIResponse>(`/api/perhitungan`, body)
    .then((r) => r.data);
};

export const getPerhitunganAPI = async (params?: IGetListPerhitunganParams) => {
  return await satellite
    .get<IBaseAPIResponse>(`/api/perhitungan`, {
      params: params,
    })
    .then((r) => r.data);
};
