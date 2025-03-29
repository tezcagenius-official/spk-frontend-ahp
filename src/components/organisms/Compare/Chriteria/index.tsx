"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import BaseModal from "@/components/atoms/modal";
import InpCompChriteria from "@/components/molecules/inp-comp-chriteria";
import TableMatrixPerbChriteriaNorm from "@/components/molecules/tables/matriks/perb-chriteria-norm.table";
import TableMatrixPerbChriteria from "@/components/molecules/tables/matriks/perb-chriteria.table";
import TableTambahan from "@/components/molecules/tables/tambahan.table";
import { compChriteriaBreadcrumb } from "@/constants/breadcrumb/index.constant";
import { IGetAllDivisiResponse } from "@/interfaces/api/division/query.interface";
import { ICreatePerbKriteriaRequest } from "@/interfaces/api/perb-kriteria/mutate.interface";
import { useGetListDivisi } from "@/services/division/query";
import { useGetListKriteria } from "@/services/kriteria/query";
import { usePostCreatePerbKriteria } from "@/services/perb-kriteria/mutation";
import {
    useGetCalcKriteria,
    useGetKriteriaCompList,
} from "@/services/perb-kriteria/query";
import { faAdd, faEraser, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Autocomplete,
    Button,
    Card,
    TextField,
    Typography,
} from "@mui/material";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CompChriteriaPage = () => {
    const [activeModal, setActiveModal] = useState<string>("");
    const role = useCookies().get("role");
    const {
        handleSubmit,
        control,
        getValues,
        setValue,
        reset,
        register,
        watch,
    } = useForm<ICreatePerbKriteriaRequest>({
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

    const handleError = (err: Error) => {
        const { message } = JSON.parse(
            err?.message ?? "Failed to do some jobs!"
        );
        if (Array.isArray(message)) message.forEach((m) => toast.error(m));
        toast.error(message);
        setActiveModal("");
    };

    const { data: dataListKriteria, refetch: refetchListKriteria } =
        useGetListKriteria(true, {
            page: "1",
            perPage: "9000",
        });
    const { mutate } = usePostCreatePerbKriteria();
    const { data: dataCalcKriteria, refetch: refetchCalcKriteria } =
        useGetCalcKriteria(watch("divisi_id"));
    const { data: dataListDivisi } = useGetListDivisi(true, {
        page: "1",
        perPage: "1000",
    });
    const { data: dataKriteria } = useGetListKriteria(true, {
        page: "1",
        perPage: "9000",
        divisi_id: watch("divisi_id"),
    });
    const { data: dataKriteriaCompList } = useGetKriteriaCompList(
        watch("divisi_id")
    );

    const onCreateKriteria = () => {
        const data = getValues();
        const perbandingan = data.perbandingan.map((p) => ({
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
            { perbandingan, divisi_id: data.divisi_id },
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

    useEffect(() => {
        if (dataKriteriaCompList?.status) {
            setValue(
                "perbandingan",
                dataKriteriaCompList.data?.perbandingan ?? []
            );
        }
    }, [dataKriteriaCompList, setValue]);

    return (
        <div className="flex gap-3 flex-col">
            <Breadcrumb list={compChriteriaBreadcrumb} />
            <Card className="p-3">
                <form
                    onSubmit={handleSubmit(() =>
                        setActiveModal("modal-create")
                    )}
                >
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
                            onClick={() =>
                                setValue(
                                    "perbandingan",
                                    dataKriteriaCompList?.data?.perbandingan ??
                                        []
                                )
                            }
                            disabled={role !== "adm"}
                        >
                            Reset data
                        </Button>
                        <Autocomplete
                            {...register("divisi_id")}
                            className="w-64"
                            size="small"
                            options={
                                dataListDivisi?.data ??
                                ([] as IGetAllDivisiResponse)
                            }
                            isOptionEqualToValue={(option, value) =>
                                option.divisi_id === value.divisi_id
                            }
                            disableClearable
                            value={
                                dataListDivisi?.data?.find(
                                    (dk) => dk.divisi_id === watch("divisi_id")
                                ) ?? (null as any) // eslint-disable-line
                            }
                            getOptionLabel={(option) =>
                                option?.nama_divisi ?? ""
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Divisi"
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            type: "search",
                                        },
                                    }}
                                />
                            )}
                            onChange={(_, value) => {
                                if (value && value.divisi_id)
                                    setValue("divisi_id", value.divisi_id);
                            }}
                        />
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
            {watch("divisi_id") ? (
                <>
                    <div className="space-y-2">
                        <Typography variant="h5" className="!font-bold">
                            Matrix
                        </Typography>{" "}
                        <TableMatrixPerbChriteria
                            data={dataCalcKriteria?.data?.matriks ?? []}
                            header={dataKriteria?.data ?? []}
                        />
                    </div>

                    <div className="space-y-2">
                        <Typography variant="h5" className="!font-bold">
                            Matrix Normalisasi
                        </Typography>
                        <TableMatrixPerbChriteriaNorm
                            data={
                                dataCalcKriteria?.data?.matriksNormalisasi ?? []
                            }
                            prioritas={dataCalcKriteria?.data?.prioritas ?? []}
                            header={dataKriteria?.data ?? []}
                        />
                    </div>

                    <div className="space-y-2">
                        <Typography variant="h5" className="!font-bold">
                            Data Tambahan
                        </Typography>
                        <TableTambahan
                            ci={dataCalcKriteria?.data?.CI ?? 0}
                            cr={dataCalcKriteria?.data?.CR ?? 0}
                            ri={dataCalcKriteria?.data?.RI ?? 0}
                        />
                    </div>
                </>
            ) : (
                <div className="w-full flex justify-center items-center h-full text-neutral-500">
                    Silahkan pilih divisi terlebih dahulu!
                </div>
            )}

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
