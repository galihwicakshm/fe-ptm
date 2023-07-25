import React, { useState, useEffect } from "react";
import axios from "axios";
import SweetAlert2 from "react-sweetalert2";
import "./tambahdetailtable.css";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import TambahHostname from "../../components/TambahHostname/TambahHostname";
import Cookies from "js-cookie";

const TambahDetailTable = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/daftar-table/${segments[1]}`)
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
    <div className="tambah-detail-table-mobile">
      <TambahHostname />
    </div>
  );
};

export default TambahDetailTable;
