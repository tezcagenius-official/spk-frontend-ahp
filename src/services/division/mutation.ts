import {
    ICreateDivisiRequest,
    IUpdateDivisiRequest,
} from "@/interfaces/api/division/mutate.interface";
import { useMutation } from "@tanstack/react-query";
import {
    deleteDivisiAPI,
    patchUpdateDivisiAPI,
    postCreateDivisiAPI,
} from "./api";

export const usePostCreateDivisi = () => {
    return useMutation({
        mutationKey: ["createDivisi"],
        mutationFn: (data: ICreateDivisiRequest) =>
            postCreateDivisiAPI(data).then((res) => res),
    });
};

export const usePatchUpdateDivisi = () => {
    return useMutation({
        mutationKey: ["updateDivisi"],
        mutationFn: (data: IUpdateDivisiRequest) =>
            patchUpdateDivisiAPI(data).then((res) => res),
    });
};

export const useDeleteDivisi = () => {
    return useMutation({
        mutationKey: ["deleteDivisi"],
        mutationFn: (id: number) => deleteDivisiAPI(id).then((res) => res),
    });
};
