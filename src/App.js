import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./components/pages/Login/index";
import Signup from "./components/pages/Signup/index";
import Home from "./components/pages/Home/index";
import Footer from "./components/Footer";
import Game from "./components/chess/Game";
import "./styles/chess.css";
import GameLogic from "./businessLogic/GameLogic";

var game1 = new GameLogic();
game1.initialize("Zazil", "W", webSocketHandler);
var game2 = new GameLogic();
game2.initialize("Val", "B", webSocketHandler);
var game3 = new GameLogic();
game3.initialize("Alice", "Expectator", webSocketHandler);

console.log("initialiaing ")

const webSocket = new WebSocket('ws://localhost:3011');

function webSocketHandler (event)
{
  //webSocket.send(event)
  // simullate that we are sending over the internet
  webSocket_onmessage({data:event})
}

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

webSocket.onmessage = webSocket_onmessage;

function webSocket_onmessage(event) {
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



function App() {
  return (
    <body>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
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

        <Footer />
      </div>
    </body>
  );
}


export default App;
