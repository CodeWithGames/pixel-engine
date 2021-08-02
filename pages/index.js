import firebase from 'firebase/app';
import signInWithGoogle from '../util/signInWithGoogle.js';

import styles from '../styles/Index.module.css';

export default function Index() {
  return (
    <div className={styles.container}>
      <h1>Pixel Engine</h1>
      {
        !firebase.auth().currentUser &&
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
    </div>
  );
}
