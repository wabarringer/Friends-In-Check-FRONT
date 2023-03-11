import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  const [roomId, setRoomId] = useState("");

  const handleHost = (event) => {
    event.preventDefault();
    // Generate a random room ID
    const roomId = Math.floor(Math.random() * 100000);
    console.log(roomId);
    setRoomId(roomId);
  };

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
