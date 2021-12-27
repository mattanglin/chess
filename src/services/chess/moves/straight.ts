import { Chess } from '../Chess';
import { MoveFunc, ChessMove } from '../types';

/**
 * Helper function to determine available for horizontals and verticals
 */
export const straight: MoveFunc = ({ board, tile, length = 7 }) => {
  const tileId = Chess.tile(tile, 'id');
  const pos = Chess.tile(tileId);
  const piece = Chess.get({ board, tile: tileId })!;
  const { player } = Chess.piece(piece);

  const moves: ChessMove[] = [];

  const blocked = {
    top: false,
    right: false,
    bottom: false,
    left: false,
  };
  for (let i = 1; i <= length && !(blocked.top && blocked.right && blocked.bottom && blocked.left); i++) {
    // Top
    const top = { rank: pos.rank + i, file: pos.file };
    if (!blocked.top) {
      const target = Chess.get({ board, tile: top });

      // Is this a valid tile?
      if (top.rank < 8 && (!target || Chess.piece(target).player !== player)) {
        moves.push({ piece, from: tileId, to: Chess.tile(top)});
      }

      // Are we now blocked?
      if (top.rank >= 8 || target) {
        blocked.top = true;
      }
    }
    
    // Right
    const right = { rank: pos.rank, file: pos.file + i };
    if (!blocked.right) {
      const target = Chess.get({ board, tile: right });

      // Is this a valid tile?
      if (right.file < 8 && (!target || Chess.piece(target).player !== player)) {
        moves.push({ piece, from: tileId, to: Chess.tile(right) });
      }

      // Are we now blocked?
      if (right.file >= 8 || target) {
        blocked.right = true;
      }
    }

    // Bottom
    const bottom = { rank: pos.rank - i, file: pos.file };
    if (!blocked.bottom) {
      const target = Chess.get({ board, tile: bottom });

      // Is this a valid tile?
      if (bottom.rank > -1 && (!target || Chess.piece(target).player !== player)) {
        moves.push({ piece, from: tileId, to: Chess.tile(bottom) });
      }

      // Are we now blocked?
      if (bottom.rank < 0 || target) {
        blocked.bottom = true;
      }
    }

    // Left
    const left = { rank: pos.rank, file: pos.file - i };
    if (!blocked.left) {
      const target = Chess.get({ board, tile: left });

      // Is this a valid tile?
      if (left.file > -1 && (!target || Chess.piece(target).player !== player)) {
        moves.push({ piece, from: tileId, to: Chess.tile(left) });
      }

      // Are we now blocked?
      if (left.file < 0 || target) {
        blocked.left = true;
      }
    }
  }
  
  return moves;
}