"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import BaseModal from "@/components/atoms/modal";
import InpCompPerh from "@/components/molecules/inp-comp-perh";
import TableHasilPerhitungan from "@/components/molecules/tables/hasil-perh.table";
import { compConsidBreadcrumb } from "@/constants/breadcrumb/index.constant";
import { IGetAllDivisiResponse } from "@/interfaces/api/division/query.interface";
import {
    IGetPerhitunganParams,
    IKriteriaPerh,
} from "@/interfaces/api/perhitungan/query.interface";
import { IConsidForm } from "@/interfaces/page/consid/index.interface";
import { useGetListDivisi } from "@/services/division/query";
import { useGetListKriteria } from "@/services/kriteria/query";
import {
    useDeletePerhitunganAPI,
    usePostCreateperhitungan,
} from "@/services/perhitungan/mutation";
import {
    useGetListPerhitungan,
    useGetPerhitunganAlt,
    useGetPerhitunganDivisi,
} from "@/services/perhitungan/query";
import { useDownloadExcell } from "@/services/report/query";
import { useGetListSubKriteria } from "@/services/sub-kriteria/query";
import {
    faDownload,
    faEraser,
    faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, Button, Card, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ConsidPage = ({ role }: { role: string }) => {
    const {
        control,
        handleSubmit,
        register,
        watch,
        setValue,
        getValues,
        reset,
    } = useForm<IConsidForm>();
    const [activeModal, setActiveModal] = useState<string>("");
    const { fields, append, remove, update } = useFieldArray({
        name: "penilaian",
        control,
    });

    const [page, setPage] = useState<IGetPerhitunganParams>({
        page: "1",
        perPage: "10",
        divisi_id: undefined,
    });
    const { data: dataListKriteria } = useGetListKriteria(true, {
        page: "1",
        perPage: "9000",
    });
    const { data: dataListSubKriteria } = useGetListSubKriteria({
        page: "1",
        perPage: "9000",
    });
    const { data: dataAlt } = useGetPerhitunganAlt(watch("alternatif_id"));
    const { data: dataAltOption } = useGetPerhitunganDivisi(watch("divisi_id"));
    const { data: dataListDivisi } = useGetListDivisi(true, {
        page: "1",
        perPage: "1000",
    });
    const { mutate: mutateDelete } = useDeletePerhitunganAPI();
    const { mutate: mutateCreate } = usePostCreateperhitungan();
    const { data: dataHasilPerhitungan, refetch: refetchHasilPerh } =
        useGetListPerhitungan(page);
    const [alternatifId, setAlternatifId] = useState(0);
    const { refetch } = useDownloadExcell(watch("divisi_id"));

    useEffect(() => {
        remove();
        dataAlt?.data?.kriteria?.forEach((record) => {
            append({
                kriteria_id: record.kriteria_id,
                sub_kriteria_id: null,
            });
        });
    }, [dataAlt]);

    const handleError = (err: Error) => {
        const { message } = JSON.parse(
            err?.message ?? "Failed to do some jobs!"
        );
        if (Array.isArray(message)) message.forEach((m) => toast.error(m));
        toast.error(message);
        setActiveModal("");
    };

    const handleCreate = () => {
        const payload = getValues();
        payload.penilaian.map(
            (pen: {
                kriteria_id: number;
                sub_kriteria_id: number;
                id?: string;
            }) => {
                delete pen?.id;
            }
        );
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

    const handleDeletebyId = () => {
        mutateDelete(alternatifId, {
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

    const filterSubKriteria = useCallback(
        (kriteria_id: number | null) => {
            const filteredList: IKriteriaPerh | undefined =
                dataAlt?.data?.kriteria?.find(
                    (r) => r.kriteria_id === kriteria_id
                );
            if (filteredList) return filteredList.sub_kriteria;

            return dataListSubKriteria?.data ?? [];
        },
        [dataAlt, dataListSubKriteria]
    );

    const handleDownload = () => {
        refetch();
    };

    return (
        <div className="flex gap-3 flex-col">
            <Breadcrumb list={compConsidBreadcrumb} />
            <Card className="grow rounded-2xl h-full px-3 py-2">
                <div>
                    <form
                        className=""
                        onSubmit={handleSubmit(() =>
                            setActiveModal("modal-create")
                        )}
                    >
                        <div className="flex gap-2 mb-5">
                            <Autocomplete
                                {...register("divisi_id")}
                                className="w-64"
                                size="small"
                                options={[
                                    {
                                        divisi_id: undefined,
                                        nama_divisi: "-",
                                    },
                                    ...(dataListDivisi?.data ??
                                        ([] as IGetAllDivisiResponse)),
                                ]}
                                isOptionEqualToValue={(option, value) =>
                                    option.divisi_id === value.divisi_id
                                }
                                disableClearable
                                value={
                                    dataListDivisi?.data?.find(
                                        (dk) =>
                                            dk.divisi_id === watch("divisi_id")
                                    ) ?? (null as any) // eslint-disable-line
                                }
                                getOptionLabel={(option) =>
                                    option?.nama_divisi ?? ""
                                }
                                getOptionKey={(option) =>
                                    `${option?.nama_divisi} ${option?.divisi_id}`
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
                                    setValue("divisi_id", value.divisi_id);
                                    setPage((prev) => ({
                                        ...prev,
                                        divisi_id: value.divisi_id,
                                        page: "1",
                                    }));
                                }}
                            />
                            <Autocomplete
                                {...register("alternatif_id")}
                                disabled={!watch("divisi_id")}
                                className="w-64"
                                size="small"
                                options={dataAltOption?.data ?? []}
                                isOptionEqualToValue={(option, value) =>
                                    option.alternatif_id === value.alternatif_id
                                }
                                getOptionKey={(option) => {
                                    return option.alternatif_id;
                                }}
                                disableClearable
                                value={
                                    dataAltOption?.data?.find(
                                        (dk) =>
                                            dk.alternatif_id ===
                                            watch("alternatif_id")
                                    ) ?? (null as any) // eslint-disable-line
                                }
                                getOptionLabel={(option) => option.nama}
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
                                onChange={(_, value) => {
                                    if (value && value.alternatif_id)
                                        setValue(
                                            "alternatif_id",
                                            value.alternatif_id
                                        );
                                }}
                            />
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
                            <div className="grow flex justify-end gap-3">
                                <Button
                                    startIcon={
                                        <FontAwesomeIcon icon={faDownload} />
                                    }
                                    type="button"
                                    onClickCapture={handleDownload}
                                    size="small"
                                    disabled={
                                        role !== "adm" || !watch("divisi_id")
                                    }
                                    color="success"
                                    variant="contained"
                                >
                                    Export Hasil
                                </Button>
                                <Button
                                    startIcon={
                                        <FontAwesomeIcon icon={faSave} />
                                    }
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
                                    datasubkriteria={filterSubKriteria(
                                        f.kriteria_id
                                    )}
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
                    disableAll={role !== "admin"}
                    data={dataHasilPerhitungan?.data ?? []}
                    onPageChange={(new_page) => {
                        setPage((prev) => ({
                            ...prev,
                            page: new_page.toString(),
                        }));
                    }}
                    onDeleteData={(data) => {
                        setAlternatifId(data.alternatif_id);
                        setActiveModal(`modal-delete`);
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

            <BaseModal
                name="modal-delete"
                onClose={() => {
                    setActiveModal("");
                }}
                activeModal={activeModal}
            >
                <div>
                    <div>
                        Apakah anda yakin untuk menghapus data alternatif ini?
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={closeModal} color="error">
                            Batal
                        </Button>
                        <Button color="success" onClick={handleDeletebyId}>
                            Hapus
                        </Button>
                    </div>
                </div>
            </BaseModal>
        </div>
    );
};

export default ConsidPage;
