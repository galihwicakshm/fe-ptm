import React, { useState } from "react";
import "./sidebar.css";
import Logo from "../../images/Pertamina.png";

import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (event) => {
    const dropdown = event.currentTarget.nextElementSibling;
    dropdown.classList.toggle("show");
  };

  return (
    <>
      <div className={`sidebar sidebar-overlay ${isOpen ? "open" : ""}`}></div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
        </div>
        <button className="sidebar-close-btn" onClick={toggleSidebar}>
          X
        </button>
        <div className="sidebar-content">
          <li>
            <Link to="tambah-table">Management</Link>
          </li>
          <li>
            <Link to="/">All Monitor</Link>
          </li>
          <li>
            <Link to="/table-erp-dan-non">Monitor ERP dan Non ERP</Link>
          </li>
          <li>
            <Link to="/osds-monitor">Monitor OSDS</Link>
          </li>
          <li>
            <Link to="/h2h-monitor">Monitor H2H</Link>
          </li>
          <li>
            <div className="dropdown">
              <a href="#" onClick={toggleDropdown}>
                Link
              </a>
              <div className="dropdown-content">
                <a href="#">OSDS Monitor</a>
                <a href="#">H2H Monitor</a>
              </div>
            </div>
          </li>
        </div>
      </div>
      <button className="sidebar-trigger-btn" onClick={toggleSidebar}>
        ☰
      </button>
    </>
  );
};

export default Sidebar;
