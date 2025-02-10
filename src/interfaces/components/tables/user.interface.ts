import { IGetListUserResonse } from "@/interfaces/api/user/query.interface";

export interface IUserTableParams {
  data: IGetListUserResonse[];
  onEditData?: (data: IGetListUserResonse) => void;
  onDeleteData?: (data: IGetListUserResonse) => void;
}
