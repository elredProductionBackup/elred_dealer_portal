"use client";
import { useRef } from "react";

const OtpInput = ({ value, setValue, error, setError }) => {
  const otpRefs = useRef([]);

  const handleInput = (index, e) => {
    const val = e.target.value;
    if (/^[0-9]$/.test(val) || val === "") {
      const newOtp = [...value];
      newOtp[index] = val;
      setValue(newOtp);
      if (error) setError(false);
      if (val && index < value.length - 1) otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...value];
      if (value[index]) {
        newOtp[index] = "";
        setValue(newOtp);
      } else if (index > 0) {
        otpRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setValue(newOtp);
      }
      if (error) setError(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex w-full justify-between gap-[39px]">
        {value.map((val, index) => (
          <input
            key={index}
            ref={(el) => (otpRefs.current[index] = el)}
            value={val}
            onChange={(e) => handleInput(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            type="tel"
            className={`w-[55px] min-h-[55px] rounded-[10px] border ${
              error ? "border-[#F12632]" : "border-[#CBD5E0]"
            } bg-[#F7FAFC] text-center outline-none transition-all duration-400`}
          />
        ))}
      </div>

      {error && (
        <p className="absolute bottom-[-41px] left-0 text-[#E53E3E] text-[14px] font-medium">
          Invalid OTP
        </p>
      )}
    </div>
  );
};

export default OtpInput;
