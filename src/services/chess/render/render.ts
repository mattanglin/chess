import { Chess } from '../Chess';
import {
  RenderObject,
  RenderType,
  ChessBoard,
  ChessMove,
  ChessPiece,
  TileId,
} from '../types';
import { text } from './text';
import { symbol } from './symbol';

const renderTypes: Record<RenderType, RenderObject> = {
  text,
  symbol,
};

export interface RenderConfig {
  moves?: ChessMove[];
  type?: RenderType;
}

const activeChar = 'o';
const captureChar = 'x';


const renderTileContent = ({
  piece,
  active,
  type = 'symbol',
}: {
  piece?: ChessPiece;
  active?: boolean;
  type: RenderType;
}) => {
  if (piece) {
    if (active) {
      return ` ${captureChar} `;
    } else {
      return ` ${renderTypes[type][piece]} `;
    }
  } else {
    if (active) {
      return ` ${activeChar} `;
    } else {
      return '   ';
    }
  }
}

export const render = (
  board: ChessBoard,
  {
    moves = [],
    type = 'symbol',
  }: RenderConfig = {},
  ) => {
  const moveObj = moves.reduce((agg, move) => ({
    ...agg,
    [move.to]: true,
  }), {} as Record<TileId, boolean>);

  // Map the board and render
  const rankSeparator = `---------------------------------`;
    const asciiString = `${
      board.reduce((s, rankFiles, rankIdx) => `${s}\n${rankSeparator}\n${
        rankFiles.reduce((rankString, piece, fileIdx) => `${rankString}|${
          `${renderTileContent({
            piece,
            type,
            active: moveObj[Chess.tile([fileIdx, rankIdx])],
          })}${fileIdx === 7 ? '|' : ''}`
        }`, '')
      }`, '')
    }\n${rankSeparator}\n`
    return asciiString;
}
