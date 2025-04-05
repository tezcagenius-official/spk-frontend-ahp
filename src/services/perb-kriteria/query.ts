import { useQuery } from "@tanstack/react-query";
import { getCalcKriteriaAPI, getKriteriaListAPI } from "./api";

export const useGetCalcKriteria = (divisi_id: number) => {
    return useQuery({
        queryKey: ["getCalcKriteria", JSON.stringify(divisi_id)],
        queryFn: () =>
            getCalcKriteriaAPI(divisi_id).then((response) => response),
    });
};

export const useGetKriteriaCompList = (divisi_id: number) => {
    return useQuery({
        queryKey: ["getCalcKriteriaList", JSON.stringify(divisi_id)],
        queryFn: () =>
            getKriteriaListAPI(divisi_id).then((response) => response),
    });
};
