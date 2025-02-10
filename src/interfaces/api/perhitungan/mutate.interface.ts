export interface ICreatePerhitunganRequest {
  alternatif_id: number;
  penilaian: {
    kriteria_id: number;
    sub_kriteria_id: number;
  }[];
}
