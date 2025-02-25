import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAPP } from '../../contexts/Appcontext';
import Logo from "../../assets/images/website/icon.png";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { theme, Login, setUser } = useAPP();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Login Form Data:", data);
    setLoading(true);
    Login(data)
      .then((res) => {
        if (res.success) {
          if (res.data.role !== 'admin') {
            toast.warn("Please Login with Admin Credentials");
          } else {
            toast.success(res.message);
            setUser(res.data);
            navigate('/dashboard');
          }
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log("error :", err);
        toast.error(err.response?.data?.message || 'Login Failed');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Theming logic
  const formBg = theme === 'dark' ? "dark-bg" : "bg-white";
  const labelColor = theme === 'dark' ? "text-gray-300" : "text-[#2b2b2b]";
  const inputBG = theme === 'dark' ? "main-dark" : "bg-white";

  return (
    <div className={`${inputBG} flex flex-col items-center justify-center min-h-screen`}>
      {/* Icon outside of the form */}
      <img
        src={Logo}
        alt="App Logo"
        className="h-14 mb-6"
      />

      {/* Form container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${formBg} w-full max-w-sm py-10 px-8 rounded-2xl shadow-md`}
      >
        {/* Heading & Subheading centered */}
        <h2 className={`text-xl font-semibold mb-1 text-center ${labelColor}`} style={{ fontSize: '24px' }}>
          Sign in to account
        </h2>
        <p className="mb-8 text-center text-[#898989] font-[14px]">
          Enter your email & password to login
        </p>

        {/* Email Address */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-2 ${labelColor}`}>
            Email Address
          </label>
          <input
            type="email"
            {...register('email', { required: "Email is required" })}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm text-[#212529] 
                        ${inputBG} focus:outline-none focus:ring-1 focus:ring-purple-500`}
            placeholder="admin@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-2 ${labelColor}`}>
            Password
          </label>
          <input
            type="password"
            {...register('password', { required: "Password is required" })}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm text-[#212529] 
                        ${inputBG} focus:outline-none focus:ring-1 focus:ring-purple-500`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7B2BFF] text-white py-2 px-4 rounded-full 
                     hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ?<BeatLoader color='white' />: 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Login;
