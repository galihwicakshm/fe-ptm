import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import "./loginform.css";
import Back from "../../images/Back.png";
const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginUser = { email, password };
    axios
      .post("http://localhost:3000/api/v1/auth/login", loginUser)
      .then((response) => {
        setEmail("");
        setPassword("");
        Cookies.set("token", response.data.token);
        Cookies.set("role", response.data.role);
        if (response.data.token && response.data.role === "Admin") {
          navigate("/data/admin");
        } else {
          navigate("/tambah-table");
        }
      })
      .catch((error) => {
        setInvalid(error.response.data.message);
      });
  };
  return (
    <>
      <section className="login">
        <div className="login_box">
          <div className="left">
            <h3>Login</h3>
            <p className="invalid">{invalid}</p>
            <div className="contact">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="submit-login" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
