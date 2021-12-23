import { moves } from './moves';
import {
  ChessBoard,
  ChessPiece,
  ChessPieceType,
  ChessMove,
  ChessPlayer,
  TileFile,
  TileFileType,
  TileRank,
  TileRankType,
  TileType,
  TileId,
  TileObject,
  TileTuple,
  TileIndecesObject,
  TileIndecesTuple,
  TileConversionType,
} from './types';
import {
  startingBoard,
  files,
  ranks,
  fileMap,
  rankMap,
  PawnPiece,
  RookPiece,
  KnightPiece,
  BishopPiece,
  QueenPiece,
  KingPiece,
  WhitePlayer,
  BlackPlayer,
} from './constants';






/**
 * REFACTORED CHESS CLASS
 */

export interface ChessConfig {
  _board?: ChessBoard;
  _moves?: ChessMove[];
  _player?: ChessPlayer;
}

export class Chess {
  /**
   * The current chess board
   */
  private _board: ChessBoard;
  /**
   * The list of moves for a game in order
   */
  private _moves: ChessMove[];
  /**
   * The current player
   */
  private _player: ChessPlayer;

  constructor(config: ChessConfig = {}) {
    // Initialize with board, moves, etc
    this._board = config._board || startingBoard;
    this._moves = config._moves || [];
    this._player = config._player || 'W';
  }

  /**
   * STATIC METHODS
   */

  /**
   * Tile type guards
   */
  public static isTileId = (tile: TileType): tile is TileId => typeof tile === 'string';
  public static isTileTuple = (tile: TileType): tile is TileTuple => Array.isArray(tile) && typeof tile[0] === 'string';
  public static isTileObject = (tile: TileType): tile is TileObject => typeof tile === 'object' && !Array.isArray(tile) && typeof tile.file === 'string';
  public static isTileIndecesTuple = (tile: TileType): tile is TileIndecesTuple => Array.isArray(tile) && typeof tile[0] === 'number';
  public static isTileIndecesObject = (tile: TileType): tile is TileIndecesObject => typeof tile === 'object' && !Array.isArray(tile) && typeof tile.file === 'number';
  // public static isWhitePiece = (piece: ChessPiece): piece is 

  /**
   * Tile conversion functions
   */
  public static tile(tile: TileId): TileIndecesObject;
  public static tile(tile: TileObject | TileTuple | TileIndecesObject | TileIndecesTuple): TileId;
  public static tile(tile: TileType, type: 'id'): TileId;
  public static tile(tile: TileType, type: 'object'): TileObject;
  public static tile(tile: TileType, type: 'tuple'): TileTuple;
  public static tile(tile: TileType, type: 'indeces-object'): TileIndecesObject;
  public static tile(tile: TileType, type: 'indeces-tuple'): TileIndecesTuple;
  public static tile(tile: TileType, type?: TileConversionType) {
    // Determine conversion target type with defaults
    const targetType = type || (Chess.isTileId(tile) ? 'indeces-object' : 'id');

    // Convert to base type
    const base: TileObject = { file: 'a', rank: '1' };
    if (Chess.isTileId(tile) || Chess.isTileTuple(tile)) {
      base.file = tile[0] as TileFile;
      base.rank = tile[1] as TileRank;
    } else if (Chess.isTileIndecesObject(tile)) {
      base.file = files[tile.file];
      base.rank = ranks[tile.rank];
    } else if (Chess.isTileIndecesTuple(tile)) {
      base.file = files[tile[0]];
      base.rank = ranks[tile[1]];
    } else if (Chess.isTileObject(tile)) {
      base.file = tile.file;
      base.rank = tile.rank;
    }

    // Convert to the target type
    switch (targetType) {
      case 'id':
        return `${base.file}${base.rank}` as TileId;
      case 'object':
        return base as TileObject;
      case 'tuple':
        return [base.file, base.rank] as TileTuple;
      case 'indeces-object':
        return {
          file: fileMap[base.file],
          rank: rankMap[base.rank],
        } as TileIndecesObject;
      case 'indeces-tuple':
        return [
          fileMap[base.file],
          rankMap[base.rank]
        ] as TileIndecesTuple; 
    }
  }
  public static file = (tile: TileType, type: TileFileType = 'index') => type === 'index' ? Chess.tile(tile, 'indeces-object').file : Chess.tile(tile, 'object').file;
  public static rank = (tile: TileType, type: TileRankType = 'index') => type === 'index' ? Chess.tile(tile, 'indeces-object').rank : Chess.tile(tile, 'object').rank;


  /**
   * Helper to extract player / type from piece
   */
   public static piece = (piece: ChessPiece) => {
    const player = piece[0] as ChessPlayer;
    const type = piece[1] as ChessPieceType;

    return { player, type };
  }

  /**
   * Return possible piece at board tile position
   */
  public static get = (board: ChessBoard, tile: TileType) => {
    const pos = Chess.tile(tile, 'indeces-object');
    return board[pos.rank][pos.file];
  }

  /**
   * Validate and perform move on board.
   * Returns resulting board after move.
   */
  public static move = (board: ChessBoard, move: ChessMove): ChessBoard => {
    // TODO: Handle move
    return board;
  }

  /**
   * Get available moves for piece at tile position
   */
  public static getAvailableMoves = (board: ChessBoard, tile: TileType): ChessMove[] => {
    const availableMoves: ChessMove[] = [];
    const tileContent = Chess.get(board, tile);

    if (!tileContent) throw new Error(`Cannot determine moves for empty tile "${Chess.tile(tile, 'id')}"`);
    
    const piece = Chess.piece(tileContent);

    switch (piece.type) {
      case PawnPiece:
        availableMoves.push(...moves.pawn({ board, tile }));
        break;
      case RookPiece:
        availableMoves.push(...moves.rook({ board, tile }));
        break;
      case KnightPiece:
        availableMoves.push(...moves.knight({ board, tile }));
        break;
      case BishopPiece:
        availableMoves.push(...moves.bishop({ board, tile }));
        break;
      case QueenPiece:
        availableMoves.push(...moves.queen({ board, tile }));
        break
      case KingPiece:
        availableMoves.push(...moves.king({ board, tile }));
        break;
    }

    // TODO: Filter based on other situations?
    
    return availableMoves;
  }

  /**
   * GETTERS / SETTERS
   * TODO:
   * - getter for board
   * - getter for player
   * - getter for moves
   * - getter for status?
   */

  public get board() {
    return this._board;
  }

  public get player() {
    return this._player;
  }

  public get moves() {
    return this._moves;
  }

  /**
   * INSTANCE METHODS
   */

  /**
   * Return possible piece at board tile position
   */
  public get = (tile: TileType) => Chess.get(this._board, tile);

  /**
   * Validate and perform move on board.
   * Adds move to list of moves.
   * Returns resulting board after move.
   */
  public move = (move: ChessMove) => {
    const resultBoard = Chess.move(this._board, move);
    this._moves.push(move);
    this._player = this._player === WhitePlayer ? BlackPlayer : WhitePlayer;
    // TODO: Update Status?
  }

  public getAvailableMoves = (tile: TileType) => Chess.getAvailableMoves(this._board, tile);

}