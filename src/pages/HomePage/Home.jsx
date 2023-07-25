import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import ERPTable from "../../components/ERPTable/ERPTable";
import OSDSMonitor from "../../components/OSDSMonitor/OSDSMonitor";
import H2HBank from "../../components/H2HBank/H2HBank";
import H2HMonitor from "../../components/H2HMonitor/H2HMonitor";
import NonERPTable from "../../components/NonERPTable/NonERPTable";
import OSDSUrl from "../../components/OSDSGetURL/OSDSGetURL";
import H2HMonitorUrl from "../../components/H2HMonitorURL/H2HMonitorURL";
const Home = () => {
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     window.location.reload();
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <>
      <div className="container" style={{ marginTop: "30px" }}>
        <h3
          className="title-main"
          style={{
            textAlign: "center",
            marginBottom: "70px",
          }}
        >
          ERP & Non ERP Systems Monitoring
        </h3>
        <div className="row">
          <div className="container-all">
            {data < 1 ? (
              <div>
                <div
                  className="title-system-down"
                  style={{
                    position: "absolute",
                    top: "11.5%",
                    left: "9%",
                    fontWeight: "bold",
                  }}
                >
                  System Availability
                </div>
                <table style={{ marginRight: "20px" }}>
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
                <div className="title-system">System Availability</div>
                <ERPTable></ERPTable>
                <NonERPTable></NonERPTable>
              </>
            )}

            <div className="table-osds">
              <div className="title-osds">OSDS Monitor</div>
              <OSDSUrl></OSDSUrl>
            </div>
            <div className="h2h-monitors">
              <div className="title-h2h">H2H Monitor</div>
              <H2HMonitorUrl></H2HMonitorUrl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
