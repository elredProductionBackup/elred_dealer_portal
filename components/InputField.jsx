"use client";
import React, { useState } from "react";
import Image from "next/image";

const InputField = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const handleIconClick = () => {
    if (type === "password") setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col items-start gap-[14px]">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="text-[#718096] font-medium leading-[20px]"
        >
          {label}
        </label>
      )}

      <div className="w-full relative flex items-center rounded-xl border border-[#CBD5E0] bg-[#F7FAFC]">
        {/* Input */}
        <input
          type={inputType}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={type === "password" ? "current-password" : "off"}
          className="w-full min-h-[55px] border-none outline-none pl-3 pr-[54px] bg-transparent placeholder:text-[#899197]"
        />

        {/* Right Icon */}
        {icon && (
          <span
            className={`absolute right-0 flex items-center justify-center min-w-[54px] h-[40px] border-l border-[#CFD9E0] ${
              type === "password" ? "cursor-pointer" : ""
            }`}
            onClick={handleIconClick}
          >
            <Image
              src={icon}
              alt={`${name}-icon`}
              width={24}
              height={24}
              priority
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
