"use client";

import React, { useState, useLayoutEffect, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ATinksImage from "../../assets/images/atinks-logo.svg";
import InputField from "../../components/InputField";
import OtpScreen from "../../components/OtpScreen";
import api from "./lib/axios";


const Login = () => {
  const router = useRouter();
  const [isAuthVerifying, setIsAuthVerifying] = useState(true);
  const [form, setForm] = useState({ email: "", loading: false });
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [userCode, setUserCode] = useState('')

  // OTP States
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitted) setEmailError("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // validate
    if (!form.email) {
      setEmailError("Please enter your email.");
      return;
    }
   
    setEmailError(null);
    setForm((prev) => ({ ...prev, loading: true }));

    try {
      const email = form.email.trim().toLowerCase();

      // POST to your backend (adjust path as needed)
      const { data } = await api.post('/portalVerifyCompanyEmail', { email });

      console.log(data, 'DATA')
      // backend should return: { ok: true } (and optionally { ttlSeconds: 30 })
      if (data?.success) {
        setShowOtp(true);
        setTimer(Number(data?.ttlSeconds ?? 30)); // start OTP countdown
        setCanResend(false);
        setUserCode(data?.result?.[0]?.userCode)
      } else {
        setEmailError(data?.message || "Unable to send OTP. Please try again.");
      }
    } catch (err) {
      
      if (err?.response?.data?.errorCode === -1) {
        setEmailError('Invalid email ID');
      }
      console.log(err, 'ERROR')
    } finally {
      setForm((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleVerifyOtp = async () => {
    const finalOtp = otp.join("");

    try {
      const res = await api.post('/portalVerifyCompanyOtp', {
        otp: finalOtp,
        userCode
      })

      console.log(res, 'response')
      if (res?.status === 200) {
        localStorage.setItem('authToken', res?.data?.result?.[0]?.accessToken)
        localStorage.setItem('userData', JSON.stringify(res?.data))
        router.push("/home");
      }
    } catch (error) {
      console.log(error, 'error')
    }
  };

  const handleResendOtp = async () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    setCanResend(false);
    setOtpError(false);
    const email = form.email.trim().toLowerCase();
    try {
      const res = await api.post('/portalVerifyCompanyEmail', { email });
      console.log(res, 'response')
    } catch (error) {
      console.log(error, 'error')
    }
  };

  useEffect(() => {
    let interval;
    if (showOtp && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [showOtp, timer]);

  useLayoutEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.replace("/home");
      return;
    }
    setIsAuthVerifying(false);
  }, [router]);

  // Auth Checking View
  if (isAuthVerifying)
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  // OTP Screen View
  if (showOtp)
    return (
      <OtpScreen formEmail={form.email} otp={otp} setOtp={setOtp} otpError={otpError} setOtpError={setOtpError}
        timer={timer} canResend={canResend} handleResendOtp={handleResendOtp} handleVerifyOtp={handleVerifyOtp} />
    );

  const isButtonDisabled = form.loading || !validateEmail(form.email);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center gap-[60px]">
      <div className="flex justify-center">
        <Image src={ATinksImage} alt="A.T. INKS" className="w-[190px]" priority />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[90%] max-w-[528px] gap-[34px]"
      >
        <h1 className="text-[48px] font-bold text-[#171923]">Login</h1>
        <p className="text-[18px] text-[#898A8D] mb-1.5">
          Please enter registered email id to get OTP
        </p>

        <InputField label="E-mail" type="email" name="email" placeholder="example@gmail.com"
          value={form.email} onChange={handleChange} error={submitted ? emailError : ""} />

        <button type="submit" disabled={isButtonDisabled}
          className={`min-h-[60px] w-full rounded-[20px] text-[#F7FAFC] font-semibold text-[20px] mt-1.5 ${isButtonDisabled ? "bg-[#1C4532] opacity-50" : "bg-[#1C4532]"
            }`}
        >
          {form.loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
