import React, { useState, useEffect } from "react";
import axios from "axios";
import Back from "../../images/Back.png";

import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./tambahhostname.css";
import Swal from "sweetalert2";
import SweetAlert2 from "react-sweetalert2";
import Cookies from "js-cookie";
const TambahHostname = () => {
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [swalProps, setSwalProps] = useState({});
  const token = Cookies.get("token");

  const navigate = useNavigate();

  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/daftar-table/${segments[1]}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setData(response.data.data));
  }, []);

  const [nama, setNama] = useState("");
  const [status_api, setStatusApi] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const addHostname = { nama, status_api, id_daftar_table: segments[1] };
    axios
      .post(
        `http://localhost:3000/api/v1/detail-table/store/${segments[1]}`,
        addHostname,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setNama("");
        setStatusApi("");
      })

      .catch((error) => {});
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/join-table/${segments[1]}`)
      .then((response) => setTable(response.data.data));
  }, []);

  function handleClick() {
    setSwalProps({
      show: true,
      title: "Sukses",
      text: "Hostname Berhasil ditambahkan!",
      icon: "success",
    });
  }

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Data tabel anda akan hilang dan tidak dapat direcovery",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete!",
      cancelButtonText: "Batal!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/v1/detail-table/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // jika delete berhasil, update state dengan data yang telah dihapus
            // setData(data.filter((item) => item.id !== id));
          });
        Swal.fire("Berhasil", "Data tabel berhasil dihapus", "success").then(
          () => {
            window.location.reload();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Dibatalkan", "Data tabel anda gagal dihapus", "error");
      }
    });
  };
  return (
    <>
      <div className="card-container">
        <div className="card-top">
          <table className="table-management-add" style={{ marginTop: "5px" }}>
            <thead>
              <tr>
                <th>Hostname</th>
                <th>API URL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {table.map((items) => (
                <tr>
                  <td>{items.nama}</td>
                  <td>{items.status_api}</td>
                  <td style={{ display: "flex", marginRight: "20px" }}>
                    <a href={`update/${items.id_detail}`} className="update">
                      Update
                    </a>

                    <button
                      className="delete"
                      onClick={() => handleDeleteClick(items.id_detail)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-bottom">
          <form className="form-tambah-hostname" onSubmit={handleSubmit}>
            <h3 style={{ textAlign: "center" }}>Tambah Hostname</h3>
            <input
              type="text"
              id="nama"
              placeholder="Hostname"
              name="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              style={{ margin: "10px" }}
            />

            <input
              type="text"
              id="status_api"
              placeholder="API URL"
              name="status_api"
              value={status_api}
              onChange={(e) => setStatusApi(e.target.value)}
              style={{ margin: "10px" }}
            />
            <button
              disabled={!nama || !status_api}
              type="submit"
              className="tambah-hostname"
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
    </>
  );
};

export default TambahHostname;
