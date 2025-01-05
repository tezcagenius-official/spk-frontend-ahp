import React from "react";
import { DashboardPage } from "@/components/organisms/Dashboard";

const layout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return <DashboardPage>{children}</DashboardPage>;
};

export default layout;
