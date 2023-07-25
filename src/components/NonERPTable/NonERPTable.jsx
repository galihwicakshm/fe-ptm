import React, { useState, useEffect } from "react";
import "./nonerptable.css";
import axios from "axios";

const NonERPTable = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [apiList, setApiList] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    getDaftarTables();
    getJoinTables();
    getJoinAll();
  }, []);

  const getDaftarTables = () => {
    axios.get("http://localhost:3000/api/v1/daftar-tables").then((response) => {
      setData(response.data.data);
    });
  };

  const getJoinTables = () => {
    axios.get("http://localhost:3000/api/v1/join-tables").then((response) => {
      setData1(response.data.data);
    });
  };

  const getJoinAll = () => {
    axios
      .get("http://localhost:3000/api/v1/join-all")
      .then((response) => {
        setApiList(response.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const checkUrls = async () => {
      const newStatus = [];
      for (const { id, url, id_daftar_table } of apiList) {
        try {
          const response = await axios.get(url);
          if (response.status === 200) {
            newStatus.push({
              id,
              url,
              id_daftar_table,
              status: "active",
            });
          } else {
            newStatus.push({
              id,
              url,
              id_daftar_table,
              status: "inactive",
            });
          }
        } catch (error) {
          newStatus.push({ id, url, id_daftar_table, status: "inactive" });
        }
      }
      setStatus(newStatus);
    };

    checkUrls();
  }, [apiList]);

  const newArray = data1.map((item1) => {
    const item2 = status.find((item2) => item2.id === item1.id);
    return { ...item1, ...item2 };
  });

  const filteredRows = newArray.filter((row) => {
    return row.nama !== "" || row.status_api !== "";
  });

  return (
    <>
      {data.map((items) => (
        <div className="table-item">
          {items.id_table == 2 ? (
            <table className="non-erp-table" style={{ maxWidth: "265px" }}>
              <thead>
                <tr>
                  <th>{items.nama_table}</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr className={row.status === "inactive" ? "offline-tr" : ""}>
                    {row.id_daftar_table == items.id ? (
                      <td>
                        <a target="_blank" href={row.url}>
                          {row.nama}
                        </a>
                      </td>
                    ) : null}
                    {row.id_daftar_table == items.id && row.status_api != ""
                      ? {
                          ...(row.status === "active" ? (
                            <td>
                              <div className="kotak-online">
                                <div className="triangle-online"></div>
                                Online
                              </div>
                            </td>
                          ) : (
                            <td className="offline">
                              <div className="kotak-offline">
                                <div className="triangle-offline"></div>
                                Offline
                              </div>
                            </td>
                          )),
                        }
                      : ""}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
      ))}
    </>
  );
};
export default NonERPTable;
