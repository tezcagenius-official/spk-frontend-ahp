import { ICreatePerbKriteriaRequest } from "@/interfaces/api/perb-kriteria/mutate.interface";
import { useMutation } from "@tanstack/react-query";
import { postCreatePerbandinganKriteriaAPI } from "./api";

export const usePostCreatePerbKriteria = () => {
  return useMutation({
    mutationKey: ["createPerbKriteria"],
    mutationFn: (data: ICreatePerbKriteriaRequest) =>
      postCreatePerbandinganKriteriaAPI(data).then((res) => res),
  });
};
