export interface IGetListSubKriteriaResponse {
    sub_kriteria_id: number;
    kriteria_id: number;
    nama_kriteria: string;
    nama_sub_kriteria: string | null;
}

export interface IGetSubKriteriaDetailResponse {
    sub_kriteria_id: number;
    kriteria_id: number;
    nama_sub_kriteria: string | null;
}
