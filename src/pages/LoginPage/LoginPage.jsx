import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./loginpage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (token && role === "User") {
      navigate("/tambah-table");
    } else if (token && role === "Admin") {
      navigate("/data/admin");
    } else if (!token) {
      navigate("/auth/login-page");
    }
  }, [navigate]);
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
