import ChessLogic from "./ChessLogic";
import BoardSetup from "./BoardSetup";
import Piece from "./Piece";
import io from "socket.io-client";
const boardsetup = new BoardSetup();

// AB: Connect socket ==================================================
const socket = io.connect("http://localhost:3002");
// =====================================================================

class GameLogic {
  initialize() {
    this.chessLogic = new ChessLogic();
    this.log = true;
    this.squares = []; // contains the list of square indexes where selected piece is allowed to move
    for (var i = 0; i < 64; i++) {
      this.squares.push({
        index: i,
        piece: null,
        isHighlighted: false,
        onClick: (index) => this.onSquareClicked(index),
      });
    }
    this.setupBoard();
  }

  setupBoard() {
    boardsetup.initialGame(this.squares);
    //boardsetup.singlePiece(this.squares)
    //boardsetup.singlePiece1(this.squares)
    //boardsetup.singlePiece2(this.squares)
    //boardsetup.singlePiece3(this.squares)

    this.resetGame();
  }

  resetGame() {
    this.currentGameState = {
      playerColor: "W",
      isGameOver: false,
      isDraw: false,
      isWhiteWin: false,
      selectedPiece: null,
      selectedSquare: null,
      allowedSquares: [],
    };
  }

  // index is the index of the square being clicked
  onSquareClicked(index) {
    var square = this.squares[index];
    this.log &&
      console.log(
        `onSquareClicked(${index})`,
        `current player:${this.currentGameState.playerColor}`,
        `square.piece`,
        square.piece,
        `allowed squares`,
        this.currentGameState.allowedSquares
      );

    // if an empty square was clicked ...
    if (!square.piece) {
      // and there is a piece currently selected ...
      if (this.currentGameState.selectedPiece) {
        // and target is in a list of allowed moves
        if (this.currentGameState.allowedSquares.indexOf(index) > -1) {
          // then move piece to target
          this.onPieceMoved(square);
        } else {
          // otherwise unselect piece
          this.onPieceUnselected();
        }
      }
      // finish move
      return;
    }

    // there is a piece in the targeted square ...
    var piece = square.piece;
    if (
      !this.currentGameState.selectedPiece &&
      this.currentGameState.playerColor != piece.color
    ) {
      return;
    }

    // if the piece on the target square is of the same color
    if (this.currentGameState.playerColor == piece.color) {
      // select that other piece instead
      this.onPieceSelected(square, piece, index);
    } else {
      // otherwise (target piece is of different color), capture the target piece
      if (this.currentGameState.allowedSquares.indexOf(index) == -1) {
        // if the square is not allowed to move into the finish
        return;
      }
      this.onPieceCaptured(square, piece);
    }

    // finish move
  }

  onPieceCaptured(square, piece) {
    console.log("piece captured");
    this.onPieceMoved(square);
  }
  // onPiecermoved(oldSquare, newSquare)

  // AB: FOR SOCKET ONLY - need to find piece on old square and move to new square for other player
  movePiece(oldSquare, newSquare) {}
  // ==============================================================================================

  onPieceMoved(square) {
    console.log("===============");
    console.log(square);

    // AB: emit to socket backend attempt==========================================================
    console.log(this.currentGameState.selectedSquare);
    this.currentGameState.targetSquare = square;

    socket.emit("Move_Piece", {
      oldSquare: this.currentGameState.selectedSquare.index,
      newSquare: square.index,
    });
    // ==============================================================================================

    console.log("piece moved");
    this.currentGameState.selectedSquare.piece = null;
    square.piece = this.currentGameState.selectedPiece;
    this.onPieceUnselected();
    this.onChangeTurn();
    this.updateState();
  }

  onChangeTurn() {
    this.currentGameState.playerColor =
      this.currentGameState.playerColor == "W" ? "B" : "W";
  }

  onPieceSelected(square, piece, index) {
    if (this.selectedPiece) {
      this.onPieceUnselected();
    }

    this.currentGameState.selectedPiece = piece;
    this.currentGameState.selectedSquare = square;
    console.log("piece selected");
    square.isHighlighted = true;

    // this is where we need to calculate the allowed moves
    //this.currentGameState.allowedSquares = [index + 1, index + 8, index + 16]
    this.currentGameState.allowedSquares = this.chessLogic.getAllowedMoves(
      piece.type,
      piece.color,
      this.squares,
      index
    );
    this.updateState();
    this.log &&
      console.log(
        `onSquareClicked(${index})`,
        `current player:${this.currentGameState.playerColor}`,
        `square.piece`,
        square.piece,
        `allowed squares`,
        this.currentGameState.allowedSquares
      );
  }

  onPieceUnselected() {
    this.currentGameState.selectedSquare.isHighlighted = false;
    this.currentGameState.selectedPiece = null;
    this.currentGameState.selectedSquare = null;
    this.currentGameState.allowedSquares = [];
    this.updateState();
  }

  updateState() {
    var squares = [];
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i].isHighlighted =
        this.currentGameState.allowedSquares.indexOf(i) > -1;
      squares.push(this.squares[i]);
    }
    //console.log("squares",squares)
    this.setGameState(squares);
  }
}

export default GameLogic;
