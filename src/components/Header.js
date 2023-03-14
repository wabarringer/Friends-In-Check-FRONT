import React from "react";
import homeButtonLogo from "../img/home-button.png";
import statsButtonLogo from "../img/stats-button.png";
import friendsButtonLogo from "../img/friends-button.png";
import logoutButtonLogo from "../img/logout-button.png";
import messagesButtonLogo from "../img/messages-button.png";
import "../index.css";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <ul className="nav-tabs">
        <li className="nav-item">
          {props.isLoggedIn ? (
            <Link to="/messages">
              <img src={messagesButtonLogo} alt="messages button" />
            </Link>
          ) : (
            <Link to="/login"></Link>
          )}
        </li>

        <li className="nav-item">
          {props.isLoggedIn ? (
            <Link to="/friends">
              <img src={friendsButtonLogo} alt="friends button" />
            </Link>
          ) : (
            <Link to="/login"></Link>
          )}
        </li>

        <li className="nav-item">
          <Link to="/home">
            <img src={homeButtonLogo} alt="home button" id="home-button" />
          </Link>
        </li>

        <li className="nav-item">
          {props.isLoggedIn ? (
            <Link to="/profile">
              <img src={statsButtonLogo} alt="profile button" />
            </Link>
          ) : (
            <Link to="/login"></Link>
          )}
        </li>

        <li className="nav-item">
          {props.isLoggedIn ? (
            <Link onClick={props.logout}>
              <img src={logoutButtonLogo} alt="logout button" />
            </Link>
          ) : (
            <Link to="/login"></Link>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
