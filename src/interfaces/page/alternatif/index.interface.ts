import {
  ICreateAlternatifRequest,
  IUpdateAlternatifRequest,
} from "@/interfaces/api/alternatif/mutate.interface";

export interface IFormAlternatif
  extends ICreateAlternatifRequest,
    IUpdateAlternatifRequest {
  alternatif_id: number;
  type: "create" | "update" | "delete";
}
