import { IGetListKriteriaResponse } from "@/interfaces/api/kriteria/query.interface";

export interface IChriteriaParams {
  data: IGetListKriteriaResponse[];
  onEditData?: (data: IGetListKriteriaResponse) => void;
  onDeleteData?: (data: IGetListKriteriaResponse) => void;
}
