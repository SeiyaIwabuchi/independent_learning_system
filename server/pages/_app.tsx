// import App from "next/app";
import { createMuiTheme, CssBaseline, ThemeOptions, ThemeProvider } from '@material-ui/core';
import type { AppProps /*, AppContext */ } from 'next/app'
import React, { useEffect, useState } from 'react';
import { dexieDb } from '../models/dexie';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState({
    typography: {
      fontFamily: [
        'Kosugi Maru',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      type: 'dark',
    },
  });
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
    const th = Object.assign({}, theme);
    dexieDb.Theme.toArray()
      .then(array => {
        if (array.length > 0) {
          th.palette = { type: array[0].themeType };
          setTheme(th);
        }else{
          dexieDb.Theme.add({themeType:"dark"});
        }
      });
  }, []);
  return (
    <React.Fragment>
      <ThemeProvider theme={createMuiTheme(theme as ThemeOptions)}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp