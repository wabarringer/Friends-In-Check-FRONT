import { useParams } from "react-router-dom";
import "../../../styles/chess.css";
import MultiPlayerGame from "../../chess/MultiPlayerGame";
import io from "socket.io-client";
import "../Room/style.css";

const Room = () => {
  const { roomId } = useParams();
  const { username } = useParams();
  // 1) Connect to the server using Socket.io
  const socket = io("http://localhost:3002");
  // 2) Emit a "host" event to the server with the room ID
  socket.emit("host", { roomId, username });
  // 3) Emit a join event to the server when a user joins a room
  socket.emit("join", { roomId, username });
  // 3) Listen for the user-joined event when a new user joins the room
  socket.on("user-joined", ({ username }) => {
    console.log(`${username} has joined the room`);
  });

  return (
    <div className="column">
      <div className="left">
        <div className="component">
          <div className="opponent">
            <div className="room-id">{roomId}</div>
            <div className="" id="oppVideo">
              OPP VIDEO
            </div>
            <div id="oppPieces">OPP PIECES</div>
          </div>
        </div>
        <div className="component">
          <div className="user">
            <div className="" id="userVideo">
              user VIDEO
            </div>
            <div id="userPieces">user PIECES</div>
          </div>
        </div>
      </div>

      <div className="middle">
        <div className="container">
          <div id="timer">timer</div>
          <div className="container" id="chessboard">
            <MultiPlayerGame roomId={roomId} />
          </div>
        </div>
      </div>

      <div className="right">
        <div className="container" id="chatWindow">
          CHAT WINDOW
        </div>
        <div className="container" id="chatBox">
          CHAT BOX
        </div>
      </div>
    </div>
  );
};

export default Room;
