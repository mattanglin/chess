import { Box } from 'grommet';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Chess, ChessMove } from '../../services/chess';

const NavigationWrapper = styled(Box)({

});

export interface NavigationProps {
  moves: ChessMove[];
  onNavigate?: (inPlay: boolean) => void;
}

export const Navigation = ({
  moves,
}: NavigationProps) => {
  const algebraic = useMemo(() => Chess.algebraic(moves), [moves]);

  return (
    <NavigationWrapper>
      <Box className="wrapper" direction="row-reverse" overflow="scroll" height={{ min: '32px' }} align="center">
        <Box className="inner" direction="row" width={{ max: 'none', min: '100%' }} overflow="visible" flex={false}>
          {Array.from({ length: Math.ceil(algebraic.length / 2) }).map((_, i) => {
            const white = algebraic[i * 2];
            const black = algebraic[i * 2 + 1];

            return (
              <Box key={`${i}-${white}-${black}`} direction="row" gap="xsmall" flex={false}>
                <Box>{i + 1}.</Box>
                {white && <Box>{white}</Box>}
                {black && <Box>{black}</Box>}
              </Box>
            )
          })}
        </Box>
      </Box>
    </NavigationWrapper>
  )
};
