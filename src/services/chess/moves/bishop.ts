import { diagonal } from './diagonal';
import { MoveFunc } from '../types';

export const bishop: MoveFunc = ({ board, tile }) => diagonal({ board, tile });
