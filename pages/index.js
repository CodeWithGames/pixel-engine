import Button from '@material-ui/core/Button';
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
          <Button
            onClick={signInWithGoogle}
            variant="contained"
            color="primary"
          >
            Sign in with Google
          </Button>
        }
      </div>
    </div>
  );
}
