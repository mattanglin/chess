import { Box } from 'grommet';
import React from 'react';
import { ChessPiece as ChessPieceProp, TileId } from '../../services/chess';
import { ChessPiece } from '../ChessPiece/ChessPiece';
import { StyledStack } from './BoardTile.style';

export interface BoardTileProps {
  id: TileId;
  bg: 'dark' | 'light';
  piece?: ChessPieceProp;
  /**
   * Set overlay for movement available
   */
  available?: boolean;
  /**
   * Highlight tile from previous move
   */
  highlighted?: boolean;
  /**
   * Current tile is selected
   */
  selected?: boolean;
  /**
   * Click Handler
   */
  onClick?: () => void;
}

export const BoardTile = (props: BoardTileProps) => {
  const {
    id,
    bg,
    piece,
    available,
    highlighted,
    selected,
    onClick,
  } = props;

  return (
    <StyledStack onClick={onClick}>
      <Box
        style={{
          paddingTop: '100%',
          position: 'relative',
        }}
        background={bg === 'dark' ? '#749655' : '#ECEED4'}
      />
      {selected && <Box fill background="rgba(0, 255, 0, 0.5)" />}
      {piece && <ChessPiece piece={piece} />}
      {available && (
        <Box fill pad="medium">
          <Box flex round="full" border={{ color: 'rgba(255,255,255, 0.85)', size: '4px' }} background="rgba(255,255,255,0.25)" />
        </Box>
      )}
    </StyledStack>
  )
}