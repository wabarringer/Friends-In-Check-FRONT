import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <Link to={`/room/${roomId}`}>
        <button onClick={handleHost}>Host a Room</button>
      </Link>
      <button onClick={() => console.log("Join a Room")}>Join a Room</button>
    </div>
  );
};

export default Home;
