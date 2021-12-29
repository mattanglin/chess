import { Box, Grid, Heading, Layer } from 'grommet';
import React, { useMemo } from 'react';
import {
  BlackBishop,
  BlackKnight,
  BlackQueen,
  BlackRook,
  ChessPlayer,
  PromotionPiece,
  WhiteBishop,
  WhiteKnight,
  WhiteQueen,
  WhiteRook,
} from '../../services/chess';
import { ChessPiece } from '../ChessPiece/ChessPiece';

export interface PawnPromotionModalProps {
  player: ChessPlayer;
  onClick?: (promoteTo: PromotionPiece) => void;
  onClose?: () => void;
  open?: boolean;
}

export const PawnPromotionModal = ({
  player,
  open = true,
  onClick = () => undefined,
  onClose = () => undefined,
}: PawnPromotionModalProps) => {
  // TODO: Get pieces based on color
  const pieces = useMemo(() => 
    player === 'W'
    ? [WhiteQueen, WhiteKnight, WhiteBishop, WhiteRook]
    : [BlackQueen, BlackKnight, BlackBishop, BlackRook]
    , [player]
  );
  
  if (open) {
    return (
      <Layer onClickOutside={onClose}>
        <Box pad="large">
          <Heading level="2" margin="0">Pawn Promotion</Heading>
          <Grid rows={['flex', 'flex']} columns={['flex', 'flex']} gap="xsmall" margin={{ top: 'large' }}>
            {pieces.map((piece) => (
              <Box
                key={piece}
                border={{ size: '1px', color: 'rgba(0,0,0,0.5)' }}
                round="2px"
                onClick={() => onClick(piece)}
              >
                <ChessPiece piece={piece} />
              </Box>
            ))}
          </Grid>
        </Box>
      </Layer>
    );
  }

  return null;
}
