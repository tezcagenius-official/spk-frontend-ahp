import { useMutation, useQuery } from "@tanstack/react-query";
import { getReportExcell } from "./api";

export const useDownloadExcell = () => {
  return useQuery({
    queryKey: ["download excell"],
    queryFn: () =>
      getReportExcell().then((res) => {
        const response = JSON.parse(res);
        const binaryData = atob(response.data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], {
          type:
            (response.type as string) ||
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        console.log("response.name", response.name);

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = (((response.name as string) || "").match(
          /(?<=")(?:\\.|[^"\\])*(?=")/
        ) || "Hasil Penilaian.xlsx")[0];
        a.click();
        window.URL.revokeObjectURL(url);

        return response;
      }),
    enabled: false,
  });
};
