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
    <div className="input-field">
      {label && <label htmlFor={name}>{label}</label>}

      <div className="input-wrapper">
        <input
          type={inputType}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={type === "password" ? "current-password" : "off"}
        />

        {icon && (
          <span
            className={`icon-right ${type === "password" ? "clickable" : ""}`}
            onClick={handleIconClick}
          >
            <Image
              src={icon}
              alt={`${name}-icon`}
              width={20}
              height={20}
              priority
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
