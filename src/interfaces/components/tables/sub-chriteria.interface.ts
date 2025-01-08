import { IGetListSubKriteriaResponse } from "@/interfaces/api/sub-kriteria/query.interface";

export interface ISubChriteriaParams {
  data: IGetListSubKriteriaResponse[];
  onEditData?: (data: IGetListSubKriteriaResponse) => void;
  onDeleteData?: (data: IGetListSubKriteriaResponse) => void;
}
