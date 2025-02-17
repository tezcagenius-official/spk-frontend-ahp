import { IGetListUserParams } from "@/interfaces/api/user/query.interface";
import { useQuery } from "@tanstack/react-query";
import { getListUserAPI } from "./api";

export const useGetListUser = (params?: IGetListUserParams) => {
  return useQuery({
    queryKey: ["get list of user", JSON.stringify(params)],
    queryFn: () => getListUserAPI(params).then((response) => response),
  });
};
