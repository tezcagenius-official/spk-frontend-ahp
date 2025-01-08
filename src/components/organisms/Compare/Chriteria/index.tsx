"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import { compChriteriaBreadcrumb } from "@/constants/breadcrumb/index.constant";
import { ICreatePerbKriteriaRequest } from "@/interfaces/api/perb-kriteria/mutate.interface";
import { Card } from "@mui/material";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const CompChriteriaPage = () => {
  const [activeModal, setActiveModal] = useState<string>("");
  const { handleSubmit, control, getValues, setValue, reset, watch } =
    useForm<ICreatePerbKriteriaRequest>();

  const {} = useFieldArray({
    name: "perbandingan",
    control,
  });
  return (
    <div className="flex gap-3 flex-col">
      <Breadcrumb list={compChriteriaBreadcrumb} />
      <Card>
        <form
          onSubmit={handleSubmit(() => setActiveModal("modal-create"))}
        ></form>
      </Card>
    </div>
  );
};

export default CompChriteriaPage;
