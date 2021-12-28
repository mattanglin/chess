import { moves as pieceMoves } from './moves';
import {
  ChessBoard,
  ChessPiece,
  ChessPieceType,
  ChessMove,
  MoveParams,
  TravelParams,
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
  BlackKing,
  WhiteKing,
} from './constants';
import { BlackPawn, GameStatus, GameStatusParams, PopParams, WhitePawn } from '.';
import { attacked } from './status/attacked';

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
   * Helper to clone ChessBoard arrays
   */
  public static clone = (board: ChessBoard) => {
    const clonedBoard = board.map((rank) => (
      rank.map((tile) => tile)
    ));
    return clonedBoard as ChessBoard;
  }

  /**
   * Helper to get the next player
   */
  public static nextPlayer = (player: ChessPlayer) => player === WhitePlayer ? BlackPlayer : WhitePlayer;

  /**
   * Return possible piece at board tile position
   */
  public static get = ({ board, tile }: { board: ChessBoard; tile: TileType }) => {
    const pos = Chess.tile(tile, 'indeces-object');
    return board[pos.rank]?.[pos.file];
  }

  /**
   * Set ChessBoard tile
   */
  public static set = ({ board, tile, piece }: { board: ChessBoard; tile: TileType; piece?: ChessPiece }) => {
    const pos = Chess.tile(tile, 'indeces-object');
    board[pos.rank][pos.file] = piece;
    return board;
  }

  /**
   * Find tiles by ChessPiece on a ChessBoard
   */
  public static tileByPiece = ({ piece: pieceToFind, board }: { piece: ChessPiece; board: ChessBoard }) => {
    const tiles: TileId[] = [];
    board.forEach((rank, rankIdx) => {
      rank.forEach((piece, fileIdx) => {
        if (piece === pieceToFind) {
          tiles.push(Chess.tile({ file: fileIdx, rank: rankIdx }));
        }
      })
    });
    return tiles;
  }


  /**
   * Get available moves for piece at tile position
   */
  public static getAvailableMoves = ({
    board,
    tile,
    moves,
  }: {
    board: ChessBoard;
    tile: TileType;
    moves: ChessMove[];
  }): ChessMove[] => {
    const availableMoves: ChessMove[] = [];
    const tileContent = Chess.get({ board, tile });

    if (!tileContent) throw new Error(`Cannot determine moves for empty tile "${Chess.tile(tile, 'id')}"`);
    
    const piece = Chess.piece(tileContent);

    switch (piece.type) {
      case PawnPiece:
        availableMoves.push(...pieceMoves.pawn({ board, tile, moves }));
        break;
      case RookPiece:
        availableMoves.push(...pieceMoves.rook({ board, tile, moves }));
        break;
      case KnightPiece:
        availableMoves.push(...pieceMoves.knight({ board, tile, moves }));
        break;
      case BishopPiece:
        availableMoves.push(...pieceMoves.bishop({ board, tile, moves }));
        break;
      case QueenPiece:
        availableMoves.push(...pieceMoves.queen({ board, tile, moves }));
        break
      case KingPiece:
        availableMoves.push(...pieceMoves.king({ board, tile, moves }));
        break;
    }

    // TODO: Filter based on other situations? Or handle that within each function?
    
    return availableMoves;
  }

  public static getAllPlayerTiles = ({ player, board }: { player: ChessPlayer; board: ChessBoard}) => {
    const playerTiles: TileId[] = [];
    board.forEach((rank, rankIdx) => {
      rank.forEach((piece, fileIdx) => {
        if (piece && Chess.piece(piece).player === player) {
          playerTiles.push(Chess.tile({ file: fileIdx, rank: rankIdx }));
        }
      });
    });
    return playerTiles;
  }

  public static getAllPlayerMoves = ({ player, board, moves = [] }: { player: ChessPlayer; board: ChessBoard; moves: ChessMove[] }) => {
    const playerTiles = Chess.getAllPlayerTiles({ player, board });
    const playerMoves: ChessMove[] = [];
    playerTiles.forEach((tileId) => {
      playerMoves.push(...Chess.getAvailableMoves({ board, tile: tileId, moves }));
    });
    return playerMoves;
  }

  /**
   * Validates whether a move is legal or not.
   * Throws error on invalid move.
   * TODO: Pass current game moves to validate catling and en passant
   */
  public static validateMove = ({ board, move, player, moves }: MoveParams): ChessMove => {
    const tilePiece = Chess.get({ board: board, tile: move.from });

    // Is there a piece here?
    if (!tilePiece) throw new Error(`Cannot move piece from empty tile "${move.from}"`);
    
    // Is this the correct player?
    const piece = Chess.piece(tilePiece);
    if (piece.player !== player) throw new Error(`Cannot move other players piece at tile "${move.from}"`);

    // Get all possible legal moves for this piece and check that this is one of those moves
    const availableMoves = Chess.getAvailableMoves({ board, tile: move.from, moves });
  
    const verifiedMove = availableMoves.find((mv) => mv.from === move.from && mv.to === move.to);

    // TODO: Is this a pawn promotion with a selectedpiece promotion?

    if (!verifiedMove) throw new Error(`Invalid move of piece ${tilePiece} from tile "${move.from}" to "${move.to}"`)

    // TODO: Pass along promotion as necessary

    // Is the player currently in check?
    // Is the player now out of check?
    // Will this be covered by the available moves eventually? Probably
    return verifiedMove;
  }

  /**
   * Determine if tile is under attack
   */
  public static tileAttacked = (params: { board: ChessBoard; player: ChessPlayer; tile: TileType }) => attacked(params);

  /**
   * Determine game status
   * TODO: Option tocheck shallow game status? (i.e. No checkmate / stalemate?)
   */
  public static status = ({ player, board }: GameStatusParams): GameStatus => {
    const playerKing = player === 'W' ? WhiteKing : BlackKing
    const [kingTile] = Chess.tileByPiece({ board, piece: playerKing });
    
    // Is the current player in check?
    const kingAttacked = Chess.tileAttacked({ board, player, tile: kingTile });
    // NOTE: We don't care about actually passing moves list since that only affects en passant & caslting which don't affect checkmate/stalemate
    const playerMoves = Chess.getAllPlayerMoves({ board, player, moves: [] });
    const playerHasEscapeMove = playerMoves.find((move) => {
      const resultBoard = Chess.movePiece({ board, move });
      const resultKingTile = Chess.piece(move.piece).type === 'K' ? move.to : kingTile;

      return !Chess.tileAttacked({ board: resultBoard, tile: resultKingTile, player });
    }) !== undefined;
  
    // check/checkmate status
    if (kingAttacked) {
      if (playerHasEscapeMove) {
        return player === 'W' ? 'WhiteInCheck' : 'BlackInCheck';
      } else {
        return player === 'W' ? 'WhiteInCheckmate' : 'BlackInCheckmate';
      }
    } else if (!playerHasEscapeMove) {
      // Are we in stalemate?
      return player === 'W' ? 'WhiteInStalemate' : 'BlackInStalemate';
    }
  
    return player === 'W' ? 'WhiteToPlay' : 'BlackToPlay';
  };

  /**
   * Basic moving of piece with no validation or end status
   */
  public static movePiece = ({ board: originalBoard, move }: { board: ChessBoard; move: ChessMove }) => {
    const board = Chess.clone(originalBoard);
    const piece = move.promotion || Chess.get({ board, tile: move.from });

    //  Move piece
    Chess.set({ board, tile: move.from });
    Chess.set({ board, tile: move.to, piece });

    // Handle en passant capture
    if (move.enPassantCapture) {
      const capturedPieceTile = Chess.tile([
        Chess.tile(move.to).file,
        Chess.tile(move.from).rank
      ]);
      Chess.set({ board, tile: capturedPieceTile });
    }

    // Handle Castling
    if (move.castle) {
      // White Castling
      if (move.piece === 'WK') {
        if (move.castle === 'K') {
          Chess.set({ board, tile: 'h1' });
          Chess.set({ board, tile: 'f1', piece: 'WR' });
        } else if (move.castle === 'Q') {
          Chess.set({ board, tile: 'a1' });
          Chess.set({ board, tile: 'd1', piece: 'WR' });
        }
      }
      // Black Castling
      if (move.piece === 'BK') {
        if (move.castle === 'K') {
          Chess.set({ board, tile: 'h8' });
          Chess.set({ board, tile: 'f8', piece: 'BR' });
        } else if (move.castle === 'Q') {
          Chess.set({ board, tile: 'a8' });
          Chess.set({ board, tile: 'd8', piece: 'BR' });
        }
      }
    }

    return board;
  }
  
  /**
   * Validate and perform move on board.
   * Returns resulting board after move.
   * TODO: Get game status after move
   */
  public static move = ({ board, move, player, moves }: MoveParams) => {
    // Verify Move
    const verifiedMove = Chess.validateMove({ board, move, player, moves });
    // Move Piece
    const boardAfterMove = Chess.movePiece({ board, move });
    // Toggle next player
    const nextPlayer = Chess.nextPlayer(player);
    // Check Game Status
    const status = Chess.status({ board: boardAfterMove, player: nextPlayer });

    return {
      board: boardAfterMove,
      move: verifiedMove,
      player: nextPlayer,
      status,
    };
  }

  /**
   * Add a number of moves all at once to get the resulting board
   */
  public static travel = ({ board, moves = [], player }: TravelParams) => {
    const firstMovePiece = Chess.get({ board, tile: moves[0].from });
    let currentPlayer = player || Chess.piece(firstMovePiece!).player;

    moves.forEach((move) => {
      const piece = Chess.get({ board, tile: move.from });
      Chess.set({ board, tile: move.from });
      Chess.set({ board, tile: move.to, piece });

      // Handle en passant capture
      if (move.enPassantCapture) {
        const capturedPieceTile = Chess.tile([
          Chess.tile(move.to).file,
          Chess.tile(move.from).rank
        ]);
        Chess.set({ board, tile: capturedPieceTile });
      }

      // Handle Castling
      if (move.castle) {
        // White Castling
        if (move.piece === 'WK') {
          if (move.castle === 'K') {
            Chess.set({ board, tile: 'h1' });
            Chess.set({ board, tile: 'f1', piece: 'WR' });
          } else if (move.castle === 'Q') {
            Chess.set({ board, tile: 'a1' });
            Chess.set({ board, tile: 'd1', piece: 'WR' });
          }
        }
        // Black Castling
        if (move.piece === 'BK') {
          if (move.castle === 'K') {
            Chess.set({ board, tile: 'h8' });
            Chess.set({ board, tile: 'f8', piece: 'BR' });
          } else if (move.castle === 'Q') {
            Chess.set({ board, tile: 'a8' });
            Chess.set({ board, tile: 'd8', piece: 'BR' });
          }
        }
      }

      // Toggle current player
      currentPlayer = Chess.nextPlayer(currentPlayer);
    });

    return {
      board,
      player: currentPlayer,
      moves,
    }
  }

  /**
   * Pop moves off the move stack and return the board to previous states
   */
  public static pop = ({
    board,
    moves = [],
    count = 1,
  }: PopParams) => {
    for (let i = 0; i < count && moves.length; i++) {
      const move = moves.pop()!;
      const piece = Chess.get({ board, tile: move.to }) as ChessPiece;
      const moveingPiece = move.promotion ? `${Chess.piece(piece).player}${PawnPiece}` as ChessPiece : piece;
      const replacedPiece = move.capture;

      Chess.set({ board, tile: move.from, piece: moveingPiece })
      Chess.set({ board, tile: move.to, piece: replacedPiece });

      // Handle en passant capture
      if (move.enPassantCapture) {
        const capturedPieceTile = Chess.tile([
          Chess.tile(move.to).file,
          Chess.tile(move.from).rank,
        ]);
        const capturedPiece = Chess.piece(piece).player === 'W' ? BlackPawn : WhitePawn
        Chess.set({ board, tile: capturedPieceTile, piece: capturedPiece })
      }

      // Handle Castling
      if (move.castle) {
        // White Castling
        if (move.piece === 'WK') {
          if (move.castle === 'K') {
            Chess.set({ board, tile: 'f1' });
            Chess.set({ board, tile: 'h1', piece: 'WR' });
          } else if (move.castle === 'Q') {
            Chess.set({ board, tile: 'd1' });
            Chess.set({ board, tile: 'a1', piece: 'WR' });
          }
        }

        // Black Castling
        if (move.piece === 'BK') {
          if (move.castle === 'K') {
            Chess.set({ board, tile: 'f8' });
            Chess.set({ board, tile: 'h8', piece: 'BR' });
          } else if (move.castle === 'Q') {
            Chess.set({ board, tile: 'd8' });
            Chess.set({ board, tile: 'a8', piece: 'BR' });
          }
        }
      }
    }
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
  public get = (tile: TileType) => Chess.get({ board: this._board, tile });

  /**
   * Set piece on board tile
   */
  public set = ({ tile, piece }: { tile: TileType; piece?: ChessPiece }) => Chess.set({ tile, piece, board: this._board });

  /**
   * Validate move
   */
  public validateMove = (move: ChessMove) => Chess.validateMove({ move, board: this._board, player: this._player, moves: this._moves });

  /**
   * Validate and perform move on board.
   * Adds move to list of moves.
   * Returns resulting board after move.
   */
  public move = (move: ChessMove) => {
    const result = Chess.move({ move, board: this._board, player: this._player, moves: this._moves });
    this._moves.push(result.move);
    this._player = result.player;
    // TODO: Update Status?
  }

  public getAvailableMoves = (tile: TileType) => Chess.getAvailableMoves({ board: this._board, moves: this._moves, tile });

}