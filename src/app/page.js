"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ATinksImage from "../../assets/images/atinks-logo.png";
import InputField from "../../components/InputField";
import EyeIcon from "../../assets/icons/AiFillEye.svg";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
    loading: false,
    error: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, error: "" }));

    if (!form.email || !form.password) {
      setForm((prev) => ({ ...prev, error: "Please enter both fields." }));
      return;
    }
  };

  useEffect(() => {
    const remembered = localStorage.getItem("rememberEmail");
    if (remembered) {
      setForm((prev) => ({ ...prev, email: remembered, rememberMe: true }));
    }
  }, []);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center gap-[60px]">
      {/* Logo */}
      <div className="flex justify-center">
        <Image
          src={ATinksImage}
          alt="A.T. INKS"
          className="w-[190px] object-contain"
          priority
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[90%] max-w-[528px] gap-[34px]"
      >
        <h1 className="text-[48px] font-bold text-[#171923]">Login</h1>
        <p className="text-[18px] leading-[20px] text-[#898A8D] font-normal">
          Please enter registered email id
        </p>

        {/* Email Input */}
        <InputField
          label="E-mail"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={form.email}
          onChange={handleChange}
        />

        {/* Password Input */}
        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="•••••••"
          value={form.password}
          onChange={handleChange}
          icon={EyeIcon}
        />

        {/* Remember me + Forgot */}
        <div className="w-full flex justify-between">
          <label className="flex items-center gap-2 text-[#718096] cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
              className="cursor-pointer"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="font-medium leading-[150%] underline text-[#1C4532]"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Error */}
        {form.error && (
          <p className="text-red-500 text-sm text-center w-full">
            {form.error}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={form.loading}
          className="bg-[#1C4532] min-h-[60px] w-full rounded-[20px] text-[#F7FAFC] font-semibold leading-[28px] text-[20px] cursor-pointer mt-[6px] disabled:opacity-50"
        >
          {form.loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
