import styled from 'styled-components';
import { Stack } from 'grommet';
// import { BoardTileProps } from './BoardTile';

export const StyledStack = styled(Stack)((props) => ({
  userSelect: 'none',
  ...(props.onClick ? {
    cursor: 'pointer',
    '&:hover': {
      // border: '2px solid magenta'
      opacity: 0.75,
    }
  } : {}),
}));
