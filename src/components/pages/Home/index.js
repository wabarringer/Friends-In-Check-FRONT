import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ roomId }) => {
  return (
    <div>
      <Link to={`/room/${roomId}`}>
        <button>Host a Room</button>
      </Link>
      <button onClick={() => console.log("Join a Room")}>Join a Room</button>
    </div>
  );
};

export default Home;
