import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import "./superadmin.css";
import SweetAlert2 from "react-sweetalert2";

const SuperAdmin = () => {
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [invalid, setInvalid] = useState("");
  const [cekToken, setCekToken] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const registerUser = {
      nama,
      email,
      password,
      role: "User",
      confirm_password,
    };
    axios
      .post("http://localhost:3000/api/v1/auth/register", registerUser)
      .then((response) => {
        setEmail("");
        setNama("");
        setPassword("");
        setConfirmPassword("");
        navigate("/management-user");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setInvalid(error.response.data.message);
      });
  };

  useEffect(() => {
    const token = Cookies.get("token");
    setCekToken(token);
  }, [navigate]);

  function handleClickLogout(e) {
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("role");
    window.location.reload();
  }

  return (
    <div>
      <div className="card-add" style={{ marginTop: "60px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "60px" }}>
          Input User Baru
        </h2>
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          {invalid}
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="nama"
              name="nama"
              value={nama}
              placeholder="Input Nama"
              style={{ textAlign: "center" }}
              onChange={(e) => setNama(e.target.value)}
              required
            />

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Input Email"
              style={{ textAlign: "center" }}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Input Password"
              style={{ textAlign: "center" }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={confirm_password}
              placeholder="Input Confirm Password"
              style={{ textAlign: "center" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Submit</button>
          {cekToken ? (
            <button className="logout" onClick={handleClickLogout}>
              Logout
            </button>
          ) : (
            ""
          )}
          <Link
            to="/management-user"
            style={{
              textAlign: "center",
              marginTop: "50px",
              textDecoration: "none",
            }}
          >
            Management User
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SuperAdmin;
