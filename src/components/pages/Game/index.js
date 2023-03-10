import React from 'react';
import "../Game/style.css";


export default function Game() {
  return (
    <div className="column">
      <div className="left">
        <div className="component">
          <div className="opponent">
            <div className="" id="oppVideo">
              OPP VIDEO
            </div>
            <div id="oppPieces">
              OPP PIECES
            </div>
          </div>
        </div>
        <div className="component">
          <div className="user">
            <div className="" id="userVideo">
              user VIDEO
            </div>
            <div id="userPieces">
              user PIECES
            </div>
          </div>
        </div>
      </div>

      <div className="middle">
        <div className="container">
          <div id="timer">
            timer
          </div>
          <div className="container" id="chessboard">
            CHESSBOARD
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
}