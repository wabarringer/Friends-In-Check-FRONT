import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./components/pages/Login/index";
import Signup from "./components/pages/Signup/index";
import Home from "./components/pages/Home/index";
import Footer from "./components/Footer";
import Game from "./components/chess/Game";
import "./styles/chess.css";

function App() {
  return (
    <body>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Game></Game>
        <Footer />
      </div>
    </body>
  );
}

export default App;
