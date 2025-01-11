import AlternatePage from "@/components/organisms/Alternate";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";

const page = () => {
  const queryClient = new QueryClient();
  const role = cookies().get("role")?.value ?? "";
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlternatePage role={role} />
    </HydrationBoundary>
  );
};

export default page;
