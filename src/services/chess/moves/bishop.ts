import { diagonal } from './diagonal';
import { MoveFunc } from '../types';

export const bishop: MoveFunc = ({ board, tile, moves }) => diagonal({ board, tile, moves });
