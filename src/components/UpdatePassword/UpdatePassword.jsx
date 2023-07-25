import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import SweetAlert2 from "react-sweetalert2";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const UpdatePassword = () => {
  const [data, setData] = useState([]);

  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [invalid, setInvalid] = useState("");
  const [cekToken, setCekToken] = useState("");
  const [valid, setValid] = useState("");
  const token = Cookies.get("token");

  useEffect(() => {
    const role = Cookies.get("role");

    if (!token) {
      navigate("/auth/login-page");
    } else if (role != "Admin") {
      navigate("/auth/login-page");
    }
  }, []);
  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/${segments[1]}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateUser = { password, confirm_password };

    axios
      .put(
        `http://localhost:3000/api/v1/user-password/update/${segments[2]}`,
        updateUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setValid(response.status);
        navigate("/management-user");
        window.location.reload();
      })
      .catch((error) => {
        setInvalid(error.response.data.message);
      });
  };

  const [swalProps, setSwalProps] = useState({});

  useEffect(() => {
    const token = Cookies.get("token");
    setCekToken(token);
  }, [navigate]);

  return (
    <div className="tambah-table">
      <div className="update-user">
        <h2 style={{ textAlign: "center" }}>Ubah Password</h2>
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
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Input Password Baru"
              style={{ textAlign: "center" }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              id="password"
              name="password"
              value={confirm_password}
              placeholder="Input Confirmasi Password Baru"
              style={{ textAlign: "center" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            // onClick={handleClick}
          >
            Submit
          </button>
          <SweetAlert2
            {...swalProps}
            didOpen={() => {
              // run when swal is opened...
            }}
            didClose={() => {
              //   navigate("/management-user");
              //   window.location.reload();
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
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
