"use server";
import { ICreatePerhitunganRequest } from "@/interfaces/api/perhitungan/mutate.interface";
import {
    IGetPerhitunganAltResponse,
    IGetPerhitunganByDivisiResponse,
    IGetPerhitunganParams,
} from "@/interfaces/api/perhitungan/query.interface";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import satellite from "../satellite";

export const getPerhitunganByDivisiAPI = async (divisi_id: number) => {
    return await satellite
        .get<IBaseAPIResponse<IGetPerhitunganByDivisiResponse[]>>(
            `/api/perhitungan/by-divisi/${divisi_id}`
        )
        .then((r) => r.data);
};

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

export const getPerhitunganAPI = async (params?: IGetPerhitunganParams) => {
    return await satellite
        .get<IBaseAPIResponse>(`/api/perhitungan`, {
            params: params,
        })
        .then((r) => r.data);
};

export const deletePerhitunganAPI = async (id_kriteria?: number) => {
    return await satellite
        .delete<IBaseAPIResponse>(`/api/perhitungan/${id_kriteria}`)
        .then((r) => r.data);
};
