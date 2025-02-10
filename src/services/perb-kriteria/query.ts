import { useQuery } from "@tanstack/react-query";
import { getCalcKriteriaAPI, getKriteriaListAPI } from "./api";

export const useGetCalcKriteria = () => {
  return useQuery({
    queryKey: ["getCalcKriteria"],
    queryFn: () => getCalcKriteriaAPI().then((response) => response),
  });
};

export const useGetKriteriaCompList = () => {
  return useQuery({
    queryKey: ["getCalcKriteriaList"],
    queryFn: () => getKriteriaListAPI().then((response) => response),
  });
};
