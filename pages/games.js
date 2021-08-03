import Cartridge from '../components/Cartridge.js';
import Loading from '../components/Loading.js';

import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/Games.module.css';

export default function Games() {
  // retrieve games
  const gamesRef = firebase.firestore().collection('games');
  const [games] = useCollectionData(
    gamesRef.orderBy('created'), { idField: 'id' }
  );

  // return loading if no games
  if (!games) return <Loading />;

  return (
    <div>
      <div className={styles.gamelist}>
        {
          games.map(game =>
            <Cartridge game={game} key={game.id} />
          )
        }
      </div>
    </div>
  );
}
