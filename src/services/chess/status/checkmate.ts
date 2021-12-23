import { ChessBoard, ChessPlayer } from '../types';

export interface CheckmateParams {
  board: ChessBoard;
  player: ChessPlayer;
}

export const checkmate = ({ player, board }: CheckmateParams) => {
  // Determine if the current player is in checkmate
  /**
   * What determines a checkmate
   * - The player is currently in check
   * - The players king has no move that would take them out of check
   * - The player has no other piece moves that would take them out of check
   */
}
