import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "./api";
import { ILoginRequest } from "@/interfaces/api/auth/query.interface";

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (body: ILoginRequest) => loginAPI(body).then((res) => res),
  });
};
