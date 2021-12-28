import { BishopPiece, KingPiece, QueenPiece } from '..';
import { Chess } from '../Chess';
import { ChessBoard, ChessPlayer, TileType } from '../types';

export interface AttackedConfig {
  tile: TileType;
  board: ChessBoard;
  // Player under attack?
  player: ChessPlayer;
}

/**
 * Get list of pieces attacking this square for a given player
 */
export const attacked = ({ tile, board, player }: AttackedConfig) => {
  const pos = Chess.tile(tile, 'indeces-object');
  const pawnDir = player === 'W' ? 1 : -1;

  let tileUnderAttack = false;

  // Determine if square is under attack
  // Check Pawn attacks (NOTE: This disregards en passant attacks)
  const pawnTile1 = { rank: pos.rank - pawnDir, file: pos.file - pawnDir };
  const pawnTile2 = { rank: pos.rank - pawnDir, file: pos.file + pawnDir };
  
  if (
    (
      Chess.get({ board, tile: pawnTile1 }) &&
      Chess.piece(Chess.get({ board, tile: pawnTile1 })!).player !== player &&
      Chess.piece(Chess.get({ board, tile: pawnTile1 })!).type === 'P'
    ) ||
    (
      Chess.get({ board, tile: pawnTile2 }) &&
      Chess.piece(Chess.get({ board, tile: pawnTile2 })!).player !== player &&
      Chess.piece(Chess.get({ board, tile: pawnTile2 })!).type === 'P'
    )
  ) {
    tileUnderAttack = true;
  }

  // Check Knight Attacks
  if (!tileUnderAttack) {
    const knightMovementTiles = [
      { rank: pos.rank + 2, file: pos.file + 1 },
      { rank: pos.rank + 2, file: pos.file - 1 },
      { rank: pos.rank - 2, file: pos.file + 1 },
      { rank: pos.rank - 2, file: pos.file - 1 },
      { file: pos.file + 2, rank: pos.rank + 1 },
      { file: pos.file + 2, rank: pos.rank - 1 },
      { file: pos.file - 2, rank: pos.rank + 1 },
      { file: pos.file - 2, rank: pos.rank - 1 },
    ];
    for (let i = 0; i < knightMovementTiles.length && !tileUnderAttack; i++) {
      const target = Chess.get({ board, tile: knightMovementTiles[i] });
      if (target && Chess.piece(target).player !== player && Chess.piece(target).type === 'N') {
        tileUnderAttack = true;
      }
    }
  }

  // Check diagonals (King/Queen/Bishop)
  if (!tileUnderAttack) {
    const attackingPieceTypes = [QueenPiece, BishopPiece];
    // TODO: HANDLE KING ATTACK
    const blocked = {
      nw: false,
      sw: false,
      se: false,
      ne: false,
    };
    for (
      let i = 1;
      i <= 7 && !tileUnderAttack && !(blocked.nw && blocked.sw && blocked.se && blocked.ne);
      i++
    ) {
      // NW
      const nw = { rank: pos.rank + i, file: pos.file + i };
      if (!blocked.nw) {
        const target = Chess.get({ board, tile: nw });
  
        // Is there an attacking piece here?
        if (
          target &&
          Chess.piece(target).player !== player &&
          (
            attackingPieceTypes.includes(Chess.piece(target).type) ||
            (i === 1 && Chess.piece(target).type === 'K')
          )
        ) {
          tileUnderAttack = true;
        } else if (nw.rank >= 8 || nw.rank >= 8 || target) {
          // Is this diagonal blocked?
          blocked.nw = true;
        }
      }

      // SW
      const sw = { rank: pos.rank - i, file: pos.file + i };
      if (!blocked.sw) {
        const target = Chess.get({ board, tile: sw });
  
        // Is there an attacking piece here?
        if (
          target &&
          Chess.piece(target).player !== player &&
          (
            attackingPieceTypes.includes(Chess.piece(target).type) ||
            (i === 1 && Chess.piece(target).type === 'K')
          )
        ) {
          tileUnderAttack = true;
        } else if (sw.rank < 0 || sw.file >= 8 || target) {
          // Is this diagonal blocked?
          blocked.sw = true;
        }
      }

      // SE
      const se = { rank: pos.rank - i, file: pos.file - i };
      if (!blocked.se) {
        const target = Chess.get({ board, tile: se });
        // Is there an attacking piece here?
        if (
          target &&
          Chess.piece(target).player !== player &&
          (
            attackingPieceTypes.includes(Chess.piece(target).type) ||
            (i === 1 && Chess.piece(target).type === 'K')
          )
        ) {
          tileUnderAttack = true;
        } else if (se.rank < 0 || se.file < 0 || target) {
          // Are we now blocked?
          blocked.se = true;
        }
      }

      // NE
      const ne = { rank: pos.rank + i, file: pos.file - i };
      if (!blocked.ne) {
        const target = Chess.get({ board, tile: ne });
        // Is there an attacking piece here?
        if (
          target &&
          Chess.piece(target).player !== player &&
          (
            attackingPieceTypes.includes(Chess.piece(target).type) ||
            (i === 1 && Chess.piece(target).type === 'K')
          )
        ) {
          tileUnderAttack = true;
        } else if (ne.file < 0 || ne.rank >= 8 || target) {
          // Are we now blocked?
          blocked.ne = true;
        }
      }
    }
  }

  

  // Check straights (King/Queen/Rook)
  if (!tileUnderAttack) {
    const attackingPieceTypes = [QueenPiece, BishopPiece];
    // TODO: HANDLE KING ATTACK
    // Check each straight for attacking piece
    const blocked = {
      top: false,
      right: false,
      bottom: false,
      left: false,
    };
    for (let i = 1; i <= 7 && !(blocked.top && blocked.right && blocked.bottom && blocked.left); i++) {
      // Top
      const top = { rank: pos.rank + i, file: pos.file };
      if (!blocked.top) {
        const target = Chess.get({ board, tile: top });
  
        // Is there an attacking piece here?
        if (target &&
          Chess.piece(target).player !== player &&
          (
            attackingPieceTypes.includes(Chess.piece(target).type) ||
            (i === 1 && Chess.piece(target).type === 'K')
          )) {
          tileUnderAttack = true;
        } else if (top.rank >= 8 || target) {
          // Are we now blocked?
          blocked.top = true;
        }
      }
      
      // Right
      const right = { rank: pos.rank, file: pos.file + i };
      if (!blocked.right) {
        const target = Chess.get({ board, tile: right });
  
        // Is this a valid tile?
        if (
          target &&
          Chess.piece(target).player !== player &&
          (
            attackingPieceTypes.includes(Chess.piece(target).type) ||
            (i === 1 && Chess.piece(target).type === 'K')
          )
        ) {
          tileUnderAttack = true;
        } else if (right.file >= 8 || target) {
          // Are we now blocked?
          blocked.right = true;
        }
      }
  
      // Bottom
      const bottom = { rank: pos.rank - i, file: pos.file };
      if (!blocked.bottom) {
        const target = Chess.get({ board, tile: bottom });
  
        // Is this a valid tile?
        if (
          target &&
          Chess.piece(target).player !== player &&
          (
            attackingPieceTypes.includes(Chess.piece(target).type) ||
            (i === 1 && Chess.piece(target).type === 'K')
          )
        ) {
          tileUnderAttack = true;
        } else if (bottom.rank < 0 || target) {
          // Are we now blocked?
          blocked.bottom = true;
        }
      }
  
      // Left
      const left = { rank: pos.rank, file: pos.file - i };
      if (!blocked.left) {
        const target = Chess.get({ board, tile: left });
  
        // Is this a valid tile?
        if (
          target &&
          Chess.piece(target).player !== player &&
          (
            attackingPieceTypes.includes(Chess.piece(target).type) ||
            (i === 1 && Chess.piece(target).type === 'K')
          )
        ) {
          tileUnderAttack = true;
        } else if (left.file < 0 || target) {
          // Are we now blocked?
          blocked.left = true;
        }
      }
    }
  }

  return tileUnderAttack;
}