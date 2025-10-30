"use client";

import React, { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ATinksImage from "../../assets/images/atinks-logo.svg";
import InputField from "../../components/InputField";
import EyeIcon from "../../assets/icons/AiFillEye.svg";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [isAuthVerifying, setIsAuthVerifying] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
    loading: false,
    error: "",
  });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "email") {
      setEmailError("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, error: "" }));

    if (!form.email) {
      setEmailError("Please enter your email.");
      return;
    } else if (!validateEmail(form.email)) {
      setEmailError("Invalid email ID");
      return;
    }

    if (!form.password) {
      setForm((prev) => ({ ...prev, error: "Please enter your password." }));
      return;
    }

    try {
      setForm((prev) => ({ ...prev, loading: true }));
      await new Promise((res) => setTimeout(res, 1000));
      localStorage.setItem("authToken", "mock_token_123");

      if (form.rememberMe) {
        localStorage.setItem("rememberEmail", form.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      router.push("/home");
    } catch (err) {
      setForm((prev) => ({ ...prev, error: "Login failed. Try again." }));
    } finally {
      setForm((prev) => ({ ...prev, loading: false }));
    }
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.replace("/home");
      return;
    }

    const remembered = localStorage.getItem("rememberEmail");
    if (remembered) {
      setForm((prev) => ({ ...prev, email: remembered, rememberMe: true }));
    }

    setIsAuthVerifying(false);
  }, [router]);

  if (isAuthVerifying) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

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

        {/* Email Input with error */}
        <InputField
          label="E-mail"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={form.email}
          onChange={handleChange}
          error={emailError} 
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

        {/* Toast Message poppup */}
        {/* {form.error && (
          <p className="text-red-500 text-sm text-center w-full">
            {form.error}
          </p>
        )} */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={form.loading}
          className={`min-h-[60px] w-full rounded-[20px] text-[#F7FAFC] font-semibold leading-[28px] text-[20px] cursor-pointer mt-[6px] bg-[#1C4532]
            ${emailError ? "opacity-50" : "opacity-100"} 
            disabled:opacity-50`}
        >
          {form.loading ? "Signing in..." : "Sign in"}
        </button>


      </form>
    </div>
  );
};

export default Login;
