import { Chess } from '../Chess';
import { MoveFunc, ChessMove } from '../types';

/**
 * Determine possible Knight moves. Knights adhere to the following rules:
 * - Knights can move to spaces 2 away from the current and 1 laterally from that space
 * - Knights can jump over other pieces
 * - Knights caputre where they land
 * 
 * TODO: Filter out any moves that would put the player in check
 */
export const knight: MoveFunc = ({ board, tile }) => {
  // Get current tile indeces
  const tileId = Chess.tile(tile, 'id');
  const pos = Chess.tile(tileId, 'indeces-object');
  const piece = Chess.get(board, tileId)!;
  const { player } = Chess.piece(piece);

  const knightMovementTiles = [
    { rank: pos.rank + 2, file: pos.file + 1 },
    { rank: pos.rank + 2, file: pos.file - 1 },
    { rank: pos.rank - 2, file: pos.file + 1 },
    { rank: pos.rank - 2, file: pos.file - 1 },
    { file: pos.file + 2, rank: pos.rank + 1 },
    { file: pos.file + 2, rank: pos.rank - 1 },
    { file: pos.file - 2, rank: pos.rank + 1 },
    { file: pos.file - 2, rank: pos.rank - 1 },
  ];

  // Filter out invalid moves
  const knightMoves = knightMovementTiles.filter(({ file, rank }) => {
    // Filter out invalid spaces
    if (rank < 0 || rank > 7 || file < 0 || file > 7) return false;

    // Filter out tiles that are inhabited by your own piece
    const targetPiece = Chess.get(board, [file, rank]);
    if (targetPiece && Chess.piece(targetPiece).player === player) return false;

    // TODO: Handle other invalid moves

    // Must be valid!
    return true
  });

  // Turn into moves
  const moves: ChessMove[] = knightMoves.map(({ file, rank }) => ({ from: tileId, to: Chess.tile([file, rank])}))

  return moves;
};
