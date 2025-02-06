import { IGetListKriteriaResponse } from "@/interfaces/api/kriteria/query.interface";
import { IGetPerbKriteriaResponse } from "@/interfaces/api/perb-kriteria/query.interface";

export interface IPerbChriteriaTableMatrixParams {
  data: IGetPerbKriteriaResponse["matriks"];
  header: IGetListKriteriaResponse[];
}

export interface IPervChriteriaTableMatNormParams {
  data: IGetPerbKriteriaResponse["matriksNormalisasi"];
  prioritas: IGetPerbKriteriaResponse["prioritas"];
  header: IGetListKriteriaResponse[];
}
