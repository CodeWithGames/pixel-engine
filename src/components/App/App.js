import './App.css';
import Editor from '../Editor/Editor.js';
import Canvas from '../Canvas/Canvas.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseConfig } from '../firebaseConfig.js';

import styles from './App.module.css';

// initialize firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  useAuthState(firebase.auth());

  return (
    <div className="App">
      <Editor />
      <Canvas />
    </div>
  );
}
