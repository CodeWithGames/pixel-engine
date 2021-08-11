import Header from '../components/Header.js';
import Head from 'next/head';

import styles from '../styles/App.module.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pixel Engine</title>
        <meta name="description" content="A minimalist online game engine." />
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className={styles.container}>
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  );
}
