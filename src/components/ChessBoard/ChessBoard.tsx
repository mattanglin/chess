import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid } from 'grommet';
import { Chess, ChessMove, ChessPiece, TileId } from '../../services/chess';
import { useAppDispatch, useAppSelector } from '../../store';
import { BoardTile } from './BoardTile';
import { makeMove } from '../../store/slices/chess';

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
  // TODO: State management for Selected Piece
  // TODO: Highlight

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
  const movePiece = useCallback((tile: TileId) => {
    const move = availableMoves.find((mv) => mv.from === selectedTile && mv.to === tile);
    if (move) {
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
  const resolveClickHandler = useCallback(({
    tile,
    piece,
  } : {
    tile: TileId;
    piece?: ChessPiece;
  }) => {
    // Resolve selecting a piece
    if ((!selectedTile && piece && Chess.piece(piece).player === player) || (selectedTile && tile === selectedTile)) return () => selectPiece(tile);
    if (selectedTile && availableMoves.find((mv) => mv.to === tile)) return () => movePiece(tile);
  }, [
    selectPiece,
    movePiece,
    player,
    selectedTile,
    availableMoves,
  ]);
  useEffect(() => {
    const playerMoves = Chess.getAllPlayerMoves({ player, board, moves });
    console.log({ playerMoves });
  }, [player]);

  return (
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
  )
}