import React from 'react';
import { Box, BoxTypes, Main } from 'grommet';

export interface LayoutProps extends BoxTypes {}

export const Layout = ({ children, ...rest }: LayoutProps) => (
  <Box
    height={{ min: '100vh' }}
    direction="column"
    justify="start"
    align="center"
    flex
    {...rest}
  >
    <Main fill align="center">
      {children}
    </Main>
  </Box>
);
