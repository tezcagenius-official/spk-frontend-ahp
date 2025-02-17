import { IGetListKriteriaResponse } from "@/interfaces/api/kriteria/query.interface";
import { ICreatePerhitunganRequest } from "@/interfaces/api/perhitungan/mutate.interface";
import { ISubKriteriaPerhitungan } from "@/interfaces/api/perhitungan/query.interface";
import { IGetListSubKriteriaResponse } from "@/interfaces/api/sub-kriteria/query.interface";
import { IBaseAPIResponse } from "@/interfaces/global/api.interface";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";

export interface IInpCompPerhParams {
  i: number;
  data: FieldArrayWithId<ICreatePerhitunganRequest, "penilaian", "id">;
  register: UseFormRegister<ICreatePerhitunganRequest>;
  datakriteria: IBaseAPIResponse<IGetListKriteriaResponse[]> | undefined;
  datasubkriteria:
    | IGetListSubKriteriaResponse[]
    | undefined
    | ISubKriteriaPerhitungan[];
  disableRemove: boolean;
  onValueChange?: (
    data: FieldArrayWithId<ICreatePerhitunganRequest, "penilaian", "id">
  ) => void;
  onRemoveList?: () => void;
  disableAll?: boolean;
}
