"use server";
import {
    ICreateAlternatifRequest,
    IUpdateAlternatifRequest,
} from "@/interfaces/api/alternatif/mutate.interface";
import {
    IGetAlternatifParams,
    IGetListAlternatifResponse,
} from "@/interfaces/api/alternatif/query.interface";
import { IGetKriteriaDetailResponse } from "@/interfaces/api/kriteria/query.interface";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";

export const postCreateAlternatifAPI = async (
    body: ICreateAlternatifRequest
) => {
    return await satellite
        .post<IBaseAPIResponse>(`/api/alternatif`, body)
        .then((r) => r.data);
};

export const getListAlternatifAPI = async (params?: IGetAlternatifParams) => {
    return await satellite
        .get<IBaseAPIResponse<IGetListAlternatifResponse[]>>(
            `/api/alternatif`,
            {
                params,
            }
        )
        .then((r) => r.data);
};

export const getDetailAlternatifAPI = async (id: number) => {
    return await satellite
        .get<IBaseAPIResponse<IGetKriteriaDetailResponse>>(
            `/api/alternatif/${id}`
        )
        .then((r) => r.data);
};

export const patchUpdateAlternatifAPI = async (
    body: IUpdateAlternatifRequest,
    id: number
) => {
    return await satellite
        .patch<IBaseAPIResponse>(`/api/alternatif/${id}`, body)
        .then((r) => r.data);
};

export const deleteAlternatifAPI = async (id: number) => {
    return await satellite
        .delete<IBaseAPIResponse>(`/api/alternatif/${id}`)
        .then((r) => r.data);
};
