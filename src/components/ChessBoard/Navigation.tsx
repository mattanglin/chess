import React, { useCallback, useMemo, useState } from 'react';
import { Box, Button } from 'grommet';
import { Chess, ChessMove } from '../../services/chess';

export interface NavigationProps {
  moves: ChessMove[];
  offset?: number;
  onNavigate?: (offset: number) => void;
}

export const Navigation = ({
  moves,
  offset = 0,
  onNavigate = () => undefined,
}: NavigationProps) => {
  const moveIdx = moves.length - offset;
  const setMoveIdx = useCallback((idx: number) => {
    if (idx <= moves.length && idx >= 0) {
      const idxOffset = moves.length - idx;
      onNavigate(idxOffset);
    }
  }, [moves.length, onNavigate]);
  const previous = useCallback(() => setMoveIdx(moveIdx - 1), [setMoveIdx, moveIdx]);
  const next = useCallback(() => setMoveIdx(moveIdx + 1), [setMoveIdx, moveIdx]);
  const algebraic = useMemo(() => Chess.algebraic(moves), [moves]);

  return (
    <Box direction="row">
      <Box direction="row-reverse" overflow="scroll" align="center" flex>
        <Box direction="row" width={{ max: 'none', min: '100%' }} overflow="visible" flex={false} gap="small">
          {Array.from({ length: Math.ceil(algebraic.length / 2) }).map((_, i) => {
            const whiteIdx = i * 2;
            const blackIdx = i * 2 + 1;
            const white = algebraic[whiteIdx];
            const black = algebraic[blackIdx];

            return (
              <Box key={`${i}-${white}-${black}`} direction="row" gap="xsmall" flex={false}>
                <Box style={{ fontWeight: 300 }}>{i + 1}.</Box>
                {white && <Box onClick={() => setMoveIdx(whiteIdx + 1)} style={offset === moves.length - whiteIdx - 1 ? { fontWeight: 'bold' } : {}}>{white}</Box>}
                {black && <Box onClick={() => setMoveIdx(blackIdx + 1)} style={offset === moves.length - blackIdx - 1 ? { fontWeight: 'bold' } : {}}>{black}</Box>}
              </Box>
            )
          })}
        </Box>
      </Box>
      <Box pad={{ left: 'medium', vertical: 'xsmall' }} direction="row">
        <Button onClick={previous} label="<" />
        <Button onClick={next} label=">" />
      </Box>
    </Box>
  )
};
