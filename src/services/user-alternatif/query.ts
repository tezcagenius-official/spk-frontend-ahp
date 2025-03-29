import { IGetAlternatifParams } from "@/interfaces/api/alternatif/query.interface";
import { useQuery } from "@tanstack/react-query";
import { getDetailAlternatifAPI, getListAlternatifAPI } from "./api";

export const useGetListUserAlternatif = (params?: IGetAlternatifParams) => {
    return useQuery({
        queryKey: ["getListUserAlternatif", JSON.stringify(params)],
        queryFn: () =>
            getListAlternatifAPI(params).then((response) => response),
    });
};

export const useGetDetailAlternatif = (id: number) => {
    return useQuery({
        queryKey: ["getDetailUserAlternatif"],
        queryFn: () => getDetailAlternatifAPI(id).then((response) => response),
    });
};
