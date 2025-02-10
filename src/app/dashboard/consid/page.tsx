import ConsidPage from "@/components/organisms/Consid";
import { cookies } from "next/headers";
import React from "react";

const role = await cookies().get("role");

const page = () => {
  return <ConsidPage role={role?.value ?? ""} />;
};

export default page;
