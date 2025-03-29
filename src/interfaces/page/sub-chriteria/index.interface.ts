import {
    ICreateSubKriteriaRequest,
    IUpdateSubKriteriaRequest,
} from "@/interfaces/api/sub-kriteria/mutate.interface";

export interface IFormSubChriteria
    extends IUpdateSubKriteriaRequest,
        ICreateSubKriteriaRequest {
    sub_kriteria_id: number;
    divisi_id?: number;
    type: "create" | "update" | "delete";
}
