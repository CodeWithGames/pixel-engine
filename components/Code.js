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

const maxTokens = 2048;

export default function Code(props) {
  const [code, setCode] = useState(defaultCode);
  const [tokens, setTokens] = useState(-1);
  const [error, setError] = useState('');

  // compiles code
  function compile() {
    setError('');
    // parse to check for errors
    try {
      Parser.parse(code);
    } catch (e) {
      setError(e);
      setTokens(-1);
      return;
    }
    // count tokens
    let tokens = 0;
    try {
      for (const token of Parser.tokenizer(code)) tokens++;
    } catch(e) {
      setError(e);
      setTokens(-1);
      return;
    }
    setTokens(tokens);
  }

  // update props
  useEffect(() => {
    setTokens(-1);
    props.setCode(code);
  }, [code])

  return (
    <div className={styles.container}>
      <p className={
        (tokens >= 0 && tokens <= maxTokens) ?
        styles.validtext : styles.errortext
      }>
        {tokens === -1 ? '?' : tokens} token{tokens !== 1 && 's'}
      </p>
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
      <p className={styles.errortext}>{error.toString()}</p>
    </div>
  );
}
