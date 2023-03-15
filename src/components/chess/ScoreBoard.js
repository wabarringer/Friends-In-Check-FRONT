import React, { useState } from 'react';

export default function ScoreBoard({currentScoreBoard, scoreBoardSetter})
{
    const [scoreBoard, setScoreBoard] = useState(currentScoreBoard);
    scoreBoardSetter(setScoreBoard)
    //console.log("ScoreBoard",scoreBoard,scoreBoard.currentColorTurn)
    return (
        <div className="scoreboardDiv">
            <div id="turnInfo">
                <div>
                    {scoreBoard.playerColor == scoreBoard.currentColorTurn ? "Your turn" : "Waiting for opponent's turn."}
                </div>
                <div>
                    Your color: {scoreBoard.playerColor}
                </div>
                <div>
                    Player Turn: {scoreBoard.currentColorTurn}
                </div>
            </div>
            <div id="scoreInfo">
                <div>
                    {scoreBoard.isMate ? "Mate" : (scoreBoard.isCheck ? "Check" : "")}
                </div>
                <div>
                    { scoreBoard.isMate ? (scoreBoard.isWhiteWin ? "White wins!" : "Black wins!") : ""}
                </div>
            </div>
        </div>
    );
}
