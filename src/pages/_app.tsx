import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { Grommet, ThemeType } from 'grommet';
import '../styles/globals.css'
import { store } from '../store';

const theme: ThemeType = {
  global: {
    colors: {
      brand: '#1e90ff',
    },
  },
  button: {
    border: {
      radius: '4px',
    }
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Grommet theme={theme}>
        <Component {...pageProps} />
      </Grommet>
    </Provider>
  );
}
export default MyApp
