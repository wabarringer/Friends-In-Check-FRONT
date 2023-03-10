import React from "react";
import Game from "./Game";
import "../../styles/chess.css";
import GameLogic from "../../businessLogic/GameLogic";
import ScoreBoard from "./ScoreBoard";


console.log("initialiaing ")

/*
this is only an example of how to communicate with another player's client via webSockets. 
1. we define a web socket at port 3011 for a server running under our dev machines (localhost)
2. we define a helper function called messageHandler that receives an event from GameLogic.cs and forwards it to 
the websocket server.
3. we hook the helper function to the actual webSocket by the command
    webSocket.onmessage = onmessageReceived;
4. each GameLogic instance must have a messageHandler passed into so that it can handle messages.

Plese note that to replace with socket.io you only have to change the secions A) and B) below. Do NOT change the function names.

*/

// A) web socket initialization
const webSocket = new WebSocket('ws://localhost:3011');
webSocket.onmessage = onmessageReceived;


function messageHandler (event)
{
  // B) this line is specific to communication via webSockets. Replace with socket.in if needed.
  webSocket.send(event)

  //
  // enable this line if you want to  simulate that we are sending over the internet but instead sending the event
  // directly to the other boards on the same browser
  //webSocket_onmessage({data:event})
}
var game1 = new GameLogic();
game1.initialize("Zazil", "W", messageHandler);
var game2 = new GameLogic();
game2.initialize("Val", "B", messageHandler);
var game3 = new GameLogic();
game3.initialize("Alice", "Expectator", messageHandler);

/*
 this is the code for handling messages via webSocket
 event contains the format:
 message = { 
          event: "move",
          originPlayer: "playerId",
          originSquare: "square where the piece was",
          targetSquare: "square where the piece moves to",
          piece: "information about the piece that was moved",
        };
this message will be passed to GameLogic to the onSquareClicked
*/


function onmessageReceived(event) {
  //console.log("received", event, "setGameState", game1.setGameState)

  if (event.data[0] == "{") { // ignoring events that are not moves; e.g. "connection messages"
    var state = JSON.parse(event.data); // we deserialize the message which comes in the data property
    console.log("received", state.originPlayer,game1.playerId,game2.playerId)
    const gamesToUpdate = []; // if we have multiple games in the browser for testing reasons we want to update all
    if (game1.playerId == state.originPlayer) {
      // update board of player 2 if the move was made by player 1
      gamesToUpdate.push(game2);
    } else {
      // else, update board of player 1 if the move was made by player 2
      gamesToUpdate.push(game1);
    }

    // always update the expectator
    gamesToUpdate.push(game3);

    // here we update all the necessary games
    // this is helpful if we add a third board that is an expectator
    for (var i = 0; i < gamesToUpdate.length; i++) {
      const gameToUpdate = gamesToUpdate[i]; // get one of the boards
      gameToUpdate.setPassiveMode(true); // set a flag that indicates that we are applying a move from the other player
      gameToUpdate.onSquareClicked(state.originSquare); // we click the piece first to calculate the allowed moves
      gameToUpdate.onSquareClicked(state.targetSquare); // we then click the target square to move the piece to it, note that we assume that the move was legal
      gameToUpdate.setPassiveMode(false); // we remove the flag, so that we are done propagating the move from the other player
    }
  }
};



function MultiPlayerGame() {
  return (
      <div>
        <ScoreBoard
        currentScoreBoard={game1.currentGameState}
        scoreBoardSetter={(setScoreBoard) => game1.setScoreBoard = setScoreBoard}
        ></ScoreBoard>

        <Game 
        playerId={game1.playerId}
        squares={game1.squares} 
        gameStateSetter={(setGameState) => game1.setGameState = setGameState}></Game> 
        
      <Game 
        playerId={game2.playerId}
        squares={game2.squares} 
        gameStateSetter={(setGameState) => game2.setGameState = setGameState}></Game> 

      <Game 
        playerId={game3.playerId}
        squares={game3.squares} 
        gameStateSetter={(setGameState) => game3.setGameState = setGameState}></Game> 

      </div>
  );
}

export default MultiPlayerGame;
