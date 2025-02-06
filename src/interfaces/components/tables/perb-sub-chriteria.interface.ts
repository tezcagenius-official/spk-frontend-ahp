import { IGetPerbSubKriteriaResponse } from "@/interfaces/api/perb-sub-kriteria/query.interface";
import { IGetListSubKriteriaResponse } from "@/interfaces/api/sub-kriteria/query.interface";

export interface IPerbSubChriteriaTableMatrixParams {
  data: IGetPerbSubKriteriaResponse["matriks"];
  header: IGetListSubKriteriaResponse[];
}

export interface IPerbSubChriteriaTableMatNormParams {
  data: IGetPerbSubKriteriaResponse["matriksNormalisasi"];
  prioritas: IGetPerbSubKriteriaResponse["prioritas"];
  header: IGetListSubKriteriaResponse[];
}
