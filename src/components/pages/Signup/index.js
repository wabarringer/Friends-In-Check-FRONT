import React, { useState } from "react";
import API from "../../../utils/API";
import "../Signup/style.css";

const Signup = (props) => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "signupEmail":
        setSignupEmail(value);
        break;
      case "signupUsername":
        setSignupUsername(value);
        break;
      case "signupPassword":
        setSignupPassword(value);
        break;
      default:
        break;
    }
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const signupObj = {
      email: signupEmail,
      username: signupUsername,
      password: signupPassword,
    };
    API.signup(signupObj).then((data) => {
      console.log(data);
      if (data.token) {
        props.setToken(data.token);
        props.setIsLoggedIn(true);
        props.setUserId(data.user.id);
      }
      localStorage.setItem("token", data.token);
      setSignupEmail("");
      setSignupUsername("");
      setSignupPassword("");
    });
  };
  return (
    <div className="Signup">
      <form onSubmit={handleSignupSubmit}>
        <input
          name="signupEmail"
          value={signupEmail}
          onChange={handleInputChange}
          placeholder="email"
        />
        <input
          name="signupUsername"
          value={signupUsername}
          onChange={handleInputChange}
          placeholder="username"
        />
        <input
          name="signupPassword"
          value={signupPassword}
          onChange={handleInputChange}
          placeholder="password"
          type="password"
        />
        <button>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
