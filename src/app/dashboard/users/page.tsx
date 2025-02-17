import UserPage from "@/components/organisms/User";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const cookie = await cookies();
  const role = cookie.get("role")?.value ?? "";
  return <UserPage role={role} />;
};

export default page;
