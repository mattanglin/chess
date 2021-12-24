import { Box } from 'grommet';
import React from 'react';
import { ChessBoard } from '../ChessBoard/ChessBoard';

export const ChessGame = () => {
  return (
    <Box flex fill>
      <Box flex fill>
        <ChessBoard />
      </Box>
    </Box>
  );
};
