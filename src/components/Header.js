import React from "react";
import homeButtonLogo from "../img/home-button.png";
import statsButtonLogo from "../img/stats-button.png";
import friendsButtonLogo from "../img/friends-button.png";
import logoutButtonLogo from "../img/logout-button.png";
import "../index.css";

// TODO: Find or make fitting button icons for nav-tabs

function Header({ currentPage, handlePageChange }) {
  return (
    <header>
      <ul className="nav-tabs">
        <li className="nav-item">
          <a
            href="home"
            onClick={() => handlePageChange("Home")}
            className={currentPage === "Home" ? "nav-link active" : "nav-link"}
          >
            <img src={homeButtonLogo} alt="home button" />
          </a>
        </li>

        <li className="nav-item">
          <a
            href="#user-stats"
            onClick={() => handlePageChange("Stats")}
            className={currentPage === "Stats" ? "nav-link active" : "nav-link"}
          >
            <img src={statsButtonLogo} alt="stats button" />
          </a>
        </li>

        <li className="nav-item">
          <a
            href="friends"
            onClick={() => handlePageChange("Friends")}
            className={
              currentPage === "Friends" ? "nav-link active" : "nav-link"
            }
          >
            <img src={friendsButtonLogo} alt="friends button" />
          </a>
        </li>

        <li className="nav-item">
          <a
            href="logout"
            onClick={() => handlePageChange("Logout")}
            className={
              currentPage === "Logout" ? "nav-link active" : "nav-link"
            }
          >
            <img src={logoutButtonLogo} alt="friends button" />
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
