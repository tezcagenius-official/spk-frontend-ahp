import { useQuery } from "@tanstack/react-query";
import { getCalcSubPerbandinganAPI, getSubPerbandinganListAPI } from "./api";

export const useGetCalcSubKriteria = (id: number) => {
  return useQuery({
    queryKey: ["getCalcSubKriteria", id],
    queryFn: () => getCalcSubPerbandinganAPI(id).then((response) => response),
  });
};

export const useGetSubKriteriaCompList = (id: number) => {
  return useQuery({
    queryKey: ["getCalcSubKriteriaCompList", id],
    queryFn: () => getSubPerbandinganListAPI(id).then((response) => response),
  });
};
