import React from "react";
import homeButtonLogo from "../img/home-button.png";
import statsButtonLogo from "../img/stats-button.png";
import friendsButtonLogo from "../img/friends-button.png";
import logoutButtonLogo from "../img/logout-button.png";
import "../index.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <ul className="nav-tabs">
        <li className="nav-item">
          <Link to="/">
            <img src={homeButtonLogo} alt="home button" />
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/profile">
            <img src={statsButtonLogo} alt="stats button" />
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/friends">
            <img src={friendsButtonLogo} alt="friends button" />
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/logout">
            <img src={logoutButtonLogo} alt="friends button" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
