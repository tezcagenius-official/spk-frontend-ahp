import { useQuery } from "@tanstack/react-query";
import { getDetailSubKriteriaAPI, getListSubKriteriaAPI } from "./api";

export const useGetListSubKriteria = () => {
  return useQuery({
    queryKey: ["getListSubKriteria"],
    queryFn: () => getListSubKriteriaAPI().then((response) => response),
  });
};

export const useGetDetailSubKriteriaAPI = (id: number) => {
  return useQuery({
    queryKey: ["getDetailSubKriteria"],
    queryFn: () => getDetailSubKriteriaAPI(id).then((response) => response),
  });
};
