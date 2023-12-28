import { MantineProvider, createTheme } from '@mantine/core';

import { AppContext } from '../pages/index';
import React from 'react';
import '../styles/globals.scss';

import { Layout } from '../components/layout/Layout';
import { Provider } from 'react-redux';
import store from '@/redux/store';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }) {
  const [searchValue, setSearchValue] = React.useState(''); // Для чего это и зачем тебе useContext, если ты используешь redux-toolkit

  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <AppContext.Provider value={{ searchValue, setSearchValue }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
      </Provider>
    </MantineProvider>
  );
}
