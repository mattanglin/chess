import { Chess } from '../Chess';
import { BlackKing, WhiteKing } from '../pieces';
import { GameStatus, GameStatusParams } from '../types';

/**
 * Get game status
 * NOTE: REAFACTORING INTO CLASS INSTANCE
 */
export const status = ({ player, board }: GameStatusParams): GameStatus => {
  const playerKing = player === 'W' ? WhiteKing : BlackKing
  const [kingTile] = Chess.tileByPiece({ board, piece: playerKing });
  
  // Is the current player in check?
  const kingAttacked = Chess.tileAttacked({ board, player, tile: kingTile });
  // NOTE: We don't care about actually passing moves list since that only affects en passant & caslting which don't affect checkmate/stalemate
  const playerMoves = Chess.getAllPlayerMoves({ board, player, moves: [] });
  const payerHasEscapeMove = playerMoves.find((move) => {
    const result = Chess.move({ board, player, moves: [], move });
  });

  if (kingAttacked) {
    // Check for checkmate


  } else {
    // We would now check for stalemate

  }

  return player === 'W' ? 'WhiteToPlay' : 'BlackToPlay';
};
