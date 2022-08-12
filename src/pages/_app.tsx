import React from 'react';
import Head from 'next/head';
import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { store } from '../redux/store';
import createEmotionCache from '../createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <Provider store={store}>
                <CssBaseline />
                <Component {...pageProps} />
            </Provider>
        </CacheProvider>
    );
}

export default MyApp;
