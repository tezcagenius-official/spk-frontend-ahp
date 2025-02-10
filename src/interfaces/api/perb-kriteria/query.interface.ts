export interface IGetPerbKriteriaResponse {
  matriks: number[][];
  matriksNormalisasi: number[][];
  prioritas: number[];
  eigenMax: number;
  CI: number;
  RI: number;
  CR: number;
  konsisten: boolean;
}

export interface IGetPerbKriteriaListResponse {
  perbandingan: {
    kriteria1_id: number;
    kriteria2_id: number;
    nilai_perbandingan: number;
  }[];
}
