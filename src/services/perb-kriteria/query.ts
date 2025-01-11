import { useQuery } from "@tanstack/react-query";
import { getCalcKriteriaAPI } from "./api";

export const useGetCalcKriteria = () => {
  return useQuery({
    queryKey: ["getCalcKriteria"],
    queryFn: () => getCalcKriteriaAPI().then((response) => response),
  });
};
