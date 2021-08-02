import Link from 'next/link';
import Image from 'next/image';

import firebase from 'firebase/app';
import signInWithGoogle from '../util/signInWithGoogle.js';

import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.logolink}>
          <Image src="/logo.png" width="48" height="48" />
        </a>
      </Link>
      <h1>Pixel Engine</h1>
      <span className={styles.flexfill} />
      {
        firebase.auth().currentUser ?
        <button onClick={() => firebase.auth().signOut()}>Sign Out</button> :
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
    </div>
  );
}
