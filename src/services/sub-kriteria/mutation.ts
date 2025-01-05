import {
  ICreateSubKriteriaRequest,
  IUpdateSubKriteriaRequest,
} from "@/interfaces/api/sub-kriteria/mutate.interface";
import { useMutation } from "@tanstack/react-query";
import {
  deleteSubKriteriaAPI,
  patchUpdateSubKriteriaAPI,
  postCreateSubKriteriaAPI,
} from "./api";

export const usePostCreateSubKriteria = () => {
  return useMutation({
    mutationKey: ["createSubKriteria"],
    mutationFn: (data: ICreateSubKriteriaRequest) =>
      postCreateSubKriteriaAPI(data).then((res) => res.data),
  });
};

export const usePatchUpdateSubKriteria = () => {
  return useMutation({
    mutationKey: ["updateSubKriteria"],
    mutationFn: ({
      body,
      id,
    }: {
      body: IUpdateSubKriteriaRequest;
      id: number;
    }) => patchUpdateSubKriteriaAPI(body, id).then((res) => res.data),
  });
};

export const useDeleteSubKriteria = () => {
  return useMutation({
    mutationKey: ["deleteSubKriteria"],
    mutationFn: (id: number) =>
      deleteSubKriteriaAPI(id).then((res) => res.data),
  });
};
