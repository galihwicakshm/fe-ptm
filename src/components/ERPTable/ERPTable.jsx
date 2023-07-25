import React, { useState, useEffect } from "react";
import "./erptable.css";
import axios from "axios";

const ERPTable = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [apiList, setApiList] = useState([]);
  const [status, setStatus] = useState([]);
  const [isEmailSent, setIsEmailSent] = useState(false);

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
    getDaftarTables();
    getJoinTables();
    getJoinAll();
  }, []);

  useEffect(() => {
    const checkUrls = async () => {
      const newStatus = [];
      for (const { id, status_api, id_daftar_table, createdAt } of data1) {
        try {
          await axios.get(status_api);
          newStatus.push({
            id,
            status_api,
            id_daftar_table,
            status: "active",
            createdAt,
          });
        } catch (error) {
          newStatus.push({
            id,
            status_api,
            id_daftar_table,
            status: "inactive",
            createdAt,
          });
        }
      }
      setStatus(newStatus);
    };

    checkUrls();
  }, [data1]);

  const newArray = data1.map((item1) => {
    const item2 = status.find((item2) => item2.id === item1.id);
    return { ...item1, ...item2 };
  });

  const [result, setResult] = useState({});

  useEffect(() => {
    const countData = () => {
      const count = newArray.reduce((acc, item) => {
        if (acc[item.id_daftar_table]) {
          acc[item.id_daftar_table].count++;
        } else {
          acc[item.id_daftar_table] = {
            count: 1,
            nama_table: item.nama_table,
            nama: item.nama,
          };
        }
        return acc;
      }, {});
      setResult(count);
    };
    countData();
  }, [data]);

  const resultWithPercentageCounts = Object.entries(result).map(([id, obj]) => {
    const { count } = obj;
    const min = Math.floor(count * 0.6);
    return { id, count, min };
  });

  const filteredDatas = newArray.filter(
    (filtered) => filtered.status === "inactive"
  );

  const inactiveCounts = filteredDatas.reduce((counts, item) => {
    if (item.id_daftar_table in counts) {
      counts[item.id_daftar_table]++;
    } else {
      counts[item.id_daftar_table] = 1;
    }
    return counts;
  }, {});

  const inactiveCountsArray = Object.entries(inactiveCounts).map(
    ([id, inactive]) => ({ id, inactive })
  );

  const combinedArray = resultWithPercentageCounts.map((result) => {
    const inactiveCounts = inactiveCountsArray.find(
      (count) => count.id === result.id
    );
    return { ...result, ...inactiveCounts };
  });

  const resultArray = newArray.map((item) => {
    const combinedItem = combinedArray.find(
      (combinedItem) => combinedItem.id === item.id_daftar_table
    );
    return { ...item, ...combinedItem };
  });

  const kirimData = resultArray.filter((results) => {
    return results.min < results.inactive && results.status === "inactive";
  });

  const sendDataArray = [];

  kirimData.forEach((results) => {
    sendDataArray.push({
      hostname: results.nama,
      nama_table: results.nama_table,
    });
  });

  const sendMailTable = (emailNum, sendDataArray) => {
    const dataKirim = { sendDataArray };
    if (emailNum === 2 && sendDataArray.length !== 0) {
      axios
        .post("http://localhost:3000/api/v1/kirim-email-table", dataKirim)
        .then((response) => {
          console.log(sendDataArray);

          console.log(`Email ${emailNum} berhasil dikirim`);
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    } else if (emailNum === 1) {
      return;
    }
  };
  const checkApi = () => {
    if (sendDataArray.length !== 0) {
      if (!isEmailSent) {
        setIsEmailSent(true);
      } else {
        sendMailTable(2, sendDataArray);
      }
    }
  };

  useEffect(() => {
    checkApi();
  }, [checkApi]);

  const rows = [];
  for (let i = 1; i <= 11; i++) {
    rows.push(
      <tr key={i} style={{ backgroundColor: "white" }}>
        <td style={{ color: "red", textAlign: "center" }}> </td>
      </tr>
    );
  }
  return (
    <>
      {data.map((items) => (
        <div className="table-item">
          {items.id_table == 1 ? (
            <table className="table-status" style={{ maxWidth: "265px" }}>
              <thead>
                <tr>
                  <th>{items.nama_table}</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {newArray.map((row) => (
                  <tr className={row.status === "inactive" ? "offline-tr" : ""}>
                    {row.id_daftar_table == items.id ? (
                      <td>
                        <a target="_blank" href={row.status_api}>
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
                            <td>
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
export default ERPTable;
