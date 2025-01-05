import { useQuery } from "@tanstack/react-query";
import { getCalcSubPerbandinganAPI } from "./api";

export const useGetCalcSubKriteria = (id: number) => {
  return useQuery({
    queryKey: ["getCalcSubKriteria"],
    queryFn: () =>
      getCalcSubPerbandinganAPI(id).then((response) => response.data),
  });
};
