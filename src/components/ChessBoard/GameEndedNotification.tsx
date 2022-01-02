import { Box, Button, Heading, Layer } from 'grommet';
import React, { useCallback, useMemo } from 'react';
import { GameStatus } from '../../services/chess';
import { useAppDispatch } from '../../store';
import { reset } from '../../store/slices/chess';

const gameEndStatuses: GameStatus[] = [
  'BlackInCheckmate',
  'WhiteInCheckmate',
  'BlackInStalemate',
  'WhiteInStalemate',
  'DrawGame',
];

export interface GameEndedNotificationProps {
  status: GameStatus;
}

export const GameEndedNotification = ({
  status,
}: GameEndedNotificationProps) => {
  const dispatch = useAppDispatch();
  const startNewGame = useCallback(() => dispatch(reset()), [dispatch]);
  const heading = useMemo(() => {
    switch (status) {
      case 'BlackInCheckmate':
        return 'White Wins';
      case 'WhiteInCheckmate':
        return 'Black Wins';
      case 'BlackInStalemate':
      case 'WhiteInStalemate':
      case 'DrawGame':
        return 'Draw Game';
    }
  }, [status]);

  if (!heading) return null;

  return (
    <Layer>
        <Box pad="large">
          <Heading level="2" margin="0">{heading}</Heading>
          <Button margin={{ top: 'large' }} onClick={startNewGame} label="New Game" />
        </Box>
      </Layer>
  );
}
