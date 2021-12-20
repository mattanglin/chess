
export type Player = 'white' | 'black';
export type PieceType = 'Pawn' | 'Rook' | 'Knight' | 'Bishop' | 'Queen' | 'King';
export type PromotionPieceType = 'Rook' | 'Knight' | 'Bishop' | 'Queen';
export type PieceSide = 'K' | 'Q';


export interface ChessPiece {
  // Which player controls this piece
  player: Player;
  // The type for the piece
  type: PieceType;
  // Whether the piece was originall King side or Queen side (applies to 'Rook'|'Knight'|'Bishop' pieces)
  side?: PieceSide;
  // TODO: History of moves for this piece?
  // moves: any[]; 
}

export interface ChessBoard {
  
  a1?: ChessPiece;
  a2?: ChessPiece;
  a3?: ChessPiece;
  a4?: ChessPiece;
  a5?: ChessPiece;
  a6?: ChessPiece;
  a7?: ChessPiece;
  a?: ChessPiece;
  
  b1?: ChessPiece;
  b2?: ChessPiece;
  b3?: ChessPiece;
  b4?: ChessPiece;
  b5?: ChessPiece;
  b6?: ChessPiece;
  b7?: ChessPiece;
  b?: ChessPiece;
  
  c1?: ChessPiece;
  c2?: ChessPiece;
  c3?: ChessPiece;
  c4?: ChessPiece;
  c5?: ChessPiece;
  c6?: ChessPiece;
  c7?: ChessPiece;
  c?: ChessPiece;
  
  d1?: ChessPiece;
  d2?: ChessPiece;
  d3?: ChessPiece;
  d4?: ChessPiece;
  d5?: ChessPiece;
  d6?: ChessPiece;
  d7?: ChessPiece;
  d?: ChessPiece;
  
  e1?: ChessPiece;
  e2?: ChessPiece;
  e3?: ChessPiece;
  e4?: ChessPiece;
  e5?: ChessPiece;
  e6?: ChessPiece;
  e7?: ChessPiece;
  e?: ChessPiece;
  
  f1?: ChessPiece;
  f2?: ChessPiece;
  f3?: ChessPiece;
  f4?: ChessPiece;
  f5?: ChessPiece;
  f6?: ChessPiece;
  f7?: ChessPiece;
  f?: ChessPiece;
  
  g1?: ChessPiece;
  g2?: ChessPiece;
  g3?: ChessPiece;
  g4?: ChessPiece;
  g5?: ChessPiece;
  g6?: ChessPiece;
  g7?: ChessPiece;
  g?: ChessPiece;
  
  h1?: ChessPiece;
  h2?: ChessPiece;
  h3?: ChessPiece;
  h4?: ChessPiece;
  h5?: ChessPiece;
  h6?: ChessPiece;
  h7?: ChessPiece;
  h?: ChessPiece;
}

export type BoardTile = keyof ChessBoard;

export interface ChessMove {
  from: BoardTile;
  to: BoardTile;
  capture?: boolean;
  promoteTo?: PromotionPieceType;
}

export interface ChessGame {
  startingBoard: ChessBoard;
  startingPlayer: Player;
  moves: ChessMove[];
}