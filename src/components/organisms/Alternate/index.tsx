"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import BaseModal from "@/components/atoms/modal";
import AlternatifTable from "@/components/molecules/tables/alternatif.table";
import { alternatePageAlternate } from "@/constants/breadcrumb/index.constant";
import { IGetAlternatifParams } from "@/interfaces/api/alternatif/query.interface";
import { IGetAllDivisiResponse } from "@/interfaces/api/division/query.interface";
import { IFormAlternatif } from "@/interfaces/page/alternatif/index.interface";
import { useGetListDivisi } from "@/services/division/query";
import {
    useCreateAlternatif,
    useDeleteAlternatif,
    useUpdateAlternatif,
} from "@/services/user-alternatif/mutation";
import { useGetListUserAlternatif } from "@/services/user-alternatif/query";
import { faRefresh, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AlternatePage = ({ role }: { role: string }) => {
    const [activeModal, setActiveModal] = useState<string>("");
    const { register, handleSubmit, getValues, setValue, reset, watch } =
        useForm<IFormAlternatif>({
            defaultValues: {
                type: "create",
            },
        });
    const [page, setPage] = useState<IGetAlternatifParams>({
        page: "1",
        perPage: "10",
        divisi_id: undefined,
    });

    const { data, refetch } = useGetListUserAlternatif(page);
    const { data: dataListDivisi } = useGetListDivisi(true, {
        page: "1",
        perPage: "1000",
    });
    const { mutate: handleCreate } = useCreateAlternatif();
    const { mutate: handleUpdate } = useUpdateAlternatif();
    const { mutate: handleDelete } = useDeleteAlternatif();

    const handleError = (err: Error) => {
        const { message } = JSON.parse(
            err?.message ?? "Failed to do some jobs!"
        );
        if (Array.isArray(message)) message.forEach((m) => toast.error(m));
        toast.error(message);
        setActiveModal("");
    };

    const onCreateKriteria = () => {
        const { nama, email, nomor_telpon, divisi_id } = getValues();
        handleCreate(
            { nama, email, nomor_telpon, divisi_id },
            {
                onError: handleError,
                onSuccess: (res) => {
                    refetch();
                    toast.success(res?.message);
                    reset();
                    setActiveModal("");
                },
            }
        );
    };
    const onUpdateKriteria = () => {
        const { email, nomor_telpon, nama, alternatif_id } = getValues();
        handleUpdate(
            {
                body: {
                    email,
                    nomor_telpon,
                    nama,
                },
                id: alternatif_id,
            },
            {
                onError: handleError,
                onSuccess: (res) => {
                    refetch();
                    toast.success(res.message);
                    reset();
                    setActiveModal("");
                },
            }
        );
    };
    const onDeleteKriteria = () => {
        handleDelete(getValues("alternatif_id"), {
            onError: handleError,
            onSuccess: (res) => {
                refetch();
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
            <Breadcrumb list={alternatePageAlternate} />
            <Card className="grow rounded-2xl h-full px-3 py-2">
                <div>
                    <form
                        className="flex items-center gap-2"
                        onSubmit={handleSubmit(() =>
                            setActiveModal(
                                getValues("type") === "create"
                                    ? "modal-create"
                                    : "modal-update"
                            )
                        )}
                    >
                        {watch("type") === "create" && (
                            <h2>Tambah alternate: </h2>
                        )}
                        {watch("type") === "update" && (
                            <h2>Perbarui alternate: </h2>
                        )}
                        <TextField
                            placeholder="Nama"
                            {...register("nama")}
                            size="small"
                            disabled={role !== "adm"}
                        />
                        <TextField
                            placeholder="Email"
                            {...register("email")}
                            size="small"
                            disabled={role !== "adm"}
                        />
                        <TextField
                            placeholder="No. Telp"
                            {...register("nomor_telpon")}
                            size="small"
                            disabled={role !== "adm"}
                        />
                        {watch("type") === "create" && (
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
                                        (dk) =>
                                            dk.divisi_id === watch("divisi_id")
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
                        )}
                        <Button
                            type="submit"
                            className="flex gap-2 justify-center items-center"
                            disabled={role !== "adm"}
                        >
                            <FontAwesomeIcon icon={faSave} />
                            <p>Save</p>
                        </Button>
                        <Button
                            type="button"
                            className="flex gap-2 justify-center items-center"
                            disabled={role !== "adm"}
                            onClick={() => {
                                reset();
                            }}
                        >
                            <FontAwesomeIcon icon={faRefresh} />
                            <p>Reset</p>
                        </Button>
                    </form>
                </div>
            </Card>
            <Card
                variant="outlined"
                className="grow rounded-2xl h-full px-3 py-2"
            >
                <AlternatifTable
                    data={data?.data ?? []}
                    onDeleteData={(data) => {
                        setValue("alternatif_id", data.alternatif_id);
                        setActiveModal("modal-delete");
                    }}
                    onEditData={(data) => {
                        setValue("alternatif_id", data.alternatif_id);
                        setValue("email", data.email);
                        setValue("nama", data.nama);
                        setValue("nomor_telpon", data.nomor_telpon);
                        setValue("type", "update");
                    }}
                    pagination={data?.meta}
                    onPageChange={(new_page) => {
                        setPage((prev) => ({
                            ...prev,
                            page: new_page.toString(),
                        }));
                    }}
                    divisions={dataListDivisi?.data ?? []}
                    onSelectedDivision={(data) => {
                        setPage((prev) => ({
                            ...prev,
                            page: "1",
                            divisi_id: data.divisi_id,
                        }));
                    }}
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
                        <Button color="success" onClick={onCreateKriteria}>
                            Buat
                        </Button>
                    </div>
                </div>
            </BaseModal>

            <BaseModal
                name="modal-update"
                onClose={() => {
                    setActiveModal("");
                }}
                activeModal={activeModal}
            >
                <div>
                    <div>Apakah anda yakin untuk mengupdate data ini?</div>
                    <div className="flex justify-end">
                        <Button onClick={closeModal} color="error">
                            Batal
                        </Button>
                        <Button color="success" onClick={onUpdateKriteria}>
                            Update
                        </Button>
                    </div>
                </div>
            </BaseModal>

            <BaseModal
                name="modal-delete"
                onClose={closeModal}
                activeModal={activeModal}
            >
                <div>
                    <div>
                        Apakah anda yakin untuk menghapus data ini?, kondisi ini
                        tidak dapat diulangi
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={closeModal} color="primary">
                            Batal
                        </Button>
                        <Button color="error" onClick={onDeleteKriteria}>
                            Hapus
                        </Button>
                    </div>
                </div>
            </BaseModal>
        </div>
    );
};

export default AlternatePage;
