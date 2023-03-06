import React, { useState } from "react";
import PieceLogo from "./PieceLogo";

// onClick is a the function that executes when someone clicks the square
export default function Square ({ piece, isHighlighted, onClick, index }) {
    const isEvenRow = (Math.trunc(index / 8)) % 2 === 0;
    const isBlackSquare = (index % 2 === (isEvenRow ? 0 : 1));

    return (
        <button
        onClick={(i) => onClick(index) }
        className={ "square " +
         (isBlackSquare ? "squareBlack " : "squareWhite ") +
         (isHighlighted ? "squareHighlighted " : "" )
        }
        >
           { piece ? (<PieceLogo type={piece.type} color={piece.color} ></PieceLogo>) : "" }
        </button>
    )
}


