export interface ICreatePerhitunganRequest {
    alternatif_id: number;
    divisi_id: number;
    penilaian: {
        kriteria_id: number | null;
        sub_kriteria_id: number | null;
    }[];
}
