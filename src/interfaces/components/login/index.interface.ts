import { ILoginRequest } from "@/interfaces/api/auth/query.interface";

export interface ILoginForm extends ILoginRequest {
  showPassword: boolean;
}
