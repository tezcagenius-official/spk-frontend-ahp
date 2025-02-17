import { IGetListUserResonse } from "@/interfaces/api/user/query.interface";
import { IMetaAPIResponse } from "@/interfaces/global/api.interface";

export interface IUserTableParams {
  data: IGetListUserResonse[];
  onEditData?: (data: IGetListUserResonse) => void;
  onDeleteData?: (data: IGetListUserResonse) => void;
  pagination?: IMetaAPIResponse;
  onPageChange: (new_page: number) => void;
}
