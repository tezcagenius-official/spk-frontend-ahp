import { IGlobalPaginationParams } from "@/interfaces/global/api.interface";

export interface IGetPerhitunganAltResponse {
    alternatif: {
        alternatif_id: number;
        nama: string;
        email: string;
        nomor_telpon: string;
    };
    kriteria: IKriteriaPerh[];
}
export interface IGetPerhitunganByDivisiResponse {
    alternatif_id: number;
    nama: string;
    divisi_id: number;
}

export interface IKriteriaPerh {
    kriteria_id: number;
    nama_kriteria: string;
    prioritas: number;
    sub_kriteria: ISubKriteriaPerhitungan[];
}

export interface ISubKriteriaPerhitungan {
    sub_kriteria_id: number;
    kriteria_id: number;
    nama_sub_kriteria: string;
    prioritas: number;
}

export type IGetPerhitunganListResponse = IGetPerhitungan[];

export type IGetPerhitungan = {
    alternatif_id: number;
    nama: string;
    email: string;
    nomor_telpon: string;
    nilai: INilaiPerhitungan[];
    total_skor: string;
    ranking: number;
};

export interface INilaiPerhitungan {
    kriteria: string;
    sub_kriteria: string;
    nilai: string;
}

export interface IGetPerhitunganParams extends IGlobalPaginationParams {
    divisi_id?: number;
}
