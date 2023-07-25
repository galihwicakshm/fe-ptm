import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import "./tambahhostname.css";
import Swal from "sweetalert2";
import SweetAlert2 from "react-sweetalert2";

const UpdateHostname = () => {
  const token = Cookies.get("token");

  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [swalProps, setSwalProps] = useState({});

  const navigate = useNavigate();

  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/detail-table/${segments[2]}`, {
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
      .get(`http://localhost:3000/api/v1/join-table/${segments[1]}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setTable(response.data.data));
  }, []);

  function handleClick() {
    setSwalProps({
      show: true,
      title: "Sukses",
      text: "Hostname Berhasil diupdate!",
      icon: "success",
    });
  }

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

  return (
    <>
      <div className="card-container">
        <div className="card-top">
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
        <h3>Update Hostname</h3>
        <div className="card-bottom">
          <form className="card-hostname" onSubmit={handleSubmitNama}>
            <input
              type="text"
              id="nama"
              placeholder="Hostname"
              name="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <button
              type="submit"
              className="button"
              onClick={handleClick}
              style={{ marginLeft: "10px", marginRight: "30px" }}
            >
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
            <button
              type="submit"
              className="button"
              onClick={handleClick}
              style={{ marginLeft: "10px", marginRight: "30px" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
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
    </>
    // <div>
    //   <div className="card-wrapper">
    //     <div className="left-column">
    //       <h1>Tambah Hostname</h1>
    //       <form onSubmit={handleSubmit}>
    //         <input
    //           type="text"
    //           id="nama"
    //           placeholder="Hostname"
    //           name="nama"
    //           value={nama}
    //           onChange={(e) => setNama(e.target.value)}
    //           required
    //         />

    //         <input
    //           type="text"
    //           id="url"
    //           placeholder="URL Hostname"
    //           name="url"
    //           value={url}
    //           onChange={(e) => setURL(e.target.value)}
    //         />

    //         <input
    //           type="text"
    //           id="status_api"
    //           placeholder="API URL"
    //           name="status_api"
    //           value={status_api}
    //           onChange={(e) => setStatusApi(e.target.value)}
    //         />
    //         <button
    //           type="submit"
    //           className="tambah-hostname"
    //           onClick={handleClick}
    //         >
    //           Tambah Hostname
    //         </button>
    //         <SweetAlert2
    //           {...swalProps}
    //           didOpen={() => {
    //             // run when swal is opened...
    //           }}
    //           didClose={() => {
    //             window.location.reload();
    //           }}
    //           onConfirm={(result) => {
    //             // run when clieked in confirm and promise is resolved...
    //           }}
    //           onError={(error) => {
    //             // run when promise rejected...
    //           }}
    //           onResolve={(result) => {
    //             // run when promise is resolved...
    //           }}
    //         />
    //       </form>
    //     </div>
    //     <div className="right-column">
    //       <table className="table-management-add">
    //         <thead>
    //           <tr>
    //             <th>Hostname</th>
    //             <th>URL Hostname</th>
    //             <th>API URL</th>
    //             <th>Action</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {table.map((items) => (
    //             <tr>
    //               <td>{items.nama}</td>
    //               <td>{items.url}</td>
    //               <td>{items.status_api}</td>
    //               <td style={{ display: "flex", marginRight: "20px" }}>
    //                 <a href={`update/${items.id_detail}`} className="update">
    //                   Update
    //                 </a>

    //                 <button
    //                   className="delete"
    //                   onClick={() => handleDeleteClick(items.id_detail)}
    //                 >
    //                   Delete
    //                 </button>
    //                 <SweetAlert2
    //                   {...swalProps}
    //                   didOpen={() => {
    //                     // run when swal is opened...
    //                   }}
    //                   didClose={() => {
    //                     window.location.reload();
    //                   }}
    //                   onConfirm={(result) => {
    //                     // run when clieked in confirm and promise is resolved...
    //                   }}
    //                   onError={(error) => {
    //                     // run when promise rejected...
    //                   }}
    //                   onResolve={(result) => {
    //                     // run when promise is resolved...
    //                   }}
    //                 />
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
    // <section className="login">
    //   <div className="login_box">
    //     <div className="left">
    //       <div className="top_link">
    //         <a href="/">
    //           <img src={Back} alt="" />
    //         </a>
    //       </div>
    //       <div className="contact">
    //         <form onSubmit={handleSubmit}>
    //           <input
    //             type="text"
    //             id="nama"
    //             placeholder="Hostname"
    //             name="nama"
    //             value={nama}
    //             onChange={(e) => setNama(e.target.value)}
    //             required
    //           />

    //           <input
    //             type="text"
    //             id="url"
    //             placeholder="URL Hostname"
    //             name="url"
    //             value={url}
    //             onChange={(e) => setURL(e.target.value)}
    //           />

    //           <input
    //             type="text"
    //             id="status_api"
    //             placeholder="API URL"
    //             name="status_api"
    //             value={status_api}
    //             onChange={(e) => setStatusApi(e.target.value)}
    //           />
    //           <button
    //             type="submit"
    //             className="tambah-hostname"
    //             onClick={handleClick}
    //           >
    //             Tambah Hostname
    //           </button>
    //           <SweetAlert2
    //             {...swalProps}
    //             didOpen={() => {
    //               // run when swal is opened...
    //             }}
    //             didClose={() => {
    //               window.location.reload();
    //             }}
    //             onConfirm={(result) => {
    //               // run when clieked in confirm and promise is resolved...
    //             }}
    //             onError={(error) => {
    //               // run when promise rejected...
    //             }}
    //             onResolve={(result) => {
    //               // run when promise is resolved...
    //             }}
    //           />
    //         </form>
    //       </div>
    //     </div>

    //     <table className="table-management-add">
    //       <thead>
    //         <tr>
    //           <th>Hostname</th>
    //           <th>URL Hostname</th>
    //           <th>API URL</th>
    //           <th>Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {table.map((items) => (
    //           <tr>
    //             <td>{items.nama}</td>
    //             <td>{items.url}</td>
    //             <td>{items.status_api}</td>
    //             <td style={{ display: "flex", marginRight: "20px" }}>
    //               <a href={`update/${items.id_detail}`} className="update">
    //                 Update
    //               </a>

    //               <button
    //                 className="delete"
    //                 onClick={() => handleDeleteClick(items.id_detail)}
    //               >
    //                 Delete
    //               </button>
    //               <SweetAlert2
    //                 {...swalProps}
    //                 didOpen={() => {
    //                   // run when swal is opened...
    //                 }}
    //                 didClose={() => {
    //                   window.location.reload();
    //                 }}
    //                 onConfirm={(result) => {
    //                   // run when clieked in confirm and promise is resolved...
    //                 }}
    //                 onError={(error) => {
    //                   // run when promise rejected...
    //                 }}
    //                 onResolve={(result) => {
    //                   // run when promise is resolved...
    //                 }}
    //               />
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </section>
  );
};

export default UpdateHostname;
