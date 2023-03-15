import io from "socket.io-client";
import GameLogic from "./GameLogic";

class MultiPlayerLogic {
  initialize(roomId, color, playerId) {
    this.roomId = roomId;
    this.playerId = playerId;
    this.game1 = new GameLogic();
    this.game1.initialize(playerId, color, this.onMovePieceHandler);
    //var game2 = new GameLogic();
    //game2.initialize("Val", "B", messageHandler);
    //console.log("multiplayerlogic initialized",this.game1)
  }

  // this function tells the server that a piece was moved
  onMovePieceHandler(event) {
    event.roomId = this.roomId;
    socket.emit("message", event);

    // enable this line if you want to  simulate that we are sending over the internet but instead sending the event
    // directly to the other boards on the same browser
    //onmessageReceived(event)
  }

  // this function handles the server telling us that a piece was moved by the other player
  onHandlePieceMoved(state) {
    console.log(
      "received",
      state.originPlayer,
      this.game1.playerId
      //this.game2.playerId
    );
    const gamesToUpdate = []; // if we have multiple games in the browser for testing reasons we want to update all
    if (this.game1.playerId == state.originPlayer) {
      // update board of player 2 if the move was made by player 1
      //gamesToUpdate.push(this.game2);
    } else {
      // else, update board of player 1 if the move was made by player 2
      gamesToUpdate.push(this.game1);
    }

    // always update the expectator
    //gamesToUpdate.push(game3);

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

  // this function asks the server to let us join a room
  joinRoom(roomId) {
    socket.emit("join_room", {
      roomId: roomId,
      playerId: this.playerId,
    });
  }

  // this function handles the server allowing us to join the room
  onHandleJoinRoom(room) {
    console.log("received room updates", room);
    if (room.roomId != this.roomId) {
      // if this player (us) was added to this room, we need to update our room id
      if (room.host == this.playerId || room.guest == this.playerId) {
        this.roomId = room.roomId;
        this.color =
          room.host == this.playerId ? room.hostColor : room.guestColor;
        this.game1.initialize(
          this.playerId,
          this.color,
          this.onMovePieceHandler
        );
        this.game1.updateState();
        this.game1.forceUpdateScoreBoard();
      }
      return;
    }
  }

  setPlayerId(playerId) {
    if (this.playerId != playerId) {
      this.game1.setPlayerId(playerId);
      this.playerId = playerId;
    }
  }

  resetGame() {
    var data = {
      roomId: this.roomId,
      playerId: this.playerId,
    };
    socket.emit("resetGame", data);
    console.log("sending resetGame to server", data);
  }

  onHandleResetGame(room) {
    if (room.roomId == this.roomId) {
      console.log("received reset game", room);
      // if this player (us) was added to this room, we need to update our room id
      if (room.host == this.playerId || room.guest == this.playerId) {
        console.log("reseting game", room);
        this.roomId = room.roomId;
        this.color =
          room.host == this.playerId ? room.hostColor : room.guestColor;
        this.game1.initialize(
          this.playerId,
          this.color,
          this.onMovePieceHandler
        );
        this.game1.updateState();
        this.game1.forceUpdateScoreBoard();
      }
      return;
    }
  }
}

const multiplayerLogic = new MultiPlayerLogic();
multiplayerLogic.initialize(0, "W", "player1");
console.log("after initialize", multiplayerLogic.game1);
// live
// const socket = io("https://fic-socket.herokuapp.com");

// for localhost testing
const socket = io("http://localhost:3002");

socket.on("broadcastMove", (e) => multiplayerLogic.onHandlePieceMoved(e));
socket.on("broadcastRoom", (e) => multiplayerLogic.onHandleJoinRoom(e));
socket.on("broadcastResetGame", (e) => multiplayerLogic.onHandleResetGame(e));

export default multiplayerLogic;
