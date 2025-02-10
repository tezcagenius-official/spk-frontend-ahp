"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import BaseModal from "@/components/atoms/modal";
import InpCompPerh from "@/components/molecules/inp-comp-perh";
import TableHasilPerhitungan from "@/components/molecules/tables/hasil-perh.table";
import { compConsidBreadcrumb } from "@/constants/breadcrumb/index.constant";
import { IConsidForm } from "@/interfaces/page/consid/index.interface";
import { useGetListKriteria } from "@/services/kriteria/query";
import { usePostCreateperhitungan } from "@/services/perhitungan/mutation";
import {
  useGetListPerhitungan,
  useGetPerhitunganAlt,
} from "@/services/perhitungan/query";
import { useGetListSubKriteria } from "@/services/sub-kriteria/query";
import { useGetListUserAlternatif } from "@/services/user-alternatif/query";
import { faAdd, faEraser, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, Button, Card, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ConsidPage = ({ role }: { role: string }) => {
  const { control, handleSubmit, register, watch, setValue, getValues, reset } =
    useForm<IConsidForm>();
  const [activeModal, setActiveModal] = useState<string>("");
  const { fields, append, remove, update } = useFieldArray({
    name: "penilaian",
    control,
  });

  const [page, setPage] = useState({
    page: "1",
    perPage: "10",
  });
  const { data: dataListKriteria } = useGetListKriteria();
  const { data: dataListSubKriteria } = useGetListSubKriteria();
  const { data: dataListAlternatif } = useGetListUserAlternatif();
  const { data: dataAlt } = useGetPerhitunganAlt(watch("alternatif_id"));
  const { mutate: mutateCreate } = usePostCreateperhitungan();
  const { data: dataHasilPerhitungan, refetch: refetchHasilPerh } =
    useGetListPerhitungan(page);

  useEffect(() => {
    console.log("dataAlt");
    console.log(dataAlt);
  }, [dataAlt]);

  const handleError = (err: any) => {
    const { message } = JSON.parse(err?.message ?? "Failed to do some jobs!");
    if (Array.isArray(message)) message.forEach((m) => toast.error(m));
    toast.error(message);
    setActiveModal("");
  };

  const handleCreate = () => {
    const payload = getValues();
    payload.penilaian.map((pen: any) => {
      delete pen?.id;
    });
    mutateCreate(payload, {
      onError: handleError,
      onSuccess: (res) => {
        refetchHasilPerh();
        toast.success(res.message);
        reset();
        setActiveModal("");
      },
    });
  };

  const closeModal = () => {
    setActiveModal("");
  };

  return (
    <div className="flex gap-3 flex-col">
      <Breadcrumb list={compConsidBreadcrumb} />
      <Card className="grow rounded-2xl h-full px-3 py-2">
        <div>
          <form
            className=""
            onSubmit={handleSubmit(() => setActiveModal("modal-create"))}
          >
            <div className="flex gap-2 mb-5">
              <Autocomplete
                {...register("alternatif_id")}
                className="w-64"
                size="small"
                options={dataListAlternatif?.data ?? []}
                isOptionEqualToValue={(option, value) =>
                  option.alternatif_id === value.alternatif_id
                }
                getOptionKey={(option) => {
                  return option.alternatif_id;
                }}
                disableClearable
                value={dataListAlternatif?.data?.find(
                  (dk) => dk.alternatif_id === watch("alternatif_id")
                )}
                getOptionLabel={(option: any) => option.nama}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Alternatif"
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        type: "search",
                      },
                    }}
                  />
                )}
                onChange={(_, value: any) => {
                  if (value && value.alternatif_id)
                    setValue("alternatif_id", value.alternatif_id);
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
                    kriteria_id: 0,
                    sub_kriteria_id: 0,
                  });
                }}
              >
                Tambah data
              </Button>
              <Button
                startIcon={<FontAwesomeIcon icon={faEraser} />}
                className="h-10 space-x-1"
                type="button"
                size="small"
                variant="outlined"
                onClick={() => setValue("penilaian", [])}
                disabled={role !== "adm"}
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
                >
                  Upload
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-1 gap-x-5">
              {fields.map((f, i) => (
                <InpCompPerh
                  i={i}
                  register={register}
                  key={f.id}
                  data={f}
                  onValueChange={(data) => update(i, data)}
                  onRemoveList={() => remove(i)}
                  datakriteria={dataListKriteria}
                  datasubkriteria={dataListSubKriteria}
                  disableRemove={fields.length === 1}
                  disableAll={role !== "adm"}
                />
              ))}
            </div>
          </form>
        </div>
      </Card>

      <Card>
        <TableHasilPerhitungan
          data={dataHasilPerhitungan?.data ?? []}
          onPageChange={(new_page) => {
            setPage((prev) => ({
              ...prev,
              page: new_page.toString(),
            }));
          }}
          pagination={dataHasilPerhitungan?.meta}
        />
      </Card>

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
            <Button color="success" onClick={handleCreate}>
              Buat
            </Button>
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default ConsidPage;
