import React, { useEffect } from "react";
import SuperAdmin from "../../components/SuperAdmin/SuperAdmin";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
const SuperAdminPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (!token) {
      navigate("/auth/login-page");
    } else if (token && role !== "Admin") {
      navigate("/tambah-table");
    }
  }, [navigate]);
  return (
    <div>
      <div className="tambah-table">
        <SuperAdmin></SuperAdmin>
      </div>
    </div>
  );
};

export default SuperAdminPage;
