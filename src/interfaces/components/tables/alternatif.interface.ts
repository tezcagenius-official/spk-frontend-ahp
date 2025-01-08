import { IGetListAlternatifResponse } from "@/interfaces/api/alternatif/query.interface";

export interface IAlternatifParams {
  data: IGetListAlternatifResponse[];
  onEditData?: (data: IGetListAlternatifResponse) => void;
  onDeleteData?: (data: IGetListAlternatifResponse) => void;
}
