import React, { useState, useEffect } from "react";
import axios from "axios";
import "./h2hbankurl.css";
const H2HUrl = () => {
  const [tableData, setTableData] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5501/index.html")
      .then((response) => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(response.data, "text/html");
        const tableElement = htmlDocument.querySelector("table");
        console.log(htmlDocument);
        tableElement.className = "content-h2h-bank";
        // Get all tr elements in the table
        // const trElements = tableElement.querySelectorAll("tr");

        // Apply background based on condition
        // trElements.forEach((tr) => {
        //   const countryElement = tr.querySelector("td:nth-child(2)");
        //   if (countryElement && countryElement.textContent === "Invalid") {
        //     tr.style.backgroundColor = "red";
        //   }
        // });

        setTableData(tableElement.outerHTML);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="h2h-bank" dangerouslySetInnerHTML={{ __html: tableData }} />
  );
};

export default H2HUrl;
