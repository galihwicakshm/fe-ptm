import React, { useEffect, useState } from "react";
import axios from "axios";
import SweetAlert2 from "react-sweetalert2";

import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./updatehostname.css";
import Cookies from "js-cookie";

const Cards = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth/login-page");
    }
  }, [navigate]);

  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [swalProps, setSwalProps] = useState({});

  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/detail-table/${segments[2]}`)
      .then((response) => setData(response.data.data));
  }, []);

  const [nama, setNama] = useState("");
  const [status_api, setStatusApi] = useState("");

  const handleSubmitNama = (e) => {
    e.preventDefault();

    const updateHostname = { nama };
    axios
      .put(
        `http://localhost:3000/api/v1/detail-table/update/nama/${segments[2]}`,
        updateHostname,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setNama("");
      })

      .catch((error) => {});
  };

  const handleSubmitStatusAPI = (e) => {
    e.preventDefault();

    const updateHostname = { status_api };
    axios
      .put(
        `http://localhost:3000/api/v1/detail-table/update/status-api/${segments[2]}`,
        updateHostname,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setStatusApi("");
      })

      .catch((error) => {});
  };

  function handleClick() {
    setSwalProps({
      show: true,
      title: "Sukses",
      text: "Hostname Berhasil diubah!",
      icon: "success",
    });
  }
  return (
    <>
      <div className="card-wrapper-update">
        <div className="left-column-update">
          <h1>Update Hostname</h1>
          <form className="card-hostname" onSubmit={handleSubmitNama}>
            <input
              type="text"
              id="nama"
              placeholder="Hostname"
              name="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <button type="submit" className="button" onClick={handleClick}>
              Submit
            </button>
          </form>

          <form className="card-hostname" onSubmit={handleSubmitStatusAPI}>
            <input
              type="text"
              id="status_api"
              placeholder="API URL"
              name="status_api"
              value={status_api}
              onChange={(e) => setStatusApi(e.target.value)}
            />
            <button type="submit" className="button" onClick={handleClick}>
              Submit
            </button>
          </form>

          <SweetAlert2
            {...swalProps}
            didOpen={() => {
              // run when swal is opened...
            }}
            didClose={() => {
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
        </div>
        <div className="right-column-update">
          <table className="table-management-update">
            <thead>
              <tr>
                <th>Hostname</th>
                <th>API URL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.nama}</td>
                <td>{data.status_api}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>

    // </div>
  );
};

export default Cards;
