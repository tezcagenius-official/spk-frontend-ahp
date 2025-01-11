import AlternatePage from "@/components/organisms/Alternate";
import { getListAlternatifAPI } from "@/services/user-alternatif/api";
import { useGetListUserAlternatif } from "@/services/user-alternatif/query";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const page = () => {
  const queryClient = new QueryClient();

  // queryClient.prefetchQuery({
  //   queryKey: [],
  //   queryFn: getListAlternatifAPI,
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlternatePage />
    </HydrationBoundary>
  );
};

export default page;
