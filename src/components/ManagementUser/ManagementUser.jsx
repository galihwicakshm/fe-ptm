import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./managementuser.css";
import SweetAlert2 from "react-sweetalert2";
import "./managementuser.css";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const ManagementUser = () => {
  let no = 1;
  const token = Cookies.get("token");
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState("");
  const [cekToken, setCekToken] = useState("");
  const [swalProps, setSwalProps] = useState({});

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/all-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
      });
  }, []);

  const handleDelete = (id) => {
    setSwalProps({
      show: true,
      title: "Sukses",
      text: "Hostname Berhasil dihapus!",
      icon: "success",
    });
    axios
      .delete(`http://localhost:3000/api/v1/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {});
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Data user anda akan hilang dan tidak dapat direcovery",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete!",
      cancelButtonText: "Batal!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/v1/user/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // jika delete berhasil, update state dengan data yang telah dihapus
            // setData(data.filter((item) => item.id !== id));
          });
        Swal.fire("Berhasil", "Data user berhasil dihapus", "success").then(
          () => {
            window.location.reload();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Dibatalkan", "Data user anda gagal dihapus", "error");
      }
    });
  };

  return (
    <>
      <h2
        className="judul-daftar-user"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        Daftar User
      </h2>
      <div className="tambah-table" style={{ marginTop: "20px" }}>
        <div className="table-management-user">
          <table className="table-user">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr>
                  <td>{no++}</td>
                  <td>{user.nama}</td>
                  <td>{user.email}</td>
                  <td style={{ fontWeight: "bold" }}>{user.role}</td>
                  <td style={{ display: "flex" }}>
                    <a href={`/management-user/${user.id}`} className="update">
                      Ubah
                    </a>
                    <a
                      href={`/management-user/password/${user.id}`}
                      className="password"
                    >
                      Password
                    </a>

                    {user.role === "Admin" ? (
                      ""
                    ) : (
                      <button
                        className="delete"
                        onClick={() => handleDeleteClick(user.id)}
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManagementUser;
