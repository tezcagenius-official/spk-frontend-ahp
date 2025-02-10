"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import { compDetailConsidBreadcrumb } from "@/constants/breadcrumb/index.constant";
import { useGetPerhitunganAlt } from "@/services/perhitungan/query";
import { Card, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

const DetailConsid = () => {
  const params = useParams();
  const { data: dataAlt } = useGetPerhitunganAlt(Number(params.id as string));
  return (
    <div className="flex gap-3 flex-col">
      <Breadcrumb list={compDetailConsidBreadcrumb} />
      <Card className="p-3">
        <Typography>Nama: {dataAlt?.data?.alternatif.nama}</Typography>
        <Typography>Email: {dataAlt?.data?.alternatif.email}</Typography>
        <Typography>
          Nomor Telepon: {dataAlt?.data?.alternatif.nomor_telpon}
        </Typography>
      </Card>

      <Card className="p-3 grid grid-cols-3 gap-3">
        {dataAlt?.data?.kriteria.map((k) => (
          <div className="bg-neutral-800 p-2 rounded-lg">
            <h2 className="text-xl font-semibold">
              Kriteria {k.nama_kriteria}
            </h2>
            <p>prioritas - {k.prioritas}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {k.sub_kriteria.map((sk) => (
                <div className="rounded-md p-2 border border-neutral-700">
                  <p className="font-medium">{sk.nama_sub_kriteria}</p>
                  <p>prioritas - {sk.prioritas}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default DetailConsid;
