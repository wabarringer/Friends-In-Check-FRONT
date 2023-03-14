import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../utils/API.js';
import '../Login/style.css';

const Login = (props) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

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
      // console.log(data);
      if (data.token) {
        props.setToken(data.token);
        props.setIsLoggedIn(true);
        props.setUserId(data.user.id);
      } else {
        alert("Incorrect email address or password!")
      }
      localStorage.setItem("token", data.token);
      setLoginEmail("");
      setLoginPassword("");
      return navigate("/")
    });
  };

  const handleGoToSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <section>
      <div className="column">
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
            {/* TODO: ADD HANDLE TO GO TO HOME */}
            <button>LOGIN</button>
          </form>
          
          <div id="createAcct">
            <button onClick={handleGoToSignup}>CREATE AN ACCOUNT</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
