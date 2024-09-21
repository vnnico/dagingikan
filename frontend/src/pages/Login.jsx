import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as authenticationAPI from "../api/authentication";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  const { showToast } = useAppContext();

  if (isLoggedIn) {
    navigate("/");
  }

  const mutation = useMutation(authenticationAPI.login, {
    onSuccess: async () => {
      showToast({ message: "Login Success!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center ">Login</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-xs mt-4">
          Don't have an account?{" "}
          <Link
            className="text-blue-500 hover:text-blue-700 font-bold"
            to="/register"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
