import { useQuery } from "@tanstack/react-query";
import { getPerhitunganAltAPI, getPerhitunganAPI } from "./api";
import { IGetListPerhitunganParams } from "@/interfaces/api/perhitungan/query.interface";

export const useGetListPerhitungan = (params?: IGetListPerhitunganParams) => {
  return useQuery({
    queryKey: ["get list perhitungan", JSON.stringify(params)],
    queryFn: () => getPerhitunganAPI(params).then((response) => response),
  });
};

export const useGetPerhitunganAlt = (alt_id: number) => {
  return useQuery({
    queryKey: ["get perhitungan alternatif", JSON.stringify(alt_id)],
    queryFn: () => getPerhitunganAltAPI(alt_id).then((response) => response),
  });
};
