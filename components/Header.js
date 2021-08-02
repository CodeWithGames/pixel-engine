import Image from 'next/image';

import firebase from 'firebase/app';
import signInWithGoogle from '../util/signInWithGoogle.js';

import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <Image src="/logo.png" width="48" height="48" />
      <h1>Pixel Engine</h1>
      {
        firebase.auth().currentUser ?
        <button onClick={() => firebase.auth().signOut()}>Sign Out</button> :
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
    </div>
  );
}
