import * as yup from 'yup'

export const UserFormSchemas = yup.object().shape({
    image: yup.string()
    .required("Şəkil URL tələb olunur")
    .url("Düzgün URL daxil edin (http:// və ya https:// ilə)"),

  name: yup.string()
    .required("Ad tələb olunur")
    .min(2, "Ad ən azı 2 hərf olmalıdır"),

  surname: yup.string()
    .required("Soyad tələb olunur")
    .min(2, "Soyad ən azı 2 hərf olmalıdır"),

  phone: yup.string()
    .required("Telefon tələb olunur")
    .matches(/^[0-9+\-() ]{9,}$/, "Düzgün telefon nömrəsi daxil edin"),

  age: yup.number()
    .typeError("Yaş rəqəm olmalıdır")
    .required("Yaş tələb olunur")
    .min(1, "Yaş 1-dən böyük olmalıdır")
    .max(120, "Yaş 120-dən kiçik olmalıdır"),
})