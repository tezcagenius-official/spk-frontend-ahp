import { IGetListKriteriaResponse } from "@/interfaces/api/kriteria/query.interface";
import { IMetaAPIResponse } from "@/interfaces/global/api.interface";

export interface IChriteriaParams {
  data: IGetListKriteriaResponse[];
  onEditData?: (data: IGetListKriteriaResponse) => void;
  onDeleteData?: (data: IGetListKriteriaResponse) => void;
  disableAll?: boolean;
  pagination?: IMetaAPIResponse;
  onPageChange: (new_page: number) => void;
}
