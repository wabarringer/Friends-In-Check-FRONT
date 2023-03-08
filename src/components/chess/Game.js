import React, { useState } from 'react';
import GameLogic from '../../businessLogic/GameLogic';
import Square from './Square';

export default function Game()
{
    var game = new GameLogic();
    game.initialize();

    const [gameState, setGameState] = useState(game.squares);
    game.setGameState = setGameState;
    return (
        <div>
            <BoardRow start={0} end={8} squares={gameState}></BoardRow>
            <BoardRow start={8} end={16} squares={gameState}></BoardRow>
            <BoardRow start={16} end={24} squares={gameState}></BoardRow>
            <BoardRow start={24} end={32} squares={gameState}></BoardRow>
            <BoardRow start={32} end={40} squares={gameState}></BoardRow>
            <BoardRow start={40} end={48} squares={gameState}></BoardRow>
            <BoardRow start={48} end={56} squares={gameState}></BoardRow>
            <BoardRow start={56} end={64} squares={gameState}></BoardRow>
        </div>
    );
}

function BoardRow({start,end,squares}){
    return (
        <div className="board-row">

        {
        range(start,end,squares).map(square => (
            <div>{new Square(square)}</div>
        ))}
        </div>
    )
}

function range(start,end,squares) {
    var list = [];
    for (var i = start; i < end; i++) list.push(squares ? squares[i] : i);
    return list;
}