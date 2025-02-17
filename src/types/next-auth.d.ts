import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
    } & DefaultSession["user"];
  }
  interface User {
    token: string;
    username: string;
  }
}
