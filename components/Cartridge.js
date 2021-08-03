import Link from 'next/link';

import { useEffect, useState } from 'react';
import getUsername from '../util/getUsername.js';

import styles from '../styles/Cartridge.module.css';

export default function Cartridge(props) {
  const { id, title, creator } = props.game;

  const [username, setUsername] = useState('');

  // get username on start
  useEffect(() => {
    getUsername(creator).then(u => setUsername(u));
  }, []);

  return (
    <div className={styles.container}>
      <Link href={`/game/${id}`}>
        <a>
          <h1>{title}</h1>
          <p>{username}</p>
        </a>
      </Link>
    </div>
  );
}
