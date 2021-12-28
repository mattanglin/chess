import { ChessBoard, ChessPlayer } from '../types';

export interface CheckmateParams {
  board: ChessBoard;
  player: ChessPlayer;
}

export const checkmate = ({ player, board }: CheckmateParams) => {
  // Determine if the current player is in checkmate
  // First determine if the current player king is in check
    // is the king tile under attack?
  // Now determine escape
    // Does the king have a move that results in it not being in check?
    // Can another pieces move block the attack?
    // Can another piece capture the attacking piece?
}
