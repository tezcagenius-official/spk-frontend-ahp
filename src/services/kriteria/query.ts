import { useQuery } from "@tanstack/react-query";
import { getDetailKriteriaAPI, getListKriteriaAPI } from "./api";

export const useGetListKriteria = () => {
  return useQuery({
    queryKey: ["getListKriteria"],
    queryFn: () => getListKriteriaAPI().then((response) => response.data),
  });
};

export const useGetDetailKriteriaAPI = (id: number) => {
  return useQuery({
    queryKey: ["getDetailKriteria"],
    queryFn: () => getDetailKriteriaAPI(id).then((response) => response.data),
  });
};
