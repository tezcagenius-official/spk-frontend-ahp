import { useMutation } from "@tanstack/react-query";
import { loginAPI, logout } from "./api";
import { ILoginRequest } from "@/interfaces/api/auth/query.interface";

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (body: ILoginRequest) => loginAPI(body).then((res) => res),
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
  });
};
