import { Chess } from '../Chess';
import { MoveFunc, ChessMove } from '../types';

export const diagonal: MoveFunc = ({ board, tile, length = 7 }) => {
  const tileId = Chess.tile(tile, 'id');
  const pos = Chess.tile(tileId);
  const piece = Chess.get({ board, tile: tileId })!
  const { player } = Chess.piece(piece);

  const moves: ChessMove[] = [];

  const blocked = {
    nw: false,
    sw: false,
    se: false,
    ne: false,
  };
  for (let i = 1; i <= length && !(blocked.nw && blocked.sw && blocked.se && blocked.ne); i++) {
    // NW
    const nw = { rank: pos.rank + i, file: pos.file + i };
    if (!blocked.nw) {
      const target = Chess.get({ board, tile: nw });

      // Is this a valid tile?
      if (nw.rank < 8 && nw.file < 8 && (!target || Chess.piece(target).player !== player)) {
        moves.push({ piece, from: tileId, to: Chess.tile(nw) });
      }

      // Are we now blocked?
      if (nw.rank >= 8 || nw.rank >= 8 || target) {
        blocked.nw = true;
      }
    }
    
    // SW
    const sw = { rank: pos.rank - i, file: pos.file + i };
    if (!blocked.sw) {
      const target = Chess.get({ board, tile: sw });
      // Is this a valid tile?
      if (sw.rank >= 0 && sw.file < 8 && (!target || Chess.piece(target).player !== player)) {
        moves.push({ piece, from: tileId, to: Chess.tile(sw) });
      }

      // Are we now blocked?
      if (sw.rank < 0 || sw.file >= 8 || target) {
        blocked.sw = true;
      }
    }

    // SE
    const se = { rank: pos.rank - i, file: pos.file - i };
    if (!blocked.se) {
      const target = Chess.get({ board, tile: se });
      // Is this a valid tile?
      if (se.rank > -1 && se.file > -1 && (!target || Chess.piece(target).player !== player)) {
        moves.push({ piece, from: tileId, to: Chess.tile(se) });
      }

      // Are we now blocked?
      if (se.rank < 0 || se.file < 0 || target) {
        blocked.se = true;
      }
    }

    // NE
    const ne = { rank: pos.rank + i, file: pos.file - i };
    if (!blocked.ne) {
      const target = Chess.get({ board, tile: ne });
      // Is this a valid tile?
      if (ne.file > -1 && ne.rank < 8 && (!target || Chess.piece(target).player !== player)) {
        moves.push({ piece, from: tileId, to: Chess.tile(ne) });
      }

      // Are we now blocked?
      if (ne.file < 0 || ne.rank >= 8 || target) {
        blocked.ne = true;
      }
    }
  }
  
  return moves;
};
