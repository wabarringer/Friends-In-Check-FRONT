import { useParams } from "react-router-dom";
import "../../../styles/chess.css";
import MultiPlayerGame from "../../chess/MultiPlayerGame";
import io from "socket.io-client";

const Room = () => {
  const { roomId } = useParams();
  // Connect to the server using Socket.io
  const socket = io("http://localhost:3002");
  // Emit a "host" event to the server with the room ID
  socket.emit("host", roomId);
  console.log(roomId);

  return (
    <main>
      <div>
        <MultiPlayerGame roomId={roomId} />
      </div>
    </main>
  );
};

export default Room;
