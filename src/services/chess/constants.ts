import {
  ChessPieceType,
  ChessPlayer,
  WhiteKingType,
  WhiteQueenType,
  WhiteBishopType,
  WhiteKnightType,
  WhiteRookType,
  WhitePawnType,
  BlackKingType,
  BlackQueenType,
  BlackBishopType,
  BlackKnightType,
  BlackRookType,
  BlackPawnType,
  TileRank,
  TileFile,
  TileIndex,
  ChessBoard,
} from './types';

 export const KingPiece: ChessPieceType = 'K';
 export const QueenPiece: ChessPieceType = 'Q';
 export const BishopPiece: ChessPieceType = 'B';
 export const KnightPiece: ChessPieceType = 'N';
 export const RookPiece: ChessPieceType = 'R';
 export const PawnPiece: ChessPieceType = 'P';
 export const WhitePlayer: ChessPlayer = 'W';
 export const BlackPlayer: ChessPlayer = 'B';
 export const WhiteKing: WhiteKingType = 'WK';
 export const WhiteQueen: WhiteQueenType = 'WQ';
 export const WhiteBishop: WhiteBishopType = 'WB';
 export const WhiteKnight: WhiteKnightType = 'WN';
 export const WhiteRook: WhiteRookType = 'WR';
 export const WhitePawn: WhitePawnType = 'WP';
 export const BlackKing: BlackKingType = 'BK';
 export const BlackQueen: BlackQueenType = 'BQ';
 export const BlackBishop: BlackBishopType = 'BB';
 export const BlackKnight: BlackKnightType = 'BN';
 export const BlackRook: BlackRookType = 'BR';
 export const BlackPawn: BlackPawnType = 'BP';
 
 export const ranks: TileRank[] = ['8', '7', '6', '5', '4', '3', '2', '1'];
 export const rankMap: Record<TileRank, TileIndex> = { '8': 0, '7': 1, '6': 2, '5': 3, '4': 4, '3': 5, '2': 6, '1': 7 };
 export const files: TileFile[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
 export const fileMap: Record<TileFile, TileIndex> = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7 };
 
 export const startingBoard: ChessBoard = [
   // Rank 8
   [BlackRook, BlackKnight, BlackBishop, BlackKing, BlackQueen, BlackBishop, BlackKnight, BlackRook],
   // Rank 7
   [BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn],
   // Rank 6
   [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
   // Rank 5
   [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
   // Rank 4
   [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
   // Rank 3
   [undefined, undefined, WhiteBishop, undefined, undefined, undefined, undefined, undefined],
   // Rank 2
   [WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn],
   // Rank 1
   [WhiteRook, WhiteKnight, WhiteBishop, WhiteKing, WhiteQueen, WhiteBishop, WhiteKnight, WhiteRook],
 ];
 