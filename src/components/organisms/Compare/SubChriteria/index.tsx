"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import BaseModal from "@/components/atoms/modal";
import InpCompSubChriteria from "@/components/molecules/inp-comp-sub-chriteria";
import { compSubChriteriaBreadcrumb } from "@/constants/breadcrumb/index.constant";
import { ICreatePerbSubKriteriaRequest } from "@/interfaces/api/perb-sub-kriteria/mutate.interface";
import { useGetListKriteria } from "@/services/kriteria/query";
import { usePostCreatePerbSubKriteria } from "@/services/perb-sub-kriteria/mutation";
import { useGetCalcSubKriteria } from "@/services/perb-sub-kriteria/query";
import { useGetListSubKriteria } from "@/services/sub-kriteria/query";
import { faAdd, faEraser, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, Button, Card, TextField } from "@mui/material";
import { useCookies } from "next-client-cookies";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CompSubChriteriaPage = () => {
  const [activeModal, setActiveModal] = useState<string>("");
  const role = useCookies().get("role");
  const { handleSubmit, control, getValues, setValue, reset, watch, register } =
    useForm<ICreatePerbSubKriteriaRequest>({
      defaultValues: {
        kriteria_id: undefined,
        perbandingan: [
          {
            sub_kriteria1_id: undefined,
            sub_kriteria2_id: undefined,
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
  const { data: dataListSubKriteria, refetch: refetchListSubKriteria } =
    useGetListSubKriteria();
  const { mutate } = usePostCreatePerbSubKriteria();
  const { data: dataCalcKriteria, refetch: refetchCalcKriteria } =
    useGetCalcSubKriteria(watch("kriteria_id") ?? 0);

  const onCreateKriteria = () => {
    const data = getValues().perbandingan.map((p) => ({
      sub_kriteria1_id: !isNaN(Number(p.sub_kriteria1_id))
        ? Number(p.sub_kriteria1_id)
        : 0,
      sub_kriteria2_id: !isNaN(Number(p.sub_kriteria2_id))
        ? Number(p.sub_kriteria2_id)
        : 0,
      nilai_perbandingan: !isNaN(Number(p.nilai_perbandingan))
        ? Number(p.nilai_perbandingan)
        : 0,
    }));

    mutate(
      { kriteria_id: getValues("kriteria_id"), perbandingan: data },
      {
        onError: handleError,
        onSuccess: (res) => {
          refetchListSubKriteria();
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
      <Breadcrumb list={compSubChriteriaBreadcrumb} />
      <Card className="p-3">
        <form onSubmit={handleSubmit(() => setActiveModal("modal-create"))}>
          <div className="flex gap-2 mb-5">
            <Autocomplete
              {...register("kriteria_id")}
              className="w-64"
              size="small"
              options={dataListKriteria?.data ?? []}
              isOptionEqualToValue={(option, value) =>
                option.kriteria_id === value.kriteria_id
              }
              disableClearable
              value={dataListKriteria?.data?.find(
                (dk) => dk.kriteria_id === watch("kriteria_id")
              )}
              getOptionLabel={(option: any) => option.nama_kriteria}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Kriteria"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: "search",
                    },
                  }}
                />
              )}
              onChange={(_, value: any) => {
                if (value && value.kriteria_id)
                  setValue("kriteria_id", value.kriteria_id);
              }}
            />
            <Button
              startIcon={<FontAwesomeIcon icon={faAdd} />}
              className="space-x-1"
              type="button"
              size="small"
              variant="contained"
              disabled={role !== "adm"}
              onClick={() => {
                append({
                  sub_kriteria1_id: 0,
                  sub_kriteria2_id: 0,
                  nilai_perbandingan: 0,
                });
              }}
            >
              Tambah data
            </Button>
            <Button
              startIcon={<FontAwesomeIcon icon={faEraser} />}
              className="space-x-1"
              type="button"
              size="small"
              disabled={role !== "adm"}
              variant="outlined"
              onClick={() => reset()}
            >
              Reset data
            </Button>
            <div className="grow flex justify-end">
              <Button
                startIcon={<FontAwesomeIcon icon={faSave} />}
                type="submit"
                size="small"
                disabled={role !== "adm"}
                color="success"
                variant="contained"
                onClick={() => {}}
              >
                Upload
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-1 gap-x-5">
            {fields.map((f, i) => (
              <InpCompSubChriteria
                i={i}
                register={register}
                key={f.id}
                data={f}
                onValueChange={(data) => update(i, data)}
                onRemoveList={() => remove(i)}
                dataSubKriteria={dataListSubKriteria}
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

export default CompSubChriteriaPage;
