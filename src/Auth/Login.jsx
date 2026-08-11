import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterFormSchemas } from "../schemas/REgisterFormSchemas";

const ADMIN_EMAIL = "admin@admin";
const ADMIN_PASSWORD = "admin123";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const loginol = (values) => {
    if (values.username === ADMIN_EMAIL && values.password === ADMIN_PASSWORD) {
      localStorage.setItem("token", "true");
      toast.success("Uğurla daxil oldunuz!");
      navigate("/admin");
    } else {
      toast.error("Daxil edilən məlumat yanlışdır.");
    }
  };

  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: RegisterFormSchemas,
    onSubmit: loginol,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 font-sans p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 space-y-5"
      >
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 text-center">
          Admin Panele Giriş
        </h1>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
            İstifadəçi adı
          </label>
          <input
            type="text"
            value={values.username}
            onChange={handleChange}
            name="username"
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 text-sm transition-colors ${
              touched.username && errors.username
                ? "border-red-400 focus:ring-red-400/40"
                : "border-gray-300 focus:ring-blue-500/40"
            }`}
          />
          {touched.username && errors.username && (
            <p className="text-xs text-red-600 mt-1.5">{errors.username}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
            Parol
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              name="password"
              className={`w-full px-4 py-2.5 pr-10 border rounded-xl focus:outline-none focus:ring-2 text-sm transition-colors ${
                touched.password && errors.password
                  ? "border-red-400 focus:ring-red-400/40"
                  : "border-gray-300 focus:ring-blue-500/40"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Parolu gizlət" : "Parolu göstər"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="text-xs text-red-600 mt-1.5">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          Daxil Ol
        </button>
      </form>
    </div>
  );
}

export default Login;