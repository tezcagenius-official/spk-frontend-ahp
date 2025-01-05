import { useMutation } from "@tanstack/react-query";
import {
  deleteKriteriaAPI,
  patchUpdateKriteriaAPI,
  postCreateKriteriaAPI,
} from "./api";
import {
  ICreateKriteriaRequest,
  IUpdateKriteriaRequest,
} from "@/interfaces/api/kriteria/mutate.interface";

export const usePostCreateKriteria = () => {
  return useMutation({
    mutationKey: ["createKriteria"],
    mutationFn: (data: ICreateKriteriaRequest) =>
      postCreateKriteriaAPI(data).then((res) => res.data),
  });
};

export const usePatchUpdateKriteria = () => {
  return useMutation({
    mutationKey: ["updateKriteria"],
    mutationFn: ({ body, id }: { body: IUpdateKriteriaRequest; id: number }) =>
      patchUpdateKriteriaAPI(body, id).then((res) => res.data),
  });
};

export const useDeleteKriteria = () => {
  return useMutation({
    mutationKey: ["deleteKriteria"],
    mutationFn: (id: number) => deleteKriteriaAPI(id).then((res) => res.data),
  });
};
