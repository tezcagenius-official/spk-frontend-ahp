import { ICreatePerhitunganRequest } from "@/interfaces/api/perhitungan/mutate.interface";
import { useMutation } from "@tanstack/react-query";
import { deletePerhitunganAPI, postCreatePerhitunganAPI } from "./api";

export const usePostCreateperhitungan = () => {
    return useMutation({
        mutationKey: ["create perhitungan"],
        mutationFn: (data: ICreatePerhitunganRequest) =>
            postCreatePerhitunganAPI(data).then((res) => res),
    });
};

export const useDeletePerhitunganAPI = () => {
    return useMutation({
        mutationKey: ["delete all perhitungan"],
        mutationFn: (id_kriteria?: number) =>
            deletePerhitunganAPI(id_kriteria).then((res) => res),
    });
};
