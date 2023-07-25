import React, { useEffect } from "react";
import ManagementUser from "../../components/ManagementUser/ManagementUser";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";
const ManagementUserPage = () => {
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
    <div>
      <ManagementUser></ManagementUser>
    </div>
  );
};

export default ManagementUserPage;
