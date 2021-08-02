import Image from 'next/image';

import firebase from 'firebase/app';
import signInWithGoogle from '../util/signInWithGoogle.js';

import styles from '../styles/Index.module.css';

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.centerbox}>
        <h1>
          <Image src="/logo.png" width="48" height="48" />
          Pixel Engine
        </h1>
        {
          !firebase.auth().currentUser &&
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        }
      </div>
    </div>
  );
}
