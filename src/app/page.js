
"use client"

import React, { useState, useEffect } from "react";
// import axios from "axios"; 
import { useRouter } from "next/navigation";
import Image from "next/image";
import ATinksImage from '../../assets/images/atinks-logo.png'
import InputField from "../../components/InputField";
import EyeIcon from '../../assets/icons/AiFillEye.svg'

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
    try {
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    const remembered = localStorage.getItem("rememberEmail");
    if (remembered) {
      setForm((prev) => ({ ...prev, email: remembered, rememberMe: true }));
    }
  }, []);

  return (
    <div className="login-container">
      <div className="brand-section">
        <Image src={ATinksImage} alt="A.T. INKS" />
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        <p>Please enter registered email id</p>

        <InputField
          label="E-mail"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={form.email}
          onChange={handleChange}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="•••••••"
          value={form.password}
          onChange={handleChange}
          icon={EyeIcon}
        />

        <div className="login-options">
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
            />
            Remember me
          </label>
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        {form.error && <p className="error-text">{form.error}</p>}

        <button type="submit" disabled={form.loading}>
          {form.loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
