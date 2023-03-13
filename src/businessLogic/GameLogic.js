import ChessLogic from "./ChessLogic";
import BoardSetup from "./BoardSetup";
import Piece from "./Piece";
const boardsetup = new BoardSetup();

class GameLogic {
  initialize(playerId, playerColor, webSocketHandler) {
    this.playerId = playerId;
    this.playerColor = playerColor;
    this.webSocketHandler = webSocketHandler;
    this.chessLogic = new ChessLogic();
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
    //boardsetup.pawnPromotion(this.squares);
    //boardsetup.singlePiece(this.squares)
    //boardsetup.singlePiece1(this.squares)
    //boardsetup.singlePiece2(this.squares)
    //boardsetup.singlePiece3(this.squares)
      //boardsetup.whitemate(this.squares)
      //boardsetup.blackmate(this.squares)

      //boardsetup.queenProtectingKing(this.squares)

    this.resetGame();
  }

  resetGame() {
    this.currentGameState = {
      playerId: this.playerId,
      playerColor: this.playerColor,
      currentColorTurn: "W",
      isGameOver: false,
      isDraw: false,
      isWhiteWin: false,
      selectedPiece: null,
      selectedSquare: null,
      allowedSquares: [],
    };
  }

  log(p1, p2, p3, p4, p5, p6, p7) {
    if (this.logEnabled && this.processingMessage) {
      console.log(this.playerId, p1, p2, p3, p4, p5, p6, p7);
    }
  }

  setPassiveMode(value) {
    this.processingMessage = value;
  }

  onFinishMove(message) {
    this.currentGameState.currentColorTurn = this.currentGameState.currentColorTurn == "W" ? "B" : "W";
    if (this.chessLogic.isCheck(this.squares, this.currentGameState.currentColorTurn)) 
      {
        this.currentGameState.isCheck = true;
        if (this.chessLogic.isMate(this.squares, this.currentGameState.currentColorTurn))
        {
          this.currentGameState.isMate = true;
          this.currentGameState.isGameOver = true;
          this.currentGameState.isWhiteWin = this.currentGameState.currentColorTurn == "B"
        }
      }
      else 
      {
        this.currentGameState.isCheck = false;
      }
      if (this.setScoreBoard) {
        console.log("onFinishMove",this.playerId,this.currentGameState)
        this.setScoreBoard(structuredClone(this.currentGameState)); 
      }
      console.log("onFinishMove",this.currentGameState)
  }

  // index is the index of the square being clicked
  onSquareClicked(index) {
    var square = this.squares[index];
    this.log(
      `onSquareClicked(${index})`,
      `current player:${this.currentGameState.currentColorTurn}`,
      `square.piece`,
      square.piece,
      `allowed squares`,
      this.currentGameState.allowedSquares
    );

    // if not current player's turn then do nothing unless it's propagating changes
    if (
      !this.processingMessage &&
      this.currentGameState.currentColorTurn != this.playerColor
    ) {
      return;
    }

    // if an empty square was clicked ...
    if (!square.piece) {
      this.log("there is NO piece at square ", square);

      // and there is a piece currently selected ...
      if (this.currentGameState.selectedPiece) {
        this.log(
          "there is currently a selected piece ",
          this.currentGameState.selectedPiece
        );

        // and target is in a list of allowed moves
        if (this.currentGameState.allowedSquares.indexOf(index) > -1) {
          // then move piece to target
          this.log(
            "target square is in the list of allowed squares ",
            this.currentGameState.allowedSquares
          );
          this.onPieceMoved(square);
        } else {
          // otherwise unselect piece
          this.log(
            "target square is NOT in the list of allowed squares ",
            this.currentGameState.allowedSquares
          );
          this.onPieceUnselected();
        }
      } else {
        this.log("there is NO currently selected piece, no changes.");
      }
      // finish move
      return;
    }
    // there is a piece in the targeted square ...
    var piece = square.piece;
    this.log("there is a piece at square ", square, "piece:", piece);

    if (
      !this.currentGameState.selectedPiece &&
      this.currentGameState.currentColorTurn != piece.color
    ) {
      this.log(
        "there is no selected piece and the current player color is not the piece's color. piece:",
        piece
      );
      return;
    }

    // if the piece on the target square is of the same color
    if (this.currentGameState.currentColorTurn == piece.color) {
      // select that other piece instead
      this.log(
        "selecting target piece because the target piece is the current player's color.",
        piece
      );
      this.onPieceSelected(square, piece, index);
    } else {
      // otherwise (target piece is of different color) ...
      if (this.currentGameState.allowedSquares.indexOf(index) > -1) {
        // and if the target index is allowed then capture
        this.log("capturing target piece because the target piece.", piece);
        this.onPieceCaptured(square, piece);
      }
    }

    // finish move
  }

  onPieceCaptured(square, piece) {
    console.log("piece captured");
    this.onPieceMoved(square);
  }

  onPieceMoved(square) {
    if (!this.processingMessage) {
      const message = {
        event: "move",
        originPlayer: this.playerId,
        originSquare: this.currentGameState.selectedSquare.index,
        targetSquare: square.index,
        piece: this.currentGameState.selectedPiece,
      };
      this.webSocketHandler(JSON.stringify(message));
    }
    this.log("piece moved");
    this.currentGameState.selectedSquare.piece = null;
    square.piece = this.currentGameState.selectedPiece;
    this.checkForPromotion(square);
    this.onPieceUnselected();
    this.updateState();
    this.onFinishMove();
  }

  checkForPromotion(square){
    if (this.chessLogic.isPromotion(square))
      {
        square.piece.type = "Q";
      }
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
