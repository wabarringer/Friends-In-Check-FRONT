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
    socket.emit("join_room", roomId);
    socket.on("user array", (receivedArr) => {
      console.log(receivedArr);
    });
  }, []);

  socket.on("user-joined", (userFromSocket) => {
    console.log(`${userFromSocket} has joined the room`);
  });

  const [msgInputted, setMsgInputted] = useState("");
  const [messages, setMessages] = useState([]);

  //   form control
  const handleChatInput = (e) => {
    e.preventDefault();
    setMsgInputted(e.target.value);
  };

  //   emitting the event "send-message" with our username and message from form below
  const sendMsg = (e) => {
    e.preventDefault();
    socket.emit("send_message", {
      room: roomId,
      username: username,
      message: msgInputted,
    });
    console.log(username);
    console.log(msgInputted);
    setMsgInputted("");
  };

  socket.on("received_message", (newMsg) => {
    const renNewMsg = newMsg.split(":");
    console.log(renNewMsg);
    if (renNewMsg[0] === username) {
      return setMessages([...messages, `You: ${renNewMsg[1]}`]);
    }
    setMessages([...messages, newMsg]);
  });

  const [userStream, setUserStream] = useState(null);
  const [oppStream, setOppStream] = useState(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setUserStream(stream);
        const videoElement = document.createElement("video");
        videoElement.srcObject = stream;
        videoElement.play();
        const videoGrid = document.getElementById("userVideo");
        videoGrid.appendChild(videoElement);

        // Emit the user's stream to the server so that other users can display it on their video-grid element
        socket.emit("user-stream", stream, roomId);
      } catch (err) {
        console.log(err);
      }
    };
    getUserMedia();

    // Set up a socket listener for when another user joins the room and add their video element to the video-grid div
    socket.on("user-connected", (stream) => {
      setOppStream(stream);
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      videoElement.play();
      const videoGrid = document.getElementById("oppVideo");
      videoGrid.appendChild(videoElement);
    });
  }, []);

  return (
    <section>
      <div className="column">
        <div id="roomDiv">
          <div className="leftContainer">
            <div className="component">
              <div className="room-id">
                <h3>Room ID: {roomId}</h3>
              </div>
              <div className="mobileComp">
                <div id="userDiv">
                  <div id="user">
                    <p>{username}</p>
                    <div id="userVideo">user video</div>
                    <div id="userPieces">user pieces captured</div>
                  </div>
                </div>
                <div id="oppDiv">
                  <div id="opponent">
                    <p>oppUser</p>
                    <div id="oppVideo">opp video</div>
                    <div id="oppPieces">opp pieces captured</div>
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
                    placeholder="chat"
                    onChange={handleChatInput}
                    value={msgInputted}
                  ></input>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Room;
