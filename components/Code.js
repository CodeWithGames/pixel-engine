import AceEditor from 'react-ace';
import { Parser } from 'acorn';

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
  const [tokens, setTokens] = useState(-1);

  // compiles code
  function compile() {
    // count tokens
    let tokens = 0;
    for (const token of Parser.tokenizer(code)) tokens++;
    setTokens(tokens);
  }

  // update props
  useEffect(() => {
    setTokens(-1);
    props.setCode(code);
  }, [code])

  return (
    <div className={styles.container}>
      <p>{tokens} tokens</p>
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
      <button onClick={compile}>Compile</button>
    </div>
  );
}
