import Head from 'next/head';

import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pixel Engine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
