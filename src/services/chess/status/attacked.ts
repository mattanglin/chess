import { Chess } from '../Chess';

export interface AttackedConfig {
  tile: any;
  board: any;
  // Player attacking?
  player: any;
}

/**
 * Get list of pieces attacking this square for a given player
 */
export const attacked = ({ tile: tileId, board, player }: AttackedConfig): boolean => {
  const pos = Chess.tile(tileId);
  const pawnDir = player === 'white' ? -1 : 1;

  // Determine if square is under attack

  // Check Pawn attacks (NOTE: This disregards en passant attacks)
  // Check diagonals (King/Queen/Bishop/Pawn)
  // Check straights (King/Queen/Rook)
  // Check Knight

  return false;
}