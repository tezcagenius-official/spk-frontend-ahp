import { ICreatePerhitunganRequest } from "@/interfaces/api/perhitungan/mutate.interface";
import { useMutation } from "@tanstack/react-query";
import { postCreatePerhitunganAPI } from "./api";

export const usePostCreateperhitungan = () => {
  return useMutation({
    mutationKey: ["create perhitungan"],
    mutationFn: (data: ICreatePerhitunganRequest) =>
      postCreatePerhitunganAPI(data).then((res) => res),
  });
};
