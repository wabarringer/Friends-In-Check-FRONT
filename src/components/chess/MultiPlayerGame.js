import React from "react";
import Game from "./Game";
import "../../styles/chess.css";
import ScoreBoard from "./ScoreBoard";
import MultiplayerLogic from "../../businessLogic/MultiplayerLogic";

function MultiPlayerGame({ roomId, username }) {
  //console.log("is socket populated?")
  console.log(username);
  if (MultiplayerLogic.roomId != roomId) {
    MultiplayerLogic.setPlayerId(username);
    MultiplayerLogic.joinRoom(roomId);
  }

  return (
    <div className="multiPlayerGameDiv">
      <ScoreBoard
        currentScoreBoard={MultiplayerLogic.game1.currentGameState}
        scoreBoardSetter={(setScoreBoard) =>
          (MultiplayerLogic.game1.setScoreBoard = setScoreBoard)
        }
      ></ScoreBoard>
      <Game
        playerId={MultiplayerLogic.game1.playerId}
        squares={MultiplayerLogic.game1.squares}
        gameStateSetter={(setGameState) =>
          (MultiplayerLogic.game1.setGameState = setGameState)
        }
      ></Game>
      <div id="resetButtonDiv">
        <button id="resetButton" onClick={(i) => MultiplayerLogic.resetGame()}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default MultiPlayerGame;
