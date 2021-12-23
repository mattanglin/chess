import { ChessBoard, ChessPlayer } from '../types';

export interface CheckParams {
  board: ChessBoard;
  player: ChessPlayer;
}

export const check = ({ player, board }: CheckParams) => {
  // Determine if the current player is in check
}
