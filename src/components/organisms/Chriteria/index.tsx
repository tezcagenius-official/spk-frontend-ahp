"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import BaseModal from "@/components/atoms/modal";
import { ChriteriaTable } from "@/components/molecules/tables/chriteria.table";
import { chriteriaPageBreadcrumb } from "@/constants/breadcrumb/index.constant";
import { IFormChriteria } from "@/interfaces/page/chriteria/index.interface";
import {
  useDeleteKriteria,
  usePatchUpdateKriteria,
  usePostCreateKriteria,
} from "@/services/kriteria/mutation";
import { useGetListKriteria } from "@/services/kriteria/query";
import { faRefresh, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, TextField } from "@mui/material";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ChriteriaPage = () => {
  const [activeModal, setActiveModal] = useState<string>("");
  const { register, handleSubmit, getValues, setValue, reset, watch } =
    useForm<IFormChriteria>({
      defaultValues: {
        type: "create",
      },
    });
  const role = useCookies().get("role");
  const { data, refetch } = useGetListKriteria();
  const { mutate: handleCreate } = usePostCreateKriteria();
  const { mutate: handleUpdate } = usePatchUpdateKriteria();
  const { mutate: handleDelete } = useDeleteKriteria();

  const handleError = (err: any) => {
    const { message } = JSON.parse(err?.message ?? "Failed to do some jobs!");
    if (Array.isArray(message)) message.forEach((m) => toast.error(m));
    toast.error(message);
    setActiveModal("");
  };

  const onCreateKriteria = () => {
    handleCreate(
      { nama_kriteria: getValues("nama_kriteria") },
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
  const onUpdateKriteria = () => {
    handleUpdate(
      {
        body: {
          nama_kriteria: getValues("nama_kriteria"),
        },
        id: getValues("kriteria_id"),
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
    handleDelete(getValues("kriteria_id"), {
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
      <Breadcrumb list={chriteriaPageBreadcrumb} />
      <Card className="grow rounded-2xl h-full px-3 py-2">
        <div>
          <form
            className="flex items-center gap-2"
            onSubmit={handleSubmit(() =>
              setActiveModal(
                getValues("type") === "create" ? "modal-create" : "modal-update"
              )
            )}
          >
            {watch("type") === "create" && <h2>Tambah kriteria: </h2>}
            {watch("type") === "update" && <h2>Perbarui kriteria: </h2>}
            <TextField
              placeholder="Nama Kriteria"
              {...register("nama_kriteria")}
              size="small"
              disabled={role === "adm"}
            />
            <Button
              type="submit"
              className="flex gap-2 justify-center items-center"
              disabled={role === "adm"}
            >
              <FontAwesomeIcon icon={faSave} />
              <p>Save</p>
            </Button>
            <Button
              type="button"
              className="flex gap-2 justify-center items-center"
              disabled={role === "adm"}
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
      <Card variant="outlined" className="grow rounded-2xl h-full px-3 py-2">
        <ChriteriaTable
          data={data?.data ?? []}
          onDeleteData={(data) => {
            setValue("kriteria_id", data.kriteria_id);
            setValue("nama_kriteria", data.nama_kriteria ?? "");
            setActiveModal("modal-delete");
          }}
          onEditData={(data) => {
            setValue("kriteria_id", data.kriteria_id);
            setValue("nama_kriteria", data.nama_kriteria ?? "");
            setValue("type", "update");
          }}
          disableAll={role === "adm"}
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
            Apakah anda yakin untuk menghapus data ini?, kondisi ini tidak dapat
            diulangi
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

export default ChriteriaPage;
