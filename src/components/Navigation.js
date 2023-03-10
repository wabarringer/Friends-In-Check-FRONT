import React, { useState } from "react";
import Header from "./Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Game from "./pages/Game";

function Navigation() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    if (currentPage === "Login") {
      return <Login />;
    }
    if (currentPage === "Signup") {
      return <Signup />;
    }
    // if (currentPage === "Home") {
    //   return <Home />;
    // }
    if (currentPage === "Game") {
      return <Game />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <Header currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
    </div>
  );
}

export default Navigation;
