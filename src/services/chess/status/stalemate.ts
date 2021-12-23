import { ChessBoard, ChessPlayer } from '../types';

export interface StalemateParams {
  board: ChessBoard;
  player: ChessPlayer;
}

export const stalemate = ({ player, board }: StalemateParams) => {
  // Determine if the current board is in stalemate
}
