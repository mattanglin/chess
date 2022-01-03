import React, { useCallback, useState } from 'react';
import { Box, BoxTypes, Button, Heading, Layer, Main } from 'grommet';
import { Menu as MenuIcon} from 'grommet-icons';
import { Container } from '../Container/Container';
import { useAppDispatch } from '../../store';
import { reset, toggleDirection } from '../../store/slices/chess';

export interface LayoutProps extends BoxTypes {}

export const Layout = ({ children, ...rest }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const openMenu = useCallback(() => setOpen(true), [setOpen]);
  const closeMenu = useCallback(() => setOpen(false), [setOpen]);
  const changeDirection = useCallback(() => {
    dispatch(toggleDirection());
    closeMenu();
  }, [dispatch, closeMenu]);
  const resetGame = useCallback(() => {
    dispatch(reset());
    closeMenu();
  }, [dispatch, closeMenu]);

  return (
    <Box
      height={{ min: '100vh' }}
      direction="column"
      justify="start"
      align="center"
      flex
      {...rest}
    >
      {/* Header */}
      <Box fill align="center">
        <Container direction="row" pad="small" justify="between">
          <Box></Box>
          <Box>
            <Heading margin="0">chess</Heading>
          </Box>
          <Box>
            <Button icon={<MenuIcon />} onClick={openMenu} />
          </Box>
        </Container>
      </Box>
      {/* Body */}
      <Main fill align="center">
        {children}
      </Main>
      {open && (
        <Layer position="right" full="vertical" onClickOutside={closeMenu}>
          <Box fill="vertical" pad="medium" justify="start" gap="small">
            <Button label="New Game" plain onClick={resetGame} />
            <Button label="Toggle Direction" onClick={changeDirection} plain />
          </Box>
        </Layer>
      )}
    </Box>
  );
};
