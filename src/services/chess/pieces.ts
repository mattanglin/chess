import { ChessPiece } from './ChessPiece';


// Pieces
export const WhitePawn = new ChessPiece({
  player: 'white',
  type: 'Pawn',
});
export const WhiteQueensRook = new ChessPiece({
  player: 'white',
  type: 'Rook',
  side: 'Q',
});
export const WhiteQueensKnight = new ChessPiece({
  player: 'white',
  type: 'Knight',
  side: 'Q',
});
export const WhiteQueensBishop = new ChessPiece({
  player: 'white',
  type: 'Bishop',
  side: 'Q',
});
export const WhiteQueen = new ChessPiece({
  player: 'white',
  type: 'Queen',
});
export const WhiteKing = new ChessPiece({
  player: 'white',
  type: 'King',
});
export const WhiteKingsBishop = new ChessPiece({
  player: 'white',
  type: 'Bishop',
  side: 'K',
});
export const WhiteKingsKnight = new ChessPiece({
  player: 'white',
  type: 'Knight',
  side: 'K',
});
export const WhiteKingsRook = new ChessPiece({
  player: 'white',
  type: 'Rook',
  side: 'K',
});

export const BlackPawn = new ChessPiece({
  player: 'black',
  type: 'Pawn',
});
export const BlackKingsRook = new ChessPiece({
  player: 'black',
  type: 'Rook',
  side: 'K',
});
export const BlackKingsKnight = new ChessPiece({
  player: 'black',
  type: 'Knight',
  side: 'K',
});
export const BlackKingsBishop = new ChessPiece({
  player: 'black',
  type: 'Bishop',
  side: 'K',
});
export const BlackKing = new ChessPiece({
  player: 'black',
  type: 'King',
});
export const BlackQueen = new ChessPiece({
  player: 'black',
  type: 'Queen',
});
export const BlackQueensBishop = new ChessPiece({
  player: 'black',
  type: 'Bishop',
  side: 'Q',
});
export const BlackQueensKnight = new ChessPiece({
  player: 'black',
  type: 'Knight',
  side: 'Q',
});
export const BlackQueensRook = new ChessPiece({
  player: 'black',
  type: 'Rook',
  side: 'Q',
});
