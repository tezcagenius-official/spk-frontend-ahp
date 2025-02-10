import UserPage from "@/components/organisms/User";
import { cookies } from "next/headers";
import React from "react";

const page = () => {
  const role = cookies().get("role")?.value ?? "";
  return <UserPage role={role} />;
};

export default page;
