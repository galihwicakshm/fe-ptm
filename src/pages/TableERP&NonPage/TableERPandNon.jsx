import React, { useState, useEffect } from "react";
import ERPTable from "../../components/ERPTable/ERPTable";
import NonERPTable from "../../components/NonERPTable/NonERPTable";
import "./tableerpandnon.css";
import axios from "axios";
const TableERPandNon = () => {
  const [data, setData] = useState([]);
  const getDaftarTables = () => {
    axios.get("http://localhost:3000/api/v1/daftar-tables").then((response) => {
      setData(response.data.data);
    });
  };
  useEffect(() => {
    getDaftarTables();
  }, []);
  const rows = [];
  for (let i = 1; i <= 11; i++) {
    rows.push(
      <tr key={i} style={{ backgroundColor: "white" }}>
        <td style={{ color: "red", textAlign: "center" }}> </td>
      </tr>
    );
  }
  return (
    <div>
      {/* <div className="container-all"> */}

      {data < 1 ? (
        <div>
          <table style={{ marginRight: "5px" }} className="erp-non-erp-down">
            <tbody>
              <tr>
                <td
                  style={{
                    color: "red",
                    textAlign: "center",
                    backgroundColor: "white",
                    fontSize: "0.7rem",
                  }}
                  colSpan="6"
                >
                  <h1 style={{ marginTop: "300px" }}>Koneksi Terputus</h1>
                </td>
              </tr>
              {rows}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <div className="daftar-table">
            <div className="container-all">
              <ERPTable></ERPTable>
              <NonERPTable></NonERPTable>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TableERPandNon;
