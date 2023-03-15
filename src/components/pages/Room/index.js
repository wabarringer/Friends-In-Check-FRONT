import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../../styles/chess.css";
import MultiPlayerGame from "../../chess/MultiPlayerGame";

import "../Room/style.css";

const Room = ({ socket, username }) => {
  const { roomId } = useParams();
  console.log(roomId);
  // Emit a join event to the server when a user joins a room on component mount
  useEffect(() => {
    socket.emit("in-room", roomId);
    socket.on("user array", (receivedArr) => {
      console.log(receivedArr);
    });
  }, []);

  const [msgInputted, setMsgInputted] = useState("");
  const [messages, setMessages] = useState([]);

  //   returning messages are sent with the event "return-message". We then use the spread op "..." to copy the array so we can map over it with our new message.
  socket.on("return-message", (newMsg) => {
    setMessages([...messages, newMsg]);
  });

  socket.on("user-joined", (userFromSocket) => {
    console.log(`${userFromSocket} has joined the room`);
  });

  //   form control
  const handleChatInput = (e) => {
    e.preventDefault();
    setMsgInputted(e.target.value);
  };

  //   emitting the event "send-message" with our username and message from form below
  const sendMsg = (e) => {
    e.preventDefault();
    socket.emit("send-message", {
      username: username,
      message: msgInputted,
    });
    console.log(msgInputted);
    setMessages([...messages, `You: ${msgInputted}`]);
  };

  return (
    <section>
      <div className="column">
        <div className="leftContainer">
          <div className="component">
            <div className="room-id">
              <h3>Room ID: {roomId}</h3>
            </div>
            <div className="mobileComp">
              <div id="userDiv">
                <div id="user">
                  <p>username</p>
                  <div id="userVideo">
                    user video
                  </div>
                  <div id="userPieces">
                    user pieces captured
                  </div>
                </div>
              </div>
              <div id="oppDiv">
                <div id="opponent">
                  <p>opponent username</p>
                  <div id="oppVideo">
                    opp video
                  </div>
                  <div id="oppPieces">
                  opp pieces captured
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="middleContainer">
          <div className="mainComponent">
            {/* <div id="timer">timer</div> */}
            <div id="chessboard">
              <MultiPlayerGame roomId={roomId} username={username} />
            </div>
          </div>
        </div>

        <div className="rightContainer">
          <div className="component">
            <div id="chatWindow">
              {/* map over state arr to show messages on page */}
              {messages.map((msg) => (
                <p>{msg}</p>
              ))}
            </div>
            <div id="chatBox">
              {/* form to send message */}
              <form onSubmit={sendMsg}>
                <input
                  type="text"
                  placeholder="chat with your opponent"
                  onChange={handleChatInput}
                  value={msgInputted}
                ></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Room;
