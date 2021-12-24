import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Button, Heading } from 'grommet';
import { Layout } from '../components/Layout/Layout';
import { Container } from '../components/Container/Container';
import { useAppDispatch, useAppSelector } from '../store';
import { useCallback } from 'react';
import { reset } from '../store/slices/chess';
import { ChessGame } from '../components/ChessGame/ChessGame';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const startNewGame = useCallback(() => dispatch(reset()), [dispatch]);
  const { gameStarted } = useAppSelector((state) => state.chess);

  return (
    <Layout>
      <Head>
        <title>Chess</title>
        <meta name="description" content="An exploration into the fundamentals of chess" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Heading level="1" textAlign="center">
          Chess
        </Heading>
        {gameStarted && (
          <ChessGame />
        )}
        {!gameStarted && (
          <Box direction="row">
            <Button
              onClick={startNewGame}
              label="Begin New Game"
              primary
            />
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export default Home
