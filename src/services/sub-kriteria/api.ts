"use server";
import {
  IBaseAPIResponse,
  IGlobalPaginationParams,
} from "@/interfaces/global/api.interface";
import satellite from "../satellite";
import {
  ICreateSubKriteriaRequest,
  IUpdateSubKriteriaRequest,
} from "@/interfaces/api/sub-kriteria/mutate.interface";
import {
  IGetListSubKriteriaResponse,
  IGetSubKriteriaDetailResponse,
} from "@/interfaces/api/sub-kriteria/query.interface";

export const postCreateSubKriteriaAPI = async (
  body: ICreateSubKriteriaRequest
) => {
  return await satellite
    .post<IBaseAPIResponse>(`/api/sub-kriteria`, body)
    .then((r) => r.data);
};

export const getListSubKriteriaAPI = async (
  params?: IGlobalPaginationParams
) => {
  return await satellite
    .get<IBaseAPIResponse<IGetListSubKriteriaResponse[]>>(`/api/sub-kriteria`, {
      params,
    })
    .then((r) => r.data);
};

export const getDetailSubKriteriaAPI = async (id: number) => {
  return await satellite
    .get<IBaseAPIResponse<IGetSubKriteriaDetailResponse>>(
      `/api/sub-kriteria/${id}`
    )
    .then((r) => r.data);
};

export const patchUpdateSubKriteriaAPI = async (
  body: IUpdateSubKriteriaRequest,
  id: number
) => {
  return await satellite
    .patch<IBaseAPIResponse>(`/api/sub-kriteria/${id}`, body)
    .then((r) => r.data);
};

export const deleteSubKriteriaAPI = async (id: number) => {
  return await satellite
    .delete<IBaseAPIResponse>(`/api/sub-kriteria/${id}`)
    .then((r) => r.data);
};
