import React from "react";

// TODO: Find or make fitting button icons for nav-tabs

function Header({ currentPage, handlePageChange }) {
  return (
    <header>
      <ul className="nav-tabs">
        <li className="nav-item">
          <a
            href="#home"
            onClick={() => handlePageChange("Home")}
            className={currentPage === "Home" ? "nav-link active" : "nav-link"}
          >
            <img src="public\img\home-button.png" alt="logo button"></img>
          </a>
        </li>

        <li className="nav-item">
          <a
            href="#user-stats"
            onClick={() => handlePageChange("Stats")}
            className={currentPage === "Stats" ? "nav-link active" : "nav-link"}
          >
            Stats
          </a>
        </li>

        <li className="nav-item">
          <a
            href="#friends"
            onClick={() => handlePageChange("Friends")}
            className={
              currentPage === "Friends" ? "nav-link active" : "nav-link"
            }
          >
            Friends
          </a>
        </li>

        <li className="nav-item">
          <a
            href="#logout"
            onClick={() => handlePageChange("Logout")}
            className={
              currentPage === "Logout" ? "nav-link active" : "nav-link"
            }
          >
            Logout
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
