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
  
  const availableMoves = [
    ...straight({ board, tile, moves, length: 1}),
    ...diagonal({ board, tile, moves, length: 1}),
  ];

  // TODO: Castling
  // TODO: Need to finish tile under attack method prior to castling
  // Queen Side Castle?
  // King Side Castle?

  // TODO: Handle invalid check moves

  return availableMoves;
};
