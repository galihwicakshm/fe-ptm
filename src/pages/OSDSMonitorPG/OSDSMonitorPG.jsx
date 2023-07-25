import React from "react";
import OSDSMonitor from "../../components/OSDSMonitor/OSDSMonitor";
import OSDSGetURL from "../../components/OSDSGetURL/OSDSGetURL";
import "./osdsmonitorpg.css";
const OSDSMonitorPG = () => {
  return (
    <>
      <div className="osds-monitor-table">
        <OSDSGetURL></OSDSGetURL>
      </div>
    </>
  );
};

export default OSDSMonitorPG;
