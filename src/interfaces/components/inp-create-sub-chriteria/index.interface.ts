import { ICreatePerbSubKriteriaRequest } from "@/interfaces/api/perb-sub-kriteria/mutate.interface";
import { IGetListSubKriteriaResponse } from "@/interfaces/api/sub-kriteria/query.interface";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";

export interface IInpCompSubChriteriaParams {
  i: number;
  data: FieldArrayWithId<ICreatePerbSubKriteriaRequest, "perbandingan", "id">;
  register: UseFormRegister<ICreatePerbSubKriteriaRequest>;
  dataSubKriteria: IBaseAPIResponse<IGetListSubKriteriaResponse[]> | undefined;
  disableRemove: boolean;
  onValueChange?: (
    data: FieldArrayWithId<ICreatePerbSubKriteriaRequest, "perbandingan", "id">
  ) => void;
  onRemoveList?: () => void;
  disableAll?: boolean;
}
