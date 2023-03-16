import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Home/style.css";
import chessboardHomeHost from "../../../img/join-card02.png";
import chessboardHomeJoin from "../../../img/host-card02.png";
import ficLogo from "../../../img/friends-in-check-title-logo.png";

const Home = ({ roomId, isLoggedIn, socket, username }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Attach a user to their specified room key
  const [joinRoom, setJoinRoom] = useState("");

  const joinByRoomId = (e) => {
    e.preventDefault();
    const genId = Math.floor(Math.random() * 100000);
    socket.emit("join", { roomId, username });
    console.log("trying to update roomid", genId);
    navigate(`/room/${genId}`);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setJoinRoom(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(joinRoom);
    socket.emit("join", { roomId: joinRoom, username });
    navigate(`/room/${joinRoom}`);
  };

  return (
    <section>
      <div className="column">
        <div className="box">
          <img src={chessboardHomeHost} alt="close up view of a white king chess piece" />
          <div id="hostRoomDiv">
            <button onClick={joinByRoomId}>HOST A ROOM</button>
          </div>
        </div>

        <div className="box">
          <div>
            <img src={chessboardHomeJoin} alt="close up view of a black king chess piece" />
          </div>
          <div id="joinFormDiv">
            <form onSubmit={onSubmitHandler}>
              <input
                type="number"
                value={joinRoom}
                id="fname"
                placeholder="Room ID"
                onChange={handleInputChange}
              />
              <button type="submit">JOIN A ROOM</button>
            </form>
          </div>
        </div>
      </div>
      {/* <img id="ficLogo" src={ficLogo} alt="friends in check logo shield" /> */}
    </section>
  );
};

export default Home;
