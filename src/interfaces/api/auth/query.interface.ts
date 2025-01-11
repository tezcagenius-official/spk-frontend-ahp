export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  users: {
    user_id: string;
    username: string;
    role: string;
  };
}
