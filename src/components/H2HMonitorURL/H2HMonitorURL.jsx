import React, { useState, useEffect } from "react";
import axios from "axios";
import "./h2hmonitorurl.css";

const H2HMonitorUrl = () => {
  const [tableData, setTableData] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5502/index.html")
      .then((response) => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(response.data, "text/html");
        const tables = htmlDocument.querySelectorAll("table");
        tables[0].removeAttribute("width");
        tables[0].setAttribute("id", "table-1");
        tables[0].setAttribute("class", "table-1");
        tables[1].setAttribute("id", "content-h2h-monitor");

        const tableElement = htmlDocument.querySelector("table");
        const tdElements = tableElement.querySelectorAll("td");
        tdElements.forEach((td) => {
          td.removeAttribute("width");
          td.removeAttribute("class");
          const tdText = td.innerHTML;
          const newText = tdText.replace(/&nbsp;/g, "");
          td.innerHTML = newText;
        });
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

        const thElements = tableElement.querySelectorAll("th");
        thElements.forEach((th) => {
          const thText = th.innerHTML;
          const newText = thText.replace("Descrition", "Description");
          th.innerHTML = newText;
        });

        setTableData(htmlDocument.body.innerHTML);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [dataEmail1, setDataEmail1] = useState("");
  const [dataEmail2, setDataEmail2] = useState("");
  const [dataEmail3, setDataEmail3] = useState("");
  const [dataEmail4, setDataEmail4] = useState("");
  const [dataEmail5, setDataEmail5] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const checkRows = () => {
    let rows = document.querySelectorAll("#table-1 tbody tr");
    let count = 0;
    for (let i = 4; i < 9; i++) {
      if (
        rows[9] !== undefined &&
        rows[9].getAttribute("bgcolor") === "#ff595e"
      ) {
        count = 0;
      } else if (
        rows[i] !== undefined &&
        rows[i].getAttribute("bgcolor") === "#ff595e"
      ) {
        count++;
        console.log();
        setDataEmail1(rows[4].outerHTML);
        setDataEmail2(rows[5].outerHTML);
        setDataEmail3(rows[6].outerHTML);
        setDataEmail4(rows[7].outerHTML);
        setDataEmail5(rows[8].outerHTML);
      } else {
        count = 0;
      }
    }
    if (count === 5) {
      if (!isEmailSent) {
        sendEmail(1); // kirim email pertama
        setIsEmailSent(true);
      } else {
        sendEmail(2); // kirim email kedua
      }
    }
    console.log(count);
  };

  const sendEmail = (emailNum) => {
    const dataEmail = {
      dataEmail1,
      dataEmail2,
      dataEmail3,
      dataEmail4,
      dataEmail5,
    };
    if (emailNum === 2) {
      axios
        .post("http://localhost:3000/api/v1/kirim-email", dataEmail)
        .then((response) => {
          console.log(`Email ${emailNum} berhasil dikirim`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (emailNum === 1) {
      return;
    }
  };

  useEffect(() => {
    checkRows();
  }, [checkRows]);

  const rows = [];
  for (let i = 1; i <= 50; i++) {
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
          className="container-h2h"
          dangerouslySetInnerHTML={{ __html: tableData }}
        />
      ) : (
        <div className="bank">
          <table className="h2h-bank">
            <thead>
              <tr>
                <th>Bank</th>
                <th>SO</th>
                <th>DO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: "red", textAlign: "center" }} colSpan="3">
                  <h3>Koneksi Terputus</h3>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="content-h2hmonitor">
            <thead>
              <tr>
                <th>Event Date</th>
                <th>Description</th>
                <th>Bank</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: "red", textAlign: "center" }} colSpan="3">
                  <h2 style={{ marginTop: "300px", marginBottom: "85px" }}>
                    Koneksi Terputus
                  </h2>
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

export default H2HMonitorUrl;
