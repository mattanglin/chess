import { Chess } from '../Chess';
import { MoveFunc, ChessMove } from '../types';
import { WhitePlayer } from '../constants';

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
export const pawn: MoveFunc = ({ board, tile }) => {
  const tileId = Chess.tile(tile, 'id');
  const pos = Chess.tile(tileId, 'indeces-object');
  const piece = Chess.get(board, tileId)!;
  const { player } = Chess.piece(piece);

  const dir = player === WhitePlayer ? -1 : 1;
  const startingRank = player === WhitePlayer ? 6 : 1;

  const moves: ChessMove[] = [];
  
  // Basic 1 tile move
  const fwd = { rank: pos.rank + dir, file: pos.file };
  const blocked = !!Chess.get(board, fwd);
  
  if (!blocked) {
    moves.push({ from: tileId, to: Chess.tile(fwd) });

    // Promotion
    // TODO
  }

  // First move 2
  if (pos.rank === startingRank && !blocked) {
    const fwd2 = { rank: pos.rank + (2 * dir), file: pos.file };
    const blocked = !!Chess.get(board, fwd2);

    if (!blocked) {
      moves.push({ from: tileId, to: Chess.tile(fwd2) });
    }
  }

  // Capture Left
  const left = { rank: pos.rank + dir, file: pos.file - dir };
  const leftPiece = Chess.get(board, left);
  
  if (leftPiece && Chess.piece(leftPiece).player !== player) {
    moves.push({ from: tileId, to: Chess.tile(left) });
  }

  // Capture Right
  const right = { rank: pos.rank + dir, file: pos.file + dir };
  const rightPiece = Chess.get(board, right);
  if (rightPiece && Chess.piece(rightPiece).player !== player) {
    moves.push({ from: tileId, to: Chess.tile(right) });
  }

  // En Passant
  // TODO

  return moves;
};
