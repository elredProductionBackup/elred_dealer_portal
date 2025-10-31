"use client";

import React, { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ATinksImage from "../../assets/images/atinks-logo.svg";
import InputField from "../../components/InputField";

const Login = () => {
  const router = useRouter();
  const [isAuthVerifying, setIsAuthVerifying] = useState(true);
  const [form, setForm] = useState({
    email: "",
    loading: false,
  });
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitted) setEmailError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!form.email) {
      setEmailError("Please enter your email.");
      return;
    } else if (!validateEmail(form.email)) {
      setEmailError("Invalid email ID");
      return;
    }

    try {
      setForm((prev) => ({ ...prev, loading: true }));
      await new Promise((res) => setTimeout(res, 1000));
      localStorage.setItem("authToken", "mock_token_123");

      router.push("/home");
    } catch (err) {
      console.error("Login failed:", err);
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
    setIsAuthVerifying(false);
  }, [router]);

  if (isAuthVerifying) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const isButtonDisabled = form.loading || !validateEmail(form.email);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center gap-[60px]">
      <div className="flex justify-center">
        <Image
          src={ATinksImage}
          alt="A.T. INKS"
          className="w-[190px] object-contain"
          priority
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[90%] max-w-[528px] gap-[34px]"
      >
        <h1 className="text-[48px] font-bold text-[#171923]">Login</h1>
        <p className="text-[18px] leading-[20px] text-[#898A8D] font-normal">
          Please enter registered email id
        </p>

        <InputField
          label="E-mail"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={form.email}
          onChange={handleChange}
          error={submitted ? emailError : ""}
        />

        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`min-h-[60px] w-full rounded-[20px] text-[#F7FAFC] font-semibold leading-[28px] text-[20px] mt-[6px] transition-opacity
            ${
              isButtonDisabled
                ? "opacity-50 cursor-not-allowed bg-[#1C4532]"
                : "opacity-100 bg-[#1C4532] cursor-pointer"
            }`}
        >
          {form.loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
