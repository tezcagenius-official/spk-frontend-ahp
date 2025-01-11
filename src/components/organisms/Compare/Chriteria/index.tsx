"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import BaseModal from "@/components/atoms/modal";
import InpCompChriteria from "@/components/molecules/inp-comp-chriteria";
import { compChriteriaBreadcrumb } from "@/constants/breadcrumb/index.constant";
import { ICreatePerbKriteriaRequest } from "@/interfaces/api/perb-kriteria/mutate.interface";
import { useGetListKriteria } from "@/services/kriteria/query";
import { usePostCreatePerbKriteria } from "@/services/perb-kriteria/mutation";
import { useGetCalcKriteria } from "@/services/perb-kriteria/query";
import { faAdd, faEraser, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@mui/material";
import { useCookies } from "next-client-cookies";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CompChriteriaPage = () => {
  const [activeModal, setActiveModal] = useState<string>("");
  const role = useCookies().get("role");
  const { handleSubmit, control, getValues, setValue, reset, watch, register } =
    useForm<ICreatePerbKriteriaRequest>({
      defaultValues: {
        perbandingan: [
          {
            kriteria1_id: undefined,
            kriteria2_id: undefined,
            nilai_perbandingan: undefined,
          },
        ],
      },
    });
  const { fields, append, remove, update } = useFieldArray({
    name: "perbandingan",
    control,
  });

  const handleError = (err: any) => {
    const { message } = JSON.parse(err?.message ?? "Failed to do some jobs!");
    if (Array.isArray(message)) message.forEach((m) => toast.error(m));
    toast.error(message);
    setActiveModal("");
  };

  const { data: dataListKriteria, refetch: refetchListKriteria } =
    useGetListKriteria();
  const { mutate } = usePostCreatePerbKriteria();
  const { data: dataCalcKriteria, refetch: refetchCalcKriteria } =
    useGetCalcKriteria();

  const onCreateKriteria = () => {
    const data = getValues().perbandingan.map((p) => ({
      kriteria1_id: !isNaN(Number(p.kriteria1_id))
        ? Number(p.kriteria1_id)
        : undefined,
      kriteria2_id: !isNaN(Number(p.kriteria2_id))
        ? Number(p.kriteria2_id)
        : undefined,
      nilai_perbandingan: !isNaN(Number(p.nilai_perbandingan))
        ? Number(p.nilai_perbandingan)
        : undefined,
    }));

    mutate(
      { perbandingan: data },
      {
        onError: handleError,
        onSuccess: (res) => {
          refetchListKriteria();
          refetchCalcKriteria();
          toast.success(res.message);
          reset();
          setActiveModal("");
        },
      }
    );
  };

  const closeModal = () => {
    setActiveModal("");
  };

  return (
    <div className="flex gap-3 flex-col">
      <Breadcrumb list={compChriteriaBreadcrumb} />
      <Card className="p-3">
        <form onSubmit={handleSubmit(() => setActiveModal("modal-create"))}>
          <div className="flex gap-2 mb-5">
            <Button
              startIcon={<FontAwesomeIcon icon={faAdd} />}
              className="h-10 space-x-1"
              type="button"
              size="small"
              variant="contained"
              onClick={() => {
                append({
                  kriteria1_id: undefined,
                  kriteria2_id: undefined,
                  nilai_perbandingan: undefined,
                });
              }}
              disabled={role !== "adm"}
            >
              Tambah data
            </Button>
            <Button
              startIcon={<FontAwesomeIcon icon={faEraser} />}
              className="h-10 space-x-1"
              type="button"
              size="small"
              variant="outlined"
              onClick={() => reset()}
              disabled={role !== "adm"}
            >
              Reset data
            </Button>
            <div className="grow flex justify-end">
              <Button
                startIcon={<FontAwesomeIcon icon={faSave} />}
                type="submit"
                size="small"
                className="h-10"
                color="success"
                variant="contained"
                onClick={() => {}}
                disabled={role !== "adm"}
              >
                Upload
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-1 gap-x-5">
            {fields.map((f, i) => (
              <InpCompChriteria
                i={i}
                register={register}
                key={f.id}
                data={f}
                onValueChange={(data) => update(i, data)}
                onRemoveList={() => remove(i)}
                datakriteria={dataListKriteria}
                disableRemove={fields.length === 1}
                disableAll={role !== "adm"}
              />
            ))}
          </div>
        </form>
      </Card>

      <div>
        <pre>{JSON.stringify(dataCalcKriteria, null, 2)}</pre>
      </div>

      <BaseModal
        name="modal-create"
        onClose={() => {
          setActiveModal("");
        }}
        activeModal={activeModal}
      >
        <div>
          <div>Apakah anda yakin untuk membuat data ini?</div>
          <div className="flex justify-end">
            <Button onClick={closeModal} color="error">
              Batal
            </Button>
            <Button color="success" onClick={onCreateKriteria}>
              Buat
            </Button>
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default CompChriteriaPage;
