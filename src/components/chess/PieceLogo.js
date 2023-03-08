import React from "react";
import whitepawn from "../../img/chess-pieces/pawn-white.png";
import whiterook from "../../img/chess-pieces/rook-white.png";
import whiteknight from "../../img/chess-pieces/knight-white.png";
import whitebishop from "../../img/chess-pieces/bishop-white.png";
import whitequeen from "../../img/chess-pieces/queen-white.png";
import whiteking from "../../img/chess-pieces/king-white.png";

import blackpawn from "../../img/chess-pieces/pawn-black.png";
import blackrook from "../../img/chess-pieces/rook-black.png";
import blackknight from "../../img/chess-pieces/knight-black.png";
import blackbishop from "../../img/chess-pieces/bishop-black.png";
import blackqueen from "../../img/chess-pieces/queen-black.png";
import blackking from "../../img/chess-pieces/king-black.png";

export default function PieceLogo({ type, color }) {
  const getLogo = () => {
    switch (color) {
      case "W":
        switch (type) {
          case "P":
            return whitepawn;
            case "R":
            return whiterook;
            case "N":
            return whiteknight;
            case "B":
            return whitebishop;
            case "K":
            return whiteking;

          case "Q":
            return whitequeen;
        }
      case "B":
        switch (type) {
          case "P":
            return blackpawn;
            case "R":
            return blackrook;
          case "Q":
            return blackqueen;
          case "B":
            return blackbishop;
          case "N":
            return blackknight;
          case "K":
            return blackking;
        }
    }
  };
  return (
    <div>
      <img className="pieceLogo" src={getLogo()}></img>
    </div>
  );
}
