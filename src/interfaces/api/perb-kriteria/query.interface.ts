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
