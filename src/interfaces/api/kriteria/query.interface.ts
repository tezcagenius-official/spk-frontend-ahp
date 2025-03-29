import { IGlobalPaginationParams } from "@/interfaces/global/api.interface";

export interface IGetListKriteriaResponse {
    kriteria_id: number;
    nama_kriteria: string | null;
    proioritas: number;
    nama_divisi: string;
}

export interface IGetKriteriaDetailResponse {
    kriteria_id: number;
    nama_kriteria: string | null;
    proioritas: number;
    nama_divisi: string;
}

export interface IGetKriteriaParams extends IGlobalPaginationParams {
    divisi_id?: number;
}
