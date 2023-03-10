import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./components/pages/Login/index";
import Signup from "./components/pages/Signup/index";
import Home from "./components/pages/Home/index";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/chess.css";
import MultiPlayerGame from "./components/chess/MultiPlayerGame";
import Game from "./components/pages/Game/index";

function App() {
  return (
    <body>
      <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
        {/* <MultiPlayerGame></MultiPlayerGame> */}
        <Footer />
    </body>
  );
}

export default App;
