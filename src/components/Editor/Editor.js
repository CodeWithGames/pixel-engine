import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript.js';
import { Controlled } from 'react-codemirror2';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import styles from './Editor.module.css';

export default function Editor(props) {
  const [code, setCode] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => props.setCode(code)}>
          <PlayArrowIcon />
        </button>
        <button onClick={() => props.setCode('')}>
          <PauseIcon />
        </button>
      </div>
      <Controlled
        value={code}
        onBeforeChange={(e, d, v) => setCode(v)}
        options={{
          lineWrapping: true,
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true
        }}
      />
    </div>
  );
}
