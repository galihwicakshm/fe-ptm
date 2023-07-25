import React, { useEffect } from "react";
import UpdateUser from "../../components/UpdateUser/UpdateUser";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import "./updateuserpage.css";
const UpdateUserPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (token && role !== "Admin") {
      navigate("/tambah-table");
    } else if (!token) {
      navigate("/auth/login-page");
    }
  }, [navigate]);
  return (
    <div className="update-user-table">
      <UpdateUser></UpdateUser>
    </div>
  );
};

export default UpdateUserPage;
