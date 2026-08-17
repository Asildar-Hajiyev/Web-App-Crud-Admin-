import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import { loginSuccess } from "../redux/authSlice";
import  {RegisterFormSchemas}  from "../schemas/RegisterFormSchemas";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    const { username, password } = values;

    if (username === "admin@admin" && password === "admin123") {
      const user = {
        email: username,
      };

      const exp = Date.now() + 60 * 60 * 1000;

      const token = btoa(
        JSON.stringify({
          email: username,
          exp,
        })
      );

      dispatch(
        loginSuccess({
          token,
          user,
        })
      );

      toast.success("Uğurla daxil oldunuz!");

      navigate("/admin");
    } else {
      toast.error("Email və ya parol yanlışdır!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={RegisterFormSchemas}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <Field
                type="email"
                name="username"
                placeholder="admin@admin"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Parol
              </label>

              <Field
                type="password"
                name="password"
                placeholder="admin123"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Daxil ol
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;