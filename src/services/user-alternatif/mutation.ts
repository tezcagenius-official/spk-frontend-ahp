import { useMutation } from "@tanstack/react-query";
import {
    deleteAlternatifAPI,
    patchUpdateAlternatifAPI,
    postCreateAlternatifAPI,
} from "./api";
import {
    ICreateAlternatifRequest,
    IUpdateAlternatifRequest,
} from "@/interfaces/api/alternatif/mutate.interface";

export const useCreateAlternatif = () => {
    return useMutation({
        mutationKey: ["createAlternatif"],
        mutationFn: (body: ICreateAlternatifRequest) =>
            postCreateAlternatifAPI(body).then((res) => res),
    });
};

export const useUpdateAlternatif = () => {
    return useMutation({
        mutationKey: ["updateAlternatif"],
        mutationFn: ({
            body,
            id,
        }: {
            body: IUpdateAlternatifRequest;
            id: number;
        }) => patchUpdateAlternatifAPI(body, id).then((res) => res),
    });
};

export const useDeleteAlternatif = () => {
    return useMutation({
        mutationKey: ["deleteAlternatif"],
        mutationFn: (id: number) => deleteAlternatifAPI(id).then((res) => res),
    });
};
