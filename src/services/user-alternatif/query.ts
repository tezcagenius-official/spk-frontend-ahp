import { useQuery } from "@tanstack/react-query";
import { getDetailAlternatifAPI, getListAlternatifAPI } from "./api";

export const useGetListUserAlternatif = () => {
  return useQuery({
    queryKey: ["getListUserAlternatif"],
    queryFn: () => getListAlternatifAPI().then((response) => response),
  });
};

export const useGetDetailAlternatif = (id: number) => {
  return useQuery({
    queryKey: ["getDetailUserAlternatif"],
    queryFn: () => getDetailAlternatifAPI(id).then((response) => response),
  });
};
