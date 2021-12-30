export type KingType = 'K';
export type QueenType = 'Q';
export type BishopType = 'B';
export type KnightType = 'N';
export type RookType = 'R';
export type PawnType = 'P';
export type ChessPieceType = KingType | QueenType | BishopType | KnightType | RookType | PawnType;
export type WhitePlayerType = 'W';
export type BlackPlayerType = 'B';
export type ChessPlayer = WhitePlayerType | BlackPlayerType;
export type WhiteKingType = 'WK';
export type WhiteQueenType = 'WQ';
export type WhiteBishopType = 'WB';
export type WhiteKnightType = 'WN';
export type WhiteRookType = 'WR';
export type WhitePawnType = 'WP';
export type BlackKingType = 'BK';
export type BlackQueenType = 'BQ';
export type BlackBishopType = 'BB';
export type BlackKnightType = 'BN';
export type BlackRookType = 'BR';
export type BlackPawnType = 'BP';
export type ChessPiece = 
  | WhiteKingType | WhiteQueenType | WhiteBishopType | WhiteKnightType | WhiteRookType | WhitePawnType
  | BlackKingType | BlackQueenType | BlackBishopType | BlackKnightType | BlackRookType | BlackPawnType;
export type PromotionPiece =
  | WhiteQueenType | WhiteKnightType | WhiteBishopType | WhiteRookType
  | BlackQueenType | BlackKnightType | BlackBishopType | BlackRookType;
export type WhitePiece = WhiteKingType | WhiteQueenType | WhiteBishopType | WhiteKnightType | WhiteRookType | WhitePawnType;
export type BlackPiece = BlackKingType | BlackQueenType | BlackBishopType | BlackKnightType | BlackRookType | BlackPawnType;
export type OptionalPiece = ChessPiece | undefined;
export type ChessBoard = [
  [OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece],
  [OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece],
  [OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece],
  [OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece],
  [OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece],
  [OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece],
  [OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece],
  [OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece, OptionalPiece],
];

export type TileRank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type TileFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
export type TileIndex = number;
export type TileFileIndex = TileIndex;
export type TileRankIndex = TileIndex;
export type TileFileType = 'file' | 'index';
export type TileRankType = 'rank' | 'index';
export type TileId =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8'
  | 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8'
  | 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8'
  | 'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8'
  | 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8'
  | 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8'
  | 'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8'
  | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8';
export type TileTuple = [TileFile, TileRank];
export type TileObject = { file: TileFile; rank: TileRank };
export type TileIndecesObject = { file: TileFileIndex; rank: TileRankIndex };
export type TileIndecesTuple = [TileFileIndex, TileRankIndex];
export type TileType = TileId | TileTuple | TileObject | TileIndecesObject | TileIndecesTuple;
export type TileConversionType = 'id' | 'object' | 'tuple' | 'indeces-object' | 'indeces-tuple';

/**
 * TODO: Expand this to handle the following:
 * - capture
 * - promotion
 * - player?
 */
export interface ChessMove {
  piece: ChessPiece;
  from: TileId;
  to: TileId;
  capture?: ChessPiece
  promotion?: PromotionPiece;
  enPassantCapture?: boolean;
  castle?: 'K' | 'Q';
  check?: boolean;
  checkmate?: boolean;
  // Disambiguation?
  disambiguation?: string;
}
export type WhiteToPlayStatus = 'WhiteToPlay';
export type BlackToPlayStatus = 'BlackToPlay';
export type WhiteInCheckStatus = 'WhiteInCheck';
export type BlackInCheckStatus = 'BlackInCheck';
export type WhiteInCheckmateStatus = 'WhiteInCheckmate';
export type BlackInCheckmateStatus = 'BlackInCheckmate';
export type WhiteInStalemateStatus = 'WhiteInStalemate';
export type BlackInStalemateStatus = 'BlackInStalemate';
export type GameStatus =
  | WhiteToPlayStatus
  | BlackToPlayStatus
  | WhiteInCheckStatus
  | BlackInCheckStatus
  | WhiteInCheckmateStatus
  | BlackInCheckmateStatus
  | WhiteInStalemateStatus
  | BlackInStalemateStatus;
export interface GameStatusParams {
  player: ChessPlayer;
  board: ChessBoard;
  // TODO: Do we need moves? Probably not since castling is not available when in check or checkmate
}

/**
 * Move Types
 */
export interface MoveParams {
  board: ChessBoard;
  move: ChessMove;
  player: ChessPlayer;
  moves: ChessMove[];
  status?: boolean;
}

export interface TravelParams {
  board: ChessBoard;
  moves: ChessMove[];
  player?: ChessPlayer;
}

export interface PopParams {
  board: ChessBoard;
  moves: ChessMove[];
  count?: number;
}
 export interface MoveFuncParams {
  board: ChessBoard;
  tile: TileType;
  length?: 1 | 7;
  // TODO: Other possible things like promotion piece?
  moves: ChessMove[];
}

export interface ValidateMoveParams {
  board: ChessBoard;
  move: ChessMove;
}
export type MoveFunc = (params: MoveFuncParams) => ChessMove[];

/**
 * Render Types
 */
 export type RenderObject = Record<ChessPiece, string>;
 export type RenderType = 'symbol' | 'text';