import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/API.js";

const Login = (props) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "loginEmail":
        setLoginEmail(value);
        break;
      case "loginPassword":
        setLoginPassword(value);
        break;
      default:
        break;
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const loginObj = {
      email: loginEmail,
      password: loginPassword,
    };
    API.login(loginObj).then((data) => {
      console.log(data);
      if (data.token) {
        props.setToken(data.token);
        props.setIsLoggedIn(true);
        props.setUserId(data.user.id);
      }
      localStorage.setItem("token", data.token);
      setLoginEmail("");
      setLoginPassword("");
    });
  };
  const navigate = useNavigate();
  const handleGoToSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="Login">
      <form onSubmit={handleLoginSubmit}>
        <input
          name="loginEmail"
          value={loginEmail}
          onChange={handleInputChange}
          placeholder="email"
        />
        <input
          name="loginPassword"
          value={loginPassword}
          onChange={handleInputChange}
          placeholder="password"
          type="password"
        />
        <button>Login</button>
      </form>
      <button onClick={handleGoToSignup}>Signup</button>
    </div>
  );
};

export default Login;
