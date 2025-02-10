export interface IGetPerbSubKriteriaResponse {
  matriks: number[][];
  matriksNormalisasi: number[][];
  prioritas: number[];
  eigenMax: number;
  CI: number;
  RI: number;
  CR: number;
  konsisten: boolean;
}

export interface IGetPerbSubKriteriaListCompResponse {
  kriteria_id: number;
  perbandingan: {
    sub_kriteria1_id: number;
    sub_kriteria2_id: number;
    nilai_perbandingan: number;
  }[];
}
