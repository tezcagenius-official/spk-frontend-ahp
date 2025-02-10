import { IGetPerhitunganListResponse } from "@/interfaces/api/perhitungan/query.interface";
import { IMetaAPIResponse } from "@/interfaces/global/api.interface";

export interface IPerhCompParams {
  data: IGetPerhitunganListResponse;
  pagination?: IMetaAPIResponse;
  onPageChange: (new_page: number) => void;
  disableAll?: boolean;
}
