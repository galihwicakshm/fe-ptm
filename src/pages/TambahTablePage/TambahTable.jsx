import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import Table from "../../components/TambahTable/TambahTable";

import "./tambahtable.css";
const TambahTable = () => {
  return (
    <div className="tambah-table">
      <Table />
    </div>
  );
};

export default TambahTable;
