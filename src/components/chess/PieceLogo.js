import React from "react";
import pawn from '../../img/chess-pieces/pawn-white.png';

export default function PieceLogo({type,color})
{
    return (
        <div>
            <img className="pieceLogo" src={pawn}>
        </img>

        <span>{color}</span>
        </div>

    );
}