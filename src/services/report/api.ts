"use server";
import satellite from "../satellite";

export const getReportExcell = async (divisi_id: number) => {
    const res = await satellite.get("/api/report/excel", {
        responseType: "arraybuffer",
        params: { divisi_id },
    });

    const base64Data = Buffer.from(res.data).toString("base64");

    return JSON.stringify({
        data: base64Data,
        type: res.headers["content-type"],
        name: res.headers["content-disposition"],
    });
};
