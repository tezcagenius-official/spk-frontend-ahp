"use server";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";
import {
  ICreateSubKriteriaRequest,
  IUpdateSubKriteriaRequest,
} from "@/interfaces/api/sub-kriteria/mutate.interface";
import {
  IGetListSubKriteriaResponse,
  IGetSubKriteriaDetailResponse,
} from "@/interfaces/api/sub-kriteria/query.interface";

export const postCreateSubKriteriaAPI = (body: ICreateSubKriteriaRequest) => {
  return satellite
    .post<IBaseAPIResponse>(`/api/sub-kriteria`, body)
    .then((r) => r.data);
};

export const getListSubKriteriaAPI = () => {
  return satellite
    .get<IBaseAPIResponse<IGetListSubKriteriaResponse[]>>(`/api/sub-kriteria`)
    .then((r) => r.data);
};

export const getDetailSubKriteriaAPI = (id: number) => {
  return satellite
    .get<IBaseAPIResponse<IGetSubKriteriaDetailResponse>>(
      `/api/sub-kriteria/${id}`
    )
    .then((r) => r.data);
};

export const patchUpdateSubKriteriaAPI = (
  body: IUpdateSubKriteriaRequest,
  id: number
) => {
  return satellite
    .patch<IBaseAPIResponse>(`/api/sub-kriteria/${id}`, body)
    .then((r) => r.data);
};

export const deleteSubKriteriaAPI = (id: number) => {
  return satellite
    .delete<IBaseAPIResponse>(`/api/sub-kriteria/${id}`)
    .then((r) => r.data);
};
