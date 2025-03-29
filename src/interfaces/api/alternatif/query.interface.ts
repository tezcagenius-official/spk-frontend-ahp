import { IGlobalPaginationParams } from "@/interfaces/global/api.interface";

export interface IGetListAlternatifResponse {
    alternatif_id: number;
    nama: string;
    email: string;
    nomor_telpon: string;
    divisi_id: number;
    nama_divisi: string;
}

export interface IGetAlternatifResponse {
    alternatif_id: number;
    nama: string;
    email: string;
    nomor_telpon: string;
    divisi_id: number;
    nama_divisi: string;
}

export interface IGetAlternatifParams extends IGlobalPaginationParams {
    divisi_id?: number;
}
