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
  return satellite.post<IBaseAPIResponse>("/api/criteria", body);
};

export const patchUpdateKriteriaAPI = (
  body: IUpdateKriteriaRequest,
  id: number
) => {
  return satellite.patch<IBaseAPIResponse>(`/api/criteria/${id}`, body);
};

export const deleteKriteriaAPI = (id: number) => {
  return satellite.delete<IBaseAPIResponse>(`/api/criteria/${id}`);
};

export const getListKriteriaAPI = () => {
  return satellite.get<IBaseAPIResponse<IGetListKriteriaResponse[]>>(
    `/api/criteria`
  );
};

export const getDetailKriteriaAPI = (id: number) => {
  return satellite.get<IBaseAPIResponse<IGetKriteriaDetailResponse>>(
    `/api/criteria/${id}`
  );
};
