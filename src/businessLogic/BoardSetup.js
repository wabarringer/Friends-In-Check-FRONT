import ChessLogic from "./ChessLogic";
import Piece from "./Piece";

class BoardSetup {
  initialGame(squares) {
    squares[0].piece = new Piece("R", "B");
    squares[1].piece = new Piece("N", "B");
    squares[2].piece = new Piece("B", "B");
    squares[3].piece = new Piece("Q", "B");
    squares[4].piece = new Piece("K", "B");
    squares[5].piece = new Piece("B", "B");
    squares[6].piece = new Piece("N", "B");
    squares[7].piece = new Piece("R", "B");

    squares[8].piece = new Piece("P", "B");
    squares[9].piece = new Piece("P", "B");
    squares[10].piece = new Piece("P", "B");
    squares[11].piece = new Piece("P", "B");
    squares[12].piece = new Piece("P", "B");
    squares[13].piece = new Piece("P", "B");
    squares[14].piece = new Piece("P", "B");
    squares[15].piece = new Piece("P", "B");

    squares[56].piece = new Piece("R", "W");
    squares[57].piece = new Piece("N", "W");
    squares[58].piece = new Piece("B", "W");
    squares[59].piece = new Piece("Q", "W");
    squares[60].piece = new Piece("K", "W");
    squares[61].piece = new Piece("B", "W");
    squares[62].piece = new Piece("N", "W");
    squares[63].piece = new Piece("R", "W");

    squares[48].piece = new Piece("P", "W");
    squares[49].piece = new Piece("P", "W");
    squares[50].piece = new Piece("P", "W");
    squares[51].piece = new Piece("P", "W");
    squares[52].piece = new Piece("P", "W");
    squares[53].piece = new Piece("P", "W");
    squares[54].piece = new Piece("P", "W");
    squares[55].piece = new Piece("P", "W");
  }
// Set up for testing
  singlePiece(squares) {
    squares[60].piece = new Piece("K", "W");
    squares[43].piece = new Piece("P", "B");
    squares[52].piece = new Piece("P", "W");
    squares[48].piece = new Piece("Q", "W");
  }


    singlePiece1(squares) {
    squares[0].piece = new Piece("R", "B");
    squares[1].piece = new Piece("N", "B");
    squares[2].piece = new Piece("B", "B");
    squares[3].piece = new Piece("Q", "B");
    squares[4].piece = new Piece("K", "B");
    squares[5].piece = new Piece("B", "B");
    squares[6].piece = new Piece("N", "B");
    squares[7].piece = new Piece("R", "B");

    squares[56].piece = new Piece("R", "W");
    squares[57].piece = new Piece("N", "W");
    squares[58].piece = new Piece("B", "W");
    squares[59].piece = new Piece("Q", "W");
    squares[60].piece = new Piece("K", "W");
    squares[61].piece = new Piece("B", "W");
    squares[62].piece = new Piece("N", "W");
    squares[63].piece = new Piece("R", "W");

    }

    singlePiece2(squares) {
    squares[3].piece = new Piece("Q", "B");
    squares[4].piece = new Piece("K", "B");
    squares[59].piece = new Piece("Q", "W");
    squares[60].piece = new Piece("K", "W");

    }

    singlePiece3(squares) {
        squares[7].piece = new Piece("R", "B");
        squares[4].piece = new Piece("K", "B");
        squares[60].piece = new Piece("K", "W");
        squares[56].piece = new Piece("R", "W");

    }    

    whitemate(squares) {
      squares[0].piece = new Piece("K","B")
      squares[8].piece = new Piece("P","B")
      squares[9].piece = new Piece("P","B")
      squares[24].piece = new Piece("Q","W")
    }

    queenProtectingKing(squares) {
      squares[2].piece = new Piece("K","B")
      squares[0].piece = new Piece("R","B")
      squares[32].piece = new Piece("K","W")
      squares[24].piece = new Piece("Q","W")

    }

    blackmate(squares) {
      squares[57].piece = new Piece("K","W")
      squares[48].piece = new Piece("P","W")
      squares[49].piece = new Piece("P","W")
      squares[32].piece = new Piece("Q","B")
    }

    pawnPromotion(squares) {
      squares[57].piece = new Piece("K","W")
      squares[8].piece = new Piece("P","W")
      squares[32].piece = new Piece("K","B")
      squares[33].piece = new Piece("P","B")
      squares[25].piece = new Piece("P","B")
      squares[41].piece = new Piece("B","B")
    }
}

export default BoardSetup;
