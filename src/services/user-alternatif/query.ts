import { useQuery } from "@tanstack/react-query";
import { getDetailAlternatifAPI, getListAlternatifAPI } from "./api";
import { IGlobalPaginationParams } from "@/interfaces/global/api.interface";

export const useGetListUserAlternatif = (params?: IGlobalPaginationParams) => {
  return useQuery({
    queryKey: ["getListUserAlternatif", JSON.stringify(params)],
    queryFn: () => getListAlternatifAPI(params).then((response) => response),
  });
};

export const useGetDetailAlternatif = (id: number) => {
  return useQuery({
    queryKey: ["getDetailUserAlternatif"],
    queryFn: () => getDetailAlternatifAPI(id).then((response) => response),
  });
};
