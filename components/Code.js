import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
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
  const { playing } = props;

  const [code, setCode] = useState(defaultCode);
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // compiles code
  function compile() {
    setSnackbarOpen(false);
    // parse to check for errors
    try {
      Parser.parse(code);
      setMessage({ type: 'success', text: 'Compiled successfully' });
    } catch (e) {
      setMessage({ type: 'error', text: e.toString() });
    }
    setSnackbarOpen(true);
  }

  // update props
  useEffect(() => {
    props.setCode(code);
  }, [code]);

  // compile on play
  useEffect(() => {
    if (playing) compile();
  }, [playing]);

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
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={message.type}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
