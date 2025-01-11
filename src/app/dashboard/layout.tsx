"use server";
import { DashboardPage } from "@/components/organisms/Dashboard";
import { cookies } from "next/headers";
import React from "react";

const layout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <DashboardPage role={cookies().get("role")?.value ?? ""}>
      {children}
    </DashboardPage>
  );
};

export default layout;
