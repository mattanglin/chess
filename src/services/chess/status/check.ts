import { ChessBoard, ChessPlayer } from '../types';

export interface CheckParams {
  board: ChessBoard;
  player: ChessPlayer;
}

export const check = ({ player, board }: CheckParams) => {
  // First find the the king
  // Determine if the current player king tile is under attack
}
