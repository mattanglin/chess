import { Chess } from '../Chess';

export interface AttackedConfig {
  tile: any;
  board: any;
  player: any;
}

/**
 * Get list of opposite pieces attacking this square
 */
export const attacked = ({ tile: tileId, board, player }: AttackedConfig): boolean => {
  const pos = Chess.tile(tileId);

  // Determine if square is under attack
  const pawnDir = player === 'white' ? -1 : 1;

  // Check Pawn attacks (NOTE: This disregards en passant attacks)
  // Check diagonals (King/Queen/Bishop/Pawn)
  // Check straights (King/Queen/Rook)
  // Check Knight

  return false;
}