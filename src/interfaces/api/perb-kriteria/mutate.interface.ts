export interface ICreatePerbKriteriaRequest {
    divisi_id: number;
    perbandingan: ICreatePerbKritList[];
}

export interface ICreatePerbKritList {
    kriteria1_id: number | undefined;
    kriteria2_id: number | undefined;
    nilai_perbandingan: number | undefined;
}
