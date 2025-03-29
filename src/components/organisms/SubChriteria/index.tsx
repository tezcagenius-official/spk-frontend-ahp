"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import BaseModal from "@/components/atoms/modal";
import SubChriteriaTable from "@/components/molecules/tables/sub-chriteria.table";
import { subChriteriaPageBreadcrumb } from "@/constants/breadcrumb/index.constant";
import { IFormSubChriteria } from "@/interfaces/page/sub-chriteria/index.interface";
import { useGetListKriteria } from "@/services/kriteria/query";
import {
    useDeleteSubKriteria,
    usePatchUpdateSubKriteria,
    usePostCreateSubKriteria,
} from "@/services/sub-kriteria/mutation";
import { useGetListSubKriteria } from "@/services/sub-kriteria/query";
import { faRefresh, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, Button, Card, TextField } from "@mui/material";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SubChriteriaPage: React.FC = () => {
    const role = useCookies().get("role");
    const [activeModal, setActiveModal] = useState<string>("");
    const { register, handleSubmit, getValues, setValue, reset, watch } =
        useForm<IFormSubChriteria>({
            defaultValues: {
                kriteria_id: undefined,
                type: "create",
            },
        });

    const [page, setPage] = useState({
        page: "1",
        perPage: "10",
    });

    const { data, refetch } = useGetListSubKriteria(page);
    const { data: dataKriteria } = useGetListKriteria(true, {
        page: "1",
        perPage: "9000",
    });
    const { mutate: handleCreate } = usePostCreateSubKriteria();
    const { mutate: handleUpdate } = usePatchUpdateSubKriteria();
    const { mutate: handleDelete } = useDeleteSubKriteria();

    const handleError = (err: Error) => {
        const { message } = JSON.parse(
            err?.message ?? "Failed to do some jobs!"
        );
        if (Array.isArray(message)) message.forEach((m) => toast.error(m));
        toast.error(message);
        setActiveModal("");
    };

    const onCreateSubKriteria = () => {
        const { kriteria_id, nama_sub_kriteria } = getValues();
        handleCreate(
            { kriteria_id, nama_sub_kriteria },
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
    const onUpdateSubKriteria = () => {
        const { nama_sub_kriteria, sub_kriteria_id } = getValues();
        handleUpdate(
            {
                body: {
                    nama_sub_kriteria,
                },
                id: sub_kriteria_id,
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
    const onDeleteSubKriteria = () => {
        handleDelete(getValues("sub_kriteria_id"), {
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
            <Breadcrumb list={subChriteriaPageBreadcrumb} />
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
                            <h2>Tambah kriteria: </h2>
                        )}
                        {watch("type") === "update" && (
                            <h2>Perbarui sub-kriteria: </h2>
                        )}
                        <TextField
                            placeholder="Nama Sub Kriteria"
                            {...register("nama_sub_kriteria")}
                            size="small"
                        />
                        {watch("type") === "create" && (
                            <Autocomplete
                                {...register("kriteria_id")}
                                className="w-60"
                                size="small"
                                options={dataKriteria?.data ?? []}
                                isOptionEqualToValue={(option, value) =>
                                    +option.kriteria_id === +value.kriteria_id
                                }
                                // inputValue={
                                //   dataKriteria?.data?.find(
                                //     (k) => k.kriteria_id === (getValues("kriteria_id") ?? 0)
                                //   )?.nama_kriteria ?? ""
                                // }
                                getOptionLabel={(option) =>
                                    `${option.nama_divisi} - ${option?.nama_kriteria}`
                                }
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
                                onChange={(_, value) => {
                                    if (value && value.kriteria_id) {
                                        setValue(
                                            "kriteria_id",
                                            value?.kriteria_id
                                        );
                                    }
                                }}
                            />
                        )}
                        <Button
                            type="submit"
                            disabled={role !== "spa"}
                            className="flex gap-2 justify-center items-center"
                        >
                            <FontAwesomeIcon icon={faSave} />
                            <p>Save</p>
                        </Button>
                        <Button
                            type="button"
                            disabled={role !== "spa"}
                            className="flex gap-2 justify-center items-center"
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
                <SubChriteriaTable
                    data={data?.data ?? []}
                    onDeleteData={(data) => {
                        setValue("sub_kriteria_id", data.sub_kriteria_id ?? "");
                        setActiveModal("modal-delete");
                    }}
                    onEditData={(data) => {
                        setValue("kriteria_id", data.kriteria_id);
                        setValue(
                            "nama_sub_kriteria",
                            data.nama_sub_kriteria ?? ""
                        );
                        setValue("sub_kriteria_id", data.sub_kriteria_id ?? "");
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
                        <Button color="success" onClick={onCreateSubKriteria}>
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
                        <Button color="success" onClick={onUpdateSubKriteria}>
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
                        <Button color="error" onClick={onDeleteSubKriteria}>
                            Hapus
                        </Button>
                    </div>
                </div>
            </BaseModal>
        </div>
    );
};

export default SubChriteriaPage;
