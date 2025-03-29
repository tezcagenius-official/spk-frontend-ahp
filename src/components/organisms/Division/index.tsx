"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import BaseModal from "@/components/atoms/modal";
import DivisiTable from "@/components/molecules/tables/divisi.table";
import { divisionBreadcrumb } from "@/constants/breadcrumb/index.constant";
import {
    IDivisionProps,
    IFormDivision,
} from "@/interfaces/page/division/index.interface";
import {
    useDeleteDivisi,
    usePatchUpdateDivisi,
    usePostCreateDivisi,
} from "@/services/division/mutation";
import { useGetListDivisi } from "@/services/division/query";
import { faRefresh, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const DivisionPage: React.FC<IDivisionProps> = ({ role }) => {
    const [activeModal, setActiveModal] = useState<string>("");
    const { register, handleSubmit, getValues, setValue, reset, watch } =
        useForm<IFormDivision>({
            defaultValues: {
                type: "create",
            },
        });

    const [page, setPage] = useState({
        page: "1",
        perPage: "10",
    });

    const { data, refetch } = useGetListDivisi(true, page);
    const { mutate: handleCreate } = usePostCreateDivisi();
    const { mutate: handleUpdate } = usePatchUpdateDivisi();
    const { mutate: handleDelete } = useDeleteDivisi();

    const handleError = (err: Error) => {
        const { message } = JSON.parse(
            err?.message ?? "Failed to do some jobs!"
        );
        if (Array.isArray(message)) message.forEach((m) => toast.error(m));
        toast.error(message);
        setActiveModal("");
    };

    const onCreateDivisi = () => {
        const { nama_divisi } = getValues();
        handleCreate(
            { nama_divisi },
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
    const onUpdateDivisi = () => {
        const { nama_divisi, divisi_id } = getValues();

        if (!divisi_id) return toast.error("Divisi ID is required!");

        handleUpdate(
            {
                body: {
                    nama_divisi,
                },
                divisi_id: divisi_id,
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
    const onDeleteDivisi = () => {
        const id = getValues("divisi_id");

        if (!id) return toast.error("Divisi ID is Required!");

        handleDelete(id, {
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
            <Breadcrumb list={divisionBreadcrumb} />
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
                        {watch("type") === "create" && <h2>Tambah divisi: </h2>}
                        {watch("type") === "update" && (
                            <h2>Perbarui divisi: </h2>
                        )}
                        <TextField
                            placeholder="Nama Divisi"
                            {...register("nama_divisi")}
                            size="small"
                            disabled={role !== "adm"}
                        />
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
                <DivisiTable
                    data={data?.data ?? []}
                    onDeleteData={(data) => {
                        setValue("divisi_id", data.divisi_id);
                        setActiveModal("modal-delete");
                    }}
                    onEditData={(data) => {
                        setValue("divisi_id", data.divisi_id);
                        setValue("nama_divisi", data.nama_divisi);
                        setValue("type", "update");
                    }}
                    pagination={data?.meta}
                    onPageChange={(new_page) => {
                        setPage((prev) => ({
                            ...prev,
                            page: new_page.toString(),
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
                        <Button color="success" onClick={onCreateDivisi}>
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
                        <Button color="success" onClick={onUpdateDivisi}>
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
                        <Button color="error" onClick={onDeleteDivisi}>
                            Hapus
                        </Button>
                    </div>
                </div>
            </BaseModal>
        </div>
    );
};

export default DivisionPage;
