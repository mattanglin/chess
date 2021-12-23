import React from 'react';
import { Box, BoxTypes } from 'grommet';

export interface ContainerProps extends BoxTypes {}

export const Container = (props: ContainerProps) => (
  <Box
    width={{ max: 'xlarge' }}
    fill="horizontal"
    align="center"
    {...props}
  />
);
