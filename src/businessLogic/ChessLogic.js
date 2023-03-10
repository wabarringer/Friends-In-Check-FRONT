
export default class ChessLogic {
    getAllowedMoves(type,color,squares,from,lineOfAttackOnly) {
        console.log("getAllowedMoves",type,color,squares,from,lineOfAttackOnly)
        var moves = [];
        switch (type)
        {
            case "P":
                if (color == "B") {
                    moves = moves
                    .concat(this.getAllowedRange(color,squares, from, [[0,1]],false,true))
                    .concat(this.getAllowedRange(color,squares, from, [[-1,1]],true))
                    .concat(this.getAllowedRange(color,squares, from, [[1,1]],true))
                    ;
                    if(from >= 8 && from < 16) {
                        moves = moves.concat(this.getAllowedRange(color,squares, from, [[0,2]]));
                    }
                }
                else
                {
                    moves = moves 
                    .concat(this.getAllowedRange(color,squares, from, [[0,-1]],false,true))
                    .concat(this.getAllowedRange(color,squares, from, [[-1,-1]],true))
                    .concat(this.getAllowedRange(color,squares, from, [[1,-1]],true))
                    ;
                    if(from >= 48 && from < 56) {
                        moves = moves.concat(this.getAllowedRange(color,squares, from, [[0,-2]]));
                    }
                }
                break;                
            case "R":
                moves = moves
                .concat(this.getAllowedRange(color,squares, from, [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]]))
                .concat(this.getAllowedRange(color,squares, from, [[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]]))
                .concat(this.getAllowedRange(color,squares, from, [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]]))
                .concat(this.getAllowedRange(color,squares, from, [[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]]))
                ;
                break;                
            case "Q":
                moves = moves
                .concat(this.getAllowedRange(color,squares, from, [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]]))
                .concat(this.getAllowedRange(color,squares, from, [[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]]))
                .concat(this.getAllowedRange(color,squares, from, [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]]))
                .concat(this.getAllowedRange(color,squares, from, [[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]]))
                
                .concat(this.getAllowedRange(color,squares, from, [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]]))
                .concat(this.getAllowedRange(color,squares, from, [[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]]))
                .concat(this.getAllowedRange(color,squares, from, [[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]]))
                .concat(this.getAllowedRange(color,squares, from, [[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]]))
                ;
                break;                
            case "B":
                moves = moves
                .concat(this.getAllowedRange(color,squares, from, [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]]))
                .concat(this.getAllowedRange(color,squares, from, [[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]]))
                .concat(this.getAllowedRange(color,squares, from, [[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]]))
                .concat(this.getAllowedRange(color,squares, from, [[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]]))
                ;
                break;                
            case "K":
                moves = moves
                .concat(this.getAllowedRange(color,squares, from, [[1,0]]))
                .concat(this.getAllowedRange(color,squares, from, [[0,1]]))
                .concat(this.getAllowedRange(color,squares, from, [[-1,0]]))
                .concat(this.getAllowedRange(color,squares, from, [[0,-1]]))
                .concat(this.getAllowedRange(color,squares, from, [[1,1]]))
                .concat(this.getAllowedRange(color,squares, from, [[-1,1]]))
                .concat(this.getAllowedRange(color,squares, from, [[1,-1]]))
                .concat(this.getAllowedRange(color,squares, from, [[-1,-1]]))
                ;
                break;                
            case "N":
                moves = []
                .concat(this.getAllowedRange(color,squares, from, [[1,2]]))
                .concat(this.getAllowedRange(color,squares, from, [[-1,2]]))
                .concat(this.getAllowedRange(color,squares, from, [[2,1]]))
                .concat(this.getAllowedRange(color,squares, from, [[2,-1]]))
                .concat(this.getAllowedRange(color,squares, from, [[1,-2]]))
                .concat(this.getAllowedRange(color,squares, from, [[-1,-2]]))
                .concat(this.getAllowedRange(color,squares, from, [[-2,1]]))
                .concat(this.getAllowedRange(color,squares, from, [[-2,-1]]))
            ;            
            break;                
        }
        if (!lineOfAttackOnly)
        {
            moves = this.removeMovesThatResultInChecks(squares, from, moves);
        }
        return moves;
    }

    removeMovesThatResultInChecks(originalSquares,currentSquare,potentialMoves) {
        const squares = []
        for (var i = 0; i < originalSquares.length; i++)
        {
            squares.push({
                index: i,
                piece: originalSquares[i].piece,
            });
        }
        const thePiece = squares[currentSquare].piece;
        //console.log("removeMovesThatResultInChecks",thePiece,currentSquare,originalSquares[currentSquare],squares[currentSquare])
        squares[currentSquare].piece = null;
        const resultMoves = [];

        for(let i = 0; i < potentialMoves.length; i++)
        {
            var newSquare = potentialMoves[i];
            var savedPiece = squares[newSquare].piece;
            squares[newSquare].piece = thePiece;
            const kingIndex = this.getPieceLocation(squares, "K", thePiece.color);
            if (!this.isCheck(squares, thePiece.color, kingIndex))
            {
                resultMoves.push(newSquare);
            }
            //console.log('kingIndex',kingIndex)
            squares[newSquare].piece = savedPiece;
        }
        //console.log('checking moves',potentialMoves,resultMoves);
        return resultMoves;
    }


    getAllowedRange(color,squares,from,deltas,onlyIfAttack,onlyIfEmpty) {
        var result = [];
        for (var i = 0; i < deltas.length; i++)
        {
            var pair = deltas[i];
            var squareIndex = this.getTransformedRange(from,pair[0],pair[1]);
            //console.log(pair,squareIndex,squareIndex > -1 ? squares[squareIndex].piece : -1);
            if (squareIndex == -1)
            {
                break;
            } 
            if (squares[squareIndex].piece) {
                if (squares[squareIndex].piece.color != color)
                {
                    if (!onlyIfEmpty)
                    {
                        result.push(squareIndex);
                    }
                }
                break;
            }
            if(!onlyIfAttack)
            {
                result.push(squareIndex);
            }
        }
        return result;
    }

    getTransformedRange(original, dx, dy) {
        const y = Math.trunc(original / 8);
        const x = original % 8;
        //console.log(original,x,y)
        const newy = y + dy;
        const newx = x + dx;
        const final = (newx > -1 && newx < 8 && newy > -1 && newy < 8) ? (newy*8 + newx) : -1;
        //console.log(original,x,y,newx, newy, final);
        return final;
    }

    getPieceLocation(squares, pieceType, color) {
        for (let i = 0; i < 64; i++) {
            const piece = squares[i].piece;
            if (!piece)
            {
                continue;
            }
            if (piece.type == pieceType && piece.color == color)
            {
                return i; 
            }
               
        }
        return -1;
    }

    isCheck(squares, color, kingIndex) {
        if (!kingIndex) {
            kingIndex = this.getPieceLocation(squares, "K", color);
        }
        for (let i = 0; i < 64; i++) {
            if (i == kingIndex)
            {
                continue;
            }
            const piece = squares[i].piece;
            if (piece && piece.color != color)
            {
                const moves = this.getAllowedMoves(piece.type,piece.color,squares, i, true);
                if (moves.includes(kingIndex)) {
                    //console.log("check to BK by " + piece.type + " at square " + kingIndex,color);
                    return true;
                }
            }
        }
        return false;
    }

    isMate(squares, color) {
        for (let i = 0; i < 64; i++) {
            const piece = squares[i].piece;
            if (piece && piece.color == color)
            {
                const moves = this.getAllowedMoves(piece.type,piece.color,squares, i, false);
                if (moves.length > 0) {
                    console.log("it is not a match because on piece can move. Piece:",piece, "allowed moves", moves)
                    return false;
                }
            }
        }
        return true;
    }
}
