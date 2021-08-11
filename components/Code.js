import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';
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
  const [error, setError] = useState('');

  // compiles code
  function compile() {
    setError('');
    // parse to check for errors
    try {
      Parser.parse(code);
    } catch (e) {
      setError(e);
      return;
    }
  }

  // update props
  useEffect(() => {
    props.setCode(code);
  }, [code])

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
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
        <Button
          variant="contained"
          color="primary"
          onClick={compile}
          startIcon={<DescriptionIcon />}
          className={styles.compilebutton}
        >
          Compile
        </Button>
      </div>
      <p className={`redtext monospace ${styles.error}`}>
        {error.toString()}
      </p>
    </div>
  );
}
