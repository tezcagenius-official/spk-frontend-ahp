import { useMutation } from "@tanstack/react-query";
import { createUserAPI, deleteUserAPI, loginAPI, logout } from "./api";
import { ILoginRequest } from "@/interfaces/api/auth/query.interface";
import { IPostCreateUserRequest } from "@/interfaces/api/user/mutate.interface";

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

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ["create user"],
    mutationFn: (body: IPostCreateUserRequest) =>
      createUserAPI(body).then((res) => res),
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ["delete user"],
    mutationFn: (id: string) => deleteUserAPI(id).then((res) => res),
  });
};
