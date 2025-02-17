"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import BaseModal from "@/components/atoms/modal";
import UserTable from "@/components/molecules/tables/user.table";
import { compUserBreadcrumb } from "@/constants/breadcrumb/index.constant";
import { IFormUser } from "@/interfaces/page/user/index.interface";
import { useCreateUser, useDeleteUser } from "@/services/user/mutation";
import { useGetListUser } from "@/services/user/query";
import { faRefresh, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UserPage = ({ role }: { role: string }) => {
  const { watch, handleSubmit, getValues, register, reset, setValue } =
    useForm<IFormUser>({
      defaultValues: {
        type: "create",
      },
    });
  const [activeModal, setActiveModal] = useState<string>("");
  const [page, setPage] = useState({
    page: "1",
    perPage: "10",
  });

  const { data: dataUser, refetch } = useGetListUser(page);
  const { mutate: mutateCreateUser } = useCreateUser();
  const { mutate: mutateDeleteUser } = useDeleteUser();

  const closeModal = () => {
    setActiveModal("");
  };

  const handleError = (err: Error) => {
    const { message } = JSON.parse(err?.message ?? "Failed to do some jobs!");
    if (Array.isArray(message)) message.forEach((m) => toast.error(m));
    toast.error(message);
    setActiveModal("");
  };

  const onCreateUser = () => {
    const data = getValues();
    delete data.type;
    delete data.user_id;
    mutateCreateUser(data, {
      onError: handleError,
      onSuccess: (res) => {
        refetch();
        toast.success(res?.message);
        reset();
        setActiveModal("");
      },
    });
  };

  const onDeleteUser = () => {
    const id = getValues("user_id");
    mutateDeleteUser(id ?? "", {
      onError: handleError,
      onSuccess: (res) => {
        refetch();
        toast.success(res?.message);
        setActiveModal("");
      },
    });
  };

  return (
    <div className="flex gap-3 flex-col">
      <Breadcrumb list={compUserBreadcrumb} />
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
            {watch("type") === "create" && <h2>Tambah User Admin: </h2>}
            {watch("type") === "update" && <h2>Perbarui User Admin: </h2>}
            <TextField
              placeholder="Username"
              {...register("username")}
              size="small"
              disabled={role !== "spa"}
            />
            <TextField
              placeholder="Password"
              {...register("password")}
              size="small"
              disabled={role !== "spa"}
            />
            <Autocomplete
              {...register("role")}
              className="w-60"
              size="small"
              options={[
                {
                  key: "adm",
                  value: "Admin",
                },
                {
                  key: "spa",
                  value: "Super Admin",
                },
              ]}
              isOptionEqualToValue={(option, value) => option.key === value.key}
              getOptionLabel={(option) => option.value}
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
              onChange={(_, v) => {
                if (v && v.value) setValue("role", v?.key);
              }}
            />
            <Button
              type="submit"
              className="flex gap-2 justify-center items-center"
              disabled={role !== "spa"}
            >
              <FontAwesomeIcon icon={faSave} />
              <p>Save</p>
            </Button>
            <Button
              type="button"
              className="flex gap-2 justify-center items-center"
              disabled={role !== "spa"}
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
        <UserTable
          data={dataUser?.data ?? []}
          onDeleteData={(data) => {
            setValue("user_id", data.user_id);
            setActiveModal("modal-delete");
          }}
          onEditData={(data) => {
            setValue("role", data.role);
            setValue("username", data.username);
          }}
          pagination={dataUser?.meta}
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
            <Button color="success" onClick={onCreateUser}>
              Buat
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
            <Button color="error" onClick={onDeleteUser}>
              Hapus
            </Button>
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default UserPage;
