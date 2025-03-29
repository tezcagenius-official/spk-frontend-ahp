"use server";
import {
    ICreateDivisiRequest,
    IUpdateDivisiRequest,
} from "@/interfaces/api/division/mutate.interface";
import satellite from "../satellite";
import {
    IBaseAPIResponse,
    IGlobalPaginationParams,
} from "@/interfaces/global/api.interface";
import {
    IGetAllDivisiResponse,
    IGetDivisiResponse,
} from "@/interfaces/api/division/query.interface";

export const postCreateDivisiAPI = async (body: ICreateDivisiRequest) => {
    return await satellite
        .post<IBaseAPIResponse>(`/divisi`, body)
        .then((r) => r.data);
};

export const getListDivisiAPI = async (params?: IGlobalPaginationParams) => {
    return await satellite
        .get<IBaseAPIResponse<IGetAllDivisiResponse>>(`/divisi`, {
            params,
        })
        .then((r) => r.data);
};

export const getDetailDivisiAPI = async (id: number) => {
    return await satellite
        .get<IBaseAPIResponse<IGetDivisiResponse>>(`/divisi/${id}`)
        .then((r) => r.data);
};

export const patchUpdateDivisiAPI = async (data: IUpdateDivisiRequest) => {
    return await satellite
        .patch<IBaseAPIResponse>(`/divisi/${data.divisi_id}`, data.body)
        .then((r) => r.data);
};

export const deleteDivisiAPI = async (id: number) => {
    return await satellite
        .delete<IBaseAPIResponse>(`/divisi/${id}`)
        .then((r) => r.data);
};
