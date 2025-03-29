import { IGetListSubKriteriaResponse } from "@/interfaces/api/sub-kriteria/query.interface";
import { IMetaAPIResponse } from "@/interfaces/global/api.interface";

export interface ISubChriteriaParams {
    data: IGetListSubKriteriaResponse[];
    onEditData?: (data: IGetListSubKriteriaResponse) => void;
    onDeleteData?: (data: IGetListSubKriteriaResponse) => void;
    pagination?: IMetaAPIResponse;
    onPageChange: (new_page: number) => void;
    disableAll: boolean;
}
