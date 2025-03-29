import { IGlobalPaginationParams } from "@/interfaces/global/api.interface";
import { useQuery } from "@tanstack/react-query";
import { getDetailDivisiAPI, getListDivisiAPI } from "./api";

export const useGetListDivisi = (
    initfetch = true,
    params?: IGlobalPaginationParams
) => {
    return useQuery({
        queryKey: ["getListDivisi", JSON.stringify(params)],
        queryFn: () => getListDivisiAPI(params).then((response) => response),
        enabled: initfetch,
    });
};

export const useGetDetailDivisiAPI = (id: number) => {
    return useQuery({
        queryKey: ["getDetailDivisi"],
        queryFn: () => getDetailDivisiAPI(id).then((response) => response),
    });
};
