import { IGetListAlternatifResponse } from "@/interfaces/api/alternatif/query.interface";
import {
    IGetAllDivisiResponse,
    IGetDivisiResponse,
} from "@/interfaces/api/division/query.interface";
import { IMetaAPIResponse } from "@/interfaces/global/api.interface";

export interface IAlternatifParams {
    data: IGetListAlternatifResponse[];
    onEditData?: (data: IGetListAlternatifResponse) => void;
    onDeleteData?: (data: IGetListAlternatifResponse) => void;
    pagination?: IMetaAPIResponse;
    onPageChange: (new_page: number) => void;
    onSelectedDivision: (division: IGetDivisiResponse) => void;
    divisions: IGetAllDivisiResponse;
}
