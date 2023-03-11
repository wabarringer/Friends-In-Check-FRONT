import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Home = ({ roomId }) => {
  return (
    <section>
      <div className="column">
        <div className="box">
          <Link to={`/room/${roomId}`}>
          <button onClick={handleHost}>Host a Room</button>
        </Link>
        </div>
        
        <div className="box">
          <button onClick={() => console.log("Join a Room")}>Join a Room</button>
        </div>
      </div>  
    </section>
  );
};

export default Home;
