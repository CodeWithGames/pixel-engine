import firebase from 'firebase/app';

import { useState } from 'react';

import styles from '../styles/Create.module.css';

export default function create() {
  const [title, setTitle] = useState('');

  // creates game document in firebase
  async function createGame() {
    const uid = firebase.auth().currentUser.uid;
    const gamesRef = firebase.firestore().collection('games');
    await gamesRef.add({
      title: title,
      creator: uid,
      created: new Date()
    });
  }

  if (!firebase.auth().currentUser) return <div>This page requires auth</div>;

  return (
    <div>
      <h1>Create</h1>
      <form onSubmit={e => {
        e.preventDefault();
        createGame();
      }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <button>Create</button>
      </form>
    </div>
  );
}
