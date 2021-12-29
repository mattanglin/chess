import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid } from 'grommet';
import { Chess, ChessMove, ChessPiece, PromotionPiece, TileId } from '../../services/chess';
import { useAppDispatch, useAppSelector } from '../../store';
import { BoardTile } from './BoardTile';
import { makeMove } from '../../store/slices/chess';
import { PawnPromotionModal } from './PawnPromotionModal';

export const ChessBoard = () => {
  const { board, player, moves } = useAppSelector(state => state.chess);
  const dispatch = useAppDispatch();
  const [selectedTile, setSelectedTile] = useState<TileId | undefined>(undefined);
  const [availableMoves, setAvailableMoves] = useState<ChessMove[]>([]);
  
  const lastMoveMap = moves.length ? {
    [moves[moves.length - 1].from]: moves[moves.length - 1],
    [moves[moves.length - 1].to]: moves[moves.length - 1],
  } : {};
  const availableMovesMap = availableMoves.reduce((agg, mv) => ({
    ...agg,
    [mv.to]: mv,
  }), {} as Record<TileId, ChessMove>);

  // TODO: State management for move time travel

  /**
   * Piece movement:
   * - Clicking a piece should select it and show all of it's possible moves on the board
   * - If a piece has no moves show a notification
   * - 
   */
  const selectPiece = useCallback((tile: TileId) => {
    // Deselect tile
    if (tile === selectedTile) {
      setSelectedTile(undefined);
      setAvailableMoves([]);
    } else if (!selectedTile) {
      const isUnderAttack = Chess.tileAttacked({ board, tile, player });
      console.log(`Tile: ${Chess.tile(tile, 'id')} - ${isUnderAttack ? 'ATTACKED' : 'safe'}`);

      // Get possible moves
      try {
        const possibleMoves = Chess.getAvailableMoves({ board, tile, moves })
        if (possibleMoves.length) {
          setSelectedTile(tile);
          setAvailableMoves(possibleMoves);
        } else {
          // TODO: Handle no moves?
        }
      } catch (err) {
        // TODO: Handle error
        console.log('ERROR:', err);
      }
    }

  }, [board, selectedTile, setSelectedTile, setAvailableMoves, moves, player]);
  const movePiece = useCallback((tile: TileId, promotion?: PromotionPiece) => {
    const verifiedMove = availableMoves.find((mv) => mv.from === selectedTile && mv.to === tile);
    if (verifiedMove) {
      const move = { ...verifiedMove, promotion };
      console.log('move:', { tile, move, selectedTile })
      dispatch(makeMove(move));
      setSelectedTile(undefined);
      setAvailableMoves([]);
    }
  }, [
    dispatch,
    selectedTile,
    setSelectedTile,
    availableMoves,
    setAvailableMoves,
  ]);
  // Pawn Promotion
  const [pawnPromotionTile, setPawnPromotionTile] = useState<TileId | undefined>(undefined);
  const openPawnPromotion = useCallback((tile: TileId) => {
    setPawnPromotionTile(tile);
  }, [setPawnPromotionTile]);
  const closePawnPromotion = useCallback(() => setPawnPromotionTile(undefined), [setPawnPromotionTile]);
  const movePawnAndPromote = useCallback((promotion: PromotionPiece) => {
    if (pawnPromotionTile) {
      movePiece(pawnPromotionTile, promotion)
      setPawnPromotionTile(undefined);
    }
  }, [movePiece, pawnPromotionTile, setPawnPromotionTile]);

  /**
   * Tile Click Handlers
   */
  const resolveClickHandler = useCallback(({
    tile,
    piece,
  } : {
    tile: TileId;
    piece?: ChessPiece;
  }) => {
    // Resolve selecting a piece
    if ((!selectedTile && piece && Chess.piece(piece).player === player) || (selectedTile && tile === selectedTile)) return () => selectPiece(tile);
    // Resolve moving a piece normally
    if (selectedTile) {
      // Can we move to this tile?
      const tileMove = availableMoves.find((mv) => mv.to === tile);

      if (tileMove) {
        // Pawn Promotion Modal
        if (tileMove.promotion) return () => openPawnPromotion(tile);

        // Normal Move
        return () => movePiece(tile);
      }

    }
  }, [
    selectPiece,
    openPawnPromotion,
    movePiece,
    player,
    selectedTile,
    availableMoves,
  ]);
  // TODO: Testing...
  useEffect(() => {
    const playerMoves = Chess.getAllPlayerMoves({ player, board, moves });
    console.log({ playerMoves });
  }, [player]);

  return (
    <>
      <Grid
        style={{ background: 'black' }}
        rows={['flex', 'flex', 'flex', 'flex', 'flex', 'flex', 'flex', 'flex']}
        columns={['flex', 'flex', 'flex', 'flex', 'flex', 'flex', 'flex', 'flex']}
        fill
      >
        {board.reduce((tiles, row, rankIdx) => [
          ...tiles,
          ...row.reduce((rowTiles, piece, fileIdx) => [
            ...rowTiles,
            <BoardTile
              key={Chess.tile([fileIdx, rankIdx])}
              id={Chess.tile([fileIdx, rankIdx])}
              onClick={resolveClickHandler({
                piece,
                tile: Chess.tile([fileIdx, rankIdx]),
              })}
              bg={(fileIdx + rankIdx) % 2 === 0 ? 'light' : 'dark'}
              piece={piece}
              selected={selectedTile && selectedTile === Chess.tile([fileIdx, rankIdx])}
              available={!!availableMovesMap[Chess.tile([fileIdx, rankIdx])]}
              highlighted={!!lastMoveMap[Chess.tile([fileIdx, rankIdx])]}
            />
          ], [] as JSX.Element[])
        ], [] as JSX.Element[])}
      </Grid>
      <PawnPromotionModal
        player={player}
        open={!!pawnPromotionTile}
        onClick={movePawnAndPromote}
        onClose={closePawnPromotion}
      />
    </>
  )
}