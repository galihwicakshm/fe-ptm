import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import SweetAlert2 from "react-sweetalert2";
import "./updateuser.css";

const UpdateUser = () => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState("");
  const [cekToken, setCekToken] = useState("");
  const location = useLocation();
  const token = Cookies.get("token");
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
    axios
      .put(`http://localhost:3000/api/v1/user/update/${segments[1]}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate("/management-user");
      })
      .catch((error) => {
        setInvalid(error.response.data.message);
      });
  };

  const [swalProps, setSwalProps] = useState({});

  function handleClick() {
    setSwalProps({
      show: true,
      title: "Sukses",
      text: "User Berhasil diupdate!",
      icon: "success",
    });
  }

  useEffect(() => {
    const token = Cookies.get("token");
    setCekToken(token);
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="tambah-table">
      <div className="update-user">
        <h2 style={{ textAlign: "center" }}>Ubah User</h2>
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
              value={data.nama}
              placeholder="Input Nama"
              style={{ textAlign: "center" }}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              placeholder="Input Email"
              style={{ textAlign: "center" }}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <SweetAlert2
            {...swalProps}
            didOpen={() => {
              // run when swal is opened...
            }}
            didClose={() => {
              navigate("/management-user");
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
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
