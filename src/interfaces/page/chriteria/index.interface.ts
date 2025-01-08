import {
  ICreateKriteriaRequest,
  IUpdateKriteriaRequest,
} from "@/interfaces/api/kriteria/mutate.interface";

export interface IFormChriteria
  extends ICreateKriteriaRequest,
    IUpdateKriteriaRequest {
  kriteria_id: number;
  type: "create" | "update" | "delete";
}
