import React from 'react';
import "../Game/style.css";


export default function Game() {
  return (
    <div className="column">
      <div className="left">
        <div className="container" id="oppVideo">
          OPPONENT VIDEO
        </div>
        <div className="container" id="oppPieces">
          OPPONENT PIECES
        </div>
        <div className="container" id="userVideo">
          USER VIDEO
        </div>
        <div className="container" id="userPieces">
          USER PIECES
        </div>
      </div>

      <div className="middle">
        <div className="container" id="timer">
          TIMER
        </div>
        <div className="container" id="chessboard">
          CHESSBOARD
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
}