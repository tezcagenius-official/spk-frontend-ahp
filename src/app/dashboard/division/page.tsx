import DivisionPage from "@/components/organisms/Division";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
    const cookie = await cookies();
    const role = cookie.get("role");

    if (!role) return redirect("/login");

    return <DivisionPage role={role?.value} />;
};

export default page;
