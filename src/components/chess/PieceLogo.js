import React from "react";
import pawn from '../css/pawn.png';

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