import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/pages/Login/index";
import Signup from "./components/pages/Signup/index";
import Home from "./components/pages/Home/index";
import Footer from "./components/Footer";
import Room from "./components/pages/Room/index";
import Profile from "./components/pages/Profile/index";
import Friends from "./components/pages/Friends/index";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
