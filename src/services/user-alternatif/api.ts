import {
  ICreateAlternatifRequest,
  IUpdateAlternatifRequest,
} from "@/interfaces/api/alternatif/mutate.interface";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";
import { IGetListAlternatifResponse } from "@/interfaces/api/alternatif/query.interface";
import { IGetKriteriaDetailResponse } from "@/interfaces/api/kriteria/query.interface";

export const postCreateAlternatifAPI = (body: ICreateAlternatifRequest) => {
  return satellite.post<IBaseAPIResponse>(`/api/alternatif`, body);
};

export const getListAlternatifAPI = () => {
  return satellite.get<IBaseAPIResponse<IGetListAlternatifResponse[]>>(
    `/api/alternatif`
  );
};

export const getDetailAlternatifAPI = (id: number) => {
  return satellite.get<IBaseAPIResponse<IGetKriteriaDetailResponse>>(
    `/api/alternatif/${id}`
  );
};

export const patchUpdateAlternatifAPI = (
  body: IUpdateAlternatifRequest,
  id: number
) => {
  return satellite.patch<IBaseAPIResponse>(`/api/alternatif/${id}`, body);
};

export const deleteAlternatifAPI = (id: number) => {
  return satellite.delete<IBaseAPIResponse>(`/api/alternatif/${id}`);
};
