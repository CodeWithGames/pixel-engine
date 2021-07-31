import AceEditor from 'react-ace';

import { useEffect, useState } from 'react';

import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import styles from '../styles/Code.module.css';

const defaultCode =
`// runs once on start
function start() {

}

// runs once a frame
function update(delta) {

}

// runs once a frame after update
function draw() {

}
`;

export default function Code(props) {
  const [code, setCode] = useState(defaultCode);

  // counts number of tokens in given javascript
  function countTokens(text) {
    let tokens = 0;
    const lines = text.split('\n');
    for (const line of lines) {
      let isToken = false;
      for (const char of line) {
        if (/\w/.test(char)) isToken = true;
        else {
          if (isToken) { isToken = false; tokens++; }
          if (!/\s/.test(char)) tokens++;
        }
      }
      if (isToken) tokens++;
    }
    return tokens;
  }

  // update props
  useEffect(() => props.setCode(code), [code])

  return (
    <div>
      <p>{countTokens(code)} tokens</p>
      <AceEditor
        value={code}
        onChange={v => setCode(v)}
        mode="javascript"
        theme="monokai"
        wrapEnabled={true}
        showPrintMargin={false}
        setOptions={{ useWorker: false }}
        tabSize={2}
        height="100%"
      />
    </div>
  );
}
