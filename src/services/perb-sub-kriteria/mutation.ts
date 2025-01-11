import { ICreatePerbSubKriteriaRequest } from "@/interfaces/api/perb-sub-kriteria/mutate.interface";
import { useMutation } from "@tanstack/react-query";
import { postCreateSubPerbandinganAPI } from "./api";

export const usePostCreatePerbSubKriteria = () => {
  return useMutation({
    mutationKey: ["createPerbSubKriteria"],
    mutationFn: (data: ICreatePerbSubKriteriaRequest) =>
      postCreateSubPerbandinganAPI(data).then((res) => res),
  });
};
