import AceEditor from 'react-ace';

import { useState } from 'react';

import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import styles from '../styles/Code.module.css';

export default function Code(props) {
  const [code, setCode] = useState('');

  return (
    <div>
      <AceEditor
        value={code}
        onChange={v => setCode(v)}
        mode="javascript"
        theme="monokai"
        wrapEnabled={true}
        showPrintMargin={false}
        setOptions={{ useWorker: false }}
        tabSize={2}
      />
      <button onClick={() => props.setCode(code)}>Run</button>
      <button onClick={() => props.setCode('')}>Stop</button>
    </div>
  );
}
