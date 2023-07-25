import React, { useState, useEffect } from "react";
import axios from "axios";
import "./osdsurl.css";
import emailjs from "emailjs-com";

const Iframe = () => {
  const [tableData, setTableData] = useState("");
  const [result, setResult] = useState("Aman");

  useEffect(() => {
    const getDataAPI = () => {
      axios
        .get("http://127.0.0.1:5500/index.html")
        .then((response) => {
          const parser = new DOMParser();
          const htmlDocument = parser.parseFromString(
            response.data,
            "text/html"
          );
          const tableElement = htmlDocument.querySelector("table");
          tableElement.className = "table-osdsmonitor";

          const trElements = tableElement.querySelectorAll("tr");
          trElements.forEach((tr) => {
            if (tr.getAttribute("bgcolor") === "#FF0000") {
              tr.setAttribute("bgcolor", "#ff595e");
            }
            const trText = tr.innerHTML;
            const newText = trText.replace(/&nbsp;/g, "");
            tr.innerHTML = newText;
            tr.removeAttribute("height");
          });

          const tdElements = tableElement.querySelectorAll("td");
          tdElements.forEach((td) => {
            td.removeAttribute("width");
            td.removeAttribute("class");
            td.width = "10px";
            const tdText = td.innerHTML;
            const newText = tdText.replace(/&nbsp;/g, "");
            td.innerHTML = newText;
          });

          const thElements = tableElement.querySelectorAll("th");
          thElements.forEach((th) => {
            th.removeAttribute("height");
          });

          setTableData(tableElement.outerHTML);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getDataAPI();
    const intervalId = setInterval(getDataAPI, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const rows = [];
  for (let i = 1; i <= 60; i++) {
    rows.push(
      <tr key={i} style={{ backgroundColor: "white" }}>
        <td style={{ color: "red", textAlign: "center" }}> </td>
      </tr>
    );
  }
  return (
    <>
      {tableData ? (
        <div
          className="container-osdsmonitor-url"
          dangerouslySetInnerHTML={{ __html: tableData }}
        />
      ) : (
        <div>
          <table className="table-osdsmonitor">
            <thead>
              <tr>
                <th>User ID</th>
                <th>IP Address</th>
                <th>Event Date</th>
                <th>Activity</th>
                <th>Document No</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    color: "red",
                    textAlign: "center",
                    backgroundColor: "white",
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
      )}
    </>
  );
};

export default Iframe;
