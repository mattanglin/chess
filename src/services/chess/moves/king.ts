import { diagonal } from './diagonal';
import { straight } from './straight';
import { MoveFunc } from '../types';

/**
 * Determine possible King moves. Kings adhere to the following rules:
 * - 
 */
export const king: MoveFunc = ({ board, tile}) => {
  console.log('Checking king moves?');
  const moves = [
    ...straight({ board, tile, length: 1}),
    ...diagonal({ board, tile, length: 1}),
  ];

  // TODO: Handle invalid check moves

  return moves;
};
