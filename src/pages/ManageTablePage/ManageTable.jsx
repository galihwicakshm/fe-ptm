import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./manage.css";
import Cookies from "js-cookie";
import ManageTableERP from "../../components/ManageTableERP/ManageTableERP";
import ManageTableNonERP from "../../components/ManageTableNonERP/ManageTableNonERP";
const ManageTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/daftar-tables")
      .then((response) => setData(response.data.data));
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/auth/login-page");
    }
  }, [navigate]);

  return (
    <>
      <div className="manage-table-system">
        <ManageTableERP></ManageTableERP>
        <ManageTableNonERP></ManageTableNonERP>
      </div>
    </>
  );
};

export default ManageTable;
