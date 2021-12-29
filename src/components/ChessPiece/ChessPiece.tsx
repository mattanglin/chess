import { Box, Image } from 'grommet';
import React from 'react';
import { ChessPiece as ChessPieceProp } from '../../services/chess';
import WP from './svg/W_P.svg';
import WR from './svg/W_R.svg';
import WN from './svg/W_N.svg';
import WB from './svg/W_B.svg';
import WQ from './svg/W_Q.svg';
import WK from './svg/W_K.svg';
import BP from './svg/B_P.svg';
import BR from './svg/B_R.svg';
import BN from './svg/B_N.svg';
import BB from './svg/B_B.svg';
import BQ from './svg/B_Q.svg';
import BK from './svg/B_K.svg';

const pieceMap: Record<ChessPieceProp, string> = { WP, WR, WN, WB, WQ, WK, BP, BR, BN, BB, BQ, BK };

export interface ChessPieceProps {
  piece: ChessPieceProp;
}

export const ChessPiece = ({
  piece,
}: ChessPieceProps) => {
  return (
    <Box fill pad="small">
      <Image src={pieceMap[piece]} alt={piece} />
    </Box>
  )
}