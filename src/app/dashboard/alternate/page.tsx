import AlternatePage from "@/components/organisms/Alternate";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";

const role = (await cookies().get("role")?.value) ?? "";
const page = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlternatePage role={role} />
    </HydrationBoundary>
  );
};

export default page;
