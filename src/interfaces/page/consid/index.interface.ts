export interface IConsidForm {
  alternatif_id: number;
  penilaian: {
    kriteria_id: number | null;
    sub_kriteria_id: number | null;
  }[];
}
