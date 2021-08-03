import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
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
      <Link href="/games">
        <a className="url">Games</a>
      </Link>
      {
        firebase.auth().currentUser &&
        <Link href="/create">
          <a className="url">Create</a>
        </Link>
      }
      {
        firebase.auth().currentUser ?
        <Tooltip title="Sign Out" arrow>
          <IconButton
            className={styles.iconbutton}
            onClick={() => firebase.auth().signOut()}
          >
            <ExitToAppIcon />
          </IconButton>
        </Tooltip> :
        <Tooltip title="Sign In" arrow>
          <IconButton
            className={styles.iconbutton}
            onClick={signInWithGoogle}
          >
            <PersonOutlineIcon />
          </IconButton>
        </Tooltip>
      }
    </div>
  );
}
