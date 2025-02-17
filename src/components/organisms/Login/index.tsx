"use client";
import Loader from "@/components/atoms/loading";
import { ILoginForm } from "@/interfaces/components/login/index.interface";
import { useLoginUser } from "@/services/user/mutation";
import {
  faEye,
  faEyeSlash,
  faIdCard,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { register, watch, getValues, setValue, handleSubmit } =
    useForm<ILoginForm>({
      defaultValues: {
        showPassword: false,
        password: "",
        username: "",
      },
      // resolver: joiResolver(VloginSchema),
    });
  const { replace } = useRouter();

  const { mutate, isPending } = useLoginUser();

  const handleLogin = () => {
    const { password, username } = getValues();
    mutate(
      {
        username,
        password,
      },
      {
        onError: (err) => {
          const { message } = JSON.parse(
            err?.message ?? "Failed to do some jobs!"
          );
          if (Array.isArray(message)) message.forEach((m) => toast.error(m));
          toast.error(message);
        },
        onSuccess: () => {
          toast.success("Login berhasil!");
          replace("/dashboard");
        },
      }
    );
  };

  return (
    <div className="h-screen w-screen fixed">
      <Box className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Card className="overflow-hidden rounded-2xl lg:w-[450px] w-fit px-5 pt-3 pb-5 flex gap-2 flex-col">
          <Typography variant="h3" component="h1" fontWeight="bold">
            Login
          </Typography>
          <Typography variant="body1" component="p" marginBottom={3}>
            Masukkan kredensial admin anda dibawah ini.
          </Typography>
          <form
            className="flex gap-2 h-[90px]"
            onSubmit={handleSubmit(() => handleLogin())}
          >
            <div className="space-y-2 grow h-full flex flex-col justify-between">
              <div className="w-full items-center gap-2 flex">
                <FontAwesomeIcon icon={faIdCard} className="w-10" />
                <TextField
                  className="w-full"
                  {...register("username")}
                  label="Username"
                  type="text"
                  size="small"
                />
              </div>
              <div className="w-full items-center gap-2 flex">
                <FontAwesomeIcon icon={faKey} className="w-10" />
                <TextField
                  className="w-full"
                  {...register("password")}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <FontAwesomeIcon
                          cursor="pointer"
                          onClick={() =>
                            setValue("showPassword", !getValues("showPassword"))
                          }
                          icon={watch("showPassword") ? faEye : faEyeSlash}
                        />
                      ),
                    },
                  }}
                  size="small"
                  label="Password"
                  type={watch("showPassword") ? "text" : "password"}
                />
              </div>
            </div>
            <Button
              className="aspect-square !font-semibold h-full space-x-1"
              color="info"
              variant="contained"
              type="submit"
            >
              {isPending && <Loader />}
              <p>Masuk</p>
            </Button>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default LoginPage;
