import React, {  useEffect} from "react";

import './App.css';
import Home from "./pages/HomePage/Home"
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TableERPandNon from './pages/TableERP&NonPage/TableERPandNon';
import OSDSMonitorPG from './pages/OSDSMonitorPG/OSDSMonitorPG';
import H2HMonitor from './pages/H2HMonitor/H2HMonitorPG';
import TambahTable from './pages/TambahTablePage/TambahTable';
import ManageTable from './pages/ManageTablePage/ManageTable';
import TambahDetailTable from './pages/TambahHostnamePage/TambahDetailTable';
import LoginPage from './pages/LoginPage/LoginPage';
import UpdateDetailTable from './pages/UpdateDetailTablePage/UpdateDetailTable';
import SuperAdmin from "./pages/SuperAdminPage/SuperAdminPage"
import ManagementUserPage from './pages/ManagementUserPage/ManagementUserPage';
import UpdateUserPage from './pages/UpdateUserPage/UpdateUserPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage/UpdatePasswordPage';
function App() {
 

  return (
   
    <Router>

      <Navbar/>
      <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/table-erp-dan-non" element={<TableERPandNon/>} />
              <Route path="/osds-monitor" element={<OSDSMonitorPG/>} />
              <Route path="/h2h-monitor" element={<H2HMonitor/>} />
              <Route path="/tambah-table" element={<TambahTable/>} />
              <Route path="/management-table" element={<ManageTable/>} />
              <Route path="/auth/login-page" element={<LoginPage/>} />
              <Route path="/management-table/:id" element={<TambahDetailTable/>} />
              <Route path="/management-table/update/:id" element={<UpdateDetailTable/>} />
              <Route path="/data/admin" element={<SuperAdmin/>} />
              <Route path="/management-user" element={<ManagementUserPage/>} />
              <Route path="/management-user/:id" element={<UpdateUserPage/>} />
              <Route path="/management-user/password/:uuid" element={<UpdatePasswordPage/>} />
      </Routes>
    </Router>
      );
}

export default App;
