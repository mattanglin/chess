import { MoveFunc } from '../types';
import { straight } from './straight';

/**
 * Determine available Rook moves. Rooks adhere to the following rules:
 * - Can move in any direction horizontally
 * - Can move in any direction vertically
 * - Can capture pieces in it's m ovement path
 * - Can castle with king
 * 
 * TODO: Do we handle castling here or in King move? Probably the King?
 */
export const rook: MoveFunc = ({ board, tile, moves }) => straight({ board, tile, moves });
