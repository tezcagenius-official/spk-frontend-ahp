import { IGetListKriteriaResponse } from "@/interfaces/api/kriteria/query.interface";
import { ICreatePerbKriteriaRequest } from "@/interfaces/api/perb-kriteria/mutate.interface";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";

export interface IInpCompChriteriaParams {
  i: number;
  data: FieldArrayWithId<ICreatePerbKriteriaRequest, "perbandingan", "id">;
  register: UseFormRegister<ICreatePerbKriteriaRequest>;
  datakriteria: IBaseAPIResponse<IGetListKriteriaResponse[]> | undefined;
  disableRemove: boolean;
  onValueChange?: (
    data: FieldArrayWithId<ICreatePerbKriteriaRequest, "perbandingan", "id">
  ) => void;
  onRemoveList?: () => void;
}
