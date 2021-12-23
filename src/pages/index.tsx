import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Button, Heading } from 'grommet';
import { Layout } from '../components/Layout/Layout';
import { Container } from '../components/Container/Container';

const Home: NextPage = () => {
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
        <Box direction="row">
          <Button
            onClick={() => console.log('New Game')}
            label="Begin New Game"
            primary
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default Home
