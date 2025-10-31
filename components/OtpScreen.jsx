"use client";

import React from "react";
import Image from "next/image";
import ATinksImage from "../assets/images/atinks-logo.svg";
import OtpInput from "./OtpInput";

const OtpScreen = ({formEmail, otp, setOtp, otpError, setOtpError, timer, canResend, handleResendOtp, handleVerifyOtp,
}) => {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center gap-[60px]">
      <div className="flex justify-center">
        <Image src={ATinksImage} alt="A.T. INKS" className="w-[190px]" priority />
      </div>

      <div className="flex flex-col items-center w-[90%] max-w-[550px] gap-[33px]">
        <h1 className="text-[48px] font-bold text-[#171923] mb-[1px]">
          OTP Verification
        </h1>

        <p className="text-[18px] text-[#898A8D] text-center mb-[7px]">
          We have sent OTP to your registered email ID {formEmail}
        </p>

        <div className="flex flex-col items-start w-full gap-[14px]">
          <label className="text-[#718096] font-medium text-[16px] leading-[20px]">
            Enter OTP
          </label>

          <OtpInput value={otp} setValue={setOtp} error={otpError} setError={setOtpError} />

          <div className="w-full flex justify-end mt-[6px]">
            {canResend ? (
              <button
                onClick={handleResendOtp}
                className="text-[#1C4532] underline font-medium text-[14px] cursor-pointer"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-[14px] text-[#898A8D]">
                Time Remaining: 00:{timer.toString().padStart(2, "0")}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleVerifyOtp}
          className={`min-h-[60px] w-full rounded-[20px] text-[#F7FAFC] font-semibold text-[20px] mt-[6px] cursor-pointer ${
            otp.join("").length === 6
              ? "bg-[#1C4532]"
              : "bg-[#1C4532] opacity-50 cursor-not-allowed"
          }`}
          disabled={otp.join("").length !== 6}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpScreen;
