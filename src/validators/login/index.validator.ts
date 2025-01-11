import * as yup from "yup";

export const VloginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    showPassword: yup.boolean().required().default(false),
  })
  .required();
