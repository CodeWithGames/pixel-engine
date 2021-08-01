import firebase from 'firebase/app';

import styles from '../styles/Index.module.css';

export default function Index() {
  // opens google sign in popup
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  return (
    <div className={styles.container}>
      <h1>Pixel Engine</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}
