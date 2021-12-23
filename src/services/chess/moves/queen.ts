import { diagonal } from './diagonal';
import { straight } from './straight';
import { MoveFunc } from '../types';

/**
 * Determine possible Queen moves. Queens adhere to the following rules:
 * - 
 */
export const queen: MoveFunc = ({ board, tile}) => {
  const moves = [
    ...diagonal({ board, tile }),
    ...straight({ board, tile }),
  ];

  return moves;
};
