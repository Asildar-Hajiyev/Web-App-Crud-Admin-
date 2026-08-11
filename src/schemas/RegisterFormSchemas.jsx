import * as yup from "yup";
export const RegisterFormSchemas = yup.object().shape({
  username: yup
    .string()
    .trim()
    .email("Düzgün e-poçt ünvanı daxil edin")
    .required("E-poçt ünvanı mütləqdir"),

  password: yup
    .string()
    .trim()
    .min(6, "Parol ən azı 6 simvol olmalıdır")
    .required("Parol mütləqdir"),
});
