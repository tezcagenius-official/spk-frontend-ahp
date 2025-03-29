import {
    IGetAllDivisiResponse,
    IGetDivisiResponse,
} from "@/interfaces/api/division/query.interface";
import { IMetaAPIResponse } from "@/interfaces/global/api.interface";

export interface IDivisiTableParams {
    data: IGetAllDivisiResponse;
    onEditData?: (data: IGetDivisiResponse) => void;
    onDeleteData?: (data: IGetDivisiResponse) => void;
    pagination?: IMetaAPIResponse;
    onPageChange: (new_page: number) => void;
}
