import "./tambahtable.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SweetAlert2 from "react-sweetalert2";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";

const TambahTable = () => {
  const [nama_table, setNamaTable] = useState("");
  const [id_table, setIDTable] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const handleSubmit = (e) => {
    e.preventDefault();
    const addTable = { nama_table, id_table };
    axios
      .post("http://localhost:3000/api/v1/daftar-table/store", addTable, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNamaTable("");
        setIDTable("");
      });
  };

  const options = [
    { value: "1", label: "Table ERP" },
    { value: "2", label: "Table Non ERP" },
  ];

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (!token) {
      navigate("/auth/login-page");
    } else if (token && role === "Admin") {
      navigate("/data/admin");
    }
  }, [navigate]);

  const [swalProps, setSwalProps] = useState({});

  function handleClick() {
    setSwalProps({
      show: true,
      title: "Sukses",
      text: "Tabel Berhasil ditambahkan!",
      icon: "success",
    });
  }
  const [cekToken, setCekToken] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    setCekToken(token);
  }, [navigate]);

  function handleLogout(e) {
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("role");
    window.location.reload();
  }

  return (
    <div>
      <div className="card-add" style={{ marginTop: "60px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "60px" }}>
          Input Table
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="nama_table"
              name="nama_table"
              value={nama_table}
              placeholder="Input nama table"
              style={{ textAlign: "center" }}
              onChange={(e) => setNamaTable(e.target.value)}
              required
            />
          </div>

          <select
            className="select"
            value={id_table}
            onChange={(e) => setIDTable(e.target.value)}
            required
          >
            <option value="" style={{ textAlign: "center" }}>
              Pilih Table
            </option>

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            disabled={!nama_table || !id_table}
            type="submit"
            onClick={handleClick}
          >
            Submit
          </button>
          <SweetAlert2
            {...swalProps}
            didOpen={() => {
              // run when swal is opened...
            }}
            didClose={() => {
              navigate("/management-table");
              window.location.reload();
            }}
            onConfirm={(result) => {
              // run when clieked in confirm and promise is resolved...
            }}
            onError={(error) => {
              // run when promise rejected...
            }}
            onResolve={(result) => {
              // run when promise is resolved...
            }}
          />
          {cekToken ? (
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            ""
          )}
          <Link
            to="/management-table"
            style={{
              textAlign: "center",
              marginTop: "50px",
              textDecoration: "none",
            }}
          >
            Management Table
          </Link>
        </form>
      </div>
    </div>
  );
};

export default TambahTable;
