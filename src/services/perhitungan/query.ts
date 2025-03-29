import { IGetPerhitunganParams } from "@/interfaces/api/perhitungan/query.interface";
import { useQuery } from "@tanstack/react-query";
import {
    getPerhitunganAltAPI,
    getPerhitunganAPI,
    getPerhitunganByDivisiAPI,
} from "./api";

export const useGetListPerhitungan = (params?: IGetPerhitunganParams) => {
    return useQuery({
        queryKey: ["get list perhitungan", JSON.stringify(params)],
        queryFn: () => getPerhitunganAPI(params).then((response) => response),
    });
};

export const useGetPerhitunganAlt = (alt_id: number) => {
    return useQuery({
        queryKey: ["get perhitungan alternatif", JSON.stringify(alt_id)],
        queryFn: () =>
            getPerhitunganAltAPI(alt_id).then((response) => response),
    });
};

export const useGetPerhitunganDivisi = (divisi_id: number) => {
    return useQuery({
        queryKey: ["get perhitungan divisi", JSON.stringify(divisi_id)],
        queryFn: () =>
            getPerhitunganByDivisiAPI(divisi_id).then((response) => response),
    });
};
