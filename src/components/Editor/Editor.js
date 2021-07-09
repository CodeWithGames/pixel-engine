import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript.js';
import { Controlled } from 'react-codemirror2';

import styles from './Editor.module.css';

const maxLength = 2048;

export default function Editor(props) {
  const [code, setCode] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => props.setCode(code)}>Run</button>
        <p>{code.length}/{maxLength}</p>
      </div>
      <Controlled
        value={code}
        onBeforeChange={(e, d, v) => setCode(v)}
        onChange={(e, d, v) => {
          // if max length exceeded, slice code
          if (v.length > maxLength) setCode(v.slice(0, maxLength));
        }}
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
