import { IGetKriteriaParams } from "@/interfaces/api/kriteria/query.interface";
import { useQuery } from "@tanstack/react-query";
import { getDetailKriteriaAPI, getListKriteriaAPI } from "./api";

export const useGetListKriteria = (
    initfetch = true,
    params?: IGetKriteriaParams
) => {
    return useQuery({
        queryKey: ["getListKriteria", JSON.stringify(params)],
        queryFn: () => getListKriteriaAPI(params).then((response) => response),
        enabled: initfetch,
    });
};

export const useGetDetailKriteriaAPI = (id: number) => {
    return useQuery({
        queryKey: ["getDetailKriteria"],
        queryFn: () => getDetailKriteriaAPI(id).then((response) => response),
    });
};
