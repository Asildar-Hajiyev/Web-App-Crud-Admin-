import * as Yup from "yup";


export const initialOrderValues = {
  name: "",
  price: "",
  image: "",
};

// Yup Validasiya Sxemi
export const orderValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Məhsul adı ən azı 2 simvol olmalıdır")
    .required("Məhsul adını daxil edin"),
  price: Yup.number()
    .typeError("Qiymət yalnız rəqəm olmalıdır")
    .positive("Qiymət müsbət ədəd olmalıdır")
    .required("Qiyməti daxil edin"),
  image: Yup.string()
    .url("Düzgün URL daxil edin (məs: https://...)")
    .nullable(),
});