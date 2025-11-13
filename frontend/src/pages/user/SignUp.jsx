import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Sparkles, Shield } from "lucide-react";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await dispatch(registerUser(data));
    if (res.meta.requestStatus === "fulfilled") navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated Background Lights */}
     

      {/* Sign Up Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 p-8 rounded-2xl shadow-lg w-full max-w-sm mx-4 sm:mx-0"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2 bg-gray-800/30 px-4 py-2 rounded-full border border-gray-700/30">
            <Sparkles className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Join the Admin System</span>
          </div>
          <h2 className="text-3xl font-semibold mt-4 text-center bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
            Create an Account
          </h2>
          <p className="text-gray-400 text-sm mt-2 text-center">
            Register to manage users and roles
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full mt-1 p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full mt-1 p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full mt-1 p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Role</label>
            <select
              {...register("role")}
              className="w-full mt-1 p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <option value="User">User</option>
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-gray-700 to-gray-800 py-2.5 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-gray-800/50 transition-all transform hover:scale-105"
        >
          Register
        </button>

        <div className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-gray-200 underline hover:text-white cursor-pointer"
          >
            Sign In
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
