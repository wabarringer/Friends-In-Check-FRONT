import Piece from "../businessLogic/Piece";

class GameLogic {
    initialize() {
      this.log = true;
      this.squares = []; // contains the list of square indexes where selected piece is allowed to move
      for (var i = 0; i < 64; i++)
      {
        this.squares.push({
          index: i,
          piece: null,
          isHighlighted: false,
          onClick: (index) => this.onSquareClicked(index),
        });
      }
      this.setupBoard();
    }
  
    setupBoard(){
      this.squares[0].piece = new Piece('Q', 'W');
      this.squares[2].piece = new Piece('P', 'B');
      this.squares[4].piece = new Piece('P', 'W');

      this.resetGame();
    }
  
    resetGame() {
      this.currentGameState = {
        playerColor : "W",
        isGameOver : false,
        isDraw : false,
        isWhiteWin : false,
        selectedPiece : null,
        selectedSquare : null,
        allowedSquares : [],
      };
      
    }
  
    // index is the index of the square being clicked
    onSquareClicked(index) {
      var square = this.squares[index];
      this.log && console.log(
        `onSquareClicked(${index})`,
        `current player:${this.currentGameState.playerColor}`,
        `square.piece`,square.piece,
        `allowed squares`,this.currentGameState.allowedSquares,
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
      if (!this.currentGameState.selectedPiece && 
        this.currentGameState.playerColor != piece.color) {
        return;
      }

      // if the piece on the target square is of the same color
      if (this.currentGameState.playerColor == piece.color)
      {
        // select that other piece instead
        this.onPieceSelected(square, piece, index);
      }
      else {
        // otherwise (target piece is of different color), capture the target piece
        this.onPieceCaptured(square, piece);
      }

      // finish move
    }
  
    onPieceCaptured(square, piece) {
      console.log("piece captured")
      this.onPieceMoved(square);
    }
  
    onPieceMoved(square) {
      console.log("piece moved")
      this.currentGameState.selectedSquare.piece = null;
      square.piece = this.currentGameState.selectedPiece;
      this.onPieceUnselected();
      this.updateState();
    }
  
    onPieceSelected(square, piece, index){
      if(this.selectedPiece) {
        this.onPieceUnselected();
      }

      this.currentGameState.selectedPiece = piece;
      this.currentGameState.selectedSquare = square;
      console.log("piece selected");
      square.isHighlighted = true;

      // this is where we need to calculate the allowed moves
      this.currentGameState.allowedSquares = [index + 1, index + 8, index + 16]
      this.updateState();
      this.log && console.log(
        `onSquareClicked(${index})`,
        `current player:${this.currentGameState.playerColor}`,
        `square.piece`,square.piece,
        `allowed squares`,this.currentGameState.allowedSquares,
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
      var squares = []
      for(var i = 0; i < this.squares.length; i++) {
        this.squares[i].isHighlighted = this.currentGameState.allowedSquares.indexOf(i) > -1;
        squares.push(this.squares[i])
      }
      //console.log("squares",squares)
      this.setGameState(squares);  
    }
  }
  
  export default GameLogic;