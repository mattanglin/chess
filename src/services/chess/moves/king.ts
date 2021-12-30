import { diagonal } from './diagonal';
import { straight } from './straight';
import { MoveFunc } from '../types';
import { Chess } from '..';

/**
 * Determine possible King moves. Kings adhere to the following rules:
 * - 
 */
export const king: MoveFunc = ({ board, tile, moves }) => {
  const piece = Chess.get({ board, tile })!;
  const player = Chess.piece(piece).player;
  const kingRank = player === 'W' ? 7 : 0;
  const kingPos = Chess.tile(tile, 'indeces-object');
  
  const availableMoves = [
    ...straight({ board, tile, moves, length: 1}),
    ...diagonal({ board, tile, moves, length: 1}),
  ];

  // Determine if we can castle
  let kingMoved = kingPos.file !== 4 || kingPos.rank !== kingRank;
  let aFileRookMoved = false;
  let hFileRookMoved = false;
  const mvStart = Chess.piece(piece).player === 'W' ? 0 : 1;

  // Have the king or rooks moved?
  for (let i = mvStart; i < moves.length && !kingMoved; i += 2) {
    const move = moves[i];
    const movedPiece = Chess.piece(move.piece);
    if (movedPiece.type === 'K') {
      kingMoved = true;
    } else if (movedPiece.type === 'R') {
      if (Chess.file(move.from, 'file') === 'a') {
        aFileRookMoved = true;
      } else if (Chess.file(move.from, 'file') === 'h') {
        hFileRookMoved = true;
      }
    }
  }

  if (!kingMoved) {
    // Is King under attack?
    const kingAttacked = Chess.tileAttacked({
      board,
      player: Chess.piece(piece).player,
      tile,
    });

    if (!kingAttacked) {
      const pos = Chess.tile(tile, 'indeces-object');
      const aFileRookAttacked = Chess.tileAttacked({ board, player, tile: { file: 0, rank: pos.rank }});
      const hFileRookAttacked = Chess.tileAttacked({ board, player, tile: { file: 7, rank: pos.rank }});
      let aFileCastleAvailable = true;
      let hFileCastleAvailable = true;

      // Check A File Castle
      if (!aFileRookMoved && !aFileRookAttacked) {
        // Check tiles in between
        for (let i = 1; i < pos.file && aFileCastleAvailable; i++) {
          const betweenTile = { file: i, rank: pos.rank };
          const betweenPiece = Chess.get({ board, tile: betweenTile });
          if (betweenPiece) {
            aFileCastleAvailable = false;
          } else {
            const tileAttacked = Chess.tileAttacked({ board, tile: betweenTile, player });
            if (tileAttacked) {
              aFileCastleAvailable = false;
            }
          }
        }

        // Can we castle?
        if (aFileCastleAvailable) {
          availableMoves.push({
            piece,
            from: Chess.tile(tile, 'id'),
            to: Chess.tile({ file: pos.file - 2, rank: pos.rank }),
            castle: 'Q',
          });
        }
      }
      
      // Check H file Castle
      if (!hFileRookMoved && !hFileRookAttacked) {
        // Check tiles in between
        for (let i = pos.file + 1; i < 7 && hFileCastleAvailable; i++) {
          const betweenTile = { file: i, rank: pos.rank };
          const betweenPiece = Chess.get({ board, tile: betweenTile });
          if (betweenPiece) {
            hFileCastleAvailable = false;
          } else {
            const tileAttacked = Chess.tileAttacked({ board, tile: betweenTile, player });
            if (tileAttacked) {
              hFileCastleAvailable = false;
            }
          }
        }

        // Can we castle?
        if (hFileCastleAvailable) {
          availableMoves.push({
            piece,
            from: Chess.tile(tile, 'id'),
            to: Chess.tile({ file: pos.file + 2, rank: pos.rank }),
            castle: 'K',
          });
        }
      }
      
    }
  }

  // TODO: Handle invalid check moves

  return availableMoves;
};
