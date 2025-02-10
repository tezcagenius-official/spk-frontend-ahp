import { IPostCreateUserRequest } from "@/interfaces/api/user/mutate.interface";

export interface IFormUser extends IPostCreateUserRequest {
  user_id?: string;
  type?: "create" | "update" | "delete";
}
