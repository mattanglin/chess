import { Chess } from '../Chess';
import { MoveFunc, ChessMove } from '../types';
import { WhitePlayer } from '../constants';
import { BlackQueen, WhiteQueen } from '..';

/**
 * Determine available pawn moves. Pawns adhere to the following rules:
 * - Can only move forward one space
 * - Cannot move past other pieces
 * - Can only caputre on the forward diagonal
 * - Can move forward 2 spaces
 * - Can promote to Rook/Knight/Bishop/Queen when they reach the end of the board
 * - Can capture en passant ONLY immediately after last pawn move
 * 
 * TODO: How to determine en passant? Pass last move?
 */
export const pawn: MoveFunc = ({ board, tile, moves }) => {
  const tileId = Chess.tile(tile, 'id');
  const pos = Chess.tile(tileId, 'indeces-object');
  const piece = Chess.get({ board, tile: tileId })!;
  const { player } = Chess.piece(piece);

  const dir = player === WhitePlayer ? -1 : 1;
  const startingRank = player === WhitePlayer ? 6 : 1;
  const otherPlayerStartingRank = player === WhitePlayer ? 1 : 6;
  const otherPlayerDir = player === WhitePlayer ? 1 : -1;
  
  const availableMoves: ChessMove[] = [];
  
  // Basic 1 tile move
  const fwd = { rank: pos.rank + dir, file: pos.file };
  const blocked = !!Chess.get({ board, tile: fwd });

  // Promotion for basic and capture moves (defaults to queen for available moves)
  const promotionRank = player === WhitePlayer ? 0 : 7;
  const promoteToQueen = player === WhitePlayer ? WhiteQueen : BlackQueen;
  const promotion = fwd.rank === promotionRank ? promoteToQueen : undefined;
  
  if (!blocked) {
    availableMoves.push({
      piece,
      from: tileId,
      to: Chess.tile(fwd),
      promotion,
    });
  }

  // First move 2
  if (pos.rank === startingRank && !blocked) {
    const fwd2 = { rank: pos.rank + (2 * dir), file: pos.file };
    const blocked = !!Chess.get({ board, tile: fwd2 });

    if (!blocked) {
      availableMoves.push({ piece, from: tileId, to: Chess.tile(fwd2) });
    }
  }

  // Capture Left
  const left = { rank: pos.rank + dir, file: pos.file - dir };
  const leftPiece = Chess.get({ board, tile: left });
  
  if (leftPiece && Chess.piece(leftPiece).player !== player) {
    availableMoves.push({ piece, from: tileId, to: Chess.tile(left), promotion });
  }

  // Capture Right
  const right = { rank: pos.rank + dir, file: pos.file + dir };
  const rightPiece = Chess.get({ board, tile: right });
  if (rightPiece && Chess.piece(rightPiece).player !== player) {
    availableMoves.push({ piece, from: tileId, to: Chess.tile(right), promotion });
  }

  // En Passant
  // Check if the last move allows for an en passant
  const lastMove = moves[moves.length - 1];
  if (
    lastMove &&
    Chess.piece(lastMove.piece).type === 'P' &&
    Chess.tile(lastMove.from).rank === otherPlayerStartingRank &&
    Chess.tile(lastMove.to).rank === otherPlayerStartingRank + (otherPlayerDir * 2) &&
    // Pieces on the same rank
    pos.rank === Chess.tile(lastMove.to).rank &&
    // Player piece on adjacent file
    Math.abs(Chess.tile(lastMove.from).file - pos.file) === 1
  ) {
    availableMoves.push({
      piece,
      from: tileId,
      to: Chess.tile([Chess.tile(lastMove.to).file, Chess.tile(lastMove.to).rank - otherPlayerDir]),
      enPassantCapture: true,
    })
  }

  return availableMoves;
};
