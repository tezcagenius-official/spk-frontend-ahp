"use server";
import ConsidPage from "@/components/organisms/Consid";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const cookie = await cookies();
  return <ConsidPage role={cookie.get("role")?.value ?? ""} />;
};

export default page;
