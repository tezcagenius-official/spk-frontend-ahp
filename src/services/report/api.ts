"use server";
import satellite from "../satellite";

export const getReportExcell = async () => {
  const res = await satellite.get("/api/report/excel", {
    responseType: "arraybuffer",
  });

  const base64Data = Buffer.from(res.data).toString("base64");

  return JSON.stringify({
    data: base64Data,
    type: res.headers["content-type"],
    name: res.headers["content-disposition"],
  });
};
