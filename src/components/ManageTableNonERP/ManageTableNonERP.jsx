import React, { useEffect, useState } from "react";
import axios from "axios";
import SweetAlert2 from "react-sweetalert2";
import Swal from "sweetalert2";

import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./managetablenonerp.css";
import Cookies from "js-cookie";

const ManageTableERP = () => {
  const [swalProps, setSwalProps] = useState({});
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/daftar-tables")
      .then((response) => setData(response.data.data));
  }, []);

  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth/login-page");
    }
  }, [navigate]);

  // const handleDelete = (id) => {
  //   setSwalProps({
  //     show: true,
  //     title: "Sukses",
  //     text: "Table Berhasil dihapus!",
  //     icon: "success",
  //   });
  //   axios
  //     .delete(`http://localhost:3000/api/v1/daftar-table/delete/${id}`)
  //     .then((response) => {
  //       // jika delete berhasil, update state dengan data yang telah dihapus
  //       // setData(data.filter((item) => item.id !== id));
  //     })
  //     .catch((error) => console.log(error));
  // };

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
          .delete(`http://localhost:3000/api/v1/daftar-table/delete/${id}`, {
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
    <div className="manage-non-erp">
      <table className="manage-table-non-erp">
        <caption>Table Non ERP</caption>
        <thead>
          <tr>
            <th>Nama Table</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((items) => (
            <tr style={{ textAlign: "center" }}>
              {items.id_table === 2 ? <td>{items.nama_table}</td> : ""}
              {items.id_table === 2 ? (
                <td style={{ display: "flex", marginLeft: "90px" }}>
                  <a
                    href={`management-table/${items.id}`}
                    className="button-tambah"
                  >
                    Kelola
                  </a>
                  <button
                    className="button-delete"
                    onClick={() => handleDeleteClick(items.id)}
                  >
                    Delete
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
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTableERP;
