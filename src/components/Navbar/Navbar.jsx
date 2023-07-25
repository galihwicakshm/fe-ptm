import React, { useEffect, useState } from "react";
import "./navbar.css";
import Logo from "../../images/Pertamina.png";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Hamburger from "../Hamburger/Hamburger";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleSidebarOpen() {
    setIsSidebarOpen(true);
  }

  function handleSidebarClose() {
    setIsSidebarOpen(false);
  }

  return (
    <nav className="nav" style={{ marginBottom: "30px" }}>
      <div>
        <Sidebar />
      </div>
    </nav>
  );
};
export default Navbar;
