import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@admin";
const ADMIN_PASSWORD = "admin123";
function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const loginol = (e) => {
    e.preventDefault();
    setError(false);

    if (username === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("token", "true"); // burda əsl backend gələndə real JWT token gələcək
      navigate("/admin");
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 font-sans p-6">
      <form
        onSubmit={loginol}
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-5"
      >
        <h1 className="text-xl font-bold text-gray-900 text-center">
          Admin Panele Giriş
        </h1>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
            İstifadəçi adı
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
            Parol
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {error && (
          <div
            id="alertBox"
            className="bg-red-100 text-red-800 p-4 rounded-lg flex items-center justify-center animate__animated animate__backInDown"
            role="alert"
          >
            <span className="font-semibold text-[15px] inline-block mr-4">
              Xəta!
            </span>
            <span className="block text-sm font-medium sm:inline max-sm:mt-2">
              Daxil edilən məlumat yanlışdır.
            </span>
          </div>
        )}

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
