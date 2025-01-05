import { useMutation } from "@tanstack/react-query";
import {
  deleteAlternatifAPI,
  patchUpdateAlternatifAPI,
  postCreateAlternatifAPI,
} from "./api";
import { ICreateAlternatifRequest } from "@/interfaces/api/alternatif/mutate.interface";

export const useCreateAlternatif = () => {
  return useMutation({
    mutationKey: ["createAlternatif"],
    mutationFn: (body: ICreateAlternatifRequest) =>
      postCreateAlternatifAPI(body).then((res) => res.data),
  });
};

export const useUpdateAlternatif = () => {
  return useMutation({
    mutationKey: ["updateAlternatif"],
    mutationFn: ({
      body,
      id,
    }: {
      body: ICreateAlternatifRequest;
      id: number;
    }) => patchUpdateAlternatifAPI(body, id).then((res) => res.data),
  });
};

export const useDeleteAlternatif = () => {
  return useMutation({
    mutationKey: ["deleteAlternatif"],
    mutationFn: (id: number) => deleteAlternatifAPI(id).then((res) => res.data),
  });
};
