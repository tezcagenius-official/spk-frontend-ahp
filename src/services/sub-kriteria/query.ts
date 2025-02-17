import { useQuery } from "@tanstack/react-query";
import { getDetailSubKriteriaAPI, getListSubKriteriaAPI } from "./api";
import { IGlobalPaginationParams } from "@/interfaces/global/api.interface";

export const useGetListSubKriteria = (params?: IGlobalPaginationParams) => {
  return useQuery({
    queryKey: ["getListSubKriteria", JSON.stringify(params)],
    queryFn: () => getListSubKriteriaAPI(params).then((response) => response),
  });
};

export const useGetDetailSubKriteriaAPI = (id: number) => {
  return useQuery({
    queryKey: ["getDetailSubKriteria"],
    queryFn: () => getDetailSubKriteriaAPI(id).then((response) => response),
  });
};
